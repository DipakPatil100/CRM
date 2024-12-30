import {
  InputLabel,
  TextField,
  Typography,
  Button,
  Box,
  IconButton,
  Autocomplete,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";
import { IconTrashFilled, IconPlus } from "@tabler/icons-react";
import { CustomInputLabel } from "@/utils/CustomComponents/InputLabel";
import Divider from "@mui/material/Divider";
import { exceptThisSymbols, hideArrowUpDown } from "@/utils/validation";

// Value component with secondary color
const Value = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: "14px" }}>
    {children}
  </Typography>
);

const CoApplicant = ({
  leadData,
  setInputData,
  inputData,
  setIsPreviousApplicant,
  isPreviousApplicant,
  members,
  setMembers,
  tabIndex,
  setTabIndex,
  finalData,
  setFinalData,
  setcoAppError,
  coAppError,
}: any) => {
  const handleInputChange = (index: number, e: any) => {
    const { name, value } = e.target;

    // Update members for additional members
    setMembers((prev: any) =>
      prev.map((member: any, i: any) =>
        i === index ? { ...member, [name]: value } : member
      )
    );
  };

  const handleApplicantChange = (e: any) => {
    const { name, value } = e.target;

    // Update inputData for the main applicant
    setInputData((prev: any) => ({ ...prev, [name]: value }));
  };

  const addMember = () => {
    if (members.length < 6) {
      setMembers((prev: any) => [...prev, { relation: "" }]);
    }
  };

  const handleDeleteCoApplicant = (i: any) => {
    const updateMember = [...members];
    updateMember.splice(i, 1);
    setMembers(updateMember);
  };

  const handleLeadSelect = (event: any, value: any) => {
    if (value) {
      const lead = leadData.find((item: any) => item.applicationNo === value);

      setInputData({
        applicationNo: value || "",
        applicantName: lead?.applicantName || "",
        fatherName: lead?.fatherName || "",
        address: lead?.address || "",
        mobileNo: lead?.mobileNo || "",
        cityName: lead?.cityName || "",
        customerEmail: lead?.customerEmail || "",
        panNo: lead?.panNo || "",
        aadharNo: lead?.aadharNo || "",
      });

      setcoAppError({
        applicationNo: value && "",
        applicantName: lead?.applicantName && "",
        fatherName: lead?.fatherName && "",
        address: lead?.address && "",
        mobileNo: lead?.mobileNo && "",
        cityName: lead?.cityName && "",
        customerEmail: lead?.customerEmail && "",
        panNo: lead?.panNo && "",
        aadharNo: lead?.aadharNo && "",
      });
      setIsPreviousApplicant(true);
    } else {
      setInputData({});
      setIsPreviousApplicant(false);
    }
  };

  const handleSavePersonalDetails = () => {
    const newErrors: any = {};

    // if (members.length !== 0) {
    //   members.forEach((value:any) => {
    //     if (value.relation === "") {
    //       newErrors["relation"] = "This field is required";
    //       return;
    //     }
    //   });
    // }

    Object.entries(inputData).forEach(([key, value]: [string, any]) => {
      if (
        key === "entryDate" ||
        key === "panNo" ||
        key === "aadharNo" ||
        key === "address" ||
        key === "addressII"
      ) {
        return;
      }
      if (typeof value === "string" && value.trim() === "") {
        newErrors[key] = "This field is required";
        return;
      } else if (value === null || value === undefined) {
        newErrors[key] = "This field is required";
        return;
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setcoAppError(newErrors);
      return;
    } else {
      setFinalData((prev: any) => {
        return { ...prev, ...inputData, coApplicants: members ? members : [] };
      });
      setTabIndex((prev: any) => prev + 1);
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Applicant Details
      </Typography>

      <Grid
        // key={index}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ border: "1px solid #ccc", p: 2, borderRadius: 2, mb: 2 }}
        container
      >
        <Grid size={{ xs: 12, md: 12 }}>
          <Grid
            // key={index}
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{ p: "10px 0", borderRadius: 2, mb: 2 }}
            container
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomInputLabel reqiredField={true}>
                Application Number
              </CustomInputLabel>
              <Autocomplete
                options={leadData.map((lead: any) => lead.applicationNo)}
                onChange={handleLeadSelect}
                value={inputData?.applicationNo}
                size="small"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // label="Application Number"
                    placeholder="Select Application No"
                    error={!!coAppError.applicationNo}
                    helperText={coAppError.applicationNo}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomInputLabel reqiredField={true}>
                Applicant Name
              </CustomInputLabel>
              <TextField
                placeholder="Applicant Name"
                fullWidth
                size="small"
                name="applicantName"
                value={inputData.applicantName || ""}
                onChange={handleApplicantChange}
                disabled={isPreviousApplicant}
                error={!!coAppError.applicantName}
                helperText={coAppError.applicantName}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomInputLabel reqiredField={true}>
                Father's Name
              </CustomInputLabel>
              <TextField
                placeholder="Father's Name"
                fullWidth
                size="small"
                name="fatherName"
                value={inputData.fatherName || ""}
                onChange={handleApplicantChange}
                disabled={isPreviousApplicant}
                error={!!coAppError.fatherName}
                helperText={coAppError.fatherName}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomInputLabel reqiredField={false}>Address</CustomInputLabel>
              <TextField
                placeholder="Address"
                fullWidth
                size="small"
                name="address"
                value={inputData.address || ""}
                onChange={handleApplicantChange}
                disabled={isPreviousApplicant}
                error={!!coAppError.address}
                helperText={coAppError.address}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomInputLabel reqiredField={true}>Mobile No</CustomInputLabel>
              <TextField
                placeholder="Mobile No"
                fullWidth
                size="small"
                onKeyDown={(e) =>
                  exceptThisSymbols.includes(e.key) && e.preventDefault()
                }
                sx={hideArrowUpDown}
                type="number"
                name="mobileNo"
                value={inputData.mobileNo || ""}
                onChange={handleApplicantChange}
                disabled={isPreviousApplicant}
                error={!!coAppError.mobileNo}
                helperText={coAppError.mobileNo}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomInputLabel reqiredField={true}>City</CustomInputLabel>
              <TextField
                placeholder="City Name"
                fullWidth
                size="small"
                name="cityName"
                value={inputData.cityName || ""}
                onChange={handleApplicantChange}
                disabled={isPreviousApplicant}
                error={!!coAppError.cityName}
                helperText={coAppError.cityName}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomInputLabel reqiredField={true}>Email</CustomInputLabel>
              <TextField
                placeholder="Email ID"
                fullWidth
                size="small"
                name="customerEmail"
                value={inputData.customerEmail || ""}
                onChange={handleApplicantChange}
                disabled={isPreviousApplicant}
                error={!!coAppError.customerEmail}
                helperText={coAppError.customerEmail}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomInputLabel reqiredField={false}>PAN No</CustomInputLabel>
              <TextField
                placeholder="PAN No"
                fullWidth
                size="small"
                name="panNo"
                value={inputData.panNo || ""}
                onChange={handleApplicantChange}
                disabled={isPreviousApplicant}
                error={!!coAppError.panNo}
                helperText={coAppError.panNo}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomInputLabel reqiredField={false}>
                Aadhar Number
              </CustomInputLabel>
              <TextField
                placeholder="Aadhar Number"
                fullWidth
                size="small"
                name="panNo"
                onKeyDown={(e) =>
                  exceptThisSymbols.includes(e.key) && e.preventDefault()
                }
                sx={hideArrowUpDown}
                type="number"
                value={inputData.aadharNo || ""}
                onChange={handleApplicantChange}
                disabled={isPreviousApplicant}
                error={!!coAppError.aadharNo}
                helperText={coAppError.aadharNo}
              />
            </Grid>
          </Grid>
        </Grid>

        {members.map((member: any, index: any) => (
          <Box
            key={index}
            sx={{ border: "1px solid #ccc", p: 2, borderRadius: 2 }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography variant="h6">{`Co-Applicant ${
                index + 1
              }`}</Typography>

              <Box>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteCoApplicant(index)}
                  sx={{ backgroundColor: "#022213", color: "#fff" }}
                >
                  <IconTrashFilled width={20} height={20} />
                </IconButton>
              </Box>
            </Box>
            <Grid
              key={index}
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              sx={{ mb: 2 }}
              container
            >
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>
                  Co-Applicant Name
                </CustomInputLabel>
                <TextField
                  placeholder="Co-Applicant Name"
                  fullWidth
                  size="small"
                  name="applicantName"
                  value={member.applicantName || ""}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>
                  Father's Name
                </CustomInputLabel>
                <TextField
                  placeholder="Father's Name"
                  fullWidth
                  size="small"
                  name="fatherName"
                  value={member.fatherName || ""}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>Address</CustomInputLabel>
                <TextField
                  placeholder="Address"
                  fullWidth
                  size="small"
                  name="address"
                  value={member.address || ""}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>
                  Mobile No
                </CustomInputLabel>
                <TextField
                  placeholder="Mobile No"
                  fullWidth
                  size="small"
                  name="mobileNo"
                  onKeyDown={(e) =>
                    exceptThisSymbols.includes(e.key) && e.preventDefault()
                  }
                  sx={hideArrowUpDown}
                  type="number"
                  value={member.mobileNo || ""}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>City</CustomInputLabel>
                <TextField
                  placeholder="City Name"
                  fullWidth
                  size="small"
                  name="cityName"
                  value={member.cityName || ""}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>Pin</CustomInputLabel>
                <TextField
                  placeholder="Pin"
                  fullWidth
                  size="small"
                  name="pinNo"
                  onKeyDown={(e) =>
                    exceptThisSymbols.includes(e.key) && e.preventDefault()
                  }
                  sx={hideArrowUpDown}
                  type="number"
                  value={member.pinNo || ""}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>Email</CustomInputLabel>
                <TextField
                  placeholder="Email ID"
                  fullWidth
                  size="small"
                  name="customerEmail"
                  value={member.customerEmail || ""}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>PAN No</CustomInputLabel>
                <TextField
                  placeholder="PAN No"
                  fullWidth
                  size="small"
                  name="panNo"
                  value={member.panNo || ""}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>
                  Aadhar Number
                </CustomInputLabel>
                <TextField
                  placeholder="Aadhar Number"
                  fullWidth
                  size="small"
                  onKeyDown={(e) =>
                    exceptThisSymbols.includes(e.key) && e.preventDefault()
                  }
                  sx={hideArrowUpDown}
                  type="number"
                  name="aadharNo"
                  value={member.aadharNo || ""}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </Grid>
              {/* <Grid size={{ xs: 12, md: 6 }}>
                  <CustomInputLabel>Project:</CustomInputLabel>
                  <TextField
                    placeholder="Project"
                    fullWidth
                    size="small"
                    name="project"
                    value={member.project || ""}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomInputLabel>Unit Category:</CustomInputLabel>
                  <TextField
                    placeholder="Unit Category"
                    fullWidth
                    size="small"
                    name="unitCategory"
                    value={member.unitCategory || ""}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomInputLabel>Floor:</CustomInputLabel>
                  <TextField
                    placeholder="Floor"
                    fullWidth
                    size="small"
                    name="floor"
                    value={member.floor || ""}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </Grid> */}
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputLabel reqiredField={true}>
                  Relation:
                </CustomInputLabel>
                <TextField
                  placeholder="Relation"
                  fullWidth
                  size="small"
                  name="relation"
                  value={member.relation || ""}
                  onChange={(e) => handleInputChange(index, e)}
                  // error={!!coAppError.relation}
                  // helperText={coAppError.relation}
                />
              </Grid>
            </Grid>
          </Box>
        ))}
      </Grid>

      {members.length < 6 && (
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={addMember}
          startIcon={<IconPlus />}
        >
          Add Co-Applicants
        </Button>
      )}

      <Box display={"flex"} justifyContent={"right"}>
        <Button onClick={handleSavePersonalDetails} variant="contained">
          Next
        </Button>
      </Box>
    </>
  );
};

export default CoApplicant;
