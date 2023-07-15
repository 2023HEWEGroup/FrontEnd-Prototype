import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    floatSideBarFollowing: false
}


export const floatSideBarFollowingSlice = createSlice({
    name: "floatSideBarFollowing",
    initialState,
    reducers: {
        booleanFloatSideBarFollowing: (state) => {
            state.value = !state.value;
        }
    }
})

export const { booleanFloatSideBarFollowing } = floatSideBarFollowingSlice.actions;
export default floatSideBarFollowingSlice.reducer;