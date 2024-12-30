/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Typography,
  InputLabel,
  Box,
  Button,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { CustomInputLabel } from "@/utils/CustomComponents/InputLabel";
import DiscountCalculator from "./DiscountCalculator";
import { postData } from "@/services/apiService";
import { enqueueSnackbar } from "notistack";
import { exceptThisSymbols, hideArrowUpDown } from "@/utils/validation";

const General = ({
  leadData,
  generalData,
  setGeneralData,
  propertyData,
  finalData,
  setFinalData,
  setTabIndex,
  tabIndex,
  setDiscount,
  discount,
  setBasicRate,
  basicRate,
  rate,
  setRate,
  netAmount,
}: any) => {
  const [genErrors, setgenErrors] = useState<any>({});
  //  const [discount, setDiscount] = useState({
  //     rate:"0.00",
  //     amount:"0.00"
  //   });
  const [area, setArea] = useState<any>({});
  const [floors, setFloors] = useState<any>([]);

  // const rate =
  //   Number(generalData?.areaOrDiffArea) * Number(generalData?.basicRate);
  //   console.log(rate, 'rete')
  // const [rowTables, setRowTable] = useState([
  //   { Head: "Gross Amount", Rate: "0.00", Amount: "0.00" },
  //   { Head: "Discount", Rate: "0.00", Amount: "0.00" },
  //   { Head: "Basic Sale Price", Rate: "0.00", Amount: "0.00" },
  //   { Head: "ED and ID Charges", Rate: "0.00", Amount: "0.00" },
  //   { Head: "Club Membership", Rate: "0.00", Amount: "0.00" },
  //   { Head: "Scooter Parking Charges", Rate: "0.00", Amount: "0.00" },
  //   { Head: "Total Cost", Rate: "0.00", Amount: "0.00" },
  //   { Head: "Net Amount", Rate: "0.00", Amount: "0.00" },
  // ]);
  const rowTable = [
    {
      Head: "Gross Amount",
      Rate: generalData?.areaOrDiffArea ? generalData?.areaOrDiffArea : 0,
      Amount: generalData?.basicRate ? rate.toFixed(2) : 0,
    },
    {
      Head: "Discount",
      Rate: Number(discount?.rate),
      Amount: Number(discount?.amount),
    },
    {
      Head: "Basic Sale Price",
      Rate: "0.00",
      Amount: generalData?.basicRate ? Number(basicRate).toFixed(2) : 0,
    },
    {
      Head: "ED and ID Charges",
      Rate: "0.00",
      Amount: 40000,
    },
    {
      Head: "Club Membership",
      Rate: "0.00",
      Amount: 30000,
    },
    {
      Head: "Scooter Parking Charges",
      Rate: "0.00",
      Amount: 25000,
    },
    {
      Head: "Total Cost",
      Rate: "0.00",
      Amount: 95000,
    },
    {
      Head: "Net Amount",
      Rate: "",
      Amount: netAmount,
    },
  ];
  // const [generalData, setInputData] = useState<any>({});

  const inputHandler: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    console.log(name, value, "INPUT HANDLE");

    setFinalData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
    setGeneralData((prev: any) => {
      const updatedData = {
        ...prev,
        [name]: value,
      };

      // Specifically update the areaOrDiffArea based on selectArea change
      if (name === "selectArea") {
        const selectedArea = value;
        const areaValue = area[selectedArea];
        updatedData.areaOrDiffArea = areaValue || 0; // Default to 0 if areaValue is undefined
      }

      return updatedData;
    });
    setgenErrors({ ...genErrors, [name]: "" });

    // const updatedArea =
    //   name === "areaOrDiffArea"
    //     ? Number(value)
    //     : Number(generalData?.areaOrDiffArea || 0);
    // const updatedRate =
    //   name === "basicRate"
    //     ? Number(value)
    //     : Number(generalData?.basicRate || 0);
    // const updatedGrossAmount = updatedArea * updatedRate;

    // const newTable: any = [
    //   {
    //     Head: "Gross Amount",
    //     Rate: updatedArea || 0.0,
    //     Amount: updatedGrossAmount ? updatedGrossAmount.toFixed(2) : "0.00",
    //   },
    //   { Head: "Discount", Rate: "0.00", Amount: "0.00" },
    //   {
    //     Head: "Basic Sale Price",
    //     Rate: "0.00",
    //     Amount: updatedGrossAmount ? updatedGrossAmount.toFixed(2) : "0.00",
    //   },
    //   { Head: "ED and ID Charges", Rate: "0.00", Amount: "40000" },
    //   { Head: "Club Membership", Rate: "0.00", Amount: "30000" },
    //   { Head: "Scooter Parking Charges", Rate: "0.00", Amount: "25000" },
    //   {
    //     Head: "Total Cost",
    //     Rate: "0.00",
    //     Amount: updatedGrossAmount
    //       ? (updatedGrossAmount + 95000).toFixed(2)
    //       : "",
    //   },
    //   {
    //     Head: "Net Amount",
    //     Rate: "0.00",
    //     Amount: updatedGrossAmount
    //       ? (updatedGrossAmount + 95000).toFixed(2)
    //       : "",
    //   },
    // ];

    // setRowTable(newTable);
  };

  const handleChangeDate = (newValue: any, name: any) => {
    const formattedDate = newValue ? dayjs(newValue).format("DD-MM-YYYY") : "";
    setGeneralData((prev: any) => ({
      ...prev,
      [name]: formattedDate,
    }));
  };

  const handleUnitDesSelect = (event: any, value: any) => {
    if (value) {
      const unit = propertyData.data.find((item: any) =>
        item.unitDescription.includes(value)
      );

      console.log(unit, "UNITTT");
      setFloors(unit.floors);
      setGeneralData((prev: any) => {
        return {
          ...prev,
          unitDescription: unit?.unitDescription || "",
          unitCode: unit?.unitCode || "",
          unitCategory: unit?.unitCategory || "",
          finalizedArea: unit?.finalizedArea || [],
        };
      });
      setArea({
        builtArea: unit?.builtArea,
        superBuiltArea: unit?.superBuiltArea,
        captureArea: unit?.captureArea,
      });
      setgenErrors((prev: any) => {
        return {
          ...prev,
          unitDescription: "",
          unitCode: "",
          unitCategory: "",
        };
      });
    } else {
      setGeneralData((prev: any) => ({
        ...prev,
        unitDescription: "",
        unitCode: "",
        unitCategory: "",
        floor: [],
        finalizedArea: [],
      }));
    }
  };

  const handleSubmitGeneral = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: any = {};

    Object.entries(generalData).forEach(([key, value]: [string, any]) => {
      if (key === "remark" || key === "bankName" || key === "loanAmount") {
        return;
      }
      if (typeof value === "string" && value.trim() === "") {
        newErrors[key] = "This field is required";
      } else if (value === null || value === undefined) {
        newErrors[key] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setgenErrors(newErrors);
      return;
    } else {
      setgenErrors({});
    }

    try {
      const res = await postData("/v1/booking/create", finalData);

      if (res) enqueueSnackbar("Successfully Saved!", { variant: "success" });

      setTabIndex((prev: any) => prev + 1);
    } catch (error) {
      console.error(error, "Error in General Data Submission");
    }
  };

  // useEffect(() => {
  //   if (!generalData?.unitDescription && propertyData?.data) {
  //     setGeneralData((prev: any) => ({
  //       ...prev,
  //       unitDescription: propertyData?.data[0]?.unitDescription || "",
  //     }));
  //   }
  // }, [propertyData, generalData]);

  useEffect(() => {
    setRate(
      Number(generalData?.areaOrDiffArea) * Number(generalData?.basicRate)
    );
    setBasicRate(
      Number(generalData?.areaOrDiffArea) * Number(generalData?.basicRate)
    );
  }, [generalData?.areaOrDiffArea, generalData?.basicRate]);

  console.log(generalData, "generalData");

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        General Details
      </Typography>
      <Box component={"form"} onSubmit={handleSubmitGeneral}>
        <Grid
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          // sx={{ border: "1px solid #ccc", p: 2, borderRadius: 2 }}
          container
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <Grid
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              sx={{ border: "1px solid #ccc", p: 2, borderRadius: 2 }}
              container
            >
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>
                  Unit Description
                </CustomInputLabel>
                <Autocomplete
                  options={propertyData.data.map(
                    (property: any) => property.unitDescription
                  )}
                  onChange={handleUnitDesSelect}
                  size="small"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      value={generalData?.unitDescription || null}
                      name="unitDescription"
                      // label="Application Number"
                      placeholder="Select Application No"
                      error={!!genErrors?.unitDescription}
                      helperText={genErrors?.unitDescription}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>
                  Unit Code
                </CustomInputLabel>
                <TextField
                  placeholder="Unit Code"
                  fullWidth
                  size="small"
                  name="unitCode"
                  value={generalData.unitCode || ""}
                  onChange={inputHandler}
                  error={!!genErrors?.unitCode}
                  helperText={genErrors?.unitCode}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>
                  Unit Category
                </CustomInputLabel>
                <TextField
                  placeholder="Unit Category"
                  fullWidth
                  size="small"
                  name="unitCategory"
                  value={generalData.unitCategory || ""}
                  onChange={inputHandler}
                  error={!!genErrors?.unitCategory}
                  helperText={genErrors?.unitCategory}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>Floor</CustomInputLabel>
                <Select
                  size="small"
                  fullWidth
                  onChange={inputHandler}
                  error={!!genErrors?.floor}
                  value={generalData?.floor || ""}
                  name="floor"
                >
                  {floors.map((floor: string, i: number) =>
                    floor === "Floors not available" ? (
                      <MenuItem value={floor} disabled key={i}>
                        {floor}
                      </MenuItem>
                    ) : (
                      <MenuItem value={floor} key={i}>
                        {floor}
                      </MenuItem>
                    )
                  )}
                </Select>
                <FormHelperText sx={{ color: "#FA896B" }}>
                  {genErrors?.floor}
                </FormHelperText>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>
                  Location
                </CustomInputLabel>
                <TextField
                  placeholder="Location"
                  fullWidth
                  size="small"
                  name="location"
                  value={generalData.location || ""}
                  onChange={inputHandler}
                  error={!!genErrors?.location}
                  helperText={genErrors?.location}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>
                  Basic Rate
                </CustomInputLabel>
                <TextField
                  placeholder="Basic Rate"
                  fullWidth
                  size="small"
                  name="basicRate"
                  type="number"
                  onKeyDown={(e) =>
                    exceptThisSymbols.includes(e.key) && e.preventDefault()
                  }
                  sx={hideArrowUpDown}
                  value={generalData.basicRate || ""}
                  onChange={inputHandler}
                  error={!!genErrors?.basicRate}
                  helperText={genErrors?.basicRate}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>
                  Select Area
                </CustomInputLabel>
                <Select
                  onChange={inputHandler}
                  name="selectArea"
                  size="small"
                  fullWidth
                  error={!!genErrors?.selectArea}
                >
                  <MenuItem value={"builtArea"}>BuiltArea (sq. ft.)</MenuItem>
                  <MenuItem value={"superBuiltArea"}>
                    SuperBuiltArea (sq. ft.)
                  </MenuItem>
                  <MenuItem value={"carpetArea"}>
                    Carpet Area (sq. ft.)
                  </MenuItem>
                </Select>
                <FormHelperText sx={{ color: "#FA896B" }}>
                  {genErrors?.selectArea}
                </FormHelperText>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>
                  Area/Diff. Area
                </CustomInputLabel>
                <TextField
                  placeholder="Area/Diff.area"
                  fullWidth
                  // type="number"
                  // onKeyDown={(e) =>
                  //   exceptThisSymbols.includes(e.key) && e.preventDefault()
                  // }
                  // sx={hideArrowUpDown}
                  size="small"
                  name="areaOrDiffArea"
                  value={
                    generalData?.selectArea === "builtArea"
                      ? Number(area.builtArea)
                      : generalData?.selectArea === "superBuiltArea"
                        ? Number(area.superBuiltArea)
                        : generalData?.selectArea === "carpetArea"
                          ? Number(area.captureArea)
                          : ""
                  }
                  onChange={inputHandler}
                  error={!!genErrors?.areaOrDiffArea}
                  helperText={genErrors?.areaOrDiffArea}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>Phase</CustomInputLabel>
                <TextField
                  placeholder=" Phase"
                  fullWidth
                  size="small"
                  type="text"
                  name="phase"
                  value={generalData.phase || ""}
                  onChange={inputHandler}
                  error={!!genErrors?.phase}
                  helperText={genErrors?.phase}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>
                  Price List
                </CustomInputLabel>
                <TextField
                  placeholder=" Price List"
                  fullWidth
                  size="small"
                  type="number"
                  onKeyDown={(e) =>
                    exceptThisSymbols.includes(e.key) && e.preventDefault()
                  }
                  sx={hideArrowUpDown}
                  name="priceList"
                  value={generalData.priceList || ""}
                  onChange={inputHandler}
                  error={!!genErrors?.priceList}
                  helperText={genErrors?.priceList}
                />
              </Grid>

              {/* <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel>Sale Rate</CustomInputLabel>
                <TextField
                  placeholder="Sale Rate"
                  fullWidth
                  type="number"
                  onKeyDown={(e) =>
                    exceptThisSymbols.includes(e.key) && e.preventDefault()
                  }
                  sx={hideArrowUpDown}
                  size="small"
                  name="saleRate"
                  value={generalData.saleRate || ""}
                  onChange={inputHandler}
                  error={!!genErrors?.saleRate}
                  helperText={genErrors?.saleRate}
                />
              </Grid> */}

              {/* <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel>Unit Cost</CustomInputLabel>
                <TextField
                  placeholder="Unit Cost"
                  fullWidth
                  type="number"
                  onKeyDown={(e) =>
                    exceptThisSymbols.includes(e.key) && e.preventDefault()
                  }
                  sx={hideArrowUpDown}
                  size="small"
                  name="unitCost"
                  value={generalData.unitCost || ""}
                  onChange={inputHandler}
                  error={!!genErrors?.unitCost}
                  helperText={genErrors?.unitCost}
                />
              </Grid> */}

              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>
                  Loan from Bank
                </CustomInputLabel>
                {/* <TextField
                  placeholder="Loan From Bank"
                  fullWidth
                  size="small"
                  name="loanFromBank"
                  value={generalData.loanFromBank || ""}
                  onChange={inputHandler}
                  error={!!genErrors?.loanFromBank}
                  helperText={genErrors?.loanFromBank}
                /> */}
                <Select
                  onChange={inputHandler}
                  name="loanFromBank"
                  size="small"
                  fullWidth
                  error={!!genErrors?.loanFromBank}
                >
                  <MenuItem value={"Y"}>Yes</MenuItem>
                  <MenuItem value={"N"}>No</MenuItem>
                </Select>
                <FormHelperText sx={{ color: "#FA896B" }}>
                  {genErrors?.loanFromBank}
                </FormHelperText>
              </Grid>

              {generalData?.loanFromBank === "Y" && (
                <>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <CustomInputLabel reqiredField={false}>
                      Bank Name
                    </CustomInputLabel>
                    <TextField
                      placeholder="Bank Name"
                      fullWidth
                      type="text"
                      size="small"
                      name="bankName"
                      value={generalData.bankName || ""}
                      onChange={inputHandler}
                      error={!!genErrors?.bankName}
                      helperText={genErrors?.bankName}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <CustomInputLabel reqiredField={false}>
                      Loan Amount
                    </CustomInputLabel>
                    <TextField
                      placeholder="Loan Amount"
                      fullWidth
                      type="number"
                      size="small"
                      onKeyDown={(e) =>
                        exceptThisSymbols.includes(e.key) && e.preventDefault()
                      }
                      sx={hideArrowUpDown}
                      name="loanAmount"
                      value={generalData.loanAmount || ""}
                      onChange={inputHandler}
                      error={!!genErrors?.loanAmount}
                      helperText={genErrors?.loanAmount}
                    />
                  </Grid>
                </>
              )}

              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>
                  Loan Paper Submit Date
                </CustomInputLabel>
                <TextField
                  placeholder="Loan Paper Submit Date"
                  fullWidth
                  type="date"
                  size="small"
                  name="loanPaperSubmitDate"
                  value={generalData.loanPaperSubmitDate || ""}
                  onChange={inputHandler}
                  error={!!genErrors?.loanPaperSubmitDate}
                  helperText={genErrors?.loanPaperSubmitDate}
                />
                {/* <DatePicker
                  onChange={(newValue) =>
                    handleChangeDate(newValue, "loanPaperSubmitDate")
                  }
                  value={formData?.dateOfBirth}
                  // defaultValue={formData?.dateOfBirth || {}}
                  format="DD-MM-YYYY"
                  name="loanPaperSubmitDate"
                  slots={{
                    textField: (textFieldProps: any) => (
                      <TextField
                        {...textFieldProps}
                        size="small"
                        sx={{ width: "100%" }}
                        error={!!genErrors?.loanPaperSubmitDate}
                        helperText={genErrors?.loanPaperSubmitDate}
                      />
                    ),
                  }}
                /> */}
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>
                  Issue Date
                </CustomInputLabel>
                <TextField
                  placeholder="Issue Date"
                  fullWidth
                  size="small"
                  type="date"
                  name="issueDate"
                  value={generalData.issueDate || ""}
                  onChange={inputHandler}
                  error={!!genErrors?.issueDate}
                  helperText={genErrors?.issueDate}
                />
                {/* <DatePicker
                  onChange={(newValue) =>
                    handleChangeDate(newValue, "issueDate")
                  }
                  // value={formData?.dateOfBirth}
                  // defaultValue={formData?.dateOfBirth || {}}
                  format="DD-MM-YYYY"
                  name="issueDate"
                  slots={{
                    textField: (textFieldProps: any) => (
                      <TextField
                        {...textFieldProps}
                        size="small"
                        sx={{ width: "100%" }}
                        error={!!genErrors?.issueDate}
                        helperText={genErrors?.issueDate}
                      />
                    ),
                  }}
                /> */}
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>
                  Possession Date
                </CustomInputLabel>
                <TextField
                  placeholder="Possession Date"
                  fullWidth
                  type="date"
                  size="small"
                  name="possessionDate"
                  value={generalData.possessionDate || ""}
                  onChange={inputHandler}
                  error={!!genErrors?.possessionDate}
                  helperText={genErrors.possessionDate}
                />
                {/* <DatePicker
                  onChange={(newValue) =>
                    handleChangeDate(newValue, "possessionDate")
                  }
                  // value={formData?.dateOfBirth}
                  // defaultValue={formData?.dateOfBirth || {}}
                  format="DD-MM-YYYY"
                  name="possessionDate"
                  slots={{
                    textField: (textFieldProps: any) => (
                      <TextField
                        {...textFieldProps}
                        size="small"
                        sx={{ width: "100%" }}
                        error={!!genErrors?.possessionDate}
                        helperText={genErrors?.possessionDate}
                      />
                    ),
                  }}
                /> */}
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>PSN No.</CustomInputLabel>
                <TextField
                  placeholder="PSN No"
                  fullWidth
                  size="small"
                  name="psnNo"
                  value={generalData.psnNo || ""}
                  onChange={inputHandler}
                  error={!!genErrors?.psnNo}
                  helperText={genErrors?.psnNo}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>
                  Transferable
                </CustomInputLabel>
                {/* <TextField
                  placeholder="Transferable"
                  fullWidth
                  size="small"
                  name="transferable"
                  type="number"
                  onKeyDown={(e) =>
                    exceptThisSymbols.includes(e.key) && e.preventDefault()
                  }
                  sx={hideArrowUpDown}
                  value={generalData.transferable || ""}
                  onChange={inputHandler}
                  error={!!genErrors?.transferable}
                  helperText={genErrors?.transferable}
                /> */}
                <Select
                  onChange={inputHandler}
                  name="transferable"
                  size="small"
                  error={!!genErrors?.loanFromBank}
                  fullWidth
                >
                  <MenuItem value={"Y"}>Yes</MenuItem>
                  <MenuItem value={"N"}>No</MenuItem>
                </Select>
                <FormHelperText sx={{ color: "#FA896B" }}>
                  {genErrors?.transferable}
                </FormHelperText>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>
                  Unit Type
                </CustomInputLabel>
                <TextField
                  placeholder="Unit Type"
                  fullWidth
                  size="small"
                  name="unitType"
                  value={generalData.unitType || ""}
                  onChange={inputHandler}
                  error={!!genErrors?.unitType}
                  helperText={genErrors?.unitType}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>
                  Payment Plan
                </CustomInputLabel>
                <TextField
                  placeholder="Payment Plan"
                  fullWidth
                  size="small"
                  name="paymentPlan"
                  value={generalData.paymentPlan || ""}
                  onChange={inputHandler}
                  error={!!genErrors?.paymentPlan}
                  helperText={genErrors?.paymentPlan}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>
                  Tax Structure
                </CustomInputLabel>
                {/* <TextField
                  placeholder="Tax Structure"
                  fullWidth
                  size="small"
                  name="taxStructure"
                  value={generalData.taxStructure || ""}
                  onChange={inputHandler}
                  error={!!genErrors?.taxStructure}
                  helperText={genErrors?.taxStructure}
                /> */}
                <Select
                  onChange={inputHandler}
                  name="taxStructure"
                  size="small"
                  fullWidth
                  error={!!genErrors?.loanFromBank}
                >
                  <MenuItem value={"cgst-sgst"}>CGST/SGST</MenuItem>
                  <MenuItem value={"igst"}>IGST</MenuItem>
                </Select>
                <FormHelperText sx={{ color: "#FA896B" }}>
                  {genErrors?.taxStructure}
                </FormHelperText>
              </Grid>
              {generalData.taxStructure && (
                <>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <CustomInputLabel reqiredField={true}>GST</CustomInputLabel>
                    <TextField
                      placeholder="GST"
                      fullWidth
                      type="text"
                      // disabled
                      size="small"
                      name="gst"
                      value={generalData?.gst}
                      onChange={inputHandler}
                      error={!!genErrors?.gst}
                      helperText={genErrors?.gst}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <CustomInputLabel reqiredField={true}>
                      {`(${generalData.taxStructure.toUpperCase()}) Percentage`}
                    </CustomInputLabel>
                    <TextField
                      placeholder="GST Structure"
                      type="string"
                      fullWidth
                      size="small"
                      name="gstStructure"
                      // disabled
                      value={generalData.gstStructure}
                      onChange={inputHandler}
                      error={!!genErrors?.gstStructure}
                      helperText={genErrors?.gstStructure}
                    />
                  </Grid>
                </>
              )}
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel>Remark</CustomInputLabel>
                <TextField
                  placeholder="Remark"
                  multiline
                  rows={3}
                  fullWidth
                  size="small"
                  name="remark"
                  value={generalData.remark || ""}
                  onChange={inputHandler}
                  error={!!genErrors?.remark}
                  helperText={genErrors?.remark}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ height: "100%", borderRadius: 2 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Head</TableCell>
                      <TableCell>Rate</TableCell>
                      <TableCell>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowTable.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.Head}</TableCell>
                        <TableCell>{row.Rate}</TableCell>
                        <TableCell>{row.Amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box>
                <DiscountCalculator
                  amount={rate.toFixed(2)}
                  generalData={generalData}
                  basicRate={basicRate}
                  setBasicRate={setBasicRate}
                  discount={discount}
                  setDiscount={setDiscount}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setTabIndex((prev: any) => prev - 1)}
            sx={{ mr: 2 }}
          >
            Back
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default General;
