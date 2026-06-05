import {configureStore} from "@reduxjs/toolkit"
import navSlice from "./NavSlice";
import searchSlice from "./SearchSlice";
import chatSlice from "./ChatSlice";
const appStore = configureStore({
    reducer:{
       sidebarNavigation:navSlice,
       search:searchSlice,
       chat: chatSlice,
    }
})

export default appStore;