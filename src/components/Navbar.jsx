import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuBtn = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="p-4 md:p-8 flex justify-between">
      <h1 className="text-3xl md:text-5xl bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent font-semibold">
        Café Europa
      </h1>
      <ul className="hidden lg:flex gap-4  text-2xl font-semibold">
        <Link to={"/home"}><li className="cursor-pointer text-white font-semibold">Home</li></Link>
        <Link to={"/menu"}><li className="cursor-pointer text-white font-semibold">Menu</li></Link>
        <Link to={"/about"}><li className="cursor-pointer text-white font-semibold">About Us</li></Link>
      </ul>
      <div className="block md:hidden">
        <IoMenu onClick={handleMenuBtn} className="text-4xl mt-1" />
        {isMenuOpen && (
          <div
            className={`absolute ${
              isMenuOpen ? "top-0" : "-top-[1000px]"
            } left-0 w-full h-screen bg-black text-white md:hidden p-4`}
          >
            <div className="flex justify-between">
              <p className="text-3xl font-semibold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Café Europa
              </p>
              <RxCross2 onClick={handleMenuBtn} className="text-4xl mt-1" />
            </div>
            <ul className="flex flex-col text-xl font-semibold text-center mt-4 gap-5">
              <Link to={"/home"}><li className="cursor-pointer text-white">Home</li></Link>
              <Link to={"/menu"}><li className="cursor-pointer text-white">Menu</li></Link>
              <Link to={"/contact"}><li className="cursor-pointer text-white ">Rate Us</li></Link>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
