import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import LeadDetails, {
  fetchFollowUpsData,
} from "@/app/(DashboardLayout)/admin/lead-listing/[viewDetails]/leadDetails";
import {
  Box,
  Card,
  CardContent,
  Divider,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { IconX } from "@tabler/icons-react";
import { postData } from "@/services/apiService";
import { enqueueSnackbar } from "notistack";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function AddFollowUpModal({
  displayAddNextModal,
  setDisplayAddNextModal,
  leadData,
  setFollowUpData,
}: any) {
  const [open, setOpen] = React.useState(false);
  const [forms, setForms] = React.useState({
    remark: "",
    date: "",
    status: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setDisplayAddNextModal(false);
  };
  const handleChange = (e: any) => {
    const { value, name } = e.target;
    console.log(value, name);
    setForms({
      ...forms,
      [name]: value,
    });
  };
  const handleAdd = async (e: any) => {
    e.preventDefault();
    try {
      const response = await postData("/v1/lead-followup/create", {
        ...forms,
        LeadId: leadData?.LeadId,
        applicantName: leadData?.applicantName,
        agentName: leadData?.agentName,
        assignedTo: leadData?.assignedTo,
      });
     
      enqueueSnackbar(response.message, { variant: "success" });
      setForms({
        remark: "",
        date: "",
        status: "",
      })
      setDisplayAddNextModal(false);
      fetchFollowUpsData(leadData?.LeadId).then((data) => {
        console.log("we are here inside ", data, leadData?.LeadId);
        setFollowUpData(data.data);
      });
      
    } catch (error) {
      enqueueSnackbar("An error occurred while submitting the form", {
        variant: "error",
      });
    }
  };

  console.log(forms, "fomr");

  return (
    <React.Fragment>
      <Card>
        <Typography
          variant="h6"
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
        >
          Add Next Follow Up{" "}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        {/* <DialogContent dividers> */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Box sx={{ height: "100%", width: "100%" }}>
            <Box padding={2} sx={{ paddingTop: "0" }}>
              <Grid size={{ xs: 12, md: 12 }} width={"100%"}>
                <InputLabel sx={{ color: "#000" }}>
                  Remark
                  <Typography component={"span"} style={{ color: "red" }}>
                    *
                  </Typography>
                </InputLabel>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={8}
                  cols={50}
                  placeholder="Enter the Remark"
                  style={{
                    padding: "5px 10px",
                    minWidth: "100%",
                    borderColor: "grey",
                    outlineColor: "gray",
                    borderRadius: "4px",
                  }}
                  name="remark"
                  // value={forms.remark}
                  onChange={handleChange}
                />
              </Grid>
              <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <InputLabel sx={{ color: "#000" }}>
                    Date
                    <Typography component={"span"} style={{ color: "red" }}>
                      *
                    </Typography>
                  </InputLabel>
                  <TextField
                    type="date"
                    name="date"
                    placeholder="Date"
                    onChange={handleChange}
                    value={forms.date}
                    fullWidth
                    size="small"

                    //   error={!!errors?.employeeCode}
                    //   helperText={errors?.employeeCode}
                  />
                </Grid>
                {/* application Code */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <InputLabel sx={{ color: "#000" }}>
                    Status
                    <Typography component={"span"} style={{ color: "red" }}>
                      *
                    </Typography>
                  </InputLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // label="Cold"
                      size="small"
                      name="status"
                      onChange={handleChange}
                    >
                      <MenuItem value={"cold"}>Cold</MenuItem>
                      <MenuItem value={"Warm"}>Warm</MenuItem>
                      <MenuItem value={"Hot"}>Hot</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid2>
        {/* </DialogContent> */}
        <DialogActions>
          <Box alignItems={"baseline"}>
            <Button
              size="small"
              variant="contained"
              sx={{
                border: "1px solid black",
                backgroundColor: "#144322",
                color: "white",
                mr: 2,
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              type="submit"
              sx={{ backgroundColor: "#ACDD33", color: "black" }}
              onClick={handleAdd}
            >
              Add
            </Button>
          </Box>
        </DialogActions>
      </Card>
    </React.Fragment>
  );
}

export default AddFollowUpModal;
