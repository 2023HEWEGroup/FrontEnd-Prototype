import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import floatSideBarReducer from "./features/floatSideBarSlice";
import floatSideBarFollowingReducer from "./features/floatSideBarFollowingSlice";
import floatSideBarGroupReducer from "./features/floatSideBarGroupSlice";
import windowScrollableReducer from "./features/windowScrollaleSlice";


export const store = configureStore({
    reducer: {
        user: userReducer,
        floatSideBar: floatSideBarReducer,
        floatSideBarFollowing: floatSideBarFollowingReducer,
        floatSideBarGroup: floatSideBarGroupReducer,
        windowScrollable: windowScrollableReducer
    }
})