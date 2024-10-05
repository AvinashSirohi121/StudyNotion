import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    user:null,

}

const profileSlice = createSlice({
    name:"profile",
    initialState:initalState,
    reducers:{
        setUser(state,value){
            state.user = value.payload;
        }
    }
})

export const {setUser} = profileSlice.actions;
export default profileSlice.reducer;