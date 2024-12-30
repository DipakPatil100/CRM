import { AppBar, Avatar, Box, IconButton, Toolbar } from "@mui/material";
import Image from "next/image";
import React from "react";
function UserProfile({ userData }: any) {
  const imageStyle = {
    borderRadius: "50%",
    border: "1px solid #fff",
  };
  console.log("---profileeee", userData);
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ position: "relative", top: 50 }}>
            <IconButton>
              <Image
                style={imageStyle}
                // sx={{ width: "140px", height: "140px" }}
                alt="Profile Avatar"
                src={userData?.sub?.userPhoto}
                width={150}
                height={150}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default UserProfile;
