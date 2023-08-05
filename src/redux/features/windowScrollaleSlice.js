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
        },
        setWindowScrollable: (state, actions) => {
            state.value = actions.payload;
        }
    }
})

export const { isWindowScrollable, setWindowScrollable } = windowScrollableSlice.actions;
export default windowScrollableSlice.reducer;