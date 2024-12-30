import { useState, ChangeEvent, useEffect } from "react";
import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  Tabs,
  Tab,
  TextField,
  IconButton,
  InputAdornment,
  Avatar,
  List,
  Button,
  Tooltip,
  Divider,
  AvatarGroup,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  lighten,
  styled,
  Badge,
  BadgeProps,
} from "@mui/material";
import { formatDistance, subMinutes, subHours } from "date-fns";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import Label from "../../Label";
import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone";
import AlarmTwoToneIcon from "@mui/icons-material/AlarmTwoTone";
import Link from "next/link";
import { StyledBadge } from "./StyledBadge";

const AvatarSuccess = styled(Avatar)(
  ({ theme }: any) => `
        
          margin-left: auto;
          margin-right: auto;
    `
);

const MeetingBox = styled(Box)(
  ({ theme }: any) => `
        
    `
);

const RootWrapper = styled(Box)(
  ({ theme }: any) => `
    height: "100vh";
    padding: 15px;
    color: #fff;

  `
);

const ListItemWrapper = styled(ListItemButton)(
  ({ theme }: any) => `
        &.MuiButtonBase-root {
         border-radius:15px;
         margin: 10px 0;
            color: #fff;

        }
         &:hover {
            background-color: #f7f8f8;
         }
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

const StyledBadge1 = styled(Badge)<BadgeProps>(({ theme }: any) => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 0,
    padding: "0 9px",
    backgroundColor: "#adde34",
    color: "#022213",
  },
}));

function SidebarContent({ user, allUser }: any) {
  const users = {
    name: "Catherine Pike ussss",
    avatar: "/static/images/avatars/1.jpg",
    jobtitle: "Software Developer",
  };

  const [state, setState] = useState({
    invisible: true,
  });
  const [isMounted, setIsMounted] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>("all");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a loading spinner
  }

  const handleChange = (event: any) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const tabs = [
    { value: "all", label: "All" },
    { value: "unread", label: "Unread" },
    { value: "archived", label: "Archived" },
  ];

  const handleTabsChange = (
    _event: React.ChangeEvent<unknown>,
    value: string
  ): void => {
    setCurrentTab(value);
  };
  console.log(allUser, "user");
  return (
    <RootWrapper>
      <Box display="flex" alignItems="flex-start">
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt={user?.sub.userName} src={user?.sub.userPhoto} />
        </StyledBadge>

        <Box
          sx={{
            // ml: 1.5,
            flex: 1,
          }}
        >
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Box>
              <Typography color="#000" variant="h5" noWrap>
                {user?.sub.userName}
              </Typography>
              <Typography color="#000" variant="subtitle1" noWrap>
                {user?.sub.designationName}
              </Typography>
            </Box>
            <IconButton
              sx={{
                p: 1,
              }}
              size="small"
              color="primary"
            >
              <SettingsTwoToneIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* <FormControlLabel
          control={
            <Switch
              checked={state.invisible}
              onChange={handleChange}
              name="invisible"
              color="primary"
            />
          }
          label="Invisible"
        /> */}
        </Box>
      </Box>

      <TextField
        sx={{
          mt: 2,
          mb: 1,
          color: "black",
          borderRadius: "5px",
          "& .MuiInputBase-input::placeholder": {
            color: "black",
          },
        }}
        size="small"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchTwoToneIcon sx={{ color: "#000" }} />
            </InputAdornment>
          ),
        }}
        placeholder="Search..."
      />

      <Typography
        sx={{
          mb: 1,
        }}
        variant="h3"
        color="#000"
      >
        Chats
      </Typography>

      <TabsContainerWrapper>
        <Tabs
          onChange={handleTabsChange}
          value={currentTab}
          variant="scrollable"
          // scrollButtons="auto"
          textColor="inherit"
          indicatorColor="primary"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              label={<Typography color="primary">{tab.label}</Typography>}
              value={tab.value}
            />
          ))}
        </Tabs>
      </TabsContainerWrapper>

      <Box mt={2}>
        {currentTab === "all" && (
          <List disablePadding component="div">
            {allUser &&
              allUser?.map((user: any, idx: number) => {
                return (
                  <ListItemWrapper selected key={idx}>
                    <ListItemAvatar>
                      <Avatar src={user?.userPhoto} />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{
                        mr: 1,
                      }}
                      primaryTypographyProps={{
                        color: "#000",
                        variant: "h5",
                        noWrap: true,
                      }}
                      secondaryTypographyProps={{
                        color: "grey",
                        noWrap: true,
                      }}
                      primary={user?.userName}
                      secondary="Hey there, how are you today? Is it ok if I call you?"
                    />
                    <Label>
                      <StyledBadge1 badgeContent={2}></StyledBadge1>
                    </Label>
                  </ListItemWrapper>
                );
              })}

            {/* <ListItemWrapper>
            <ListItemAvatar>
              <Avatar src="/static/images/avatars/2.jpg" />
            </ListItemAvatar>
            <ListItemText
              sx={{
                mr: 1,
              }}
              primaryTypographyProps={{
                color: "#000",
                variant: "h5",
                noWrap: true,
              }}
              secondaryTypographyProps={{
                color: "grey",
                noWrap: true,
              }}
              primary="Kierra Herwitz"
              secondary="Hi! Did you manage to send me those documents"
            />
          </ListItemWrapper>
          <ListItemWrapper>
            <ListItemAvatar>
              <Avatar src="/static/images/avatars/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              sx={{
                mr: 1,
              }}
              primaryTypographyProps={{
                color: "#000",
                variant: "h5",
                noWrap: true,
              }}
              secondaryTypographyProps={{
                color: "grey",
                noWrap: true,
              }}
              primary="Craig Vaccaro"
              secondary="Ola, I still haven't received the program schedule"
            />
          </ListItemWrapper>
          <ListItemWrapper>
            <ListItemAvatar>
              <Avatar src="/static/images/avatars/4.jpg" />
            </ListItemAvatar>
            <ListItemText
              sx={{
                mr: 1,
              }}
              primaryTypographyProps={{
                color: "#000",
                variant: "h5",
                noWrap: true,
              }}
              secondaryTypographyProps={{
                color: "grey",
                noWrap: true,
              }}
              primary="Adison Press"
              secondary="I recently did some buying on Amazon and now I'm stuck"
            />
            <Label color="primary">
              <StyledBadge1 badgeContent={8}></StyledBadge1>
            </Label>
          </ListItemWrapper> */}
          </List>
        )}
        {currentTab === "unread" && (
          <List disablePadding component="div">
            <ListItemWrapper>
              <ListItemAvatar>
                <Avatar src="/static/images/avatars/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  mr: 1,
                }}
                primaryTypographyProps={{
                  color: "#000",
                  variant: "h5",
                  noWrap: true,
                }}
                secondaryTypographyProps={{
                  color: "grey",
                  noWrap: true,
                }}
                primary="Zain Baptista"
                secondary="Hey there, how are you today? Is it ok if I call you?"
              />
              <Label>
                <StyledBadge1 badgeContent={2}></StyledBadge1>
              </Label>
            </ListItemWrapper>
            <ListItemWrapper>
              <ListItemAvatar>
                <Avatar src="/static/images/avatars/4.jpg" />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  mr: 1,
                }}
                primaryTypographyProps={{
                  color: "#000",
                  variant: "h5",
                  noWrap: true,
                }}
                secondaryTypographyProps={{
                  color: "grey",
                  noWrap: true,
                }}
                primary="Adison Press"
                secondary="I recently did some buying on Amazon and now I'm stuck"
              />
              <Label color="primary">
                <StyledBadge1 badgeContent={8}></StyledBadge1>
              </Label>
            </ListItemWrapper>
          </List>
        )}
        {currentTab === "archived" && (
          <Box pb={3}>
            <Divider
              sx={{
                mb: 3,
              }}
            />
            <AvatarSuccess>
              <CheckTwoToneIcon />
            </AvatarSuccess>
            <Typography
              sx={{
                mt: 2,
                textAlign: "center",
              }}
              variant="subtitle2"
              color="primary.light"
            >
              Hurray! There are no archived chats!
            </Typography>
            <Divider
              sx={{
                mt: 3,
              }}
            />
          </Box>
        )}
      </Box>
    </RootWrapper>
  );
}

export default SidebarContent;
