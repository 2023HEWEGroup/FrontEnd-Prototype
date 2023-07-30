import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    value: true
}


export const windowScrollableSlice = createSlice({
    name: "windowScrollable",
    initialState,
    reducers: {
        isWindowScrollable: (state) => {
            state.value = !state.value;
        }
    }
})

export const { isWindowScrollable } = windowScrollableSlice.actions;
export default windowScrollableSlice.reducer;