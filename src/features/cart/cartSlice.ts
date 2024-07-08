// import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { Product } from "../productsSlice";

// export type CartItem = {
//   product: Product;
//   quantity: number;
// };

// export type Order = {
//   grandTotal: number;
//   items: CartItem[];
// };

// type State = {
//   cart: CartItem[];
//   total: number;
//   order: Order;
// };

// const initialState: State = {
//   cart: [],
//   total: 0,
//   order: {} as Order,
// };

// const cartSlice = createSlice({
//   name: "cartData",
//   initialState,
//   reducers: {
//     addItemToCart: (state, action: PayloadAction<CartItem>) => {
//       if (
//         state.cart.find(
//           (item) => item.product.slug === action.payload.product.slug
//         )
//       ) {
//         state.cart = state.cart.map((item) => {
//           if (item.product.slug === action.payload.product.slug) {
//             item.quantity += action.payload.quantity;
//           }
//           return item;
//         });
//       } else {
//         state.cart.push(action.payload);
//       }
//       state.total = state.cart.reduce((acc, item) => {
//         return acc + item.product.price * item.quantity;
//       }, 0);
//     },
//     removeCartItem: (state, action: PayloadAction<string>) => {
//       state.cart = state.cart.filter(
//         (item) => item.product.slug !== action.payload
//       );
//       state.total = state.cart.reduce((acc, item) => {
//         return acc + item.product.price * item.quantity;
//       }, 0);
//     },
//     updateCartItemQuantity: (
//       state,
//       action: PayloadAction<{ slug: string; quantity: number }>
//     ) => {
//       const { slug, quantity } = action.payload;
//       const item = state.cart.find((item) => item.product.slug === slug);
//       if (item) {
//         item.quantity = quantity;
//         state.total = state.cart.reduce((acc, item) => {
//           return acc + item.product.price * item.quantity;
//         }, 0);
//       }
//     },
//     removeAllCartItems: (state) => {
//       state.cart = [];
//       state.total = 0;
//     },
//     removeSingleCartItem: (state, action: PayloadAction<string>) => {
//       const itemIndex = state.cart.findIndex(
//         (item) => item.product.slug === action.payload
//       );
//       if (itemIndex >= 0) {
//         state.cart.splice(itemIndex, 1);
//         state.total = state.cart.reduce((acc, item) => {
//           return acc + item.product.price * item.quantity;
//         }, 0);
//       }
//     },

//     placeOrder: (state, action: PayloadAction<number>) => {
//       state.order = {
//         grandTotal: action.payload,
//         items: state.cart,
//       };
//     },
//     resetCart: (state) => {
//       state.cart = [];
//       state.total = 0;
//     },
//     resetOrder: (state) => {
//       state.order = {} as Order;
//     },
//   },
// });

// export default cartSlice;

// export const {
//   addItemToCart,
//   updateCartItemQuantity,
//   removeAllCartItems,
//   removeSingleCartItem,
//   placeOrder,
//   resetCart,
//   resetOrder,
// } = cartSlice.actions;
