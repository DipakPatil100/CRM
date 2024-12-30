import AddFollowUpModal from "@/components/modals/addFollowUp";
import { Card } from "@material-ui/core";
import {
  Box,
  CardContent,
  Grid2,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
const LeadViewModal = ({
  setOpen,
  editLead,
  followUpdata,
  followupdata,
  setFollowUpData,
}: any) => {
  console.log(followUpdata, "fooo");
  const [displayAddNextModal, setDisplayAddNextModal] = useState(false);

  const [expandedRows, setExpandedRows] = useState<any>({});

  const toggleRemark = (index: number) => {
    setExpandedRows((prevState: any) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const getTime = (date: string | number | Date) => {
    const time = new Date(date);
    return time.toLocaleTimeString();
  };
  return !displayAddNextModal ? (
    <Grid2 size={{ xs: 12, md: 4 }}>
      <AddFollowUpModal
        displayAddNextModal={displayAddNextModal}
        setDisplayAddNextModal={setDisplayAddNextModal}
        leadData={followupdata}
        setFollowUpData={setFollowUpData}
      />
      <Box style={{ maxHeight: 400, overflowY: "scroll", marginTop: "30px" }}>
        <Box sx={{ height: "40%" }}>
          {followUpdata && followUpdata.length == 0 ? (
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
                <AddCircleIcon fontSize="large" />
                <Typography variant="h5">No Follow Up</Typography>
              </CardContent>
            </Stack>
          ) : (
            <Table
              sx={{
                width: "100%",
                borderCollapse: "collapse",
                tableLayout: "fixed",
              }}
            >
              <TableHead
                sx={{
                  position: "sticky",
                  top: 0,
                  background: "#f9fbfc",
                  zIndex: 1,
                }}
              >
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      border: "1px solid #ddd",
                      padding: "12px",
                      textAlign: "center",
                      width: "6vw",
                    }}
                  >
                    FollowUp
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      border: "1px solid #ddd",
                      padding: "12px",
                      textAlign: "center",
                      width: "10vw",
                    }}
                  >
                    Date & Time
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      border: "1px solid #ddd",
                      padding: "12px",
                      textAlign: "center",
                      width: "8vw",
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      border: "1px solid #ddd",
                      padding: "12px",
                      textAlign: "center",
                      width: "15vw",
                    }}
                  >
                    Remark
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {followUpdata?.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{
                        padding: "12px",
                        border: "1px solid #ddd",
                        textAlign: "center",
                        width: "6vw",
                      }}
                    >
                      {followUpdata.length - index}
                    </TableCell>

                    <TableCell
                      sx={{
                        padding: "12px",
                        border: "1px solid #ddd",
                        textAlign: "center",
                        width: "10vw",
                      }}
                    >
                      {item.date} | {getTime(item?.createdAt)}
                    </TableCell>

                    <TableCell
                      sx={{
                        padding: "12px",
                        border: "1px solid #ddd",
                        textAlign: "center",
                        color: getStatusColor(item?.status),
                        fontWeight: "bold",
                        width: "8vw",
                      }}
                    >
                      {item?.status}
                    </TableCell>

                    {/* Remark */}
                    <TableCell
                      sx={{
                        padding: "12px",
                        border: "1px solid #ddd",
                        textAlign: "center",
                        width: "15vw",
                      }}
                    >
                      {expandedRows[index] ? (
                        <>
                          {item?.remark}{" "}
                          <span
                            style={{ color: "blue", cursor: "pointer" }}
                            onClick={() => toggleRemark(index)}
                          >
                            View Less
                          </span>
                        </>
                      ) : (
                        <>
                          {item?.remark.length > 50
                            ? item?.remark.slice(0, 50) + "..."
                            : item?.remark}
                          {item?.remark.length > 50 && (
                            <span
                              style={{ color: "blue", cursor: "pointer" }}
                              onClick={() => toggleRemark(index)}
                            >
                              View More
                            </span>
                          )}
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </Box>
      <Stack
        width={"100%"}
        direction={"row"}
        spacing={12}
        mt={2}
        padding={"10px 20px"}
      >
        <Box width={"70%"}>
          {/* <Typography fontWeight={"bold"} fontSize={"14px"} variant="body1">
              Lead Id: {followupdata&&followupdata?.LeadId.toUpperCase()}
            </Typography>

            <Typography fontSize={"14px"} variant="body1">
              Customer Name - {`${followupdata&&followupdata?.applicantName} `}
            </Typography>
            <Typography fontSize={"14px"} variant="body1">
              {` Agent Name -  ${followupdata&&followupdata?.agentName}`}
            </Typography> */}
        </Box>
      </Stack>
    </Grid2>
  ) : (
    <></>
  );
};

export default LeadViewModal;
const getStatusColor = (status: string) => {
  switch (status) {
    case "Hot":
      return "red";
    case "cold":
      return "green";
    case "Warm":
      return "#F9A43F";
    case "Pending":
      return "#ACDD33";
    default:
      return "black";
  }
};
