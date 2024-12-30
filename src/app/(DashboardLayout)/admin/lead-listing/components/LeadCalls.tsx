"use client"
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { IconDeviceFloppy, IconEdit, IconTrash } from "@tabler/icons-react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Grid2 from "@mui/material/Grid2";

interface CallData {
  applicationNo: string;
  startDate: string | null;
  callDuration: string;
  assignTo: string;
}

const LeadCalls = () => {
  const [formData, setFormData] = useState<CallData>({
    applicationNo: "L24128182",
    startDate: null,
    callDuration: "",
    assignTo: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [calls, setCalls] = useState<CallData[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: any) => {
    setFormData((prev) => ({ ...prev, startDate: date }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.startDate) errors.startDate = "Start Date is required";
    if (!formData.callDuration) errors.callDuration = "Call Duration is required";
    if (!formData.assignTo) errors.assignTo = "Assign To is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editIndex !== null) {
      const updatedCalls = [...calls];
      updatedCalls[editIndex] = formData;
      setCalls(updatedCalls);
      setEditIndex(null);
    } else {
      setCalls((prev) => [...prev, formData]);
    }

    setFormData({
      applicationNo: "L24128182",
      startDate: null,
      callDuration: "",
      assignTo: "",
    });
    setFormErrors({});
  };

  const handleEdit = (index: number) => {
    setFormData(calls[index]);
    setEditIndex(index);
    setIsDialogOpen(true);
  };

  const handleDialogSave = () => {
    if (!validateForm()) return;
    const updatedCalls = [...calls];
    if (editIndex !== null) {
      updatedCalls[editIndex] = formData;
      setCalls(updatedCalls);
    }
    setIsDialogOpen(false);
    setEditIndex(null);
    setFormErrors({});
  };

  return (
    <Box>
      <Box sx={{ width: "50%" }} component={"form"} onSubmit={handleSubmit}>
        <Typography mb={2} variant="h5">
          Add Call
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={{ sm: 12, md: 12 }}>
            <TextField
              placeholder="Application Number"
              disabled
              fullWidth
              size="small"
              value={formData.applicationNo}
              name="applicationNo"
            />
          </Grid2>
          <Grid2 size={{ sm: 12, md: 6 }}>
            <DateTimePicker
              slots={{
                textField: (textFieldProps: any) => (
                  <TextField
                    {...textFieldProps}
                    size="small"
                    error={!!formErrors.startDate}
                    helperText={formErrors.startDate}
                  />
                ),
              }}
              name="startDate"
              label="Start Date"
              value={formData.startDate}
              onChange={handleDateChange}
            />
          </Grid2>
          <Grid2 size={{ sm: 12, md: 6 }}>
            <TextField
              label="Call Duration"
              fullWidth
              size="small"
              name="callDuration"
              value={formData.callDuration}
              onChange={handleChange}
              error={!!formErrors.callDuration}
              helperText={formErrors.callDuration}
            />
          </Grid2>
          <Grid2 size={{ sm: 12, md: 12 }}>
            <TextField
              label="Assign to"
              fullWidth
              size="small"
              name="assignTo"
              value={formData.assignTo}
              onChange={handleChange}
              error={!!formErrors.assignTo}
              helperText={formErrors.assignTo}
            />
          </Grid2>
        </Grid2>
        <Box mt={2}>
          <Button variant="contained" startIcon={<IconDeviceFloppy />} type="submit">
            {editIndex !== null ? "Update" : "Save"}
          </Button>
        </Box>
      </Box>

      <Box mt={4}>
        <Typography variant="h6">Call Details</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Application No</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>Call Duration</TableCell>
                <TableCell>Assign To</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {calls.map((call, index) => (
                <TableRow key={index}>
                  <TableCell>{call.applicationNo}</TableCell>
                  <TableCell>{call.startDate?.toString()}</TableCell>
                  <TableCell>{call.callDuration}</TableCell>
                  <TableCell>{call.assignTo}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(index)} startIcon={<IconEdit />} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default LeadCalls;
