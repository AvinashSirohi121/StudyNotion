import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    signupData:null,
    loading:false,
    token:localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,

}

const authSlice = createSlice({
    name:"auth",
    initialState:initalState,
    reducers:{
        setToken(state,value){
            state.token = value.payload;
        },
        setLoading(state,value){
            state.loading= value.payload
        },
        setSignUpData(state,value){
            state.signupData= value.payload
        }
    }
})

export const {setToken,setLoading,setSignUpData} = authSlice.actions;
export default authSlice.reducer;