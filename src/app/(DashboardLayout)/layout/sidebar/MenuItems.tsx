/* eslint-disable @next/next/no-assign-module-variable */
"use client";
import React, { useState, useEffect } from "react";
import {
  List,
  ListItemText,
  Collapse,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemButton,
  Box,
  useTheme,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import Link from "@mui/material/Link";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { IconLayoutDashboard } from "@tabler/icons-react";
import { getData } from "@/services/apiService";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchSidebarData } from "@/lib/features/Sidebar/sidebarSlice";
import Skeleton from "@mui/material/Skeleton";

// Utility function to dynamically load the Tabler icon based on the icon name
const importIcon = async (iconName: string) => {
  try {
    const module :any= await import(`@tabler/icons-react`);
    return module[iconName];
  } catch {
    return null;
  } // Return null if the icon is not found
};

const Menuitems = () => {
  // const [sidebar, setsidebar] = useState<any>([]);
  const [openMenu, setOpenMenu] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string | null>("Dashboard");
  const [iconComponents, setIconComponents] = useState<{
    [key: string]: React.ComponentType | null;
  }>({});
  const [loadingIcons, setLoadingIcons] = useState<boolean>(false); // To manage the loading state
  const pathname = usePathname();
  const router = useRouter()
  const theme = useTheme();
  const toggleMenu = (title: string) =>
    setOpenMenu((prev) => (prev === title ? "" : title));

  const handleItemClick = (itemTitle: string) => {
    setSelectedItem((prev) => (prev === itemTitle ? itemTitle : itemTitle));
  };
  const dispatch = useAppDispatch();
  const { sidebar, loading } = useAppSelector((state) => state.sidebar);

  useEffect(() => {
    dispatch(fetchSidebarData());
  }, []);

  useEffect(() => {
    const loadIcons = async () => {
      setLoadingIcons(true);
      const loadedIcons: { [key: string]: React.ComponentType | null } = {};

      const iconsToLoad = sidebar?.flatMap((section: any) =>
        section.items.map((item: any) => item.icon)
      );

      if (iconsToLoad) {
        const uniqueIconNames = Array.from(new Set(iconsToLoad));
        for (const iconName of uniqueIconNames) {
          const IconComponent: any = await importIcon(iconName as any);
          loadedIcons[iconName as any] = IconComponent;
        }
      }
      setIconComponents(loadedIcons);
      setLoadingIcons(false);
    };

    loadIcons();
  }, [sidebar]);

  useEffect(() => {
    if (
      pathname === "/" ||
      pathname.startsWith("/home") ||
      pathname === "/dashboard"
    ) {
      setSelectedItem("Dashboard");
      setOpenMenu("");
    } else {
      const foundSection = sidebar?.find((section: { items: any[] }): any =>
        section.items.some((item: any) => pathname.startsWith(item.href))
      );

      if (foundSection) {
        setOpenMenu(foundSection.title);

        const foundItem = foundSection.items.find((item: any) =>
          pathname.startsWith(item.href)
        );
        if (foundItem) {
          setSelectedItem(foundItem.title);
        }
      }
    }
  }, [pathname, sidebar]);

  return (
    <>
      <Box style={{ display: "block" }}>
        {/* {loading ? (
          <Skeleton animation="wave" width="100%" height={40}>
            <Typography>.</Typography>
          </Skeleton>
        ) : ( */}
          <ListItem
            sx={{
              cursor: "pointer",
              borderBottom: `1px solid ${theme.palette.primary?.dark}`,
              "&:hover": { color: "white", backgroundColor: "#4092359e" },
            }}
          >
            <Link
              href="/home"
              component={NextLink}
              sx={{ textDecoration: "none", display: "flex", color: "white" }}
            >
              <ListItemIcon sx={{ color: "white" }}>
                {/* Use a fallback or default icon for the Dashboard */}
                {/* {iconComponents['IconLayoutDashboard'] ? (
            React.createElement(iconComponents['IconLayoutDashboard'])
          ) : (
            <CircularProgress size={24} color="inherit" />
          )} */}
                <IconLayoutDashboard />
              </ListItemIcon>
              <ListItemText sx={{ marginLeft: "-20px" }}>
                Dashboard
              </ListItemText>
            </Link>
          </ListItem>
        {/* )} */}


        <List>
          {sidebar?.map((section: any) => (
            <Box key={section.title}>
              {loading ? (
                <Skeleton
                  sx={{ my: 5 }}
                  animation="wave"
                  width="100%"
                  height={40}
                >
                  <Typography>.</Typography>
                </Skeleton>
              ) : (
                <ListItem
                  onClick={() => toggleMenu(section.title)}
                  sx={{
                    cursor: "pointer",
                    borderBottom: `1px solid ${theme.palette.primary?.dark}`,
                    mb: 0.5,
                    "&:hover": { color: "white", backgroundColor: "#4092359e" },
                    "&.Mui-selected": {
                      color: "#ffff !important",
                      backgroundColor: "#144322",
                    },
                  }}
                >
                  <ListItemText
                    sx={{ color: "white" }}
                    primary={section.title}
                  />
                  <IconButton sx={{ color: "white" }}>
                    {openMenu === section.title ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </IconButton>
                </ListItem>
              )}

              <Collapse
                in={openMenu === section.title}
                timeout="auto"
                unmountOnExit
              >
                {section.items.map((item: any, idx: number) => {
                  const IconComponent = iconComponents[item.icon]; // Dynamically load the icon

                  return (
                    <Link
                      href={item.href}
                      component={NextLink}
                      sx={{ textDecoration: "none", display: "flex" }}
                      key={idx}
                    >
                      <ListItemButton
                        onClick={() => handleItemClick(item.title)}
                        selected={selectedItem === item.title}
                        sx={{
                          marginTop: "3px",
                          marginBottom: "3px",
                          "&:hover": {
                            color: "white",
                            backgroundColor: "#d7ff71",
                          },
                          "&.Mui-selected": {
                            backgroundColor: "#ACDD33",
                          },
                          "&.Mui-selected:hover": {
                            backgroundColor: "#ACDD33",
                          },
                        }}
                      >
                        <ListItemIcon sx={{ color: "#757C88" }}>
                          {IconComponent ? (
                            React.createElement(IconComponent)
                          ) : (
                            <CircularProgress size={24} color="inherit" />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          sx={{
                            marginLeft: "-20px",
                            color: "#757C88",
                            "&.Mui-selected": {
                              color: "#ffff !important",
                            },
                          }}
                          primary={item.title}
                        />
                      </ListItemButton>
                    </Link>
                  );
                })}
              </Collapse>
            </Box>
          ))}
        </List>
      </Box>
    </>
  );
};

export default Menuitems;
