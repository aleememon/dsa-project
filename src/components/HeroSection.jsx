import React from "react";

const HeroSection = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="font-semibold text-2xl md:text-4xl mt-44 md:mt-56">
        Welcome to
      </p>
      <h1 className="font-semibold text-4xl md:text-7xl bg-gradient-to-t from-orange-500 to-red-500 bg-clip-text text-transparent mt-2">
        Café Europa
      </h1>
    </div>
  );
};

export default HeroSection;
