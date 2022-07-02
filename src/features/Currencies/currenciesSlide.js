import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = "https://openexchangerates.org/api/";
const ID = "7ed766c303f4457e8b0aa567384201f9";

const initialState = {
    loading: false,
    currencies: [],
    error: ""
};

export const fetchCurrencies = createAsyncThunk("currencies/fetchCurrencies", async () => {
    return axios
        .get(`${API_URL}latest.json?app_id=${ID}`)
        .then((response) => response.data.rates)
});

export const currenciesSlice = createSlice({
    name: "currencies",
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchCurrencies.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
            state.currencies = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchCurrencies.rejected, (state, action) => {
            state.error = action.error;
            state.loading = false;
        })
    }
})

export default currenciesSlice.reducer;