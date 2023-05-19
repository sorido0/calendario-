import { configureStore } from "@reduxjs/toolkit";
import { interfasUser } from "./ui";
import { calendarioStore } from "./calendario";



export const store = configureStore({
    reducer: {
        ui: interfasUser.reducer,
        condelario: calendarioStore.reducer,
       // calendario: calendarioReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

