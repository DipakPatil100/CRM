import AddFollowUpModal from "@/components/modals/addFollowUp";
import { Card } from "@material-ui/core";
import { Box, Button, CardContent, Divider, Grid2, IconButton, Stack, Typography } from "@mui/material";
import { IconX } from "@tabler/icons-react";
import { getTime } from "date-fns";
import { useState } from "react";

const LeadViewModal = ({ setOpen, editLead, followUpdata }: any) => {
    console.log(followUpdata, "fooo");
    const [displayAddNextModal, setDisplayAddNextModal] = useState(false);
    return !displayAddNextModal ? (
      <Grid2 size={{ xs: 12, md: 4 }}>
        <Card style={{ height: 510, overflowY: "scroll" }}>
          <CardContent
            style={{
              position: "sticky",
              top: "0%",
              background: "white",
              zIndex: 1,
            }}
          >
            <Typography
              position={"relative"}
              gutterBottom
              variant="h5"
              component="div"
              display={"flex"}
              alignItems={"center"}
            >
              <span>Lead Follow Up</span>
              <IconButton
                aria-label="close"
                onClick={() => setOpen(false)}
                sx={() => ({
                  position: "absolute",
                  right: 0,
                  // bottom: "50%",
                  color: "#000",
                })}
              >
                <IconX style={{ marginBottom: "10px" }} />
              </IconButton>
            </Typography>
  
            <Divider />
          </CardContent>
          <Stack
            width={"100%"}
            direction={"row"}
            spacing={12}
            mt={2}
            padding={"10px 20px"}
          >
            <Box width={"60%"}>
              <Typography fontWeight={"bold"} fontSize={"14px"} variant="body1">
                {/* Lead Id: {editLead[0]?.LeadId.toUpperCase()} */}
              </Typography>
  
              <Typography fontSize={"14px"} variant="body1">
                {/* Customer Name - {`${editLead[0]?.applicantName} `} */}
              </Typography>
              <Typography fontSize={"14px"} variant="body1">
                {/* {` Agent Name -  ${editLead[0]?.agentName}`} */}
              </Typography>
            </Box>
            <Box width={"30%"} alignSelf={"right"}>
              <Button
                onClick={() => {
                  setDisplayAddNextModal(true);
                }}
                style={{
                  width: "100%",
                  background: "#F9A43F",
                  color: "white",
                  fontWeight: 400,
                }}
              >
                Add Next
              </Button>
            </Box>
          </Stack>
  
          <Box sx={{ height: "60%" }}>
              <Stack
                sx={{
                  height: "100%",
                  display: "flex", // Enables Flexbox for Stack
                  justifyContent: "center", // Centers content vertically
                  alignItems: "center", // Centers content horizontally
                }}
              >
                <CardContent
                  sx={{
                    background: "#f9fbfc",
                    textAlign: "center",
                    display: "flex", // Enables Flexbox for CardContent
                    flexDirection: "column", // Stacks the icon and text vertically
                    justifyContent: "center", // Centers content vertically within CardContent
                    alignItems: "center", // Centers content horizontally within CardContent
                    height: "100%",
                    width: "100%", // Ensures the content takes up the full height of the parent
                  }}
                >
                  {/* <AddCircleIcon fontSize="large" /> */}
                  <Typography variant="h5">No Follow Up</Typography>
                </CardContent>
              </Stack>
          
          </Box>
        </Card>
      </Grid2>
    ) : (
      // <Grid2 size={{ xs: 12, md: 4 }}>
      //   <Card sx={{ height: 510, width: "100%", overflowY: "scroll" }}>
      //     <CardContent style={{ position: "sticky", top: "0%" }}>
      //       <Typography
      //         position={"relative"}
      //         gutterBottom
      //         variant="h5"
      //         component="div"
      //         display={"flex"}
      //         alignItems={"center"}
      //       >
      //         <span>Add Next Follow Up</span>
      //         <IconButton
      //           aria-label="close"
      //           onClick={() => setDisplayAddNextModal(false)}
      //           sx={() => ({
      //             position: "absolute",
      //             right: 0,
      //             // bottom: "50%",
      //             color: "#000",
      //           })}
      //         >
      //           <IconX style={{ marginBottom: "10px" }} />
      //         </IconButton>
      //       </Typography>
  
      //       <Divider />
      //     </CardContent>
      //     <Box padding={2}>
      //       <Grid size={{ xs: 12, md: 6 }} width={"100%"}>
      //         <InputLabel sx={{ color: "#000" }}>
      //           Remark
      //           <Typography component={"span"} style={{ color: "red" }}>
      //             *
      //           </Typography>
      //         </InputLabel>
      //         <TextareaAutosize
      //           aria-label="minimum height"
      //           minRows={10}
      //           cols={50}
      //           placeholder="Enter the Remark"
      //           style={{
      //             padding: "5px 10px",
      //             maxWidth: 340,
      //             borderColor: "grey",
      //             outlineColor: "gray",
      //             borderRadius: "4px",
      //           }}
      //         />
      //       </Grid>
      //       <Grid container spacing={{ xs: 2, md: 3 }}>
      //         <Grid size={{ xs: 12, md: 6 }}>
      //           <InputLabel sx={{ color: "#000" }}>
      //             Date
      //             <Typography component={"span"} style={{ color: "red" }}>
      //               *
      //             </Typography>
      //           </InputLabel>
      //           <TextField
      //             type="date"
      //             name="applicationCode"
      //             placeholder="Date"
      //             onChange={() => {}}
      //             value={""}
      //             fullWidth
      //             size="small"
      //             //   error={!!errors?.employeeCode}
      //             //   helperText={errors?.employeeCode}
      //           />
      //         </Grid>
      //         {/* application Code */}
      //         <Grid size={{ xs: 12, md: 6 }}>
      //           <InputLabel sx={{ color: "#000" }}>
      //             Status
      //             <Typography component={"span"} style={{ color: "red" }}>
      //               *
      //             </Typography>
      //           </InputLabel>
      //           <FormControl fullWidth>
      //             <Select
      //               labelId="demo-simple-select-label"
      //               id="demo-simple-select"
      //               label="Cold"
      //               size="small"
      //             >
      //               <MenuItem value={"cold"}>Cold</MenuItem>
      //               <MenuItem value={"Warm"}>Warm</MenuItem>
      //               <MenuItem value={"Hot"}>Hot</MenuItem>
      //             </Select>
      //           </FormControl>
      //         </Grid>
      //       </Grid>
      //       <Box mt={2} alignItems={"baseline"}>
      //         <Button
      //           variant="outlined"
      //           sx={{ border: "1px solid black", color: "black", mr: 2 }}
      //           onClick={() => {
      //             setDisplayAddNextModal(false);
      //           }}
      //         >
      //           Cancel
      //         </Button>
      //         <Button
      //           variant="contained"
      //           type="submit"
      //           sx={{ backgroundColor: "#F9A43F", color: "white" }}
      //         >
      //           Add
      //         </Button>
      //       </Box>
      //     </Box>
      //   </Card>
      // </Grid2>
      <AddFollowUpModal
        displayAddNextModal={displayAddNextModal}
        setDisplayAddNextModal={setDisplayAddNextModal}
        leadData={editLead[0]}
      />
    );
  };

  export default LeadViewModal