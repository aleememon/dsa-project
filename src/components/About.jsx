import React from "react";
import burger from "../images/food-img.jpg";
import food from "../images/food.jpg";
import food1 from "../images/food1.jpg";
const About = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex justify-center flex-col items-center ">
        <h1 className="text-3xl md:text-6xl italic font-semibold">
          European Heritage
        </h1>
        <h1 className="text-3xl md:text-6xl italic font-semibold mt-2 ">
          Resturant
        </h1>
        <p
          className="italic text-lg text-center md:text-2xl font-semibold mt-3"
          style={{ fontFamily: "san" }}
        >
          The perfect place to enjoy the life and food.
        </p>
      </div>
      <div className="flex-1 hidden md:block">
        <img
          loading="lazy"
          src={burger}
          alt="404"
          className="w-[400px] mt-28 "
        />
        <img
          loading="lazy"
          src={food}
          className="absolute w-[400px] -bottom-[660px] "
        />
        <img
          src={food1}
          loading="lazy"
          className="w-[320px] h-[585px] absolute right-5 -bottom-[670px]"
        />
      </div>
    </div>
  );
};

export default About;
