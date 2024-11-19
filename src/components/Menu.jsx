import React, { useState } from "react";
import { menuItem } from "../data/data";
import { TiShoppingCart } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, itemsCount } from "../features/resturantSlice";
import { Link } from "react-router-dom";

const Menu = () => {
  const [data, setData] = useState(menuItem);
  const [isClicked, setIsClicked] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("");
  const cartCount = useSelector((state) => state.resturantSlice.cartItemsCount);
  const disptach = useDispatch();
  const handleAddToCart = (item) => {
    disptach(itemsCount());
    disptach(addToCart(item));
  };
  const handleSearch = (e) => {
    const searchValue = e.target.value.trim();

    const filter = menuItem?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (searchValue === "") {
      setData(menuItem);
    }

    setData(filter);
  };

  const filteredFood = (type) => {
    const filter = menuItem.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );

    if (type === "all") {
      setData(menuItem);
    } else {
      setData(filter);
    }

    setIsClicked(type);
  };

  const selectFilterCategory = (event) => {
    const category = event.target.value;
    setSelectedFilter(category);

    const sortedProducts = [...menuItem].sort((a, b) => {
      if (category === "lowToHigh") {
        return a.price - b.price;
      } else if (category === "hightolow") {
        return b.price - a.price;
      } else if (category === "AtoZ") {
        return a.name.localeCompare(b.name);
      } else if (category === "ZtoA") {
        b.name.localeCompare(a.name);
      }
    });

    setData(sortedProducts);
  };

  return (
    <>
      <Link to={"/cart"}>
        <div>
          <TiShoppingCart className="text-4xl absolute right-10 top-10" />
          <p className="bg-red-500 absolute font-semibold px-2 right-8 top-8 rounded-full">
            {cartCount}
          </p>
        </div>
      </Link>
      <div className="p-8">
        <h1 className="text-center font-semibold text-2xl md:text-6xl mb-5">
          Menu
        </h1>
        <div>
          <form className="max-w-md mx-auto py-4 mb-5">
            <label
              for="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                onChange={handleSearch}
                className="block w-full p-4 ps-10 text-sm text-gray-900 border outline-none border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </form>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-5">
          <button
            onClick={() => filteredFood("all")}
            className={`${
              isClicked === "all"
                ? "bg-gray-700 text-white"
                : "bg-white text-black"
            } font-semibold px-4 py-1.5 rounded-full`}
          >
            All
          </button>

          <button
            onClick={() => filteredFood("desi")}
            className={`${
              isClicked === "desi"
                ? "bg-gray-700 text-white"
                : "bg-white text-black"
            } font-semibold px-4 py-1.5 rounded-full`}
          >
            Desi
          </button>
          <button
            onClick={() => filteredFood("fastfood")}
            className={`${
              isClicked === "fastfood"
                ? "bg-gray-700 text-white"
                : "bg-white text-black"
            } font-semibold px-4 py-1.5 rounded-full`}
          >
            Fast Food
          </button>
          <button
            onClick={() => filteredFood("desert")}
            className={`${
              isClicked === "desert"
                ? "bg-gray-700 text-white"
                : "bg-white text-black"
            } font-semibold px-4 py-1.5 rounded-full`}
          >
            Desert
          </button>
          <button
            onClick={() => filteredFood("beverages")}
            className={`${
              isClicked === "beverages"
                ? "bg-gray-700 text-white"
                : "bg-white text-black"
            } font-semibold px-4 py-1.5 rounded-full`}
          >
            Beverages
          </button>
        </div>
        <form className="max-w-sm mx-auto mb-5">
          <label
            htmlFor="filter"
            className="block mb-2 text-sm font-semibold text-white"
          >
            Select an option
          </label>
          <select
            id="filter"
            className="bg-gray-50 border border-gray-300 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-black font-semibold dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedFilter}
            onChange={selectFilterCategory}
          >
            <option>Filter</option>
            <option value={"hightolow"}>Price: High To Low</option>
            <option value={"lowToHigh"}>Price: Low To High</option>
            <option value={"AtoZ"}>Alphabetically A to Z</option>
            <option value={"ZtoA"}>Alphabetically Z to A</option>
          </select>
        </form>
        <div className="grid grid-cols-1 md:px-10 gap-5 md:gap-10 md:grid-cols-3">
          {data.map((item) => (
            <div
              key={item.id}
              className="w-full max-w-sm bg-black text-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <img
                className="p-8 rounded-t-lg"
                src={item.img}
                alt="product image"
              />

              <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight  text-white">
                  {item.name}
                </h5>

                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-white">
                    ${item.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Menu;
