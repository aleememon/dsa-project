import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { TiMinus, TiPlus } from "react-icons/ti";
import { deleteItem, updateItemQuantity } from "../features/resturantSlice";
import {  useNavigate } from "react-router-dom";

const Cart = () => {
  const cartCount = useSelector((state) => state.resturantSlice.cartItemsCount);
  const items = useSelector((state) => state.resturantSlice.cart);
  const dispatch = useDispatch();
  const price = items
    .map((item) => item.price * item.qty)
    .reduce((acc, cur) => acc + cur, 0);
  const vat = price * 0.15;
  const total = price + vat;
  const navigate = useNavigate()
  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  const handleIncrementItem = (id) => {
    const item = items.find((item) => item.id === id);

    if (item) {
      dispatch(updateItemQuantity({ id, qty: item.qty + 1 }));
    }
  };

  const handleDecrementItem = (id) => {
    const item = items.find((item) => item.id === id);

    if (item && item.qty > 1) { 
      dispatch(updateItemQuantity({ id, qty: item.qty - 1 }));
    }
  };

  return (
    <div>
      <div className="bg-white overflow-y-auto max-h-[600px] p-5 text-black font-semibold absolute w-[700px] h-[500px] left-20 top-20 rounded-lg">
        <h1 className="text-2xl">Cart - {cartCount} items</h1>
        <hr className="mt-1" />
        <div className="mt-2 flex flex-col gap-4">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <img className="size-40" src={item.img} alt={item.name} />
                <div className="flex flex-col gap-3 justify-between">
                  <p className="mt-2">{item.name}</p>
                  <p className="mt-2"> Price: ${item.price}</p>
                  <div className="flex gap-3">
                    <TiMinus
                      onClick={() => handleDecrementItem(item.id)}
                      className="bg-black text-white w-5 h-5 rounded cursor-pointer"
                    />
                    <p className="text-2xl -mt-1">{item.qty}</p>
                    <TiPlus
                      onClick={() => handleIncrementItem(item.id)}
                      className="bg-black text-white w-5 h-5 rounded cursor-pointer"
                    />
                  </div>
                  <MdDelete
                    onClick={() => handleDeleteItem(item.id)}
                    className="hover:text-red-600 duration-300 text-4xl mb-4 cursor-pointer"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center text-4xl items-center h-[50vh]">
              Your Cart is Empty ☹
            </div>
          )}
        </div>
      </div>

      <div className="absolute text-black font-semibold p-4 bg-white w-[400px] h-[500px] rounded-lg right-[200px] top-20">
        <p className="text-2xl">Summary</p>
        <hr />
        <div className="mt-10 flex flex-col">
          <div className="flex justify-between">
            <p>Products Amount</p>
            <p>${price.toFixed(2)}</p>
          </div>
          <div className="flex mt-5 justify-between">
            <p>Value-Added Tax (VAT) 15%</p>
            <p>${vat.toFixed(2)}</p>
          </div>
          <div className="flex mt-5 justify-between">
            <p>Total Amount</p>
            <p>${total.toFixed(2)}</p>
          </div>
        </div>
        <button onClick={() => navigate("/payment")} disabled={price === 0} className="text-center w-full hover:bg-[#00008B] duration-300 hover:text-lg bg-black text-white text-xl rounded-lg py-3 mt-[230px]">
          Check Out
        </button>
      </div>
    </div>
  );
};

export default Cart;
