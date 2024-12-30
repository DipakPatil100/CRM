import { getData } from "@/services/apiService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const fetchProperties = createAsyncThunk(
  "users/getProperty",
  async (thunkApi) => {
    const response = await getData("/v1/property/getall");
    return response.data;
  }
);

const initialState = {
    properties: [],
    loading: false,
    error: null,
};

export const propertySlice: any = createSlice({
  name: "properties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProperties.fulfilled, (state:any, action: any) => {
      state.loading = false ;
      state.properties = [...action.payload ]
    });

    builder.addCase(fetchProperties.pending, (state: any, action: any) => {
      state.loading = true;
    });
    builder.addCase(fetchProperties.rejected, (state: any, action: any) => {
      state.error = action.payload;
    });
  },
});


export const {  } = propertySlice.actions;
export default propertySlice.reducer;
