import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    floatSideBar: false
}


export const floatSideBarSlice = createSlice({
    name: "floatSideBar",
    initialState,
    reducers: {
        booleanFloatSideBar: (state) => {
            state.value = !state.value;
        }
    }
})

export const { booleanFloatSideBar } = floatSideBarSlice.actions;
export default floatSideBarSlice.reducer;