import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchInventory = createAsyncThunk("inventory/fetch", async () => {
    const res = await axios.get("http://localhost:5000/inventory");
    return res.data;
});

export const inventorySlice = createSlice({
    name: "inventory",
    initialState: { items: [], status: "idle" },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchInventory.fulfilled, (state, action) => {
            state.items = action.payload;
        });
    },
});

export default inventorySlice.reducer;
