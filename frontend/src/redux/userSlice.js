import { createSlice } from "@reduxjs/toolkit";


const initialState =  { 

    
BPLcardNumber :"",
firstName :"",
lastName :"",
_id : ""

}


export const userSlice = createSlice({
  name: "user" ,
  initialState ,
  reducers : {
    loginRedux : (state,action)=>{
        console.log(action.payload.data)
       // state.user = action.payload.data
       state._id = action.payload.data._id;
       state.firstName = action.payload.data.firstName;
       state.lastName = action.payload.data.lastName;
       state.BPLcardNumber = action.payload.data.BPLcardNumber;
    },
    logoutRedux : (state,action)=>{
      state._id = "";
       state.firstName = "";
       state.lastName = "";
       state.BPLcardNumber = "";

    }
  }
  

})

export const { loginRedux , logoutRedux} = userSlice.actions;

export default userSlice.reducer