import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://openexchangerates.org/api/";
const ID = "7ed766c303f4457e8b0aa567384201f9";

const initialState = {
  history: []
};

export const fetchHistorical = createAsyncThunk("historical/fetchHistorical", async (date) => {
  return axios
      .get(`${API_URL}historical/${date}.json?app_id=${ID}`)
      .then((response) => response.data.rates)
});

export const historicalSlice = createSlice({
    name: "historical",
    initialState,
    extraReducers: builder => {
      builder.addCase(fetchHistorical.pending, (state) => {
          state.loading = true;
      })
      builder.addCase(fetchHistorical.fulfilled, (state, action) => {
          state.history = action.payload;
          state.loading = false;
      })
      builder.addCase(fetchHistorical.rejected, (state, action) => {
          state.error = action.error;
          state.loading = false;
      })
  }
})

export default historicalSlice.reducer;