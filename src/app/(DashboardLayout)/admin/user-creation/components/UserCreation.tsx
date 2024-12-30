import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputLabel,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useSnackbar } from "notistack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { IconCloudUpload } from "@tabler/icons-react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DropzoneArea } from "material-ui-dropzone";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { makeStyles } from "@mui/styles";
import {
  exceptThisSymbols,
  hideArrowUpDown,
  validateMobileNumber,
  validateName,
} from "@/utils/validation";

const PreviewImage = styled("img")({
  width: "100px",
  height: "100px",
  objectFit: "cover",
  margin: "10px",
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const PreviewContainer = styled(Box)({
  position: "relative",
  display: "inline-block",
  width: "100%",
  height: "100px",
  marginTop: "15px",
  "&:hover .icon-buttons": {
    display: "flex",
  },
});
const IconOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: "none", // Hidden by default, shown on hover
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  borderRadius: "8px",
  color: "#fff",
});

const useStyles = makeStyles({
  dropzoneRoot: {
    minHeight: "80px !important",
    padding: "10px !important",
  },
  dropzoneText: {
    fontSize: "12px !important",
    color: "#5A5A5A !important",
  },
  dropzoneIcon: {
    fontSize: "30px !important",
    color: "#3A8DFF !important",
  },
});

const UserCreation = ({
  formData,
  setFormData,
  errors,
  validateForm,
  setError,
}: any) => {
  const [filePreviews, setFilePreviews] = useState<any>();
  const classes = useStyles();

  const handleFileChange = (fileType: string) => (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      const preview = {
        name: file.name,
        url: URL.createObjectURL(file),
      };
      setFilePreviews((prev: any) => ({
        ...prev,
        [fileType]: preview,
      }));
      const formData = new FormData();
      formData.append(fileType, file);
      setFormData((prev: any) => ({
        ...prev,
        [fileType]: formData.get(fileType),
      }));
    }
  };

  const handleDeleteFile = (fileType: string) => () => {
    if (filePreviews[fileType]) {
      URL.revokeObjectURL(filePreviews[fileType].url); // Clean up the URL object
      setFilePreviews((prev: any) => ({
        ...prev,
        [fileType]: null, // Remove the file preview from the state
      }));
    }
  };

  const handleViewFile = (fileType: string) => () => {
    if (filePreviews[fileType]?.url) {
      window.open(filePreviews[fileType].url, "_blank");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "userName" || name === "companyName") {
      const { isValid, capitalizedValue, errorMessage } = validateName(
        value,
        name
      );
      if (isValid) {
        setFormData((prev: any) => ({
          ...prev,
          [name]: capitalizedValue,
        }));
      }
    }

    if (name === "phoneNumber") {
      if (value.length >= 11) {
        return;
      }
      const { isValid, newvalue, errorMessage } = validateMobileNumber(
        value,
        name
      );
      if (isValid) {
        // Only update the value if it passes the validation
        setFormData({ ...formData, [name]: newvalue });
      } else {
        setFormData({ ...formData, [name]: newvalue });
      }
    }
    if (name === "aadharId") {
      if (value.length >= 13) {
        return;
      }
    }
    if (name !== "userName" && name !== "companyName" && name!=="phoneNumber") {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files }: any = e.target;
    const file = files[0];

    const formData: any = new FormData();

    formData.append(name, file);
    setFormData((prev: any) => ({
      ...prev,
      [name]: formData.get(name),
    }));
  };

  const handleChangeDate = (newValue: any) => {
    setFormData((prev: any) => ({
      ...prev,
      dateOfBirth: newValue,
    }));
  };
