// Lead Edit Modal

import { getData, putData } from "@/services/apiService";
import { CustomInputLabel } from "@/utils/CustomComponents/InputLabel";
import {
  Box,
  Typography,
  InputLabel,
  TextField,
  Select,
  OutlinedInput,
  MenuItem,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useSnackbar } from "notistack";
import { useState } from "react";

export const LeadListEditModal = ({
  editLead,
  setOpenEditdialog,
  propertyData,
  setEditLead,
  getUser,
}: any) => {
  const [formData, setFormData] = useState({ ...editLead[0] });
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getLead = async () => {
    await getData("/v1/getLead/getUserData");
  };

  // useEffect(() => {
  //   getLead();
  // }, [editLead]);

  const handleUpdate = async (event: Event) => {
    // "use server"
    event.preventDefault();
    const response = await putData(
      `/v1/getLead/updatetheData/${formData._id}`,
      formData
    );

    if (response.message.includes("successfully")) {
      await getUser();
      enqueueSnackbar(response.message, { variant: "success" });
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setOpenEditdialog(false);
    // console.log(response, "EDIT LEAD DATA")
    // setEditLead(response?.data?.user)
    // window.location.reload();
  };

  return (
    <Box component={"form"}>
      <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
        Personal Details:
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ border: "1px solid #ccc", p: 2, borderRadius: 2 }}
      >
        {/* LeadId */}
        <Grid size={{ xs: 2, sm: 4, md: 3 }}>
          <CustomInputLabel reqiredField={true}>Lead Id</CustomInputLabel>
          <TextField
            name="LeadId"
            placeholder="LeadId"
            onChange={handleChange}
            value={formData.LeadId}
            fullWidth
            size="small"
            disabled
            //   error={!!errors?.userName}
            //   helperText={errors?.userName}
          />
        </Grid>
        {/* application Code */}
        <Grid size={{ xs: 2, sm: 4, md: 3 }}>
          <CustomInputLabel reqiredField={true}>
            Application Code
          </CustomInputLabel>

          <TextField
            name="applicationCode"
            placeholder="Application Code"
            onChange={handleChange}
            value={formData.applicationNo}
            fullWidth
            size="small"
            //   error={!!errors?.employeeCode}
            //   helperText={errors?.employeeCode}
          />
        </Grid>

        {/* Application Name */}
        <Grid size={{ xs: 2, sm: 4, md: 3 }}>
          <CustomInputLabel reqiredField={true}>
            Applicant Name
          </CustomInputLabel>

          <TextField
            name="applicantName"
            type="text"
            placeholder="Applicant Name"
            onChange={handleChange}
            value={formData.applicantName}
            fullWidth
            size="small"
            //   error={!!errors?.aadharId}
            //   helperText={errors?.aadharId}
          />
        </Grid>

        {/* father' name */}
        <Grid size={{ xs: 2, sm: 4, md: 3 }}>
          <CustomInputLabel reqiredField={true}>Father's Name</CustomInputLabel>

          <TextField
            name="fatherName"
            placeholder="Fathers Name"
            onChange={handleChange}
            value={formData.fatherName}
            fullWidth
            size="small"
            //   error={!!errors?.companyName}
            //   helperText={errors?.companyName}
          />
        </Grid>

        {/* Aadhar Number */}
        <Grid size={{ xs: 2, sm: 4, md: 3 }}>
          <CustomInputLabel reqiredField={false}>
            Aadhar Number
          </CustomInputLabel>

          <TextField
            name="aadharNo"
            type="text"
            placeholder="Aadhar Number"
            onChange={handleChange}
            value={formData.aadharNo}
            fullWidth
            size="small"
            //   error={!!errors?.aadharId}
            //   helperText={errors?.aadharId}
          />
        </Grid>

        {/* Pan no */}
        <Grid size={{ xs: 2, sm: 4, md: 3 }}>
          <CustomInputLabel reqiredField={false}>Pan Number</CustomInputLabel>

          <TextField
            name="panNo"
            type="text"
            placeholder="Pan Number"
            onChange={handleChange}
            value={formData.panNo}
            fullWidth
            size="small"
            //   error={!!errors?.aadharId}
            //   helperText={errors?.aadharId}
          />
        </Grid>

        {/* city name */}
        <Grid size={{ xs: 2, sm: 4, md: 3 }}>
          <CustomInputLabel reqiredField={true}>City Name</CustomInputLabel>
          <TextField
            name="cityName"
            placeholder="City Name"
            onChange={handleChange}
            value={formData.cityName}
            fullWidth
            size="small"
            //   error={!!errors?.siteLocation}
            //   helperText={errors?.siteLocation}
          />
        </Grid>

        {/*  */}
        <Grid size={{ xs: 2, sm: 4, md: 3 }}>
          <CustomInputLabel reqiredField={true}>Pin Code</CustomInputLabel>

          <TextField
            name="cityName"
            placeholder="City Name"
            onChange={handleChange}
            value={formData.cityName}
            fullWidth
            size="small"
            //   error={!!errors?.siteLocation}
            //   helperText={errors?.siteLocation}
          />
        </Grid>

        {/* mobile name */}
        <Grid size={{ xs: 2, sm: 4, md: 3 }}>
          <CustomInputLabel reqiredField={true}>Mobile No</CustomInputLabel>

          <TextField
            name="mobileNo"
            placeholder="Mobile number"
            onChange={handleChange}
            value={formData.mobileNo}
            fullWidth
            size="small"
            //   error={!!errors?.departmentName}
            //   helperText={errors?.departmentName}
          />
        </Grid>

        <Grid size={{ xs: 2, sm: 4, md: 3 }}>
          <CustomInputLabel reqiredField={true}>
            Customer Email
          </CustomInputLabel>

          <TextField
            name="customerEmail"
            type="email"
            placeholder="Floor"
            onChange={handleChange}
            value={formData.customerEmail}
            fullWidth
            size="small"
            //   error={!!errors?.aadharId}
            //   helperText={errors?.aadharId}
          />
        </Grid>

        {/* Phone Name */}
        <Grid size={{ xs: 2, sm: 4, md: 3 }}>
          <CustomInputLabel reqiredField={false}>Telephone No</CustomInputLabel>

          <TextField
            name="phoneNo"
            placeholder="Phone"
            onChange={handleChange}
            value={formData.phoneNo}
            fullWidth
            size="small"
            //   error={!!errors?.designationName}
            //   helperText={errors?.designationName}
          />
        </Grid>
      </Grid>
      <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
        Record Details
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ border: "1px solid #ccc", p: 2, borderRadius: 2 }}
      >
        {/* Entry type*/}
        {/* <Grid size={{ xs: 2, sm: 4, md: 3 }}>
            <InputLabel sx={{ color: "#000" }}>
              Entry Type
              <Typography component={"span"} style={{ color: "red" }}>
                *
              </Typography>
            </InputLabel>
            <TextField
              name="entryType"
              type="text"
              placeholder="Entry Tpye"
              onChange={handleChange}
              value={formData.entryType}
              fullWidth
              size="small"
              //   error={!!errors?.emailId}
              //   helperText={errors?.emailId}
            />
          </Grid> */}
        {/* Entry Date */}
        <Grid size={{ xs: 2, sm: 4, md: 3 }}>
          <CustomInputLabel reqiredField={false}>Entry Date</CustomInputLabel>

          <TextField
            name="entryDate"
            type="date"
            placeholder="Date of Birth"
            onChange={handleChange}
            value={formData.entryDate}
            fullWidth
            size="small"
            //   error={!!errors?.dateOfBirth}
            //   helperText={errors?.dateOfBirth}
          />
        </Grid>

        {/* Entry No*/}
        {/* <Grid size={{ xs: 2, sm: 4, md: 3 }}>
            <InputLabel sx={{ color: "#000" }}>
              Entry Name
              <Typography component={"span"} style={{ color: "red" }}>
                *
              </Typography>
            </InputLabel>
            <TextField
              name="Entry Number"
              placeholder="Entry Number"
              onChange={handleChange}
              value={formData.entryNo}
              fullWidth
              size="small"
              //   error={!!errors?.phoneNumber}
              //   helperText={errors?.phoneNumber}
            />
          </Grid> */}

        <Grid size={{ xs: 2, sm: 4, md: 3 }}>
          <CustomInputLabel reqiredField={false}>Agent Name</CustomInputLabel>

          <TextField
            name="agentName"
            placeholder="Agent Name"
            onChange={handleChange}
            value={formData.agentName}
            fullWidth
            size="small"
            //   error={!!errors?.phoneNumber}
            //   helperText={errors?.phoneNumber}
          />
        </Grid>

        <Grid size={{ xs: 2, sm: 4, md: 3 }}>
          <CustomInputLabel reqiredField={false}>Address</CustomInputLabel>

          <TextField
            name="address"
            type="text"
            placeholder="Address"
            onChange={handleChange}
            value={formData.address}
            fullWidth
            size="small"
            //   error={!!errors?.aadharId}
            //   helperText={errors?.aadharId}
          />
        </Grid>

        <Grid size={{ xs: 2, sm: 4, md: 3 }}>
          <CustomInputLabel reqiredField={false}>Address II</CustomInputLabel>

          <TextField
            name="address"
            type="text"
            placeholder="Address"
            onChange={handleChange}
            value={formData.address}
            fullWidth
            size="small"
            //   error={!!errors?.aadharId}
            //   helperText={errors?.aadharId}
          />
        </Grid>

        {/* <Grid size={{ xs: 2, sm: 4, md: 3 }}>
          <CustomInputLabel reqiredField={true}>Project</CustomInputLabel>

          <TextField
            name="project"
            type="text"
            placeholder="Project"
            onChange={handleChange}
            value={formData.project}
            fullWidth
            size="small"
            //   error={!!errors?.aadharId}
            //   helperText={errors?.aadharId}
          />
        </Grid> */}

        <Grid size={{ xs: 2, sm: 4, md: 3 }}>
          <CustomInputLabel reqiredField={false}>
            Unit Category
          </CustomInputLabel>

          <TextField
            name="unitCategory"
            type="text"
            placeholder="Unit Category"
            onChange={handleChange}
            value={formData.unitCategory}
            fullWidth
            size="small"
            //   error={!!errors?.aadharId}
            //   helperText={errors?.aadharId}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
        Project Details
      </Typography>

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ border: "1px solid #ccc", p: 2, borderRadius: 2 }}
      >
        <Grid size={{ xs: 2, sm: 4, md: 3 }}>
          <CustomInputLabel reqiredField={true}>Project Name</CustomInputLabel>

          {/* <TextField
              name="discussions"
              type="text"
              placeholder="Floor"
              onChange={handleChange}
              value={formData.discussions}
              fullWidth
              size="small"
              //   error={!!errors?.aadharId}
              //   helperText={errors?.aadharId}
            /> */}
          <Select
            size="small"
            fullWidth
            displayEmpty
            name="project"
            value={formData.project}
            onChange={handleChange}
            // error={!!errors.project}
            input={<OutlinedInput />}
            renderValue={(selected: any) => {
              if (!selected || selected.length === 0) {
                return (
                  <Typography sx={{ color: "#b5bcc9" }}>
                    {" "}
                    Project Name
                  </Typography>
                );
              }

              return selected;
            }}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              Project Name
            </MenuItem>
            {propertyData?.map((item: any) => (
              <MenuItem key={item?.projectName} value={item?.projectName}>
                {item?.projectName}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid size={{ xs: 2, sm: 4, md: 3 }}>
          <CustomInputLabel reqiredField={true}>Floor</CustomInputLabel>

          <TextField
            name="floor"
            type="text"
            placeholder="Floor"
            onChange={handleChange}
            value={formData.floor}
            fullWidth
            size="small"
            //   error={!!errors?.aadharId}
            //   helperText={errors?.aadharId}
          />
        </Grid>
        <Grid size={{ xs: 2, sm: 4, md: 3 }}>
          <CustomInputLabel reqiredField={true}>Status</CustomInputLabel>

          {/* <TextField
              name="discussions"
              type="text"
              placeholder="Floor"
              onChange={handleChange}
              value={formData.discussions}
              fullWidth
              size="small"
              //   error={!!errors?.aadharId}
              //   helperText={errors?.aadharId}
            /> */}
          <Select
            size="small"
            fullWidth
            displayEmpty
            name="status"
            value={formData.status}
            onChange={handleChange}
            // error={!!errors.project}
            input={<OutlinedInput />}
            renderValue={(selected: any) => {
              if (!selected || selected.length === 0) {
                return (
                  <Typography sx={{ color: "#b5bcc9" }}> Status</Typography>
                );
              }

              return selected;
            }}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">Select Status</MenuItem>
            <MenuItem value="Progress">Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
        </Grid>
        <Grid size={{ xs: 2, sm: 4, md: 3 }}>
          <CustomInputLabel reqiredField={true}>Further Action</CustomInputLabel>

          <TextField
            name="furtherAction"
            type="text"
            placeholder="furtherAction"
            onChange={handleChange}
            value={formData.furtherAction}
            fullWidth
            size="small"
            //   error={!!errors?.aadharId}
            //   helperText={errors?.aadharId}
          />
        </Grid>
        <Grid size={{ xs: 2, sm: 4, md: 3 }}>
          <InputLabel sx={{ color: "#000" }}>
            Discussion
            <Typography component={"span"} style={{ color: "red" }}>
              *
            </Typography>
          </InputLabel>
          <TextField
            name="discussions"
            type="text"
            placeholder="Floor"
            onChange={handleChange}
            value={formData.discussions}
            fullWidth
            size="small"
            //   error={!!errors?.aadharId}
            //   helperText={errors?.aadharId}
          />
        </Grid>

        {/* <Grid size={{ xs: 2, sm: 4, md: 3 }}>
            <InputLabel sx={{ color: "#000" }}>
              selective Remark
              <Typography component={"span"} style={{ color: "red" }}>
                *
              </Typography>
            </InputLabel>
            <TextField
              name="selectiveRemark"
              type="text"
              placeholder="Floor"
              onChange={handleChange}
              value={formData.selectiveRemark}
              fullWidth
              size="small"
              //   error={!!errors?.aadharId}
              //   helperText={errors?.aadharId}
            />
          </Grid>
  
          <Grid size={{ xs: 2, sm: 4, md: 3 }}>
            <InputLabel sx={{ color: "#000" }}>
              Next Follow up
              <Typography component={"span"} style={{ color: "red" }}>
                *
              </Typography>
            </InputLabel>
            <TextField
              name="nextFollowUp"
              type="text"
              placeholder="follow up"
              onChange={handleChange}
              value={formData.nextFollowUp}
              fullWidth
              size="small"
              //   error={!!errors?.aadharId}
              //   helperText={errors?.aadharId}
            />
          </Grid>
  
          <Grid size={{ xs: 2, sm: 4, md: 3 }}>
            <InputLabel sx={{ color: "#000" }}>
              Assisnged to
              <Typography component={"span"} style={{ color: "red" }}>
                *
              </Typography>
            </InputLabel>
            <TextField
              name="assignedTo"
              type="text"
              placeholder="Assisnged tp "
              onChange={handleChange}
              value={formData.assignedTo}
              fullWidth
              size="small"
              //   error={!!errors?.aadharId}
              //   helperText={errors?.aadharId}
            />
          </Grid>
  
          <Grid size={{ xs: 2, sm: 4, md: 3 }}>
            <InputLabel sx={{ color: "#000" }}>
              Assisnged to
              <Typography component={"span"} style={{ color: "red" }}>
                *
              </Typography>
            </InputLabel>
            <TextField
              name="furtherAction"
              type="text"
              placeholder="Further Action "
              onChange={handleChange}
              value={formData.furtherAction}
              fullWidth
              size="small"
              //   error={!!errors?.aadharId}
              //   helperText={errors?.aadharId}
            />
          </Grid>
  
          <Grid size={{ xs: 2, sm: 4, md: 3 }}>
            <InputLabel sx={{ color: "#000" }}>
              CreatedBy
              <Typography component={"span"} style={{ color: "red" }}>
                *
              </Typography>
            </InputLabel>
            <TextField
              name="createdBy"
              type="date"
              onChange={handleChange}
              value={formData.createdBy}
              fullWidth
              size="small"
              //   error={!!errors?.aadharId}
              //   helperText={errors?.aadharId}
            />
          </Grid>
          <Grid size={{ xs: 2, sm: 4, md: 3 }}>
            <InputLabel sx={{ color: "#000" }}>
              Modified By
              <Typography component={"span"} style={{ color: "red" }}>
                *
              </Typography>
            </InputLabel>
            <TextField
              name="modifiedBy"
              type="date"
              onChange={handleChange}
              value={formData.modifiedBy}
              fullWidth
              size="small"
              //   error={!!errors?.aadharId}
              //   helperText={errors?.aadharId}
            />
          </Grid> */}
      </Grid>
      <Box sx={{ mt: 2, float: "right" }}>
        <Button
          variant="outlined"
          sx={{ border: "1px solid black", color: "black", mr: 2 }}
          onClick={() => setOpenEditdialog(false)}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          type="submit"
          sx={{ backgroundColor: "black", color: "white" }}
          onClick={(e: any) => {
            handleUpdate(e);
          }}
          disabled={JSON.stringify(formData) === JSON.stringify(editLead[0])}
        >
          Edit Lead
        </Button>
      </Box>
    </Box>
  );
};
