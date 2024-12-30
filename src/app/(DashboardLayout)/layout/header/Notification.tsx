"use client";

import React, { useState } from "react";
import {
    Avatar,
    Box,
    Menu,
    IconButton,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Badge,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    Stack,

} from "@mui/material";
import { FiLogOut } from "react-icons/fi";
import { FiUnlock } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { IconBellRinging, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import CampaignIcon from '@mui/icons-material/Campaign';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';


const items = {
    leads: [
        {
            createdAt: "11/6/2024",
            title: "Title Of Lead Creation1",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, sit architecto vitae ratione illum nemo maxime perspiciatis aperiam temporibus dolorum!",
            read: false
        },
        {
            createdAt: "11/6/2024",
            title: "Title Of Lead Creation1",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, sit architecto vitae ratione illum nemo maxime perspiciatis aperiam temporibus dolorum!",
            read: false
        },
        {
            createdAt: "11/6/2024",
            title: "Title Of Lead Creation1",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, sit architecto vitae ratione illum nemo maxime perspiciatis aperiam temporibus dolorum!",
            read: true
        },
        {
            createdAt: "11/6/2024",
            title: "Title Of Lead Creation1",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, sit architecto vitae ratione illum nemo maxime perspiciatis aperiam temporibus dolorum!",
            read: true
        },
        {
            createdAt: "11/6/2024",
            title: "Title Of Lead Creation1",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, sit architecto vitae ratione illum nemo maxime perspiciatis aperiam temporibus dolorum!",
            read: true
        },
    ],
    messages: [
        {
            user: {
                userName: "Rishabh"
            },
            message: "Hello, How Are you!",
            createdAt: "11/6/2024"

        },
        {
            user: {
                userName: "Ravi"
            },
            message: "Hey, How you Are Doing",
            createdAt: "10/6/2024"

        },
        {
            user: {
                userName: "Rajat"
            },
            message: "Hey, we Need to Talk",
            createdAt: "10/6/2024"

        },
    ],
    announcement: [{
        title: "We Are Making a big Announement",
        description: "We are Here Making the Big Announce that We Are going to Launch a New Fucking Product",
        category: "Company",
        createdAt: "11/6/2024"
    }]
}

const Notification = () => {
    const [anchorEl2, setAnchorEl2] = useState(null);

    const router = useRouter();

    const handleClick2 = (event: any) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const [notificatoinType, setNotificatoinType] = useState("All")
    return (
        <Box>
            <IconButton
                size="large"
                aria-label="show 11 new notifications"
                color="inherit"
                aria-controls="msgs-menu"
                aria-haspopup="true"
                onClick={handleClick2}
            >
                <Badge variant="dot" color="primary">
                    <IconBellRinging size="21" stroke="1.5" />
                </Badge>

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
                sx={{
                    "& .MuiMenu-paper": {
                        width: "400px",
                        color: "#131121",
                    },
                    
                }}
            >
                <Box height={400} paddingY={1}  >
                    <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                        <Typography paddingX={2} variant="h5" component="h2">
                            Notification
                        </Typography>
                        <Link href={"/notifications"} style={{ textDecoration: "none" }}>
                            <Typography paddingX={2} variant="body2" color="blue">
                                View All
                            </Typography>
                        </Link>
                    </Box>
                    <Box width={"100%"} paddingTop={1}  >
                        <Box display={"flex"}>
                            <MenuItem onClick={() => { setNotificatoinType("All") }} sx={{ borderBottom: notificatoinType == "All" ? "3px solid #397868" : "", margin: "0px 10px" }}>All</MenuItem>
                            <MenuItem onClick={() => { setNotificatoinType("Unread") }} sx={{ borderBottom: notificatoinType == "Unread" ? "3px solid #397868" : "", margin: "0px 10px" }}>Unread</MenuItem>
                            <MenuItem onClick={() => { setNotificatoinType("Read") }} sx={{ borderBottom: notificatoinType == "Read" ? "3px solid #397868" : "", margin: "0px 10px" }}>Read</MenuItem>
                        </Box>
                    </Box>
                    <Box height={2} bgcolor={"#d6d3d1"}>

                    </Box>
                    <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {items.announcement.length && items.announcement.map((value, index) => {
                            return <ListItem key={index} sx={{ borderBottom: "0.1px solid #d4d4d4", padding: "10px" }} >
                                <Box >
                                    <ListItemAvatar>
                                        <CampaignIcon sx={{ height: "40px", width: "40px", color: "orange", rotate: "-45deg" }} />
                                    </ListItemAvatar>
                                </Box>
                                <ListItemText primary={<Typography component="div"
                                    variant="h6">{value.title}</Typography>} secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                sx={{ color: 'text.primary', display: 'inline' }}
                                            >
                                                {value.description.slice(0, 80) + "..."}
                                            </Typography>

                                        </React.Fragment>
                                    } />
                                <Stack >{value.createdAt}</Stack>
                            </ListItem>
                        })}
                        {notificatoinType == "Unread" ? (
                            items.leads.length >= 1 && items.leads.filter(item => !item.read).map((value, index) => {
                                return <ListItem key={index} sx={{ bgcolor: !value.read ? "#f3f4f6" : "white", borderBottom: "0.1px solid #d4d4d4", padding: "10px", ":hover": { bgcolor: value.read ? "#f3f4f6" : "white" } }} >
                                    <Box mt={2}>
                                        <ListItemAvatar>
                                            <LeaderboardIcon sx={{ height: "40px", width: "40px" }} />
                                        </ListItemAvatar>
                                    </Box>
                                    <ListItemText primary={<Typography component="div"
                                        variant="h6">{value.title}</Typography>} secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    sx={{ color: 'text.primary', display: 'inline' }}
                                                >
                                                    {value.description}
                                                </Typography>

                                            </React.Fragment>
                                        } />
                                    <Stack >{value.createdAt}</Stack>
                                </ListItem>
                            }

                            )
                        ) : notificatoinType == "Read" ? (
                            items.leads.length >= 1 && items.leads.filter(item => item.read).map((value, index) => {
                                return <ListItem key={index} sx={{ bgcolor: !value.read ? "#f3f4f6" : "white", borderBottom: "0.1px solid #d4d4d4", padding: "10px", ":hover": { bgcolor: value.read ? "#f3f4f6" : "white" } }} >
                                    <Box mt={2}>
                                        <ListItemAvatar>
                                            <LeaderboardIcon sx={{ height: "40px", width: "40px" }} />
                                        </ListItemAvatar>
                                    </Box>
                                    <ListItemText primary={<Typography component="div"
                                        variant="h6">{value.title}</Typography>} secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    sx={{ color: 'text.primary', display: 'inline' }}
                                                >
                                                    {value.description}
                                                </Typography>

                                            </React.Fragment>
                                        } />
                                    <Stack >{value.createdAt}</Stack>
                                </ListItem>
                            })
                        ) : (
                            items.leads.length >= 1 && items.leads.map((value, index) => {
                                return <ListItem key={index} sx={{ bgcolor: !value.read ? "#f3f4f6" : "white", borderBottom: "0.1px solid #d4d4d4", padding: "10px", ":hover": { bgcolor: value.read ? "#f3f4f6" : "white" } }} >
                                    <Box mt={2}>
                                        <ListItemAvatar>
                                            <LeaderboardIcon sx={{ height: "40px", width: "40px" }} />
                                        </ListItemAvatar>
                                    </Box>
                                    <ListItemText primary={<Typography component="div"
                                        variant="h6">{value.title}</Typography>} secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    sx={{ color: 'text.primary', display: 'inline' }}
                                                >
                                                    {value.description}
                                                </Typography>

                                            </React.Fragment>
                                        } />
                                    <Stack >{value.createdAt}</Stack>
                                </ListItem>
                            })
                        )
                        }
                        {items.messages.length && items.messages.map((value, index) => {
                            return <ListItem key={index} sx={{ borderBottom: "0.1px solid #d4d4d4", padding: "20px 10px" }}  >
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                <ListItemText primary={<Typography component="div"
                                    variant="h6">{value.user.userName}</Typography>} secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                sx={{ color: 'text.primary', display: 'inline' }}
                                            >
                                                {value.message.slice(0, 80) + "..."}
                                            </Typography>

                                        </React.Fragment>
                                    } />
                                <Stack >{value.createdAt}</Stack>
                            </ListItem>
                        })}
                    </List>
                </Box>

            </Menu>
        </Box>
    );
};

export default Notification;
