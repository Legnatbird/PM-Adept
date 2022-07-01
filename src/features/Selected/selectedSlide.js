import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currencies: ["AED", "AED"],
    values: [3.6731, 3.6731]
};


export const selectedSlice = createSlice({
    name: "currency",
    initialState,
    reducers: {
        setCurrency: (state, action) => {
            const { currencies, values } = action.payload;
            (action.payload.base) ? state.currencies[0] = currencies : state.currencies[1] = currencies;
            (action.payload.base) ? state.values[0] = values : state.values[1] = values;
        }
    }
})


export const { setCurrency } = selectedSlice.actions;
export default selectedSlice.reducer;