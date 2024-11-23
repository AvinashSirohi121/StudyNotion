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
        
        setToken(state,action){
            state.token = action.payload;
        },
        setLoading(state,action){
            //console.log("Inside setLoading , state =>",state," Action =>",action)
            state.loading= action.payload
        },
        setSignUpData(state,action){
            state.signupData= action.payload
        }
    }
})

export const {setToken,setLoading,setSignUpData} = authSlice.actions;
export default authSlice.reducer;