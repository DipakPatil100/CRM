"use client";
import {
  Box,
  IconButton,
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IconX } from "@tabler/icons-react";
import axios from "axios";
import LeadDynamicTable from "@/components/DynamicTable/LeadDynamicTable";
import BookingTable from "@/components/DynamicTable/BookingTable";
import { useRouter } from "next/navigation";
import PaymentScheduleView from "./PaymentScheduleView";

interface HeadCell<T> {
  id: any;
  numeric: boolean;
  label: string;
}

interface Data {
  id: number;
  projectName: string;
  ownership: string;
  location: string;
  furnishing: string;
  action: string;
}

const headCells: HeadCell<Data>[] = [
  { id: "id", numeric: true, label: "Sr. No." },
  { id: "applicationNo", numeric: true, label: "Application ID" },
  { id: "bookingId", numeric: true, label: "Booking ID" },
  { id: "unitType", numeric: false, label: "Unit Type" },
  { id: "unitCost", numeric: true, label: "Unit Cost" },
  { id: "location", numeric: true, label: "Location" },
  { id: "saleRate", numeric: true, label: "Sale Rate" },
  { id: "basicRate", numeric: true, label: "Basic Rate" },
  { id: "loanFromBank", numeric: true, label: "Loan From Bank" },
  { id: "paymentPlan", numeric: true, label: "Payment Plan" },
  // { id: "remark", numeric: true, label: "Remark" },
  { id: "action", numeric: true, label: "Action" },
];

const BookingList = ({ bookingData }: any) => {
  const [rows, setRows] = useState<any[]>([]);
  const [openLeadDialog, setOpenLeadDialog] = useState(false);
  const [singleLead, setSingleLead] = useState<any>([]);
  const [editDialog, setEditDialog] = useState(false);
  const [editData, setEditData] = useState<any>([]);

  const router = useRouter();

  useEffect(() => {
    setRows(bookingData?.data);
  }, []);

  console.log(rows, "ROWWWW");

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={openLeadDialog ? 8 : 12}>
          <BookingTable
            rows={rows}
            headCells={headCells}
            title="Property List"
            enableSelect={true}
            enablePagination={true}
            enableSorting={true}
            openLeadDialog={openLeadDialog}
            setOpenLeadDialog={setOpenLeadDialog}
            singleLead={singleLead}
            setSingleLead={setSingleLead}
            setEditDialog={setEditDialog}
            editDialog={editDialog}
            editData={editData}
            setEditData={setEditData}
          />
        </Grid>

        {openLeadDialog && (
          <Grid item xs={12} md={4} sx={{ height: "100%" }}>
            {singleLead.map((property: any) => (
              <Card
                key={property.id}
                sx={{ height: "100%", p: 2, overflowY: "scroll" }}
              >
                <CardContent sx={{ overflowY: "auto" }}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="h5">Unit Details</Typography>
                    <IconButton onClick={() => setOpenLeadDialog(false)}>
                      <IconX />
                    </IconButton>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Stack spacing={2}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ bgcolor: "#1976d2" }}>
                        {/* {property.projectName[0]} */}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {property.projectName}
                        </Typography>
                        <Typography variant="body2">
                          Booking Code: {property.bookingId}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider />
                    <>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Booking Details
                      </Typography>
                      <Grid container spacing={1}>
                        <>
                          <Grid item xs={6}>
                            <Typography fontWeight="bold">
                              Basic Rate:
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography>{property.basicRate}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography fontWeight="bold">Area/Diff</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography>{property.areaOrDiffArea}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography fontWeight="bold">Floor</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography>{property.floor}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography fontWeight="bold">
                              Load from Bank
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography>{property.loanFromBank}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography fontWeight="bold">
                              Load from Bank
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography>{property.loanFromBank}</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography fontWeight="bold">
                              Payment Schedule
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            {/* <Typography>{property.paymentSchedule}</Typography> */}
                            <PaymentScheduleView paymentData={property?.paymentSchedule}/>
                          </Grid>
                        </>
                      </Grid>
                    </>

                    <Divider />

                    {property?.coApplicants.length !== 0 && (
                      <>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          Co Applicant Details
                        </Typography>
                        <Grid container spacing={1}>
                          {property?.coApplicants.map((coApp: any) => {
                            return (
                              <>
                                <Grid item xs={6}>
                                  <Typography fontWeight="bold">
                                    Relation:
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography>{coApp.relation}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography fontWeight="bold">
                                    Co-Applicant Name:
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography>{coApp.applicantName}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography fontWeight="bold">
                                    Co-Applicant Email:
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography>{coApp.customerEmail}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography fontWeight="bold">
                                    Co-Applicant Mobile:
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography>{coApp.mobileNo}</Typography>
                                </Grid>
                              </>
                            );
                          })}
                        </Grid>
                      </>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default BookingList;
