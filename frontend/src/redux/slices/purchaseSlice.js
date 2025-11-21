import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPurchases = createAsyncThunk("purchases/fetch", async () => {
    const res = await axios.get("http://localhost:5000/purchases");
    return res.data;
});

export const purchaseSlice = createSlice({
    name: "purchases",
    initialState: { items: [], status: "idle" },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPurchases.fulfilled, (state, action) => {
            state.items = action.payload;
        });
    },
});

export default purchaseSlice.reducer;
