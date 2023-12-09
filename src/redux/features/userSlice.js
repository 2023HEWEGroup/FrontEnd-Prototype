import { createSlice } from "@reduxjs/toolkit";


const storedUser = localStorage.getItem("user");
const initialState = {
    value: JSON.parse(storedUser) || null
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        dropUser: (state, action) => {
            state.value = null;
            localStorage.removeItem("user");
        }
    },
});


export const { setUser, dropUser } = userSlice.actions;
export default userSlice.reducer;