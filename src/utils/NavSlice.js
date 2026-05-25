import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
    initialState:{
        isMenuOpen:false,
        closeMiniMenu:false,
    },
    name:"navslice",
    reducers:{
        toggleMenu:(state)=>{
            state.isMenuOpen = !state.isMenuOpen;
        },
        closeMiniMenu:(state)=>{
            state.closeMiniMenu=true;
        },
        openMiniMenu:(state)=>{
            state.closeMiniMenu = false;
        }
    }
})

export const {toggleMenu,closeMiniMenu,openMiniMenu} = navSlice.actions;
export default navSlice.reducer;
