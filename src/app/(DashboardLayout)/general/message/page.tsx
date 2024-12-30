"use client";

import {
  Box,
  styled,
  Divider,
  Drawer,
  IconButton,
  useTheme,
  Typography,
} from "@mui/material";
import MessageComponent from "./Message.component";

function ApplicationsMessenger() {
  return (
    <Box
      sx={
        {
          // padding: "0px",
          // margin: "0",
          // width: "100%",
          // borderRadius: "10px",
          // height: "100%",
        }
      }
    >
      <MessageComponent />
    </Box>
  );
}

export default ApplicationsMessenger;
