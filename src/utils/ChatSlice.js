import { createSlice } from "@reduxjs/toolkit";
import { OFFSET_LIVE_CHAT } from "./helper";

const chatSlice = createSlice({
    name:"chatSlice",
    initialState:{
        messages:[],
    },
    reducers:{
        addMessage:(state,action)=>{
        if(state.messages.length>OFFSET_LIVE_CHAT){
                state.messages.splice(0,1)
            }
            state.messages.push(action.payload)
        }
    }
})

export const {addMessage} = chatSlice.actions;
export default chatSlice.reducer;