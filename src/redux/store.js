import { configureStore } from "@reduxjs/toolkit";
import floatSideBarReducer from "./features/floatSideBarSlice";
import floatSideBarFollowingReducer from "./features/floatSideBarFollowingSlice";
import floatSideBarGroupReducer from "./features/floatSideBarGroupSlice";


export const store = configureStore({
    reducer: {
        floatSideBar: floatSideBarReducer,
        floatSideBarFollowing: floatSideBarFollowingReducer,
        floatSideBarGroup: floatSideBarGroupReducer
    }
})