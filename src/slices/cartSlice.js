import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast"

const initalState = {
   totalItems : localStorage.getItem("totalItems") ?
    JSON.parse(localStorage.getItem("totalItems")) :9,

   total:localStorage.getItem("total") ? 
   JSON.parse(localStorage.getItem('total')) :0,

   cart:localStorage.getItem('cart') ?
   JSON.parse(localStorage.getItem('cart')) :[]

}

const cartSlice = createSlice({
    name:"cart",
    initialState:initalState,
    reducers:{
        addToCart:(state,action)=>{
            const course = action.payload
            const index = state.cart.findIndex((item)=>item._id === course._id)

            if(index>=0){
                // If the course already in the Cart , do not modify the quantity 
                toast.error("Course already in Cart");
                return;
            }
            // if course is not in the cart add it to the cart
            state.cart.push(course);
            // update the totalQuantity and price
            state.totalItems++;
            state.total += course.price

            // update to the localStorage
            localStorage.setItem("cart",JSON.stringify(state.cart))
            localStorage.setItem("total",JSON.stringify(state.total))
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems))

            toast.success("Course Added to cart");
        },
        removeFromCart:(state,action)=>{
            const course = action.payload;
            const index = state.cart.findIndex((item) =>item._id === course._id)

            if(index >=0){
                // If course found in the cart , remove it
                state.totalItems --;
                state.total -=state.cart[index].price

                state.cart.splice(index, 1)
                // Update to localstorage
                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("total", JSON.stringify(state.total))
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
                // show toast
                toast.success("Course removed from cart")
            }
        },
        resetCart: (state) => {
          state.cart = []
          state.total = 0
          state.totalItems = 0
          // Update to localstorage
          localStorage.removeItem("cart")
          localStorage.removeItem("total")
          localStorage.removeItem("totalItems")
        },
    }
})

export const {addToCart,removeFromCart,resetCart} = cartSlice.actions;
export default cartSlice.reducer;