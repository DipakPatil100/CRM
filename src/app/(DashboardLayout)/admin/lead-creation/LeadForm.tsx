/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
"use client";
import "regenerator-runtime/runtime";

import { postData } from "@/services/apiService";
import {
  Box,
  TextField,
  InputLabel,
  Button,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Grid2,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Tooltip,
  Autocomplete,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import MicNoneIcon from "@mui/icons-material/MicNone";
import "./leadcreation.css";
import { pinCodeData } from "@/utils/pinCode";
import {
  exceptThisSymbols,
  hideArrowUpDown,
  validateMobileNumber,
  validateName,
  validatePanNumber,
} from "@/utils/validation";
import { CustomInputLabel } from "@/utils/CustomComponents/InputLabel";
import { IconCaretLeftFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface InputData {
  propertyType: any;
  entryType: string;
  entryNo: string;
  entryDate: string;
  visitThrough: string;
  agentName: string;
  // applicationNo: string;
  applicantName: string;
  fatherName: string;
  address: string;
  addressII: string;
  cityName: string;
  districtName: string;
  stateName: string;
  pinCode: string;
  mobileNo: string;
  phoneNo: string;
  customerEmail: string;
  panNo: string;
  aadharNo: string;
  project: string;
  unitCategory: string;
  floor: string;
  discussions: string;
  status: string;
  furtherAction: string;
}

interface ErrorData {
  [key: string]: string; // Errors map with field names as keys
}

interface PropertyData {
  projectName: string;
  floors: string[];
  propertyType: any;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CreationForm = ({ propertyData }: any) => {
  const userKey = {
    // entryType: "",
    // entryNo: "",
    propertyType: "",
    entryDate: "",
    visitThrough: "",
    agentName: "",
    // applicationNo: "",
    applicantName: "",
    fatherName: "",
    address: "",
    addressII: "",
    cityName: "",
    districtName: "",
    stateName: "",
    pinCode: "",
    mobileNo: "",
    phoneNo: "",
    customerEmail: "",
    panNo: "",
    aadharNo: "",
    project: "",
    unitCategory: "",
    floor: "",
    discussions: "",
    status: "",
    furtherAction: "",
  };
  const [inputData, setInputData] = useState<any>(userKey);
  const [errors, setErrors] = useState<any>({});
  const [floorOptions, setFloorOptions] = useState([]);
  const [propertyOptions, setPropertyOptions] = useState<any>([]);

  const router = useRouter();

  const inputHandler = (e: any) => {
    const { name, value } = e.target;

    switch (name) {
      case "applicantName":
      case "fatherName": {
        const { isValid, capitalizedValue, errorMessage } = validateName(
          value,
          name
        );
        setInputData((prev: any) => ({ ...prev, [name]: capitalizedValue }));
        setErrors((prev: any) => ({
          ...prev,
          [name]: isValid ? "" : errorMessage,
        }));
        break;
      }
      case "panNo": {
        const { isValid, newvalue, errorMessage } = validatePanNumber(
          value,
          name
        );
        setInputData((prev: any) => ({ ...prev, [name]: newvalue }));
        setErrors((prev: any) => ({
          ...prev,
          [name]: isValid ? "" : errorMessage,
        }));
        break;
      }
      case "mobileNo": {
        const { isValid, newvalue, errorMessage } = validateMobileNumber(
          value,
          name
        );
        setInputData((prev: any) => ({ ...prev, [name]: newvalue }));
        setErrors((prev: any) => ({
          ...prev,
          [name]: isValid ? "" : errorMessage,
        }));
        break;
      }

      case "aadharNo":
        if (value.length < 13) {
          setInputData((prev: any) => ({ ...prev, [name]: value }));
        }
        break;
      case "project":
        const selectedProject = propertyData.find(
          (project: any) => project.projectName === value
        );
        if (selectedProject) {
          setFloorOptions(selectedProject.floors);
          setPropertyOptions([selectedProject.propertyType]);
        } else {
          setFloorOptions([]);
        }
        setInputData((prev: any) => ({ ...prev, project: value }));
        setErrors((prev: any) => {
          return { ...prev, ["project"]: "" };
        });
        break;
      default:
        setInputData((prev: any) => ({ ...prev, [name]: value }));
        setErrors((prev: any) => ({ ...prev, [name]: "" }));
        break;
    }
  };

  const submitDetails = async (e: any) => {
    const newErrors: ErrorData = {};

    Object.entries(inputData).forEach(([key, value]: [string, any]) => {
      console.log(key, value);
      if (
        key === "entryDate" ||
        key === "panNo" ||
        key === "aadharNo" ||
        key === "phoneNo" ||
        key === "agentName" ||
        key === "unitCategory" ||
        key === "visitThrough" ||
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
    console.log(newErrors, "NEW ERR");

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await postData("/v1/getLead/sendData", inputData);
      console.log(response, "RESPONSEEEEEEEEEEE");
      if (response?.data?.error) {
        enqueueSnackbar(response.message, { variant: "error" });
      } else {
        enqueueSnackbar(response.message, { variant: "success" });
        setInputData(userKey);
      }
    } catch (error) {
      enqueueSnackbar("An error occurred while submitting the form", {
        variant: "error",
      });

      console.log(error, "ERRORRRRR");
    }
  };

  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState("");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleAudioInput = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
      resetTranscript();
    } else {
      SpeechRecognition.startListening();
    }
  };

  const handlePinCodeChange = (
    event: React.SyntheticEvent,
    value: string | null
  ) => {
    if (value) {
      const selectedPin = pinCodeData.find((pin) => pin.pinCode === value);
      if (selectedPin) {
        setInputData({
          ...inputData,
          pinCode: selectedPin.pinCode,
          cityName: selectedPin.city,
          districtName: selectedPin.district,
          stateName: selectedPin.state,
        });
      }
    } else {
      setInputData((prev: any) => ({
        ...prev,
        pinCode: "",
        cityName: "",
        districtName: "",
        stateName: "",
      }));
    }
    setErrors((prev: any) => {
      return {
        ...prev,
        pinCode: "",
        cityName: "",
        districtName: "",
        stateName: "",
      };
    });
  };

  useEffect(() => {
    if (!listening && transcript) {
      setMessage(transcript);
      setInputData((prevInputData: any) => ({
        ...prevInputData,
        discussions:
          prevInputData.discussions +
          (prevInputData.discussions ? " " : "") +
          transcript,
      }));
    }

    setIsListening(listening);
  }, [transcript, listening]);
  return (
    <Box sx={{ p: 2 }}>
      <Button
        onClick={() => router.back()}
        variant="outlined"
        size="small"
        startIcon={<IconCaretLeftFilled />}
        sx={{ mb: 1, display: "flex", alignItems: "right", textAlign: "right" }}
      >
        Back
      </Button>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Personal Details:
      </Typography>
      <Grid
        rowSpacing={1.5}
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ border: "1px solid #ccc", p: 2, borderRadius: 2 }}
      >
        {/* <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
          <InputLabel sx={{ color: "#000" }} htmlFor={"application-no"}>
            Application No.
          </InputLabel>
          <TextField
            size="small"
            type="number"
            fullWidth
            placeholder="Application No"
            name="applicationNo"
            onChange={inputHandler}
            value={inputData.applicationNo}
            error={!!errors.applicationNo}
          />
          {errors.applicationNo && (
            <Typography variant="caption" color="error">
              {errors.applicationNo}
            </Typography>
          )}
        </Grid> */}

        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
          {/* <InputLabel sx={{ color: "#000" }} htmlFor={"applicant-name"}>
            Applicant Name
          </InputLabel> */}
          <CustomInputLabel reqiredField={true}>
            Applicant Name
          </CustomInputLabel>
          <TextField
            size="small"
            type="text"
            fullWidth
            placeholder="Applicant Name"
            name="applicantName"
            onChange={inputHandler}
            value={inputData.applicantName}
            error={!!errors.applicantName}
            required={true}
          />
          {errors.applicantName && (
            <Typography variant="caption" color="error">
              {errors.applicantName}
            </Typography>
          )}
        </Grid>
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
          <CustomInputLabel reqiredField={true}>
            {" "}
            Father's Name
          </CustomInputLabel>

          <TextField
            size="small"
            fullWidth
            placeholder="Father Name"
            name="fatherName"
            onChange={inputHandler}
            value={inputData.fatherName}
            error={!!errors.fatherName}
            required={true}
          />
          {errors.fatherName && (
            <Typography variant="caption" color="error">
              {errors.fatherName}
            </Typography>
          )}
        </Grid>
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
          <CustomInputLabel reqiredField={true}>Mobile No</CustomInputLabel>

          <TextField
            size="small"
            type="number"
            fullWidth
            placeholder="Mobile No"
            name="mobileNo"
            onChange={inputHandler}
            value={inputData.mobileNo}
            error={!!errors.mobileNo}
            onKeyDown={(e) =>
              exceptThisSymbols.includes(e.key) && e.preventDefault()
            }
            sx={hideArrowUpDown}
            required={true}
          />
          {errors.mobileNo && (
            <Typography variant="caption" color="error">
              {errors.mobileNo}
            </Typography>
          )}
        </Grid>
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
          <CustomInputLabel reqiredField={true}>
            Customer Email
          </CustomInputLabel>

          <TextField
            size="small"
            fullWidth
            placeholder="Customer Email"
            type="email"
            name="customerEmail"
            onChange={inputHandler}
            value={inputData.customerEmail}
            error={!!errors.customerEmail}
            required={true}
          />
          {errors.customerEmail && (
            <Typography variant="caption" color="error">
              {errors.customerEmail}
            </Typography>
          )}
        </Grid>
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
          <CustomInputLabel reqiredField={true}>Pin Code</CustomInputLabel>

          <Autocomplete
            options={pinCodeData.map((pin) => pin.pinCode)}
            onChange={handlePinCodeChange}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                fullWidth
                placeholder="Pin Code"
                name="pinCode"
                onChange={inputHandler}
                error={!!errors.pinCode}
                required={true}
              />
            )}
          />
          {errors.pinCode && (
            <Typography variant="caption" color="error">
              {errors.pinCode}
            </Typography>
          )}
        </Grid>

        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
          <CustomInputLabel reqiredField={true}>City Name</CustomInputLabel>

          <TextField
            size="small"
            fullWidth
            placeholder="City Name"
            name="cityName"
            value={inputData.cityName}
            error={!!errors.cityName}
            required={true}
          />
          {errors.cityName && (
            <Typography variant="caption" color="error">
              {errors.cityName}
            </Typography>
          )}
        </Grid>

        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
          <CustomInputLabel reqiredField={true}>District</CustomInputLabel>

          <TextField
            size="small"
            fullWidth
            placeholder="District Name"
            name="districtName"
            value={inputData.districtName}
            error={!!errors.districtName}
            required={true}
          />

          {errors.districtName && (
            <Typography variant="caption" color="error">
              {errors.districtName}
            </Typography>
          )}
        </Grid>

        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
          <CustomInputLabel reqiredField={true}>State</CustomInputLabel>

          <TextField
            size="small"
            fullWidth
            placeholder="State Name"
            name="stateName"
            value={inputData.stateName}
            error={!!errors.stateName}
            required={true}
          />
          {errors.stateName && (
            <Typography variant="caption" color="error">
              {errors.stateName}
            </Typography>
          )}
        </Grid>
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
          <CustomInputLabel reqiredField={false}>Telephone No</CustomInputLabel>

          <TextField
            size="small"
            type="number"
            fullWidth
            placeholder="Telephone No"
            name="phoneNo"
            onChange={inputHandler}
            value={inputData.phoneNo}
            error={!!errors.phoneNo}
            onKeyDown={(e) =>
              exceptThisSymbols.includes(e.key) && e.preventDefault()
            }
            sx={hideArrowUpDown}
            required={false}
          />
          {errors.phoneNo && (
            <Typography variant="caption" color="error">
              {errors.phoneNo}
            </Typography>
          )}
        </Grid>
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
          <CustomInputLabel reqiredField={false}> Pan No</CustomInputLabel>

          <TextField
            size="small"
            fullWidth
            placeholder="Pan No"
            name="panNo"
            onChange={inputHandler}
            value={inputData.panNo}
            error={!!errors.panNo}
            required={false}
          />
          {errors.panNo && (
            <Typography variant="caption" color="error">
              {errors.panNo}
            </Typography>
          )}
        </Grid>
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
          <CustomInputLabel reqiredField={false}>Aadhar No</CustomInputLabel>

          <TextField
            size="small"
            type="number"
            fullWidth
            placeholder="Aadhar No"
            name="aadharNo"
            onChange={inputHandler}
            value={inputData.aadharNo}
            error={!!errors.aadharNo}
            sx={hideArrowUpDown}
            onKeyDown={(e) =>
              exceptThisSymbols.includes(e.key) && e.preventDefault()
            }
            required={false}
          />
          {errors.aadharNo && (
            <Typography variant="caption" color="error">
              {errors.aadharNo}
            </Typography>
          )}
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
        Record Details:
      </Typography>

      <Grid
        rowSpacing={1.5}
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ border: "1px solid #ccc", p: 2, borderRadius: 2 }}
      >
        {/* <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
          <InputLabel sx={{ color: "#000" }} htmlFor={"entry-type"}>
            Entry Type
          </InputLabel>
          <TextField
            size="small"
            fullWidth
            placeholder="Entry Type"
            name="entryType"
            onChange={inputHandler}
            value={inputData.entryType}
            error={!!errors.entryType}
          />
          {errors.entryType && (
            <Typography variant="caption" color="error">
              {errors.entryType}
            </Typography>
          )}
        </Grid> */}
        {/* <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
          <InputLabel sx={{ color: "#000" }} htmlFor={"entry-no"}>
            Entry No
          </InputLabel>
          <TextField
            size="small"
            fullWidth
            placeholder=" Entry No"
            type="number"
            name="entryNo"
            onChange={inputHandler}
            value={inputData.entryNo}
            error={!!errors.entryNo}
          />
          {errors.entryNo && (
            <Typography variant="caption" color="error">
              {errors.entryNo}
            </Typography>
          )}
        </Grid> */}
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
          <CustomInputLabel reqiredField={false}>Entry Date</CustomInputLabel>

          <TextField
            size="small"
            fullWidth
            placeholder="Entry Date"
            type="date"
            name="entryDate"
            onChange={inputHandler}
            value={inputData.entryDate}
            error={!!errors.entryDate}
            required={true}
          />
          {errors.entryDate && (
            <Typography variant="caption" color="error">
              {errors.entryDate}
            </Typography>
          )}
        </Grid>

        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
          <CustomInputLabel reqiredField={false}>Agent Name</CustomInputLabel>

          <Select
            size="small"
            fullWidth
            displayEmpty
            // placeholder="Agent Name"
            name="agentName"
            onChange={inputHandler}
            value={inputData.agentName}
            error={!!errors.agentName}
            renderValue={(selected) => {
              if (!selected) {
                return (
                  <Typography sx={{ color: "#b5bcc9" }}> Agent Name</Typography>
                );
              }
              return selected;
            }}
            inputProps={{ "aria-label": "Without label" }}
            required={true}
          >
            <MenuItem value="">Select Agent</MenuItem>
            <MenuItem value="Agent 1">Agent 1</MenuItem>
            <MenuItem value="Agent 2">Agent 2</MenuItem>
            <MenuItem value="Agent 3">Agent 3</MenuItem>
          </Select>
          {errors.entryDate && (
            <Typography variant="caption" color="error">
              {errors.entryDate}
            </Typography>
          )}
        </Grid>

        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
          <CustomInputLabel reqiredField={false}>
            Unit Category
          </CustomInputLabel>

          <TextField
            size="small"
            fullWidth
            placeholder="Unit Category"
            name="unitCategory"
            onChange={inputHandler}
            value={inputData.unitCategory}
            error={!!errors.unitCategory}
            required={true}
          />

          {errors.unitCategory && (
            <Typography variant="caption" color="error">
              {errors.unitCategory}
            </Typography>
          )}
        </Grid>
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
          <CustomInputLabel reqiredField={false}>
            Visit Through
          </CustomInputLabel>

          <TextField
            size="small"
            fullWidth
            placeholder="Visit Through"
            name="visitThrough"
            onChange={inputHandler}
            value={inputData.visitThrough}
            error={!!errors.visitThrough}
            required={true}
          />
          {errors.visitThrough && (
            <Typography variant="caption" color="error">
              {errors.visitThrough}
            </Typography>
          )}
        </Grid>

        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
          <CustomInputLabel reqiredField={false}>Address 1</CustomInputLabel>

          <TextField
            size="small"
            fullWidth
            multiline
            rows={3}
            placeholder="Address"
            name="address"
            onChange={inputHandler}
            value={inputData.address}
            error={!!errors.address}
            required={true}
          />
          {errors.address && (
            <Typography variant="caption" color="error">
              {errors.address}
            </Typography>
          )}
        </Grid>
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
          <CustomInputLabel reqiredField={false}>Address 2</CustomInputLabel>

          <TextField
            size="small"
            fullWidth
            multiline
            rows={3}
            placeholder="AddressII"
            name="addressII"
            onChange={inputHandler}
            value={inputData.addressII}
            error={!!errors.addressII}
            required={true}
          />
          {errors.addressII && (
            <Typography variant="caption" color="error">
              {errors.addressII}
            </Typography>
          )}
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
        Project Details:
      </Typography>
      <Grid
        rowSpacing={1.5}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ border: "1px solid #ccc", p: 2, borderRadius: 2 }}
      >
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
          <CustomInputLabel reqiredField={true}>Project Name</CustomInputLabel>

          <Select
            size="small"
            fullWidth
            displayEmpty
            name="project"
            value={inputData.project}
            error={!!errors.project}
            onChange={inputHandler}
            input={<OutlinedInput />}
            renderValue={(selected: any) => {
              if (!selected || selected.length === 0) {
                return (
                  <Typography sx={{ color: "#b5bcc9" }}>
                    {" "}
                    Project name
                  </Typography>
                );
              }

              return selected;
            }}
            inputProps={{ "aria-label": "Without label" }}
            MenuProps={MenuProps}
            required={true}
          >
            {/* <Box sx={{ height: "200px" }}> */}
            {propertyData?.map((item: any) => (
              <MenuItem key={item.projectName} value={item.projectName}>
                {item.projectName}
              </MenuItem>
            ))}
            {/* </Box> */}
          </Select>
          {errors.project && (
            <Typography variant="caption" color="error">
              {errors.project}
            </Typography>
          )}
        </Grid>
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
          <CustomInputLabel reqiredField={true}> Floor</CustomInputLabel>

          <Select
            size="small"
            fullWidth
            displayEmpty
            name="floor"
            value={inputData.floor}
            error={!!errors.floor}
            onChange={inputHandler}
            input={<OutlinedInput />}
            renderValue={(selected: any) => {
              if (!selected || selected.length === 0) {
                return (
                  <Typography sx={{ color: "#b5bcc9" }}> Floor</Typography>
                );
              }

              return selected;
            }}
            inputProps={{ "aria-label": "Without label" }}
            required={true}
          >
            {floorOptions?.map((item: any) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>

          {errors.floor && (
            <Typography variant="caption" color="error">
              {errors.floor}
            </Typography>
          )}
        </Grid>

        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
          <CustomInputLabel reqiredField={true}>Property Type</CustomInputLabel>

          <Select
            size="small"
            fullWidth
            displayEmpty
            // placeholder="Property Type"
            name="propertyType"
            onChange={inputHandler}
            value={inputData?.propertyType}
            error={!!errors.propertyType}
            renderValue={(selected) => {
              if (!selected) {
                return (
                  <Typography sx={{ color: "#b5bcc9" }}>
                    {" "}
                    Property Type
                  </Typography>
                );
              }
              return selected;
            }}
            inputProps={{ "aria-label": "Without label" }}
            required={true}
          >
            <MenuItem value="" disabled>
              Select Property
            </MenuItem>
            {propertyOptions.map((item: any) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
          {errors.status && (
            <Typography variant="caption" color="error">
              {errors.propertyType}
            </Typography>
          )}
        </Grid>

        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
          <CustomInputLabel reqiredField={true}>Status</CustomInputLabel>

          <Select
            size="small"
            fullWidth
            displayEmpty
            name="status"
            onChange={inputHandler}
            value={inputData.status}
            error={!!errors.status}
            renderValue={(selected) => {
              if (!selected) {
                return (
                  <Typography sx={{ color: "#b5bcc9" }}> status</Typography>
                );
              }
              return selected;
            }}
            inputProps={{ "aria-label": "Without label" }}
            required={true}
          >
            <MenuItem value="">Select Status</MenuItem>
            <MenuItem value="Progress">Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
          {errors.status && (
            <Typography variant="caption" color="error">
              {errors.status}
            </Typography>
          )}
        </Grid>
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
          <CustomInputLabel reqiredField={true}>
            Further Action
          </CustomInputLabel>

          <TextField
            size="small"
            fullWidth
            placeholder="Further Action"
            name="furtherAction"
            onChange={inputHandler}
            value={inputData.furtherAction}
            required={true}
            error={!!errors.furtherAction}
          />
          {errors.furtherAction && (
            <Typography variant="caption" color="error">
              {errors.furtherAction}
            </Typography>
          )}
        </Grid>
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
          <CustomInputLabel reqiredField={true}>Discussions</CustomInputLabel>

          <TextField
            size="small"
            fullWidth
            multiline
            rows={3}
            placeholder={listening ? "Listining.." : "Discussions"}
            name="discussions"
            onChange={inputHandler}
            value={inputData.discussions}
            error={!!errors.discussions}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title={listening ? "Listining" : "Write by voice "}
                    >
                      <IconButton
                        color={"primary"}
                        aria-label="add an alarm"
                        onClick={handleAudioInput}
                        sx={{
                          width: "30px",
                          height: "30px",
                          background: listening ? "red" : "lightGray",
                          color: listening ? "white" : "black",
                          mt: 4,
                          "&:hover": {
                            background: listening ? "red" : "lightGray", // Match the default background color
                            opacity: 1, // Ensure full opacity
                          },
                        }}
                      >
                        <MicNoneIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              },
            }}
            required={true}
          />
          {errors.discussions && (
            <Typography variant="caption" color="error">
              {errors.discussions}
            </Typography>
          )}
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
        <Button variant="outlined" color="error" sx={{ mr: 2 }}>
          reset
        </Button>
        <Button onClick={submitDetails} variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  );
};
export default CreationForm;
