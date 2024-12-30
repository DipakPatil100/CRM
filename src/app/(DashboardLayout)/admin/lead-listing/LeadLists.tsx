/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  IconButton,
  InputBase,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItemText,
  ListItem,
  ListItemAvatar,
  Card,
  CardContent,
  Divider,
  CardActions,
  Stack,
  Avatar,
  Grid2,
  TextareaAutosize,
  OutlinedInput,
  Menu,
  ListItemIcon,
  InputAdornment,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import {
  CustomPagination,
  CustomPaginationNumber,
} from "@/components/DynamicTable/TablePagination";
import {
  IconCalendarDue,
  IconCurrentLocation,
  IconEdit,
  IconEyeFilled,
  IconMail,
  IconMessageCircle,
  IconPhone,
  IconX,
  IconFileLike,
  IconBaselineDensitySmall,
  IconBaselineDensityMedium,
  IconDotsVertical,
  IconFilter,
} from "@tabler/icons-react";

import { getData, pathData, postData, putData } from "@/services/apiService";
import { enqueueSnackbar, useSnackbar } from "notistack";

import AddFollowUpModal from "@/components/modals/addFollowUp";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ConfirmApprovalModal from "@/components/modals/confirmApproval";
import { IconDownload, IconPlus } from "@tabler/icons-react";
import { exportdataExcel, exportToPdf } from "@/utils/exportDoc";
import { useRouter } from "next/navigation";
import { LeadListEditModal } from "./EditLead";
import Link from "next/link";

const getTime = (time: any) => {
  const utcDate = new Date(time);
  utcDate.setHours(utcDate.getHours());
  utcDate.setMinutes(utcDate.getMinutes());
  // Your Date object
  const istDate = new Date(utcDate.toString());

  // Extract hours and minutes
  let hours = istDate.getHours();
  const minutes = istDate.getMinutes();

  // Determine AM/PM
  const period = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12; // Convert hour to 12-hour format
  hours = hours ? hours : 12; // The hour '0' should be '12'

  // Format the time as "6:25 PM"
  const formattedTime = `${hours}:${
    minutes < 10 ? "0" + minutes : minutes
  } ${period}`;
  return formattedTime;
};

