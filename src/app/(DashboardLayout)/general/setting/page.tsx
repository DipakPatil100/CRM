"use client";
import SidebarContent from "@/components/content/Applications/Messenger/SidebarContent";
import Scrollbar from "@/components/content/Scrollbar";
import DashboardCard from "@/components/shared/DashboardCard";
import user from "@/lib/features/Users/user";
import {
  Box,
  Container,
  Divider,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import {
  IconUserCog,
  IconUsers,
  IconBrandLaravel,
  IconUsersGroup,
} from "@tabler/icons-react";
import Image from "next/image";
import ManageRoles from "@/components/Masters/ManageRoles";
import UsersList from "../../admin/reports/Reports";
import UserTable from "../../admin/users/UserTable";

const RootWrapper = styled(Box)(
  ({ theme }: any) => `
         display: flex;
         flex-direction:column;
         justify-content: center;
         padding: 0px;
  `
);

const ChatWindow = styled(Box)(
  () => `
         
  `
);

const ChatTopBar = styled(Box)(
  ({ theme }: any) => `
          color: #000;
          align-items: center;
          width:100%;
  `
);
const TabsContainerWrapper = styled(Box)(
  ({ theme }: any) => `
            background-color: #f3f4f5;
            border-radius: 10px;

        .MuiTabs-indicator {
            min-height: 2px;
            height: 2px;
            border-radius: 35px;
            box-shadow: none;
            border: 0;
            background: none;
        }

        .MuiTab-root {

            &.MuiButtonBase-root {
                padding: 0;
                .MuiTouchRipple-root {
                    display: none;
                }
            }

            &.Mui-selected:hover{

            },
            &.Mui-selected {
              // margin: 8px 0px;
              // margin-left: 1px;
              border-radius: 10px; 
              background-color: #fff;

            }
        }
  `
);

const settingSideItems = [
  {
    icon: <IconUserCog />,
    href: "",
    title: "Role",
  },
  {
    icon: <IconUsers />,
    href: "",
    title: "Users",
  },
  {
    icon: <IconBrandLaravel />,
    href: "",
    title: "Modules",
  },
  {
    icon: <IconUsersGroup />,
    href: "",
    title: "Groups",
  },
];

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  backgroundColor: "#f6f6f6",

  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "black",
  },
});
interface StyledTabProps {
  label: any;
}
const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: "bold",
  fontSize: "15px",
  marginRight: 1,
  color: "rgba(255, 255, 255, 0.7)",
  "&.Mui-selected": {
    color: "#fff",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(26, 77, 4, 0.43)",
  },
}));

const Settings = () => {
  const [nav, setNav] = useState<any>({
    id: "",
    name: "",
  });
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  console.log(value, "VALUE");

  return (
    <Box sx={{ height: "100%" }}>
      <ChatTopBar
        sx={{
          display: { xs: "flex", lg: "inline-block" },
        }}
      >
        <Box>
          <Box
            display="flex"
            alignItems="start"
            justifyContent={"start"}
            my={2}
            ml={2}
            textAlign={"left"}
          >
            <Typography variant="h5">Admin Configurations</Typography>
          </Box>
        </Box>
      </ChatTopBar>
      <RootWrapper className="">
        {/* <Scrollbar> */}
        <RootWrapper>
          <Box width={"100%"}>
            {/* <Divider /> */}
            <Box>
              <StyledTabs
                value={value}
                onChange={handleChange}
                aria-label="styled tabs example"
              >
                {settingSideItems.map((item: any, i: number) => {
                  return (
                    <StyledTab
                      label={
                        <Typography
                          variant="body2"
                          fontWeight={"bold"}
                          fontSize={"13px"}
                        >
                          {item.title}
                        </Typography>
                      }
                    />
                  );
                })}
              </StyledTabs>
            </Box>
          </Box>
        </RootWrapper>

        <ChatWindow>
          <Box>
            {/* <Scrollbar> */}
            {value === 0 ? (
              <ManageRoles />
            ) : value === 1 ? (
              <Box my={4
                
              } mx={2}>
                <UserTable />
              </Box>
            ) : value === 2 ? (
              <>2</>
            ) : value === 3 ? (
              <>3</>
            ) : null}
            {/* </Scrollbar> */}
          </Box>
        </ChatWindow>
      </RootWrapper>
    </Box>
  );
};

export default Settings;
