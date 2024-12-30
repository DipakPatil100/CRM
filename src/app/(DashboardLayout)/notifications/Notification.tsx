/* eslint-disable react/jsx-key */
import * as React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box, Button, ListItemButton, Stack } from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
const Items = {
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
        createdAt: "11/6/24"
    }]
}

export default function Notification() {
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {Items.leads.map((value, index) => {
                return <Box sx={{ bgcolor: index % 2 == 0 ? "white" : "whitesmoke" }} padding={"20px"} >
                    <Stack direction={"row"} alignItems={"center"} >
                        <Box mt={2}>
                            <ListItemAvatar>
                                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
                                <LeaderboardIcon sx={{ height: "40px", width: "40px" }} />
                            </ListItemAvatar>
                        </Box>
                        <Box>

                            <Typography sx={{ background: value.read == true ? "#ACDD33" : "#ff0000", borderRadius: "5px" }} width={"fit-content"} padding={"5px 15px"} color={value.read ? "" : "white"} fontWeight={"bold"}>{value.read ? "Read" : "Unread"}</Typography>
                            <ListItemText
                                primary={<Typography variant='h5' component={"div"} margin={"5px 0px"}>{value.title}</Typography>}
                                secondary={
                                    <Typography
                                        component="span"
                                        variant="body1"
                                        sx={{ color: 'text.primary', display: 'inline' }}
                                    >
                                        {value.description}
                                    </Typography>

                                }
                            />
                            <Box>
                                <Button sx={{ background: "#F9A43F", color: "white", padding: "5px 15px", margin: "5px 0px " }}>Approved</Button>
                                <Button sx={{ background: "#397868", color: "white", padding: "5px 15px", margin: "5px 0px", marginLeft: "10px" }}>Decline</Button>
                            </Box>
                            <Box>
                                <Typography variant='body1' gutterBottom color='#a1a1aa'>Lead Created at {value.createdAt}</Typography>
                            </Box>
                        </Box>
                    </Stack>

                </Box>
            })}

            {Items.announcement.map((value, index) => {
                return <Box sx={{ bgcolor: index % 2 == 0 ? "white" : "whitesmoke" }} padding={"20px"} >
                    <Stack direction={"row"} >
                        <Box mt={2}>
                            <ListItemAvatar sx={{ marginRight: "20px" }}>
                                <CampaignIcon sx={{ height: "100px", width: "80px", color: "orange", rotate: "-45deg" }} />
                            </ListItemAvatar>
                        </Box>
                        <Box>
                            <ListItemText
                                primary={<Typography variant='h5' component={"div"} margin={"5px 0px"}>{value.title}</Typography>}
                                secondary={
                                    <Typography
                                        component="span"
                                        variant="body1"
                                        sx={{ color: 'text.primary', display: 'inline' }}
                                    >
                                        {value.description}
                                    </Typography>

                                }
                            />
                            <Box>
                                <Button sx={{ background: "#F9A43F", color: "white", padding: "5px 15px", margin: "5px 0px " }}>Approved</Button>
                                <Button sx={{ background: "#397868", color: "white", padding: "5px 15px", margin: "5px 0px", marginLeft: "10px" }}>Decline</Button>
                            </Box>
                            <Box>
                                <Typography variant='body1' gutterBottom color='#a1a1aa'>Lead Created at {value.createdAt}</Typography>
                            </Box>
                        </Box>
                    </Stack>

                </Box>
            })}

            {Items.messages.map((value, index) => {
                return <Box sx={{ bgcolor: index % 2 == 0 ? "white" : "whitesmoke" }} padding={"20px"} >
                    <Stack direction={"row"} >
                        <Box mt={2}>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                {/* <LeaderboardIcon sx={{ height: "40px", width: "40px" }} /> */}
                            </ListItemAvatar>
                        </Box>
                        <Box>

                            <ListItemText
                                primary={<Typography variant='h5' component={"div"} margin={"5px 0px"}>{value.user.userName}</Typography>}
                                secondary={
                                    <Typography
                                        component="span"
                                        variant="body1"
                                        sx={{ color: 'text.primary', display: 'inline' }}
                                    >
                                        {value.message}
                                    </Typography>

                                }
                            />
                            <Box>
                                <Button sx={{ background: "#F9A43F", color: "white", padding: "5px 15px", margin: "5px 0px " }}>Reply</Button>
                            </Box>
                            <Box>
                                <Typography variant='body1' gutterBottom color='#a1a1aa'>Recieved At: {value.createdAt}</Typography>
                            </Box>
                        </Box>
                    </Stack>

                </Box>
            })}


        </List>
    );
}
