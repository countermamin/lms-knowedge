import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const emailRegexPattern: RegExp =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Пожалуйста введите ваше имя"],
    },
    email: {
      type: String,
      required: [true, "Пожалуйста введите вашу почту"],
      validate: {
        validator: function (value: string) {
          return emailRegexPattern.test(value);
        },
        message: "Пожалуйста введите корректную почту",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Пожалуйста введите пароль"],
      minlength: [6, "Почта должна состоять минимум из 6 символов"],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: [
      {
        courseId: String,
      },
    ],
  },
  { timestamps: true }
);

// Hash password
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// compare password
userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password);
};

const userModel: Model<IUser> = mongoose.model("User", userSchema);
export default userModel;
