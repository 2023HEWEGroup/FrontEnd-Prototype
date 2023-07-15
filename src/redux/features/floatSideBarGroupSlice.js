import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    floatSideBarGroup: false
}


export const floatSideBarGroupSlice = createSlice({
    name: "floatSideBarGroup",
    initialState,
    reducers: {
        booleanFloatSideBarGroup: (state) => {
            state.value = !state.value;
        }
    }
})

export const { booleanFloatSideBarGroup } = floatSideBarGroupSlice.actions;
export default floatSideBarGroupSlice.reducer;