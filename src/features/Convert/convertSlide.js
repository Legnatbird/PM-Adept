import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    visible: false,
    convert: 1,
    convertTo: 0
};


export const convertedSlice = createSlice({
    name: "converted",
    initialState,
    reducers: {
        setConvert: (state, action) => {
            state.visible = action.payload.visible;
            state.convert = action.payload.convert;
            state.convertTo = action.payload.convertTo;
        }
    }
})


export const { setConvert } = convertedSlice.actions;
export default convertedSlice.reducer;