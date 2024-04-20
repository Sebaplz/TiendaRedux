import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {},
  total: 0,
};

const updateTotal = (items) => {
  return Object.values(items).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      if (state.items[product.id]) {
        state.items[product.id].quantity += 1;
      } else {
        state.items[product.id] = { ...product, quantity: 1 };
      }
      state.total = updateTotal(state.items);
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      if (state.items[productId].quantity > 1) {
        state.items[productId].quantity -= 1;
      } else {
        delete state.items[productId];
      }
      state.total = updateTotal(state.items);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
