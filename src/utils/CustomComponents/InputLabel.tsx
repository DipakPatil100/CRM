import { InputLabel } from "@mui/material";

export const CustomInputLabel = ({ children, reqiredField }: any) => (
  <InputLabel sx={{ fontSize: "12px", mb: 1, mt:1 }}>
    {children} {reqiredField ? <span style={{ color: "red" }}>*</span> : ""}
  </InputLabel>
);
