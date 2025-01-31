import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./features/productsSlice";

export const store = configureStore({
  reducer: {
    productsData: productsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
