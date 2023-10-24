import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { redis } from "../utils/redis";

// authenticated user
export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token;

    if (!access_token) {
      return next(new ErrorHandler("Авторизуйтесь для доступа к ресурсу", 400));
    }

    const decoded = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN as string
    ) as JwtPayload;

    if (!decoded) {
      return next(new ErrorHandler("Access token не действителен", 400));
    }

    const user = await redis.get(decoded.id);

    if (!user) {
      return next(
        new ErrorHandler("Авторизуйтесь для доступа к этому ресурсу.", 400)
      );
    }

    req.user = JSON.parse(user);
    next();
  }
);

// validate user role
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(
        new ErrorHandler(
          `Ваша роль: ${req.user?.role} - не имеет доступа к этому ресурсу`,
          403
        )
      );
    }
    next();
  };
};

// update access token
