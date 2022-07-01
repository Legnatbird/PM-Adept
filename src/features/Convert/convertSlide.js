import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    visible: false,
    convert: 0
};


export const convertedSlice = createSlice({
    name: "converted",
    initialState,
    reducers: {
        setConvert: (state, action) => {
            state.visible = action.payload.visible;
            state.convert = action.payload.convert;
        }
    }
})


export const { setConvert } = convertedSlice.actions;
export default convertedSlice.reducer;