import { getData } from "@/services/apiService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";


export const fetchSidebarData = createAsyncThunk(
  "users/sidebar-menu",
  async (thunkApi) => {
    const response = await getData("/v1/sidebar-menu/get-menu");
    return response.data;
  }
);

const initialState = {
  sidebar: [],
  loading: false,
  error: null,
};

export const sidebarSlice: any = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSidebarData.fulfilled, (state:any, action: any) => {
      state.loading = false ;
      state.sidebar=[...action.payload ]
    });

    builder.addCase(fetchSidebarData.pending, (state: any, action: any) => {
      state.loading = true;
    });
    builder.addCase(fetchSidebarData.rejected, (state: any, action: any) => {
      state.error = action.payload;
    });
  },
});

export const {  } = sidebarSlice.actions;
export default sidebarSlice.reducer;
