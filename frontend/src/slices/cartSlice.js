import { createSlice } from "@reduxjs/toolkit";

import { updatecart } from "../utils/cartUtil";



const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] ,shippingAddress:{} , paymentMethod:'PayPal' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // The item to add to the cart
      const item = action.payload;
      
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        // If exists, update quantity
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        // If not exists, add new item to cartItems
        state.cartItems = [...state.cartItems, item];
      }
      // Update the cart state using the updateCart function
      return updatecart(state);
    },
    removeFromCart:(state,action)=>{
        state.cartItems=state.cartItems.filter((x)=>x._id!==action.payload )
        updatecart(state);
    },
    saveShippingAddress:(state,action)=>{
      state.shippingAddress=action.payload;
      return updatecart(state)
    },
    savePaymentMethod:(state,action)=>{
      state.paymentMethod=action.payload;
      return updatecart(state);
    },
    clearCartItems:(state,action)=>{
      state.cartItems=[];
      return updatecart(state)
    }
    
  },
});

export const {clearCartItems, addToCart ,removeFromCart ,saveShippingAddress,savePaymentMethod} = cartSlice.actions;

export default cartSlice.reducer;


