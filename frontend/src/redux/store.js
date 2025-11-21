import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "./slices/inventorySlice";
import purchaseReducer from "./slices/purchaseSlice";
import usageReducer from "./slices/usageSlice";

export const store = configureStore({
    reducer: {
        inventory: inventoryReducer,
        purchases: purchaseReducer,
        usage: usageReducer,
    },
});
