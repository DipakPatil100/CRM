'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import NoEncryptionOutlinedIcon from '@mui/icons-material/NoEncryptionOutlined';
import EnhancedEncryptionOutlinedIcon from '@mui/icons-material/EnhancedEncryptionOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';


const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [captchaSvg, setCaptchaSvg] = useState('');
  const [passworderror,setPassworderror] = useState("");
  const [passworderror1,setPassworderror1] = useState("");
  const [passworderror2,setPassworderror2] = useState("");
  const [passworderror3,setPassworderror3] = useState("");

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const randomNum = Math.floor(Math.random() * 10000);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="25">
                   <text x="25" y="23" font-size="18" fill="black">${randomNum}</text>
                 </svg>`;
    setCaptchaSvg('data:image/svg+xml;base64,' + btoa(svg));
    setCaptchaValue(randomNum.toString());
  };

  const handleClickShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
   
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChangeCurrentPassword = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setCurrentPassword(event.target.value);
    setPassworderror("");
  };

  const handleChangeNewPassword = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setNewPassword(event.target.value);
    setPassworderror1("");
  };

  const handleChangeConfirmPassword = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setConfirmPassword(event.target.value);
    setPassworderror2("");
  };
  const handleChangeCaptcha = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setCaptchaInput(event.target.value);
    setPassworderror3("");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if(!currentPassword){
      setPassworderror("Current Password Is Required")
    }
    if(!newPassword){
      setPassworderror1("setPassworderror Is Required")
    }
    if(!confirmPassword){
      setPassworderror2("confirmPasswordIs Required")
    }
    if(!captchaInput){
      setPassworderror3("captchaInput Is Required")
    }

    if (!currentPassword || !newPassword || !confirmPassword || !captchaInput) {
      setSnackbarMessage('All fields are required!');
      setSnackbarOpen(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setSnackbarMessage('New password and confirm password do not match!');
      setSnackbarOpen(true);
      return;
    }

    if (captchaInput !== captchaValue) {
      setSnackbarMessage('Captcha input is incorrect!');
      setSnackbarOpen(true);
      generateCaptcha();
      return;
    }


    console.log('Password change request submitted', { currentPassword, newPassword, captchaValue });
    setSnackbarMessage('Password changed successfully!');
    setSnackbarOpen(true);


    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setCaptchaInput('');
    generateCaptcha();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 430,
        mx: 'auto',

        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        marginTop: "40px"

      }}

    >
      <Typography variant="h4" align="center" gutterBottom>
        <NoEncryptionOutlinedIcon sx={{ fontSize: "34px", fontWeight: "bolder", backgroundColor: "#022213", padding: "5px", borderRadius: "100%", color: "white" }} />
        <Box>Change Password</Box>
      </Typography>

      <Box sx={{ display: "flex", fontSize: "18px", marginRight: "5px", color: "#737373", marginTop: "1px" }}>
        <LockOpenOutlinedIcon sx={{ fontSize: "18px", marginRight: "5px", color: "#737373", marginTop: "1px" }} />
        <Typography>Current Password</Typography>
      </Box>

      <TextField
        fullWidth
        size="small"
        type={showCurrentPassword ? 'text' : 'password'}
        margin="dense"
        variant="outlined"
        placeholder='Current Password'
        value={currentPassword}
        onChange={handleChangeCurrentPassword}
        error={!!passworderror}
        helperText={passworderror}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleClickShowCurrentPassword}>
              {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        }}
      />
      <Box sx={{ display: "flex" }}><EnhancedEncryptionOutlinedIcon sx={{ fontSize: "18px", marginRight: "5px", color: "#737373", marginTop: "1px" }} /> <Typography>New Password</Typography> </Box>

      <TextField
        fullWidth
        size="small"
        type={showNewPassword ? 'text' : 'password'}
        margin="dense"
        variant="outlined"
        placeholder='New Password'
        value={newPassword}
        onChange={handleChangeNewPassword}
        error={!!passworderror1}
        helperText={passworderror1}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleClickShowNewPassword}>
              {showNewPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        }}
      />
      <Box sx={{ display: "flex" }}><HttpsOutlinedIcon sx={{ fontSize: "18px", marginRight: "5px", color: "#737373", marginTop: "1px" }} /> <Typography>Confirm New Password</Typography> </Box>

      <TextField
        fullWidth
        size="small"
        type={showConfirmPassword ? 'text' : 'password'}
        margin="dense"
        variant="outlined"
        placeholder='Confirm New Password'
        value={confirmPassword}
        onChange={handleChangeConfirmPassword}
        error={!!passworderror2}
        helperText={passworderror2}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleClickShowConfirmPassword}>
              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        }}
      />
      <Box sx={{ textAlign: 'center', display: "flex", marginTop: "12px" }}>
        <Box sx={{display:"flex"}}>
          <Box sx={{ backgroundColor: "#b8b8b8",height:"36px" }}>
            <img src={captchaSvg} alt="Captcha" />

          </Box>
          <Button
            variant="text"
            onClick={generateCaptcha}
            sx={{ height:"30px" }}

          >
            <ReplayOutlinedIcon sx={{ color: "#757575" }} />
          </Button>
        </Box>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          value={captchaInput}
          onChange={handleChangeCaptcha}
          error={!!passworderror3}
          helperText={passworderror3}
          placeholder="Enter captcha"
        />
      </Box>

      <Button
        type="submit"
        variant="contained"

        fullWidth
        sx={{ mt: 2, backgroundColor: "#ACDD33", color: "black" }}
      >
        <LockResetOutlinedIcon sx={{ marginRight: "5px", fontSize: "22px" }} /> Change Password
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChangePassword;
