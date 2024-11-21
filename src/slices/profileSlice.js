import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    user:null,
    loading: false,
}

const profileSlice = createSlice({
    name:"profile",
    initialState:initalState,
    reducers:{
        setUser(state,value){
            state.user = value.payload;
        },
        setLoading(state, value) {
          state.loading = value.payload
        },
    }
})

export const {setUser, setLoading} = profileSlice.actions;
export default profileSlice.reducer;