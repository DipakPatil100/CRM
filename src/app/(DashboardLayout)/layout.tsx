"use client";
import {
  styled,
  Container,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Popover,
  Radio,
  RadioGroup,
  Tooltip,
  useColorScheme,
  Stack,
  TextField,
  Typography,
  Skeleton,
} from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import Header from "@/app/(DashboardLayout)/layout/header/Header";
// import Sidebar from "@/app/(DashboardLayout)/layout/sidebar/Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { SnackbarProvider } from "notistack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import {
  AppProvider,
  Navigation,
  Router,
  type Session,
} from "@toolpad/core/AppProvider";
import { extendTheme } from "@mui/material/styles";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { fetchSidebarData } from "@/lib/features/Sidebar/sidebarSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Profile from "./layout/header/Profile";
import SidebarFooter from "@/components/Footer/Footer";
import ToolbarActionsSearch from "./layout/header/ToolbarActionSearch";
import CustomThemeSwitcher from "@/utils/theme/ThemeSwicher";
import * as MuiIcons from "@mui/icons-material";
import Notification from "./layout/header/Notification";
import DashboardSkeleton from "./layout/dashboardSkeleton";
import SkeletonDashboard from "./layout/dashboardSkeleton";

import {
  IconCalendarUser,
  IconUserFilled,
  IconListDetails,
  IconBuildingEstate,
  IconReportAnalytics,
  IconCloudLock,
  IconSignalG,
  IconMessage,
  IconSettings,
  IconCalendarFilled,
} from "@tabler/icons-react";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "home",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "admin",
    title: "User Management",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "user-creation",
        title: "User Creation",
        icon: <DescriptionIcon />,
      },
      {
        segment: "users",
        title: "User List",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "admin",
    title: "Leads Management",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "lead-creation",
        title: "Lead Creation",
        icon: <BarChartIcon />,
      },
      {
        segment: "lead-listing",
        title: "Lead List",
        icon: <BarChartIcon />,
      },
    ],
  },
  {
    segment: "admin",
    title: "Property Management",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "propertyManagement",
        title: "Property Creation",
        icon: <BarChartIcon />,
      },
      {
        segment: "propertyListing",
        title: "Property List",
        icon: <BarChartIcon />,
      },
    ],
  },
  {
    segment: "admin",
    title: "Post Sales",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "unitBooking",
        title: "Unit Booking",
        icon: <BarChartIcon />,
      },
    ],
  },
  {
    segment: "masters",
    title: "Master Data Management",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "properties",
        title: "Properties",
        icon: <BarChartIcon />,
      },
      {
        segment: "leadStatusMaster",
        title: "Lead Status",
        icon: <BarChartIcon />,
      },
    ],
  },
  {
    segment: "general",
    title: "General",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "message",
        title: "Message",
        icon: <BarChartIcon />,
      },
      {
        segment: "setting",
        title: "Settings",
        icon: <BarChartIcon />,
      },
    ],
  },
];

const sidebarNew: any = [
  {
    _id: "674ff3446d2168e5301e9a55",
    id: 1,
    kind: "header",
    title: "Main items",
  },
  {
    _id: "674ff3446d2168e5301e9a56",
    id: 2,
    kind: "segment",
    title: "Dashboard",
    icon: <DashboardIcon />,
    segment: "home",
  },
  {
    _id: "674ff3446d2168e5301e9a57",
    id: 3,
    kind: "divider",
    title: "",
  },
  {
    _id: "674ff3446d2168e5301e9a58",
    id: 4,
    kind: "header",
    title: "Analytics",
  },
  {
    _id: "674ff3446d2168e5301e9a59",
    id: 5,
    kind: "segment",
    title: "User Managemnt",
    icon: <IconUserFilled />,
    segment: "admin",
    children: [
      // {
      //   _id: "674ff3446d2168e5301e9a5a",
      //   id: 6,
      //   kind: "children",
      //   title: "User Creation",
      //   icon: <DashboardIcon />,
      //   segment: "user-creation",
      // },
      {
        _id: "674ff3446d2168e5301e9a5b",
        id: 7,
        kind: "children",
        title: "User List",
        icon: <IconListDetails />,
        segment: "users",
      },
    ],
  },
  {
    _id: "674ff3446d2168e5301e9a5c",
    id: 8,
    kind: "segment",
    title: "Leads",
    icon: <IconCalendarUser />,
    segment: "admin",
    children: [
      // {
      //   _id: "674ff3446d2168e5301e9a5d",
      //   id: 9,
      //   kind: "children",
      //   title: "Lead Creation",
      //   icon: <DashboardIcon />,
      //   segment: "lead-creation",
      // },
      {
        _id: "674ff3446d2168e5301e9a5e",
        id: 10,
        kind: "children",
        title: "Lead List",
        icon: <IconListDetails />,
        segment: "lead-listing",
      },
    ],
  },
  {
    _id: "674ff3446d2168e5301e9a5f",
    id: 11,
    kind: "segment",
    title: "Property Management",
    icon: <IconBuildingEstate />,
    segment: "admin",
    children: [
      // {
      //   _id: "674ff3446d2168e5301e9a60",
      //   id: 12,
      //   kind: "children",
      //   title: "Property Creation",
      //   icon: <DashboardIcon />,
      //   segment: "propertyManagement",
      // },
      {
        _id: "674ff3446d2168e5301e9a61",
        id: 13,
        kind: "children",
        title: "Property List",
        icon: <IconListDetails />,
        segment: "propertyListing",
      },
    ],
  },
  {
    _id: "674ff3446d2168e5301e9a62",
    id: 14,
    kind: "segment",
    title: "Post Sales",
    icon: <IconReportAnalytics />,
    segment: "admin",
    children: [
      {
        _id: "674ff3446d2168e5301e9a63",
        id: 15,
        kind: "children",
        title: "Unit Booking",
        icon: <DashboardIcon />,
        segment: "unitBooking",
      },
      {
        _id: "674ff3446d2168e5301e9a63",
        id: 15,
        kind: "children",
        title: "Booking List",
        icon: <IconListDetails />,
        segment: "bookingList",
      },
    ],
  },
  {
    _id: "674ff3446d2168e5301e9a64",
    id: 16,
    kind: "segment",
    title: "Master Data Management",
    icon: <IconCloudLock />,
    segment: "masters",
    children: [
      {
        _id: "674ff3446d2168e5301e9a65",
        id: 17,
        kind: "children",
        title: "Properties",
        icon: <IconBuildingEstate />,
        segment: "properties",
      },
      {
        _id: "674ff3446d2168e5301e9a66",
        id: 18,
        kind: "children",
        title: "Lead Status",
        icon: <IconCalendarUser />,
        segment: "leadStatusMaster",
      },
    ],
  },
  {
    _id: "674ff3446d2168e5301e9a67",
    id: 19,
    kind: "segment",
    title: "General",
    icon: <IconSignalG />,
    segment: "general",
    children: [
      {
        _id: "674ff3446d2168e5301e9a68",
        id: 20,
        kind: "children",
        title: "Message",
        icon: <IconMessage />,
        segment: "message",
      },
      {
        _id: "674ff3446d2168e5301e9a69",
        id: 21,
        kind: "children",
        title: "Settings",
        icon: <IconSettings />,
        segment: "setting",
      },
    ],
  },
  {
    _id: "674ff3446d2168e5301e9a56",
    id: 2,
    kind: "segment",
    title: "Calender",
    icon: <IconCalendarFilled />,
    segment: "calender",
  },
];

