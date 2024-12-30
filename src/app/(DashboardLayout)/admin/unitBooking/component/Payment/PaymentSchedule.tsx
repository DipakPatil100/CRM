import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import PaymentScheduleForm from "./PaymentScheduleForm";
import { getData } from "@/services/apiService";

const PaymentSchedule = ({
  tabledata,
  setTabledata,
  setFinalData,
  finalData,
  tabIndex,
  setTabIndex,
}: any) => {
  const [openSchedule, setOpenSchedule] = useState(false);
  const [paymentStage, setpaymentStage] = useState([]);
  const handleOpenDialog = () => {
    setOpenSchedule(true);
  };

  useEffect(() => {
    const getMDMDATA = async () => {
      const response = await getData("/v1/mdm-master/get/15");
      console.log(response, "MDM");
      setpaymentStage(response?.data[0]?.data);
    };

    getMDMDATA();
  }, []);

  console.log(tabledata, "tabledata DATA");
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Payment Schedule
        </Typography>
        <Button onClick={handleOpenDialog} variant="outlined">
          Add Payment Schedule
        </Button>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box>
            {tabledata.length === 0 ? (
              <Box textAlign={"center"}>No Records Found!</Box>
            ) : (
              <TableContainer
                sx={{
                  maxHeight: 900,
                  border: "1px solid #ececec",
                  borderRadius: "10px",
                }}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      {[
                        "S.No.",
                        "Stage",
                        "Overheads",
                        "Date",
                        "%",
                        "Base Amount",
                        "Tax Amount",
                        "Net Amount",
                        "Adjusted Amount",
                        "Remark",
                      ].map((header, index) => (
                        <TableCell
                          key={index}
                          sx={{
                            borderBottom: "1px solid #ececec",
                            // backgroundColor: "#f9fbfc",
                            fontWeight: "bold",
                            fontSize: "14px",
                          }}
                        >
                          {header}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {tabledata.map((row: any, index: number) => (
                      <TableRow hover key={index}>
                        <TableCell
                          sx={{
                            borderBottom: "1px solid #ececec",
                            fontWeight: 500,
                          }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "1px solid #ececec" }}>
                          {row.stage}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "1px solid #ececec" }}>
                          {row.overHead}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "1px solid #ececec" }}>
                          {row.date}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "1px solid #ececec" }}>
                          {row.percentage}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "1px solid #ececec" }}>
                          {row.baseAmount}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "1px solid #ececec" }}>
                          {row.taxAmount}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "1px solid #ececec" }}>
                          {row.netAmount}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "1px solid #ececec" }}>
                          {row.adjustedAmount}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "1px solid #ececec" }}>
                          {row.remark}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>

          <Button
            variant="outlined"
            color="primary"
            onClick={() => setTabIndex((prev: any) => prev - 1)}
            sx={{ mr: 2, mt:2 }}
          >
            Back
          </Button>
        </Grid>
      </Grid>

      <Dialog
        maxWidth="md"
        open={openSchedule}
        onClose={() => setOpenSchedule(false)}
      >
        <DialogTitle>Add Payment Schedules</DialogTitle>
        <DialogContent>
          <PaymentScheduleForm
            setTabledata={setTabledata}
            tabledata={tabledata}
            closeDialog={setOpenSchedule}
            paymentStage={paymentStage}
            setpaymentStage={setpaymentStage}
            finalData={finalData}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentSchedule;
