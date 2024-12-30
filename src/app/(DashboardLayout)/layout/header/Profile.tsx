"use client";

import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Menu,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import { FiLogOut } from "react-icons/fi";
import { FiUnlock } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  IconUser,
  IconUserPentagon,
  IconLockOpen,
  IconLogout2,
} from "@tabler/icons-react";
import Link from "next/link";
import "./header.css";
import { cookies } from "next/headers";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [getUser, setUser] = useState<any>({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") as any);
    setUser(user);
  }, []);

  console.log(getUser, "USER GET");

  const userName = getUser?.sub?.userName;

  const router = useRouter();

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const handleLogout = () => {
    Cookies.remove("token"); // Remove the token cookie using js-cookie
    localStorage.removeItem("user"); // Remove the user from localStorage
    router.push("/"); // Redirect to home page
  };
  return (
    <Box>
      <IconButton
        size="small"
        aria-label="show 11 new notifications"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          m: "0 15px",
        }}
        onClick={handleClick2}
      >
        <IconUser />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Box my={1} mx={2} mb={2}>
          <Typography
            variant="body2"
            fontWeight={"bold"}
            fontSize={"14px"}
          >{`👋 Hey, ${userName}`}</Typography>
        </Box>

        <Divider />
        <MenuItem sx={{ mt: 1.5, mb: 0.5 }}>
          <ListItemIcon>
            <IconUserPentagon width={20} />{" "}
          </ListItemIcon>

          <ListItemText onClick={() => router.push("/admin/profile-page")}>
            {" "}
            Profile{" "}
          </ListItemText>
        </MenuItem>
        <MenuItem sx={{ my: 0.5 }}>
          <ListItemIcon>
            <IconLockOpen width={20} />{" "}
          </ListItemIcon>

          <ListItemText onClick={() => router.push("/changePassword")}>
            {" "}
            Change Password{" "}
          </ListItemText>
        </MenuItem>
        <MenuItem sx={{ my: 0.5 }}>
          <ListItemIcon>
            <IconLogout2 width={20} />
          </ListItemIcon>
          <ListItemText onClick={handleLogout}>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Profile;
