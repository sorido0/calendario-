import { configureStore } from "@reduxjs/toolkit";
import { interfasUser } from "./ui";
import { calendarioStore } from "./calendario";
import { authSlice } from "./auth";



export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: interfasUser.reducer,
    condelario: calendarioStore.reducer,
    // calendario: calendarioReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

