"use client";
import {
  Box,
  Button,
  CardContent,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddFollowUpModal from "@/components/modals/addFollowUp";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LeadViewModal from "./leadFollowup";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getData } from "@/services/apiService";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  IconBrandWhatsapp,
  IconShoppingCart,
  IconWriting,
  IconPhone,
  IconMessage,
  IconCalendarTime,
  IconAlarm,
  IconPlus,
  IconArrowLeft,
} from "@tabler/icons-react";

import { useState, useEffect } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import LeadCalls from "../components/LeadCalls";
import LeadNote from "../components/LeadNote";
import LeadEmail from "../components/LeadEmail";

// Tab Panel for handling tab content display
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#144322",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

export const fetchFollowUpsData = async (id: any) => {
  try {
    const data = await getData(`/v1/lead-followup/get/${id}`);
    return data;
    // setfollowup(data?.data)
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const LeadDetails = ({ setOpen, editLead, followUpdata, ID }: any) => {
  const [age, setAge] = useState("");
  const [followup, setfollowup] = useState<any>([]);

  const handleChange1 = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const [status, setStatus] = useState("");

  const router = useRouter();

  const handleChange2 = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  const [value, setValue] = React.useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [value1, setValue1] = React.useState(0);
  const handleChange3 = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [data1, setData1] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(`/v1/getLead/${ID}`);
        console.log(data?.data?.data, "daaaa");
        setData1(data?.data?.data);
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData();
  }, [value]);

  useEffect(() => {
    fetchFollowUpsData(ID).then((data) => {
      setfollowup(data?.data);
    });
  }, []);

  return (
    <>
      <Button
        sx={{ mb: 2 }}
        onClick={() => router.back()}
        variant="outlined"
        color="primary"
        startIcon={<IconArrowLeft fontSize={"12px"} />}
      >
        Back
      </Button>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress size={50} />
        </Box>
      ) : (
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            padding: "0",
            margin: "0",
          }}
        >
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
                md: "38%",
                border: "2px solid #ececec",
                borderRadius: "8px",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "2px solid #ececec",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{ padding: "5px", marginTop: "10px", marginLeft: "10px" }}
                >
                  <Typography variant="h6" fontWeight={500}>
                    {data1.applicantName}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", margin: "5px" }}>
                <Box>
                  <Avatar
                    sx={{
                      bgcolor: "#ACDD33",
                      width: 24,
                      height: 24,
                      fontSize: "14px",
                    }}
                  >
                    2
                  </Avatar>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="body2"
                      sx={{ padding: "3px" }}
                      fontWeight={600}
                    >
                      Units
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ marginLeft: "20%", marginRight: "30px" }}>
                  <Avatar
                    sx={{
                      bgcolor: "#ACDD33",
                      width: 24,
                      height: 24,
                      fontSize: "14px",
                    }}
                  >
                    3
                  </Avatar>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="body2"
                      sx={{ padding: "3px" }}
                      fontWeight={600}
                    >
                      Tasks
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px",
              }}
            >
              <Box>
                <Stack direction="row" spacing={2}>
                  <Avatar sizes="large" sx={{ bgcolor: "#144322" }}>
                    D
                  </Avatar>
                </Stack>
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ padding: "3px" }}
                  fontWeight={600}
                >
                  STAGE & STATUS
                </Typography>
                <Box sx={{ display: "flex" }}>
                  <FormControl sx={{ minWidth: 120 }}>
                    <Select
                      value={age}
                      size="small"
                      onChange={handleChange1}
                      displayEmpty

                      // sx={{backgroundColor:"#ACDD33"}}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Opportunity</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ ml: 1, minWidth: 120 }}>
                    <Select
                      value={status}
                      size="small"
                      onChange={handleChange2}
                      displayEmpty
                      // sx={{backgroundColor:"#ACDD33"}}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Hot</MenuItem>
                      <MenuItem value={20}>Cold</MenuItem>
                      <MenuItem value={30}>Warm</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ marginTop: "15px" }}>
                  {/* <Box>
                <Typography variant="body2">LAST NOTE</Typography>
              </Box> */}
                  {/* <Box>
                <Typography variant="body1" fontWeight={600}>
                  Client said he will come on Sunday
                </Typography>
              </Box> */}
                </Box>
              </Box>
              <Box></Box>
            </Box>
            <Box>
              <Box>
                <Accordion defaultExpanded>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                    sx={{ backgroundColor: "white" }}
                  >
                    Personal Details:
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box>
                        <Box
                          sx={{
                            marginTop: "5px",
                            marginRight: "5px",
                            padding: "5px",
                            border: "1px solid #e0e0e0",
                            minWidth: "12vw",
                            borderRadius: "8px",
                          }}
                        >
                          <Box>
                            <Typography variant="body2" sx={{ padding: "3px" }}>
                              Application No.
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ padding: "3px" }}
                              fontWeight={600}
                            >
                              {data1.applicationNo}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            marginTop: "5px",
                            marginRight: "5px",
                            padding: "5px",
                            border: "1px solid #e0e0e0",
                            minWidth: "12vw",
                            borderRadius: "8px",
                          }}
                        >
                          <Box>
                            <Typography variant="body2" sx={{ padding: "3px" }}>
                              Applicant Name
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ padding: "3px" }}
                              fontWeight={600}
                            >
                              {data1.applicantName}
                            </Typography>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            marginTop: "5px",
                            marginRight: "5px",
                            padding: "5px",
                            border: "1px solid #e0e0e0",
                            minWidth: "12vw",
                            borderRadius: "8px",
                          }}
                        >
                          <Box>
                            <Typography variant="body2" sx={{ padding: "3px" }}>
                              Mobile No
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ padding: "3px" }}
                              fontWeight={600}
                            >
                              {data1.mobileNo}
                            </Typography>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            marginTop: "5px",
                            marginRight: "5px",
                            padding: "5px",
                            border: "1px solid #e0e0e0",
                            minWidth: "12vw",
                            borderRadius: "8px",
                          }}
                        >
                          <Box>
                            <Typography variant="body2" sx={{ padding: "3px" }}>
                              State
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ padding: "3px" }}
                              fontWeight={600}
                            >
                              {data1.stateName}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            marginTop: "5px",
                            marginRight: "5px",
                            padding: "5px",
                            border: "1px solid #e0e0e0",
                            minWidth: "12vw",
                            borderRadius: "8px",
                          }}
                        >
                          <Box>
                            <Typography variant="body2" sx={{ padding: "3px" }}>
                              Pancard No
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ padding: "3px" }}
                              fontWeight={600}
                            >
                              {data1.panNo}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <Box
                          sx={{
                            marginTop: "5px",
                            marginRight: "5px",
                            padding: "5px",
                            border: "1px solid #e0e0e0",
                            minWidth: "12vw",
                            borderRadius: "8px",
                          }}
                        >
                          <Box>
                            <Typography variant="body2" sx={{ padding: "3px" }}>
                              Aadhar No
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ padding: "3px" }}
                              fontWeight={600}
                            >
                              {data1.aadharNo}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            marginTop: "5px",
                            marginRight: "5px",
                            padding: "5px",
                            border: "1px solid #e0e0e0",
                            minWidth: "12vw",
                            borderRadius: "8px",
                          }}
                        >
                          <Box>
                            <Typography variant="body2" sx={{ padding: "3px" }}>
                              Pin Code
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ padding: "3px" }}
                              fontWeight={600}
                            >
                              {data1.pinNo}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            marginTop: "5px",
                            marginRight: "5px",
                            padding: "5px",
                            border: "1px solid #e0e0e0",
                            minWidth: "12vw",
                            borderRadius: "8px",
                          }}
                        >
                          <Box>
                            <Typography variant="body2" sx={{ padding: "3px" }}>
                              City Name
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ padding: "3px" }}
                              fontWeight={600}
                            >
                              {data1.cityName}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            marginTop: "5px",
                            marginRight: "5px",
                            padding: "5px",
                            border: "1px solid #e0e0e0",
                            minWidth: "12vw",
                            borderRadius: "8px",
                          }}
                        >
                          <Box>
                            <Typography variant="body2" sx={{ padding: "3px" }}>
                              District
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ padding: "3px" }}
                              fontWeight={600}
                            >
                              {data1.districtName}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{ backgroundColor: "white" }}
                  >
                    Record Details:
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box>
                        <Box
                          sx={{
                            marginTop: "5px",
                            marginRight: "5px",
                            padding: "5px",
                            border: "1px solid #e0e0e0",
                            minWidth: "12vw",
                            borderRadius: "8px",
                          }}
                        >
                          <Box>
                            <Typography variant="body2" sx={{ padding: "3px" }}>
                              Entry Type
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ padding: "3px" }}
                              fontWeight={600}
                            >
                              {data1.entryType}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            marginTop: "5px",
                            marginRight: "5px",
                            padding: "5px",
                            border: "1px solid #e0e0e0",
                            minWidth: "12vw",
                            borderRadius: "8px",
                          }}
                        >
                          <Box>
                            <Typography variant="body2" sx={{ padding: "3px" }}>
                              Entry No
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ padding: "3px" }}
                              fontWeight={600}
                            >
                              {data1.entryNo}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            marginTop: "5px",
                            marginRight: "5px",
                            padding: "5px",
                            border: "1px solid #e0e0e0",
                            minWidth: "12vw",
                            borderRadius: "8px",
                          }}
                        >
                          <Box>
                            <Typography variant="body2" sx={{ padding: "3px" }}>
                              Entry Date
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ padding: "3px" }}
                              fontWeight={600}
                            >
                              {data1.entryDate}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            marginTop: "5px",
                            marginRight: "5px",
                            padding: "5px",
                            border: "1px solid #e0e0e0",
                            minWidth: "12vw",
                            borderRadius: "8px",
                          }}
                        >
                          <Box>
                            <Typography variant="body2" sx={{ padding: "3px" }}>
                              Agent Name
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ padding: "3px" }}
                              fontWeight={600}
                            >
                              {data1.agentName}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            marginTop: "5px",
                            marginRight: "5px",
                            padding: "5px",
                            border: "1px solid #e0e0e0",
                            minWidth: "12vw",
                            borderRadius: "8px",
                          }}
                        >
                          <Box>
                            <Typography variant="body2" sx={{ padding: "3px" }}>
                              Customer Email
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ padding: "3px" }}
                              fontWeight={600}
                            >
                              {data1.customerEmail}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <Box
                          sx={{
                            marginTop: "5px",
                            marginRight: "5px",
                            padding: "5px",
                            border: "1px solid #e0e0e0",
                            minWidth: "12vw",
                            borderRadius: "8px",
                          }}
                        >
                          <Box>
                            <Typography variant="body2" sx={{ padding: "3px" }}>
                              Unit Category
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ padding: "3px" }}
                              fontWeight={600}
                            >
                              {data1.unitCategory}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            marginTop: "5px",
                            marginRight: "5px",
                            padding: "5px",
                            border: "1px solid #e0e0e0",
                            minWidth: "12vw",
                            borderRadius: "8px",
                          }}
                        >
                          <Box>
                            <Typography variant="body2" sx={{ padding: "3px" }}>
                              Visit Through
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ padding: "3px" }}
                              fontWeight={600}
                            >
                              {data1.visitThrough}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            marginTop: "5px",
                            marginRight: "5px",
                            padding: "5px",
                            border: "1px solid #e0e0e0",
                            minWidth: "12vw",
                            borderRadius: "8px",
                          }}
                        >
                          <Box>
                            <Typography variant="body2" sx={{ padding: "3px" }}>
                              Address 1
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ padding: "3px" }}
                              fontWeight={600}
                            >
                              {data1.address}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            marginTop: "5px",
                            marginRight: "5px",
                            padding: "5px",
                            border: "1px solid #e0e0e0",
                            minWidth: "12vw",
                            borderRadius: "8px",
                          }}
                        >
                          <Box>
                            <Typography variant="body2" sx={{ padding: "3px" }}>
                              Assigned To
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ padding: "3px" }}
                              fontWeight={600}
                            >
                              {data1.assignedTo}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    sx={{ backgroundColor: "white" }}
                  >
                    Project Details:
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box>
                        <Box
                          sx={{
                            marginTop: "5px",
                            marginRight: "5px",
                            padding: "5px",
                            border: "1px solid #e0e0e0",
                            minWidth: "12vw",
                            borderRadius: "8px",
                          }}
                        >
                          <Box>
                            <Typography variant="body2" sx={{ padding: "3px" }}>
                              Project Name
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ padding: "3px" }}
                              fontWeight={600}
                            >
                              {data1.entryType}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            marginTop: "5px",
                            marginRight: "5px",
                            padding: "5px",
                            border: "1px solid #e0e0e0",
                            minWidth: "12vw",
                            borderRadius: "8px",
                          }}
                        >
                          <Box>
                            <Typography variant="body2" sx={{ padding: "3px" }}>
                              Floor
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ padding: "3px" }}
                              fontWeight={600}
                            >
                              {data1.floor}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            marginTop: "5px",
                            marginRight: "5px",
                            padding: "5px",
                            border: "1px solid #e0e0e0",
                            minWidth: "12vw",
                            borderRadius: "8px",
                          }}
                        >
                          <Box>
                            <Typography variant="body2" sx={{ padding: "3px" }}>
                              Property Type
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ padding: "3px" }}
                              fontWeight={600}
                            >
                              {data1.propertyType}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <Box
                          sx={{
                            marginTop: "5px",
                            marginRight: "5px",
                            padding: "5px",
                            border: "1px solid #e0e0e0",
                            minWidth: "12vw",
                            borderRadius: "8px",
                          }}
                        >
                          <Box>
                            <Typography variant="body2" sx={{ padding: "3px" }}>
                              Status
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ padding: "3px" }}
                              fontWeight={600}
                            >
                              {data1.status}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            marginTop: "5px",
                            marginRight: "5px",
                            padding: "5px",
                            border: "1px solid #e0e0e0",
                            minWidth: "12vw",
                            borderRadius: "8px",
                          }}
                        >
                          <Box>
                            <Typography variant="body2" sx={{ padding: "3px" }}>
                              Further Action
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ padding: "3px" }}
                              fontWeight={600}
                            >
                              {data1.furtherAction}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            marginTop: "5px",
                            marginRight: "5px",
                            padding: "5px",
                            border: "1px solid #e0e0e0",
                            minWidth: "12vw",
                            borderRadius: "8px",
                          }}
                        >
                          <Box>
                            <Typography variant="body2" sx={{ padding: "3px" }}>
                              Discussions
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ padding: "3px" }}
                              fontWeight={600}
                            >
                              {data1.discussions}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: { xs: "100%", sm: "100%", md: "61%" } }}>
            <Box
              sx={{
                border: "2px solid #ececec",
                width: "100%",
                borderRadius: "8px",
                paddingBottom: "10px",
              }}
            >
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  sx={{ color: "black" }}
                >
                  <Tab
                    sx={{ color: "black" }}
                    icon={
                      <IconWriting
                        style={{ fontSize: "15px", width: "15px" }}
                      />
                    }
                    iconPosition="start"
                    label="Note"
                    {...a11yProps(0)}
                  />
                  <Tab
                    sx={{ color: "black" }}
                    icon={
                      <IconPhone style={{ fontSize: "15px", width: "15px" }} />
                    }
                    iconPosition="start"
                    label="Call"
                    {...a11yProps(1)}
                  />
                  <Tab
                    sx={{ color: "black" }}
                    icon={
                      <IconMessage
                        style={{ fontSize: "15px", width: "15px" }}
                      />
                    }
                    iconPosition="start"
                    label="Email"
                    {...a11yProps(2)}
                  />
                  <Tab
                    sx={{ color: "black" }}
                    icon={
                      <IconAlarm style={{ fontSize: "15px", width: "15px" }} />
                    }
                    iconPosition="start"
                    label="Followup"
                    {...a11yProps(3)}
                  />
                  <Tab
                    sx={{ color: "black" }}
                    icon={
                      <IconPlus style={{ fontSize: "15px", width: "15px" }} />
                    }
                    iconPosition="start"
                    label="Offline Call"
                    {...a11yProps(4)}
                  />
                </Tabs>
              </Box>

              <CustomTabPanel value={value} index={0}>
                <LeadNote />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <LeadCalls />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <LeadEmail leadData={data1} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                <LeadViewModal
                  followUpdata={followup}
                  setFollowUpData={setfollowup}
                  followupdata={data1}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={4}>
                Offline Call
              </CustomTabPanel>
            </Box>
          </Box>
        </CardContent>
      )}
    </>
  );
};

export default LeadDetails;
