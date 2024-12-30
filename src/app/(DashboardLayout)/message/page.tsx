"use client";
import { useEffect, useState } from "react";

import Head from "next/head";

import TopBarContent from "@/components/content/Applications/Messenger/TopBarContent";
import BottomBarContent from "@/components/content/Applications/Messenger/BottomBarContent";
import SidebarContent from "@/components/content/Applications/Messenger/SidebarContent";
import ChatContent from "@/components/content/Applications/Messenger/ChatContent";

import Scrollbar from "@/components/content/Scrollbar";

import {
  Box,
  styled,
  Divider,
  Drawer,
  IconButton,
  useTheme,
  Typography,
} from "@mui/material";
// import MessageComponent from "./Message.component";
import PageContainer from "@/components/container/PageContainer";
import DashboardCard from "@/components/shared/DashboardCard";
import { getData } from "@/services/apiService";

function ApplicationsMessenger() {
  
  const [user, setUser] = useState<any>({});
  const [allUser, setAllUser] = useState<any>([])
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("user");
      if (data) {
        try {
          setUser(JSON.parse(data));
        } catch (error) {
          console.error("Error", error);
        }
      }
    }
  }, []);

useEffect(() => {
  setIsMounted(true);
}, []);
useEffect(()=>{
    const fetDataUsers=async()=>{
      const data = await getData("/v1/user/get-all")
      setAllUser(data?.data)
    }
    fetDataUsers()
},[])
if (!isMounted) {
  return null; // or a loading spinner
}
  return (
    <Box
      sx={{
        padding: "0px",
        margin: "0",
        width: "100%",
        borderRadius: "10px",
        height: "100%",
      }}
    >
      <>
        {/* <Typography variant="h5" pb={2}>
          Message
        </Typography> */}
        {/* <MessageComponent user={user} allUser={allUser}/> */}
      </>
    </Box>
  );
}

export default ApplicationsMessenger;
