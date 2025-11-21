import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsage = createAsyncThunk("usage/fetch", async () => {
    const res = await axios.get("http://localhost:5000/usage");
    return res.data;
});

export const usageSlice = createSlice({
    name: "usage",
    initialState: { items: [], status: "idle" },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsage.fulfilled, (state, action) => {
            state.items = action.payload;
        });
    },
});

export default usageSlice.reducer;
