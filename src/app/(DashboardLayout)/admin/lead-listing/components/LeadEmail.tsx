"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import DraftsIcon from "@mui/icons-material/Drafts";

interface LeadEmailData {
  id: number;
  leadId: string; // Unique Identifier for Leads
  email: string;
  subject: string;
  message: string;
  status: "Draft" | "Sent";
  timestamp: string;
}

const LeadEmail = ({leadData}:any) => {
  const [leadId, setLeadId] = useState(leadData?.applicationNo); // Lead Identifier
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"Draft" | "Sent">("Draft");
  const [emails, setEmails] = useState<LeadEmailData[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  // Error State
  const [errors, setErrors] = useState({
    leadId: "",
    email: "",
    subject: "",
    message: "",
  });

  const resetForm = () => {
    // setLeadId("");
    setEmail("");
    setSubject("");
    setMessage("");
    setStatus("Draft");
    setEditId(null);
    setErrors({ leadId: "", email: "", subject: "", message: "" });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { leadId: "", email: "", subject: "", message: "" };

    if (!leadId) {
      newErrors.leadId = "Lead ID is required.";
      valid = false;
    }

    if (!email) {
      newErrors.email = "Recipient Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format.";
      valid = false;
    }

    if (!subject) {
      newErrors.subject = "Subject is required.";
      valid = false;
    }

    if (!message) {
      newErrors.message = "Message is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const isDuplicateLead = () => {
    return emails.some((item) => item.leadId === leadId && editId === null);
  };

  const handleSave = async (status: "Draft" | "Sent") => {
    if (!validateForm()) return;

    if (isDuplicateLead()) {
      setErrors((prev) => ({ ...prev, leadId: "Lead ID already exists!" }));
      return;
    }

    const timestamp = new Date().toLocaleString();

    if (editId !== null) {
      // Update existing email
      setEmails((prev) =>
        prev.map((item) =>
          item.id === editId
            ? { ...item, leadId, email, subject, message, status, timestamp }
            : item
        )
      );
    } else {
      // Add new email
      setEmails([
        ...emails,
        {
          id: Date.now(),
          leadId,
          email,
          subject,
          message,
          status,
          timestamp,
        },
      ]);
    }

    // if (status === "Sent") {
    //   try {
    //     const response = await fetch("http://localhost:5000/send-email", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         email,
    //         subject,
    //         message,
    //       }),
    //     });

    //     const data = await response.json();
    //     if (data.success) {
    //       console.log("Email sent successfully!");
    //     } else {
    //       console.error("Failed to send email:", data.message);
    //     }
    //   } catch (error) {
    //     console.error("Error sending email:", error);
    //   }
    // }

    resetForm();
  };

  const handleEdit = (id: number) => {
    const emailToEdit = emails.find((e) => e.id === id);
    if (emailToEdit) {
      setLeadId(emailToEdit.leadId);
      setEmail(emailToEdit.email);
      setSubject(emailToEdit.subject);
      setMessage(emailToEdit.message);
      setStatus(emailToEdit.status);
      setEditId(emailToEdit.id);
      setErrors({ leadId: "", email: "", subject: "", message: "" });
    }
  };

  const handleDelete = (id: number) => {
    setEmails((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Lead Email Management
      </Typography>

      {/* Email Form */}
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          p: 2,
          mb: 4,
          backgroundColor: "#f9f9f9",
        }}
      >
        <TextField
          label="Lead ID"
          fullWidth
          margin="normal"
          value={leadId}
          onChange={(e) => setLeadId(e.target.value)}
          error={!!errors.leadId}
          helperText={errors.leadId}
          required
          disabled
        />
        <TextField
          label="Recipient Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          required
        />
        <TextField
          label="Subject"
          fullWidth
          margin="normal"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          error={!!errors.subject}
          helperText={errors.subject}
          required
        />
        <TextField
          label="Message"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          error={!!errors.message}
          helperText={errors.message}
          required
        />
        <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="warning"
            onClick={() => handleSave("Draft")}
            startIcon={<DraftsIcon />}
          >
            Save as Draft
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSave("Sent")}
            startIcon={<SendIcon />}
          >
            Send Email
          </Button>
        </Box>
      </Box>

      {/* Email Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Lead ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emails.map((e) => (
              <TableRow key={e.id}>
                <TableCell>{e.leadId}</TableCell>
                <TableCell>{e.email}</TableCell>
                <TableCell>{e.subject}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(e.id)}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDelete(e.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LeadEmail;
