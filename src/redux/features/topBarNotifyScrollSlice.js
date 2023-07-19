import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    value: 1
}


export const topBarNotifyScrollSlice = createSlice({
    name: "topBarNotifyScroll",
    initialState,
    reducers: {
        multipleTopBarNotifyScroll: (state) => {
            state.value += 1;
        }
    }
})

export const { multipleTopBarNotifyScroll } = topBarNotifyScrollSlice.actions;
export default topBarNotifyScrollSlice.reducer;