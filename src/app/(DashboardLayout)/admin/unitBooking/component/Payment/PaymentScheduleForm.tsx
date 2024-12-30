import Grid from "@mui/material/Grid2";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { CustomInputLabel } from "@/utils/CustomComponents/InputLabel";
import { previousDay } from "date-fns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { putData } from "@/services/apiService";
import { enqueueSnackbar } from "notistack";

import { useTransition } from "react";

const paymentFields = {
  stage: "",
  overHead: "",
  date: "",
  percentage: "",
  baseAmount: "",
  taxAmount: "",
  netAmount: "",
  adjustedAmount: "",
  // remark: "",
};

const PaymentScheduleForm = ({
  setTabledata,
  tabledata,
  closeDialog,
  paymentStage,
  setpaymentStage,
  finalData,
}: any) => {
  const [payment, setPayment] = useState<any>(paymentFields);
  const [error, setError] = useState<any>({});
  const handlePaymentchange = (e: any) => {
    const { name, value } = e.target;

    setPayment((prev: any) => {
      return { ...prev, [name]: value };
    });
  };

  const handhelAddPaymentData = async (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;

    // if (tabledata.map((ele: any) => ele.stage === value)) {
    //   const updatedData = paymentStage.filter((e: any) => e.stage !== tabledata.map((E:any)=> E.stage));

    //   console.log(updatedData, "updatedData");
    //   setpaymentStage(updatedData);
    // }

    const newErrors: any = {};

    Object.entries(payment).forEach(([key, value]: any) => {
      if (typeof value === "string" && value.trim() === "") {
        newErrors[key] = "This field is required";
        return;
      } else if (value === null || value === undefined) {
        newErrors[key] = "This field is required";
        return;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    } else {
      try {
        const response: any = await putData(
          `/v1/booking/add/${finalData?.applicationNo}`,
          payment
        );
        console.log(response, "resss");
        if (response && !response.data.error) {
          enqueueSnackbar(response.message, { variant: "success" });
        } else {
          enqueueSnackbar(response.message, { variant: "error" });
          return;
        }
        localStorage.removeItem("unitStepper")
      } catch (error) {
        console.log(error, "error");
        enqueueSnackbar("Something Went Wrong", { variant: "error" });
        return;
      }
      setTabledata((prev: any) => {
        return [...prev, { ...payment }];
      });
      closeDialog();
    }
  };

  const handleChangeDate = (newValue: any, name: any) => {
    const formattedDate = newValue ? dayjs(newValue).format("DD-MM-YYYY") : "";
    setPayment((prev: any) => ({
      ...prev,
      [name]: formattedDate,
    }));
  };

  const handleUnitDesSelect = (e: any, value: any) => {
    console.log(e.target.name, "NAMEEEEEEEEEEEEEEEEE");

    // if (e.target.name === "stage") {
    if (tabledata.map((ele: any) => ele.stage === value)) {
      console.log("STAGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGgg");

      const updatedData = paymentStage.filter((e: any) => e.stage !== value);

      console.log(updatedData, "updatedData");
      setpaymentStage(updatedData);
    }

    if (value) {
      setPayment((prev: any) => {
        return { ...prev, stage: value };
      });
    } else {
      setPayment((prev: any) => {
        return prev;
      });
    }
  };


  return (
    <Box component={"form"} onSubmit={handhelAddPaymentData}>
      <PaymentForm
        handleUnitDesSelect={handleUnitDesSelect}
        payment={payment}
        handlePaymentchange={handlePaymentchange}
        handleChangeDate={handleChangeDate}
        error={error}
        paymentStage={paymentStage}
      />
      <Box mt={2}>
        <Button type="submit" variant="contained">
          Add
        </Button>
        <Button variant="outlined" sx={{ ml: 2 }} onClick={() => closeDialog()}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentScheduleForm;

function PaymentForm({
  handleUnitDesSelect,
  payment,
  handlePaymentchange,
  handleChangeDate,
  paymentStage,error
}: any) {
  return (
    <Grid container spacing={2}>
      <Grid
        size={{
          sm: 12,
          md: 6,
        }}
      >
        <CustomInputLabel>Stage</CustomInputLabel>
        <Autocomplete
          options={paymentStage.map((property: any) => property.stage)}
          onChange={handleUnitDesSelect}
          value={payment?.stage}
          size="small"
          renderInput={(params) => (
            <TextField
              name="stage"
              {...params} // label="Application Number"
              placeholder="Select Application No"
            />
          )}
          disabled={
            payment.stage ===
            paymentStage.map((property: any) => property.stage)
              ? true
              : false
          }
        />
      </Grid>
      <Grid
        size={{
          sm: 12,
          md: 6,
        }}
      >
        <CustomInputLabel>Overhead</CustomInputLabel>
        <TextField
          placeholder="Overhead"
          fullWidth
          size="small"
          name="overHead"
          value={payment.overHead || ""}
          onChange={handlePaymentchange}
          error={!!error.overHead}
          helperText={error.overHead}
        />
      </Grid>
      <Grid
        size={{
          sm: 12,
          md: 6,
        }}
      >
        <CustomInputLabel>Date</CustomInputLabel>
        {/* <TextField
       placeholder="Date"
       fullWidth
       size="small"
       name="date"
       value={payment.date || ""}
       onChange={handlePaymentchange}
      /> */}
        <DatePicker
          onChange={(newValue) => handleChangeDate(newValue, "date")} // value={formData?.dateOfBirth}
          // defaultValue={formData?.dateOfBirth || {}}
          format="DD-MM-YYYY"
          name="date"
          slots={{
            textField: (textFieldProps: any) => (
              <TextField
                {...textFieldProps}
                size="small"
                sx={{
                  width: "100%",
                }}
                error={!!error.date}
                helperText={error.date}
              />
            ),
          }}
        />
      </Grid>
      <Grid
        size={{
          sm: 12,
          md: 6,
        }}
      >
        <CustomInputLabel>Percentage</CustomInputLabel>
        <TextField
          placeholder="Percentage"
          fullWidth
          size="small"
          name="percentage"
          value={payment.percentage || ""}
          onChange={handlePaymentchange}
          error={!!error.percentage}
          helperText={error.percentage}
        />
      </Grid>
      <Grid
        size={{
          sm: 12,
          md: 6,
        }}
      >
        <CustomInputLabel>Base Amount</CustomInputLabel>
        <TextField
          placeholder="Base Amount"
          fullWidth
          size="small"
          name="baseAmount"
          value={payment.baseAmount || ""}
          onChange={handlePaymentchange}
          error={!!error.baseAmount}
          helperText={error.baseAmount}
        />
      </Grid>
      <Grid
        size={{
          sm: 12,
          md: 6,
        }}
      >
        <CustomInputLabel>Tax Amount</CustomInputLabel>
        <TextField
          placeholder="Tax Amount"
          fullWidth
          size="small"
          name="taxAmount"
          value={payment.taxAmount || ""}
          onChange={handlePaymentchange}
          error={!!error.taxAmount}
          helperText={error.taxAmount}
        />
      </Grid>
      <Grid
        size={{
          sm: 12,
          md: 6,
        }}
      >
        <CustomInputLabel>Net Amount</CustomInputLabel>
        <TextField
          placeholder="Net Amount"
          fullWidth
          size="small"
          name="netAmount"
          value={payment.netAmount || ""}
          onChange={handlePaymentchange}
          error={!!error.netAmount}
          helperText={error.netAmount}
        />
      </Grid>
      <Grid
        size={{
          sm: 12,
          md: 6,
        }}
      >
        <CustomInputLabel>Adjusted Amount</CustomInputLabel>
        <TextField
          placeholder="Adjusted Amount"
          fullWidth
          size="small"
          name="adjustedAmount"
          value={payment.adjustedAmount || ""}
          onChange={handlePaymentchange}
          error={!!error.adjustedAmount}
          helperText={error.adjustedAmount}
        />
      </Grid>
    </Grid>
  );
}
