import React from "react";
import Image from "next/image";
import line from "@/public/assets/line.png"; // after deploy check if it works in prod
import MarQuee from "react-fast-marquee";

type Props = {};

const Hero = (props: Props) => {
  const rowOneImages = [
    {
      url: "https://pixner.net/aikeu/assets/images/banner/large-slider/one.png",
    },
    {
      url: "https://pixner.net/aikeu/assets/images/banner/large-slider/two.png",
    },
    {
      url: "https://pixner.net/aikeu/assets/images/banner/large-slider/three.png",
    },
    {
      url: "https://pixner.net/aikeu/assets/images/banner/large-slider/four.png",
    },
    {
      url: "https://pixner.net/aikeu/assets/images/banner/large-slider/five.png",
    },
  ];

  const rowTwoImages = [
    {
      url: "https://pixner.net/aikeu/assets/images/banner/small-slider/one.png",
    },
    {
      url: "https://pixner.net/aikeu/assets/images/banner/small-slider/two.png",
    },
    {
      url: "https://pixner.net/aikeu/assets/images/banner/small-slider/three.png",
    },
    {
      url: "https://pixner.net/aikeu/assets/images/banner/small-slider/four.png",
    },
    {
      url: "https://pixner.net/aikeu/assets/images/banner/small-slider/five.png",
    },
  ];

  return (
    <div className="w-full md:min-h-screen flex items-center justify-center overflow-hidden">
      <div>
        <h1 className="text-black dark:text-white font-Poppins text-4xl py-5 xl:text-7xl 2xl:text-8xl font-[700] text-center xl:leading-[80px] 2xl:leading-[100px] sm:mt-20">
          Учи <span className="text-[#64FF4B]">Китайский</span> <br /> Вместе{" "}
          <br /> с нами
        </h1>
        <div className="md:mt-5">
          <Image
            src={line}
            alt=""
            className="absolute hidden md:block"
            width={2000}
            height={2}
          />
        </div>
        <div className="w-[100vw] mb-5 md:mb-20 relative">
          <div className="rotate-[-4deg] mt-10 md:mt-[6.5rem]">
            <MarQuee>
              {rowOneImages.map((i, index) => (
                <Image
                  src={i.url}
                  key={index}
                  alt=""
                  className="md:m-4 w-[200px] m-2 md:w-[500px] rounded-[20px]"
                  width={500}
                  height={300}
                />
              ))}
            </MarQuee>

            <MarQuee>
              {rowTwoImages.map((i, index) => (
                <Image
                  src={i.url}
                  key={index}
                  alt=""
                  className="md:m-4 w-[200px] m-2 md:w-[500px] rounded-[20px]"
                  width={500}
                  height={300}
                />
              ))}
            </MarQuee>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
