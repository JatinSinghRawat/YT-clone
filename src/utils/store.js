import {configureStore} from "@reduxjs/toolkit"
import navSlice from "./NavSlice";

const appStore = configureStore({
    reducer:{
       sidebarNavigation:navSlice,
    }
})

export default appStore;