const activeItemStyle = {
  backgroundColor: "#1976d2", // Active item background color
  color: "#fff", // Active item text color
  borderRadius: "4px",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const demoWindow = undefined;

  const dispatch = useAppDispatch();
  const { sidebar, loading } = useAppSelector((state) => state.sidebar);

  const ToolbarActions = () => (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      <ToolbarActionsSearch />
      <Profile />
      <Stack spacing={1} direction="row" alignItems="center">
        <Notification />
      </Stack>
      <CustomThemeSwitcher />
    </Box>
  );

  const pathname = usePathname();
  const router = useRouter();
  const [updatedSidebar, setUpdatedSidebar] = useState([]);

  const importTablerIcon = async (iconName: string) => {
    try {
      const module: any = await import(`@tabler/icons-react`);
      return module[iconName] || null;
    } catch (error) {
      console.warn(`Icon ${iconName} not found in Tabler Icons.`);
      return null;
    }
  };

  const transformSidebarData = async (items: any[]) => {
    const promises = items.map(async (item) => {
      let updatedItem = { ...item };

      if (item.children && item.children.length === 0) {
        const { children, ...rest } = item;
        updatedItem = rest;
      }

      if (item.icon) {
        const iconName = item.icon; // Icon name from the API
        const IconComponent = await importTablerIcon(iconName);

        if (IconComponent) {
          updatedItem.icon = <IconComponent />; // Set as React node
        } else {
          updatedItem.icon = null; // Fallback if the icon is not found
        }
      }

      if (item.children && item.children.length > 0) {
        updatedItem.children = await transformSidebarData(item.children);
      }

      return updatedItem;
    });

    return Promise.all(promises);
  };

  useEffect(() => {
    if (sidebar && sidebar.length > 0) {
      transformSidebarData(sidebar).then(setUpdatedSidebar as any);
    }
  }, [sidebar]);

  useEffect(() => {
    dispatch(fetchSidebarData());
  }, []);

  console.log(updatedSidebar, "updatedSidebar");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {path === "/" ||
      path === "/register" ||
      path === "/forget-password" ||
      path === "/changePassword" ? (
        <Box sx={{ width: "auto", height: "100vh" }}>
          <ThemeProvider theme={baselightTheme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </Box>
      ) : (
        <ThemeProvider theme={baselightTheme}>
          <CssBaseline />

          {loading ? (
            <SkeletonDashboard />
          ) : (
            <AppProvider
              navigation={sidebarNew}
              branding={{
                title: "Real Estate CRM",
              }}
              router={{ pathname: path, navigate: router.push } as any}
              theme={baselightTheme}
            >
              <DashboardLayout
                slots={{
                  toolbarActions: ToolbarActions,
                  sidebarFooter: SidebarFooter,
                }}
              >
                {/* <PageContainer> */}
                <Box
                  sx={pathname === "/general/setting" ? {} : { mx: 2, my: 2 }}
                >
                  {children}
                </Box>
                {/* </PageContainer> */}
              </DashboardLayout>
            </AppProvider>
          )}
        </ThemeProvider>
      )}
    </LocalizationProvider>
  );
}