console.log(formData.dateOfBirth)
  return (
    <Box sx={{ p: 2 }}>
      <Grid m={"auto"} container maxWidth={"lg"} spacing={2}>
        {/* User Name */}
        <Grid size={{ xs: 12, md: 6 }}>
          <InputLabel sx={{ color: "#000" }}>
            User Name{" "}
            <Typography component={"span"} style={{ color: "red" }}>
              *
            </Typography>
          </InputLabel>
          <TextField
            name="userName"
            placeholder="User Name"
            onChange={handleChange}
            value={formData.userName}
            fullWidth
            // size="small"
            error={!!errors?.userName}
            helperText={errors?.userName}
          />
        </Grid>

        {/* Email ID */}
        <Grid size={{ xs: 12, md: 6 }}>
          <InputLabel sx={{ color: "#000" }}>
            Email Id
            <Typography component={"span"} style={{ color: "red" }}>
              *
            </Typography>
          </InputLabel>
          <TextField
            name="emailId"
            type="email"
            placeholder="Email Id"
            onChange={handleChange}
            value={formData.emailId}
            fullWidth
            // size="small"
            error={!!errors?.emailId}
            helperText={errors?.emailId}
          />
        </Grid>

        {/* Phone Number */}
        <Grid size={{ xs: 12, md: 6 }}>
          <InputLabel sx={{ color: "#000" }}>
            Phone Number
            <Typography component={"span"} style={{ color: "red" }}>
              *
            </Typography>
          </InputLabel>
          <TextField
            name="phoneNumber"
            type="number"
            placeholder="Phone Number"
            onChange={handleChange}
            value={formData.phoneNumber}
            fullWidth
            // size="small"
            error={!!errors?.phoneNumber}
            helperText={errors?.phoneNumber}
            sx={hideArrowUpDown}
            onKeyDown={(e) =>
              exceptThisSymbols.includes(e.key) && e.preventDefault()
            }
          />
        </Grid>

        {/* Employee Code */}
        <Grid size={{ xs: 12, md: 6 }}>
          <InputLabel sx={{ color: "#000" }}>
            Employee Code
            <Typography component={"span"} style={{ color: "red" }}>
              *
            </Typography>
          </InputLabel>
          <TextField
            name="employeeCode"
            placeholder="Employee Code"
            onChange={handleChange}
            value={formData.employeeCode}
            fullWidth
            // size="small"
            error={!!errors?.employeeCode}
            helperText={errors?.employeeCode}
          />
        </Grid>

        {/* Date of Birth */}
        <Grid size={{ xs: 12, md: 6 }}>
          <InputLabel sx={{ color: "#000" }}>
            Date of Birth
            <Typography component={"span"} style={{ color: "red" }}>
              *
            </Typography>
          </InputLabel>
          {/* <TextField
              name="dateOfBirth"
              type="date"
              placeholder="Date of Birth"
              onChange={handleChange}
              value={formData.dateOfBirth}
              fullWidth
              size="small"
              error={!!errors?.dateOfBirth}
              helperText={errors?.dateOfBirth}
            /> */}
          <DatePicker
            onChange={handleChangeDate}
            // value={formData?.dateOfBirth}
            // defaultValue={formData?.dateOfBirth || {}}
            format="DD-MM-YYYY"
            name="dateOfBirth"
            slots={{
              textField: (textFieldProps: any) => (
                <TextField
                  {...textFieldProps}
                  sx={{ width: "100%" }}
                  error={!!errors?.dateOfBirth}
                  helperText={errors?.dateOfBirth}
                />
              ),
            }}
          />
        </Grid>

        {/* Company Name */}
        <Grid size={{ xs: 12, md: 6 }}>
          <InputLabel sx={{ color: "#000" }}>
            Company Name
            <Typography component={"span"} style={{ color: "red" }}>
              *
            </Typography>
          </InputLabel>
          <TextField
            name="companyName"
            placeholder="Company Name"
            onChange={handleChange}
            value={formData.companyName}
            fullWidth
            // size="small"
            error={!!errors?.companyName}
            helperText={errors?.companyName}
          />
        </Grid>

        {/* Site Location */}
        <Grid size={{ xs: 12, md: 6 }}>
          <InputLabel sx={{ color: "#000" }}>
            Site Location
            <Typography component={"span"} style={{ color: "red" }}>
              *
            </Typography>
          </InputLabel>
          <TextField
            name="siteLocation"
            placeholder="Site Location"
            onChange={handleChange}
            value={formData.siteLocation}
            fullWidth
            // size="small"
            error={!!errors?.siteLocation}
            helperText={errors?.siteLocation}
          />
        </Grid>

        {/* Department Name */}
        <Grid size={{ xs: 12, md: 6 }}>
          <InputLabel sx={{ color: "#000" }}>
            Department Name
            <Typography component={"span"} style={{ color: "red" }}>
              *
            </Typography>
          </InputLabel>
          <TextField
            name="departmentName"
            placeholder="Department Name"
            onChange={handleChange}
            value={formData.departmentName}
            fullWidth
            // size="small"
            error={!!errors?.departmentName}
            helperText={errors?.departmentName}
          />
        </Grid>

        {/* Designation Name */}
        <Grid size={{ xs: 12, md: 6 }}>
          <InputLabel sx={{ color: "#000" }}>
            Designation Name
            <Typography component={"span"} style={{ color: "red" }}>
              *
            </Typography>
          </InputLabel>
          <TextField
            name="designationName"
            placeholder="Designation Name"
            onChange={handleChange}
            value={formData.designationName}
            fullWidth
            // size="small"
            error={!!errors?.designationName}
            helperText={errors?.designationName}
          />
        </Grid>

        {/* Aadhar Number */}
        <Grid size={{ xs: 12, md: 6 }}>
          <InputLabel sx={{ color: "#000" }}>
            Aadhar Number
            <Typography component={"span"} style={{ color: "red" }}>
              *
            </Typography>
          </InputLabel>
          <TextField
            name="aadharId"
            type="number"
            placeholder="Aadhar Number"
            onChange={handleChange}
            value={formData.aadharId}
            fullWidth
            // size="small"
            error={!!errors?.aadharId}
            helperText={errors?.aadharId}
            sx={hideArrowUpDown}
            onKeyDown={(e) =>
              exceptThisSymbols.includes(e.key) && e.preventDefault()
            }
          />
        </Grid>

        {/* User Photo */}
        <Grid size={{ xs: 12, md: 6 }}>
          <InputLabel sx={{ color: "#000" }}>
            User Photo
            <Typography component={"span"} style={{ color: "red" }}>
              *
            </Typography>
          </InputLabel>
          <DropzoneArea
            acceptedFiles={["image/*"]}
            dropzoneText={"Drag and drop an image here or click"}
            onChange={handleFileChange("userPhoto")} // Pass the file type
            showAlerts={false}
            showPreviews={false}
            showPreviewsInDropzone={false}
            filesLimit={1} // Limit to a single file upload
            classes={{
              root: classes.dropzoneRoot,
              text: classes.dropzoneText,
              icon: classes.dropzoneIcon,
            }}
          />
          <Box display="flex" flexWrap="wrap">
            {filePreviews?.userPhoto && (
              <Box textAlign="center">
                <PreviewContainer>
                  <PreviewImage
                    src={filePreviews.userPhoto.url}
                    alt={filePreviews.userPhoto.name}
                  />
                  <IconOverlay className="icon-buttons">
                    <IconButton
                      size="small"
                      sx={{
                        color: "#fff",
                        position: "absolute",
                        top: 5,
                        right: 5,
                      }}
                      onClick={handleDeleteFile("userPhoto")} // Pass the file type
                    >
                      <CloseIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ color: "#fff" }}
                      onClick={handleViewFile("userPhoto")} // Pass the file type
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </IconOverlay>
                </PreviewContainer>
              </Box>
            )}
          </Box>
        </Grid>

        {/* User Signature */}
        <Grid size={{ xs: 12, md: 6 }}>
          <InputLabel sx={{ color: "#000" }}>
            Signature
            <Typography component={"span"} style={{ color: "red" }}>
              *
            </Typography>
          </InputLabel>
          <DropzoneArea
            acceptedFiles={["image/*"]}
            dropzoneText={"Drag and drop an image here or click"}
            onChange={handleFileChange("userSignature")} // Pass the file type
            showAlerts={false}
            showPreviews={false}
            showPreviewsInDropzone={false}
            filesLimit={1} // Limit to a single file upload
            classes={{
              root: classes.dropzoneRoot,
              text: classes.dropzoneText,
              icon: classes.dropzoneIcon,
            }}
          />
          <Box display="flex" flexWrap="wrap">
            {filePreviews?.userSignature && (
              <Box textAlign="center">
                <PreviewContainer>
                  <PreviewImage
                    src={filePreviews.userSignature.url}
                    alt={filePreviews.userSignature.name}
                  />
                  <IconOverlay className="icon-buttons">
                    <Button
                      size="small"
                      sx={{
                        color: "#fff",
                        position: "absolute",
                        top: 5,
                        right: 5,
                      }}
                      onClick={handleDeleteFile("userSignature")} // Pass the file type
                    >
                      <CloseIcon />
                    </Button>
                    <Button
                      size="small"
                      sx={{ color: "#fff" }}
                      onClick={handleViewFile("userSignature")} // Pass the file type
                    >
                      <VisibilityIcon />
                    </Button>
                  </IconOverlay>
                </PreviewContainer>
                <Typography variant="caption">
                  {filePreviews.userSignature.name}
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserCreation;
