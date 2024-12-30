// import parseJwt, { getCookies } from "@/api/axios/getCookies";
import { getData } from "@/services/apiService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
// import { loginUser } from "@/services/loginService";

// // const loginUser = createAsyncThunk("login/user",async (url, payload)=>{
// //   const response = await loginUser(url, payload);
// // })

const initialState = {
  user:{},
  loading: false,
  error: null,
};


// const token = getCookies()

// const tokenData = parseJwt(token)

// console.log(tokenData, "TOKEn")
export const getLoginUserSlice: any = createSlice({
  name: "user",
  initialState,
  reducers: {
    getLoggedInUser : (state, action)=>{
      state.user = {...action.payload}
    }
  },
});

// export const {  } = getLoginUserSlice.actions;
// export default getLoginUserSlice.reducer;