const DataTable = ({
  leadData,
  userData,
  propertyData,
  data,
  getUser,
}: any) => {
  leadData[0]?.action;
  const [selected, setSelected] = React.useState<any>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [leadIds, setLeadIds] = useState<any>([]);
  const [leadApprovedSt, setLeadApprovedStatus] = useState<any>([]);
  const [dense, setDense] = React.useState(true);
  const [assignee, setAssignee] = React.useState<any>({});
  const [assignData, setAssignData] = useState({});
  const [open, setOpen] = React.useState(false);
  const [displayAssignee, setDisplayAssignee] = useState(false);
  const [displayRows, setDisplayRows] = useState([]);
  const [fullDataToShow, setFullDataToShow] = useState<any>();
  const [showList, setShowList] = useState<any>({});
  const [user, setUser] = useState<any>({});
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [viewLead, setViewLead] = React.useState<any>(false);
  const [followUpdata, setFollowupdata] = useState<any>([]);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [ele, setEle] = React.useState<any>(null);

  // onselection of lead
  const [editLead, setEditLead] = React.useState<any>([]);
  const [openEditLeadDialog, setOpenEditLeadDialog] =
    React.useState<any>(false);

  const [searchTerm, setSearchTerm] = React.useState(""); // New state for search term

  const [filterType, setFilterType] = React.useState<string>(""); // Filter type dropdown
  const [filterValue, setFilterValue] = React.useState<string>(""); // Filter value

  const handleFilterTypeChange = (event: any) => {
    setFilterType(event.target.value as string);
    setFilterValue(""); // Reset filter value on filter type change
  };

  console.log(filterValue, filterType, "VALUE FILTER");
  const handleFilterValueChange = (event: any) => {
    setFilterValue(event.target.value.toLowerCase());
    setPage(0); // Reset to the first page on new filter
  };

  const router = useRouter();

  const displayColumn = [
    "Lead Id",
    "agentName",
    "applicantName",
    "cityName",
    "mobileNo",
    "customerEmail",
    "asignedTo",
    "status",
    "action",
  ];

  const filteredRows = () => {
    if (!filterType || !filterValue) {
      return leadData;
    }
    return leadData.filter((row: any) => {
      const fieldValue = row[filterType]?.toString().toLowerCase();
      return fieldValue && fieldValue.includes(filterValue);
    });
  };

  const handleSelect = (id: any) => {
    const currentIndex = selected.indexOf(id);
    const newSelected =
      currentIndex === -1
        ? [...selected, id]
        : selected.filter((item: any) => item !== id);

    setSelected(newSelected);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    // console.log()
    setAssignee(event.target.value);
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setRowsPerPage(parseInt(event.target.value as string, 10));
    setPage(0);
  };

  const handleEditLead = (LeadId: any) => {
    setOpenEditLeadDialog((prev: boolean) => !prev);

    // eslint-disable-next-line prefer-const
    let filterUserData = fullDataToShow.filter(
      (el: any) => el.LeadId === LeadId
    );
    setEditLead(filterUserData);
  };
  const handleAssign = async () => {
    try {
      const response = await postData("/v1/lead-assign/create", {
        assignedById: user?.sub?.userId,
        leadIds,
        assignedTo: assignee?.userName,
        userId: assignee?.userId,
        leadApprovalStatus: leadApprovedSt,
      });

      enqueueSnackbar(response.message, { variant: "success" });
    } catch (error) {
      enqueueSnackbar("An error occurred while submitting the form", {
        variant: "error",
      });
    }
  };
  const handleApprovedLead = async (id: string, status: number) => {
    try {
      const res = await pathData(
        `/v1/getLead/updateApprovalStatus/${id}`,
        { leadApprovalStatus: Number(status) + 1 },
        "formData"
      );
      if (res?.data && !res?.data?.error) {
        enqueueSnackbar(res?.message, { variant: "success" });
        return setOpen(false);
      }
    } catch (e) {
      console.log(e);
      enqueueSnackbar("An error occurred while submitting the form", {
        variant: "error",
      });
    }
  };

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
    setIsOpen((isOpen: any) => !isOpen);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const GeneratePDF = async (headers: string[], fileName: string) => {
    setLoading(true);
    try {
      if (Array.isArray(leadData) && leadData.length > 0) {
        await exportToPdf(leadData, "pdf", headers, fileName);
      } else {
        enqueueSnackbar("No data Available", {
          variant: "error",
        });
      }
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };
  const ExportDataIntoExcel = async (
    title?: string,
    worksheetname?: string
  ) => {
    setLoading(true);
    try {
      if (Array.isArray(leadData) && leadData.length > 0) {
        exportdataExcel(leadData, "excel", title, worksheetname);
      }
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };
  const openmenu = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: any
  ) => {
    console.log(event.currentTarget, "CURRENT TARGET");
    setAnchorEl(event.currentTarget);
    setEle(row);
  };
  const handleClosee = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setDisplayRows(leadData.slice(0, 5));
  }, [getUser]);

  useEffect(() => {
    setDisplayRows(
      leadData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [page, rowsPerPage, leadData, getUser]);

  useEffect(() => {
    setFullDataToShow(leadData);
    setShowList({
      "#": "",
      LeadId: leadData[0].LeadId,
      agentName: leadData[0].agentName,
      applicantName: leadData[0].applicantName,
      mobileNo: leadData[0].mobileNo,
      customerEmail: leadData[0].customerEmail,
      cityName: leadData[0].agentName,
      status: leadData[0].agentName,
      assignedTo: leadData[0].assignedTo,
      leadApprovalStatus:
        Number(leadData[0].leadApprovalStatus) === 1
          ? "Pending"
          : Number(leadData[0].leadApprovalStatus) === 2
            ? "Approval InProgress"
            : Number(leadData[0].leadApprovalStatus) === 3
              ? "First Approval"
              : Number(leadData[0].leadApprovalStatus) === 4
                ? "Final Approved"
                : "",

      action: "",
    });
  }, [getUser]);

  useEffect(() => {
    if (selected.length > 0) {
      setDisplayAssignee(true);
    } else {
      setDisplayAssignee(false);
      // setAssignee("");
    }
  }, [selected]);

  useEffect(() => {
    if (viewLead == false) {
      setSelected([]);
    }
  }, [viewLead]);
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

  const handleGoToLead = (leadId: any) => {
    console.log(leadId, "LEAD ID");
    router.push(`/lead-listing/${leadId?.LeadId}`);
  };

  useEffect(() => {
    setDisplayRows(
      filteredRows().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [page, rowsPerPage, leadData, filterType, filterValue]);

  return (
    <Box sx={{ width: "auto", padding: 0 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: viewLead ? 8 : 12 }}>
          <Grid container spacing={2} marginBottom={2}>
            <Grid
              size={{ xs: 12, sm: 4 }}
              display={"flex"}
              alignItems={"center"}
              gap={"15px"}
              flexWrap={"wrap"}
            >
              <Box>
                <CustomPagination
                  count={leadData.length}
                  rowsPerPage={rowsPerPage}
                  page={1}
                  onPageChange={() => {}}
                  onRowsPerPageChange={(event: any) => {
                    setRowsPerPage(parseInt(event.target.value));
                  }}
                />
              </Box>
              <Box sx={{}}>
                <IconDownload
                  onClick={handleClick2}
                  style={{ cursor: "pointer" }}
                />

                {isOpen && (
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
                        width: "200px",
                        color: "#131121",
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() =>
                        GeneratePDF(
                          [
                            "LeadId",
                            "agentName",
                            "applicantName",
                            "cityName",
                            "mobileNo",
                            "customerEmail",
                            "asignedTo",
                            "leadApprovalStatus",
                            "status",
                          ],
                          "Lead List"
                        )
                      }
                    >
                      <ListItemText> Export to Pdf </ListItemText>
                    </MenuItem>
                    <MenuItem
                      onClick={(event) =>
                        ExportDataIntoExcel("Lead List", "lead sheet")
                      }
                    >
                      <ListItemText> Export To excel </ListItemText>
                    </MenuItem>
                  </Menu>
                )}
              </Box>
            </Grid>

            {/* {displayAssignee && */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box
                sx={{
                  minWidth: 120,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <FormControl style={{ width: 250 }}>
                  <InputLabel id="demo-simple-select-label">
                    Assignee
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={assignee}
                    onChange={handleChange}
                    label="Assignee"
                    displayEmpty
                    size="small"
                  >
                    <MenuItem value={""} disabled>
                      Select assignee{" "}
                    </MenuItem>

                    <MenuItem value={user?.sub}>Assign to me</MenuItem>

                    {userData.length > 0 &&
                      userData.map((value: any, index: any) => {
                        return (
                          <MenuItem value={value} key={index}>
                            {value.userName}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
                <Box
                  sx={
                    {
                      // display: "flex",
                      // alignItems: "center",
                      // justifyContent: "right",
                      // gap: 1,
                    }
                  }
                >
                  {displayAssignee && assignee ? (
                    <Button
                      variant="contained"
                      style={{ background: "#F9A43F" }}
                      onClick={handleAssign}
                    >
                      Assign
                    </Button>
                  ) : (
                    // light red color and disable assign button
                    <Button
                      variant="contained"
                      disabled
                      style={{ background: "#F9A43F", color: "white" }}
                      onClick={handleAssign}
                    >
                      Assign
                    </Button>
                  )}
                </Box>
              </Box>
            </Grid>
            {/* } */}

            <Grid
              textAlign={"right"}
              size={{ xs: 12, sm: 4 }}
              display="flex"
              alignItems={"center"}
              justifyContent={"right"}
              gap="15px"
              flexWrap="wrap"
            >
              <Grid container>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "right",
                    gap: 1,
                  }}
                >
                  <Grid textAlign={"center"} size={{ xs: 12, sm: 6 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "right",
                        gap: 1,
                      }}
                    >
                      <FormControl size="small" sx={{ minWidth: 200 }}>
                        <InputLabel>Filter By</InputLabel>
                        <Select
                          value={filterType}
                          onChange={handleFilterTypeChange}
                          displayEmpty
                          input={
                            <OutlinedInput
                              startAdornment={
                                <InputAdornment position="start">
                                  <IconFilter />
                                </InputAdornment>
                              }
                              label="Filter By"
                            />
                          }
                        >
                          <MenuItem value="">Filter By</MenuItem>
                          <MenuItem value="agentName">Agent Name</MenuItem>
                          <MenuItem value="assignedTo">Assigned to</MenuItem>
                          <MenuItem value="leadApprovalStatus">
                            Lead Approval Status
                          </MenuItem>
                        </Select>
                      </FormControl>

                      {filterType &&
                        (filterType !== "leadApprovalStatus" ? (
                          <TextField
                            size="small"
                            placeholder={`Filter by ${filterType}`}
                            value={filterValue}
                            onChange={handleFilterValueChange}
                            sx={{ minWidth: 200 }}
                          />
                        ) : (
                          <FormControl size="small" sx={{ minWidth: 150 }}>
                            {/* <InputLabel>Lead Approval Status</InputLabel> */}
                            <Select
                              value={filterValue}
                              onChange={handleFilterValueChange}
                              displayEmpty
                            >
                              <MenuItem value="">Select Status</MenuItem>
                              <MenuItem value="1">Pending</MenuItem>
                              <MenuItem value="2">In Progress</MenuItem>
                              <MenuItem value="3">
                                First Level Approved
                              </MenuItem>
                              <MenuItem value="4">Final Approved</MenuItem>
                            </Select>
                          </FormControl>
                        ))}
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, sm: filterType ? 3 : 6 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "right",
                        gap: "10px",
                      }}
                    >
                      <Button
                        sx={{}}
                        size="small"
                        onClick={() => router.push("/admin/lead-creation")}
                        variant="contained"
                        startIcon={<IconPlus />}
                      >
                        Add Lead
                      </Button>
                    </Box>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <TableContainer
            sx={{
              // maxHeight: 440,
              border: "1px solid #ececec",
              borderRadius: "10px",
            }}
          >
            <Table
              stickyHeader
              aria-label="sticky table"
              size={dense ? "small" : "medium"}
            >
              <TableHead
                sx={{
                  width: "30px",
                  padding: "100px 0",
                  height: 60,
                }}
              >
                <TableRow>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #ececec",
                      backgroundColor: "#ececec",
                      // borderTop: "1px solid #0003",
                    }}
                    padding="checkbox"
                  >
                    <Checkbox
                      sx={{ color: "#0003" }}
                      indeterminate={
                        selected.length > 0 && selected.length < leadData.length
                      }
                      checked={
                        leadData.length > 0 &&
                        selected.length === leadData.length
                      }
                      onChange={() => {
                        if (selected.length === leadData.length) {
                          setSelected([]);
                        } else {
                          setSelected(
                            leadData.map((row: any, index: number) => index)
                          );
                        }
                      }}
                    />
                  </TableCell>
                  {Object.keys(showList).map((column, index) => (
                    <TableCell
                      key={index}
                      sx={{
                        borderBottom: "1px solid #ececec",
                        backgroundColor: "#ececec",
                        color: "black",
                        // borderTop: "1px solid #0003",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "14px",

                          "&:hover": { color: "black" },
                        }}
                        fontWeight={"bold"}
                      >
                        {column
                          .replace(/([a-z])([A-Z])/g, "$1 $2")
                          .replace(/^\w/, (c) => c.toUpperCase())}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {displayRows.map((row: any, index: any) => (
                  <TableRow hover key={index}>
                    <TableCell
                      sx={{
                        borderBottom: "1px solid #ececec",
                      }}
                      padding="checkbox"
                    >
                      <Checkbox
                        sx={{ color: "#0003" }}
                        checked={selected.indexOf(index) !== -1}
                        onChange={() => {
                          handleSelect(index);
                          setLeadIds([...leadIds, row?.LeadId]);
                          setLeadApprovedStatus([
                            ...leadApprovedSt,
                            row?.leadApprovalStatus + 1,
                          ]);
                        }}
                      />
                    </TableCell>
                    {Object.keys(showList).map((column: any, key: number) =>
                      column != "action" ? (
                        column == "leadApprovalStatus" ? (
                          <TableCell
                            sx={{
                              fontWeight: "500",
                              fontSize: "12px",
                              // height: 70,
                              color:
                                Number(row[column]) === 1
                                  ? "red"
                                  : Number(row[column]) === 2
                                    ? "blue"
                                    : Number(row[column]) === 3
                                      ? "blue"
                                      : Number(row[column]) === 4
                                        ? "green"
                                        : "black",
                              textAlign: "center",
                              borderBottom: "1px solid #ececec",
                            }}
                            key={key}
                          >
                            {Number(row[column]) === 1
                              ? "Pending"
                              : Number(row[column]) === 2
                                ? "In Progress"
                                : Number(row[column]) === 3
                                  ? "First Level Approved"
                                  : Number(row[column]) === 4
                                    ? "Final Approved"
                                    : ""}
                          </TableCell>
                        ) : column === "LeadId" ? (
                          <TableCell
                            sx={{
                              fontWeight: "500",
                              fontSize: "12px",
                              // height: 70,
                              color: "blue",
                              borderBottom: "1px solid #ececec",
                              "&:hover": { textDecoration: "under-line" },
                            }}
                            key={key}
                          >
                            <Link
                              href={`lead-listing/${row?.LeadId}`}
                              onClick={() => handleGoToLead(row)}
                              // style={{ textDecoration: "none" }}
                            >
                              {row[column]}
                            </Link>
                          </TableCell>
                        ) : column === "#" ? (
                          <TableCell
                            sx={{
                              fontWeight: "500",
                              fontSize: "12px",
                              // height: 70,
                              borderBottom: "1px solid #ececec",
                              "&:hover": { textDecoration: "under-line" },
                            }}
                            key={key}
                          >
                            {index + 1}
                          </TableCell>
                        ) : (
                          <TableCell
                            sx={{
                              fontWeight: "500",
                              fontSize: "12px",
                              // height: 70,
                              borderBottom: "1px solid #ececec",
                            }}
                            key={key}
                          >
                            {row[column]}
                          </TableCell>
                        )
                      ) : (
                        // eslint-disable-next-line react/jsx-key
                        <TableCell
                          key={key}
                          sx={{
                            display: "flex",
                            borderBottom: "1px solid #ececec",
                          }}
                        >
                          <div>
                            <Button
                              id="basic-button"
                              aria-controls={
                                openmenu ? "basic-menu" : undefined
                              }
                              aria-haspopup="true"
                              aria-expanded={openmenu ? "true" : undefined}
                              onClick={(e) => handleClick(e, row)}
                            >
                              <IconButton
                                sx={{
                                  border: "1px solid #ececec",
                                  borderRadius: "10px",
                                  mr: 1,
                                }}
                              >
                                <IconDotsVertical fontSize={"12px"} />
                              </IconButton>
                            </Button>
                            <Menu
                              id="basic-menu"
                              anchorEl={anchorEl}
                              open={openmenu}
                              onClose={handleClosee}
                              MenuListProps={{
                                "aria-labelledby": "basic-button",
                              }}
                            >
                              {/* `/lead/${leadId}` */}
                              <MenuItem
                                sx={{ display: "flex" }}
                                onClick={() =>
                                  router.push(
                                    `/admin/lead-listing/${ele.LeadId}`
                                  )
                                }
                              >
                                <Box
                                  style={{
                                    listStyleType: "none",
                                    textDecoration: "none",
                                    display: "flex",
                                  }}
                                >
                                  <ListItemIcon>
                                    <IconEyeFilled width={20} />{" "}
                                  </ListItemIcon>
                                  <ListItemText>View Details </ListItemText>
                                </Box>
                              </MenuItem>
                              <MenuItem
                                onClick={() => handleEditLead(row.LeadId)}
                                sx={{ display: "flex" }}
                              >
                                <ListItemIcon>
                                  <IconEdit width={20} />{" "}
                                </ListItemIcon>
                                <ListItemText> Edit Details </ListItemText>
                              </MenuItem>
                            </Menu>
                          </div>

                          {/* <IconButton
                            sx={{
                              border: "1px solid #ececec",
                              borderRadius: "10px",
                              mr: 1,
                            }}
                            onClick={() => {
                              handleViewLead(row.LeadId);
                              setSelected([index]);
                            }}
                          >
                            <IconEyeFilled />
                          </IconButton> */}

                          {/* <IconButton
                            sx={{
                              border: "1px solid #ececec",
                              borderRadius: "10px",
                              mr: 1,
                            }}
                          >
                            <IconEdit
                              onClick={() => handleEditLead(row.LeadId)}
                            />
                          </IconButton> */}

                          {row["leadApprovalStatus"] !== 1 &&
                            row["leadApprovalStatus"] !== 2 &&
                            row["leadApprovalStatus"] !== 4 &&
                            user?.sub?.leadApprovalPermissions &&
                            user?.sub?.leadApprovalPermissions.finalApproval ===
                              1 && (
                              <IconButton
                                sx={{
                                  border: "1px solid #ececec",
                                  borderRadius: "10px",
                                  mr: 1,
                                }}
                                onClick={() => {
                                  setAssignData({
                                    id: row.LeadId,
                                    status: row["leadApprovalStatus"],
                                  });
                                  setSelected([index]);
                                  handleClickOpen();
                                }}
                              >
                                <IconFileLike />
                              </IconButton>
                            )}
                          {row["leadApprovalStatus"] !== 1 &&
                            row["leadApprovalStatus"] !== 3 &&
                            row["leadApprovalStatus"] !== 4 &&
                            user?.sub?.leadApprovalPermissions &&
                            user?.sub?.leadApprovalPermissions.firstApprovel ===
                              1 && (
                              <IconButton
                                sx={{
                                  border: "1px solid #ececec",
                                  borderRadius: "10px",
                                  mr: 1,
                                }}
                                onClick={() => {
                                  setAssignData({
                                    id: row.LeadId,
                                    status: row["leadApprovalStatus"],
                                  });
                                  setSelected([index]);
                                  handleClickOpen();
                                }}
                              >
                                <IconFileLike />
                              </IconButton>
                            )}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: 1,
              }}
            >
              <Typography>
                Showing 1 to {leadData.length} of {leadData.length} entries
              </Typography>
            </Box>
            <CustomPaginationNumber
              count={leadData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Grid2>
      </Grid2>

      {openEditLeadDialog && (
        <Dialog
          open={openEditLeadDialog}
          onClose={() => setOpenEditLeadDialog(false)}
          aria-labelledby="scroll-dialog-title"
          maxWidth="lg"
          // sx={{maxWidth:"sm"}}
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle>
            <Typography variant="h4">Edit Lead Details</Typography>
          </DialogTitle>

          <DialogContent>
            <List>
              <LeadListEditModal
                editLead={editLead}
                setEditLead={setEditLead}
                setOpenEditdialog={setOpenEditLeadDialog}
                propertyData={propertyData}
                getUser={getUser}
              />
            </List>
          </DialogContent>
        </Dialog>
      )}
      {open && (
        <ConfirmApprovalModal
          open={open}
          setOpen={setOpen}
          assignData={assignData}
          handleApprovedLead={handleApprovedLead}
        />
      )}
    </Box>
  );
};

export default DataTable;
