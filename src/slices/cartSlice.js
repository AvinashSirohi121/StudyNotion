import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast"

const initalState = {
   totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) :8,


}

const cartSlice = createSlice({
    name:"cart",
    initialState:initalState,
    reducers:{
        setTotalItems(state,value){
            state.totalItems = value.payload;
        },
        // addToCart
        //removeFromCart
        // resetCart
    }
})

export const {setTotalItems} = cartSlice.actions;
export default cartSlice.reducer;