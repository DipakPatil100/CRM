import { getData } from "@/services/apiService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const fetchLead = createAsyncThunk(
  "users/getAllLeads",
  async (thunkApi) => {
    const response = await getData("/v1/getLead/getUserData");
    return response.data;
  }
);

const initialState = {
  leads: [],
  loading: false,
  error: null,
};

export const leadSlice: any = createSlice({
  name: "leads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLead.fulfilled, (state:any, action: any) => {
      state.loading = false ;
      
      // state.users.push(...action.payload);
      state.leads=[...action.payload ]
    });

    builder.addCase(fetchLead.pending, (state: any, action: any) => {
      state.loading = true;
    });
    builder.addCase(fetchLead.rejected, (state: any, action: any) => {
      state.error = action.payload;
    });
  },
});


export const {  } = leadSlice.actions;
export default leadSlice.reducer;
