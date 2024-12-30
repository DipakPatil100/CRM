import { getData } from "@/services/apiService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/getAllUsers",
  async (thunkApi) => {
    const response = await getData("/v1/user/get-all");
    return response.data;
  }
);

console.log(fetchUsers, "FETCH USER")

const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const userSlice: any = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state:any, action: any) => {
      state.loading = false ;
      
      state.users=[...action.payload ]
    });

    builder.addCase(fetchUsers.pending, (state: any, action: any) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.rejected, (state: any, action: any) => {
      state.error = action.payload;
    });
  },
});

export const {  } = userSlice.actions;
export default userSlice.reducer;
