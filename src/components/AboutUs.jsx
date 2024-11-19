import React from "react";
import img1 from "../images/img1.jpeg";
import img2 from "../images/img2.jpeg";
import img3 from "../images/img3.jpeg";
const AboutUs = () => {
  const founders = [
    {
      img: img1,
      name: "Ali Reza Memon",
      role: "Cheif Executive Officer (CEO)",
    },
    {
      img: img2,
      name: "Dawood Aziz Azeemi",
      role: "Cheif Technology Officer (CTO)",
    },
    {
      img: img3,
      name: "Hassam Khan Zai",
      role: "Cheif Financial Officer (CFO)",
    },
  ];
  return (
    <div className="font-semibold">
      <div className="flex justify-center items-center text-5xl mt-10">
        About Us
      </div>
      <div className="flex flex-col justify-center items-center mt-5 ">
        <h1 className="text-4xl">Our Founder's</h1>
      </div>
      <div className="grid mt-10  ml-20 grid-cols-3">
        {founders.map((founder) => (
          <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <img className="w" src={founder.img} alt={founder.name} />

            <div class="p-5">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {founder.name}
              </h5>

              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {founder.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
