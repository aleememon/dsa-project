import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItemsCount: 0,
  cart: [],
};

export const resturantSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    itemsCount: (state) => {
      state.cartItemsCount += 1;
    },
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.cart.push({ ...newItem, qty: 1 }); 
      }
      
    },
    deleteItem: (state, action) => {
      const itemId = action.payload;
      const itemToDelete = state.cart.find((item) => item.id === itemId);

      if (itemToDelete) {
        state.cartItemsCount -= itemToDelete.qty; 
      }
      state.cart = state.cart.filter((item) => item.id !== itemId);
    },
    updateItemQuantity: (state, action) => {
      const { id, qty } = action.payload;
      const itemToUpdate = state.cart.find((item) => item.id === id);

      if (itemToUpdate) {
        state.cartItemsCount += qty - itemToUpdate.qty;
        itemToUpdate.qty = qty;
      }
    },
    checkout: (state) => {
      state.cartItemsCount = 0;
      state.cart = []
    }
  },
});

export const { itemsCount, addToCart, deleteItem, updateItemQuantity, checkout } = resturantSlice.actions;
export default resturantSlice.reducer;
