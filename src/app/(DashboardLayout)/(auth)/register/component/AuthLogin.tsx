// "use client";
import PageContainer from "@/components/container/PageContainer";
import {
  Box,
  Card,
  Typography,
  Stack,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  TextField,
  Tab,
  Tabs,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import React, { useState } from "react";

import AuthLogin from "@/components/auth/AuthLogin";
import Visibility from "@mui/icons-material/Visibility";
import {
  IconBrandGoogleFilled,
  IconBrandAppleFilled,
  IconPhoneFilled,
  IconEyeOff,
  IconEye,
} from "@tabler/icons-react";
import { loginUser } from "@/services/loginService";
import { useSnackbar } from "notistack";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import jwtDecode from "jwt-decode";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const LoginComponent = ({
  formData,
  setFormData,
  showPassword,
  setShowPassword,
  setValue1,
  value1,
}: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const handleChange1 = (event: React.SyntheticEvent, newValue: number) => {
    setFormData({
      emailId: "",
      mobileNo: "",
      password: "",
    });
    setValue1(newValue);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmitEmail = async (e: any) => {
    e.preventDefault();
    try {
      const res = await loginUser("/v1/user/login", { type: 1, ...formData });

      const token = res.token.access.token;
      const expire = res.token.access.expires;

      const decodedToken = jwtDecode(token);

      localStorage.setItem("user", JSON.stringify(decodedToken));

      if (!res?.error) {
        enqueueSnackbar(res.message, { variant: "success" });
        router.push("/home");
      } else {
        enqueueSnackbar(res.message, { variant: "error" });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmitMobile = async (e: any) => {
    e.preventDefault();
    try {
      const res = await loginUser("/v1/user/login", { type: 2, ...formData });

      localStorage.setItem("user", JSON.stringify(res.data));

      if (!res?.error) {
        enqueueSnackbar(res.message, { variant: "success" });
        router.push("/home");
      } else {
        enqueueSnackbar(res.message, { variant: "error" });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Grid container sx={{ height: "98vh" }}>
      <Grid
        size={{ xs: 12, md: 12 }}
        // sx={{ display: { xs: "none", md: "block", height: "100%" } }}
      >
        <Box
          sx={{
            height: "100%",
            backgroundImage: `url('/images/backgrounds/estate.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            // border:"2px solid red"
          }}
        >
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
              marginLeft: "2rem",
              display: { xs: "none", md: "block" },
            }}
          >
            <Box sx={{ width: "100%", marginBottom: "2rem" }}>
              <Typography
                sx={{
                  fontSize: "4rem",
                  lineHeight: "4rem",
                  fontWeight: "1000",
                }}
              >
                sell or purchase property with Innoblooms
              </Typography>
            </Box>
            <Box sx={{ width: "100%", marginBottom: "2rem" }}>
              <Typography sx={{ fontSize: "1.5rem", lineHeight: "2.5rem" }}>
                with Innoblooms responsive landing page template you can promote
                your all property and real estate projects.
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
              <Button
                variant="contained"
                sx={{ width: "200px", backgroundColor: "#0063cc" }}
              >
                Outlined
              </Button>
            </Box>
          </Box>
          <Grid size={{ xs: 12, md: 12 }}>
            <Grid
              size={{ xs: 12, md: 11 }}
              sx={{ display: "flex", justifyContent: "end" }}
            >
              <Box
                sx={{
                  display: "flex",

                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  // px: 6,
                  width: { xs: "100%", md: "550px" },
                  height: { xs: "100vh", md: "500px" },
                  borderRadius: "8px",
                  backgroundColor: "#022213",
                  opacity: 0.9,
                }}
              >
                <Box sx={{ width: "100%", maxWidth: 400 }}>
                  <Box sx={{ textAlign: "center", paddingTop: "2rem" }}>
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "2rem",
                        fontWeight: "600",
                        marginBottom: "2rem",
                        lineHeight: "2rem",
                      }}
                    >
                      Welcome back to innoblooms
                    </Typography>
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs
                        value={value1}
                        onChange={handleChange1}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          ml:2,
                          // width: "100%",
                          alignItems: "center",
                          borderRadius: "8px",
                        }}
                      >
                        <Tab
                          label={
                            <Typography
                              color="#fff"
                              sx={{
                                fontSize: { xs: "12px", md: "15px" },
                                // marginRight: { xs: "1rem", md: "5rem" },
                              }}
                            >
                              Login with Email
                            </Typography>
                          }
                          {...a11yProps(0)}
                        />
                        <Tab
                          label={
                            <Typography
                              color="#fff"
                              sx={{ fontSize: { xs: "12px", md: "15px" } }}
                            >
                              Login with Mobile
                            </Typography>
                          }
                          {...a11yProps(1)}
                        />
                      </Tabs>
                    </Box>
                    <CustomTabPanel value={value1} index={0}>
                      <form onSubmit={handleSubmitEmail}>
                        {/* Email */}
                        <TextField
                          placeholder="Email"
                          variant="outlined"
                          fullWidth
                          name="emailId"
                          value={formData.emailId}
                          onChange={(e: any) => handleChange(e)}
                          sx={{ mb: 2, backgroundColor: "white" }}
                        />

                        {/* Password */}
                        <Box sx={{ position: "relative", mb: 2 }}>
                          <TextField
                            name="password"
                            value={formData.password}
                            onChange={(e: any) => handleChange(e)}
                            placeholder="Enter your password"
                            variant="outlined"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            sx={{ backgroundColor: "white" }}
                          />
                          <IconButton
                            onClick={handleClickShowPassword}
                            sx={{ position: "absolute", right: 10, top: 10 }}
                          >
                            {showPassword ? <IconEye /> : <IconEyeOff />}
                          </IconButton>
                        </Box>

                        {/* Terms and Conditions */}
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label={
                            <Typography variant="body2" sx={{ color: "white" }}>
                              I agree to the{" "}
                              <Link href="#" color="primary">
                                Terms & Conditions
                              </Link>
                            </Typography>
                          }
                        />

                        {/* Create Account Button */}
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                          sx={{
                            mt: 2,
                            mb: 2,
                            backgroundColor: "#acdd33",
                            color: "#000",
                            fontWeight: "bold",
                          }}
                        >
                          Login
                        </Button>
                      </form>
                    </CustomTabPanel>
                    <CustomTabPanel value={value1} index={1}>
                      <form onSubmit={handleSubmitMobile}>
                        {/* Email */}
                        <TextField
                          placeholder="Mobile Number"
                          variant="outlined"
                          fullWidth
                          name="mobileNo"
                          value={formData.mobileNo}
                          onChange={(e: any) => handleChange(e)}
                          sx={{ mb: 2, backgroundColor: "white" }}
                        />

                        {/* Password */}
                        <Box sx={{ position: "relative", mb: 2 }}>
                          <TextField
                            name="password"
                            value={formData.password}
                            onChange={(e: any) => handleChange(e)}
                            placeholder="Enter your password"
                            variant="outlined"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            sx={{ backgroundColor: "white" }}
                          />
                          <IconButton
                            onClick={handleClickShowPassword}
                            sx={{ position: "absolute", right: 10, top: 10 }}
                          >
                            {showPassword ? <IconEye /> : <IconEyeOff />}
                          </IconButton>
                        </Box>

                        {/* Terms and Conditions */}
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label={
                            <Typography variant="body2" sx={{ color: "white" }}>
                              I agree to the{" "}
                              <Link href="#" color="primary">
                                Terms & Conditions
                              </Link>
                            </Typography>
                          }
                        />

                        {/* Create Account Button */}
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                          sx={{
                            mt: 2,
                            mb: 2,
                            backgroundColor: "#acdd33",
                            color: "#000",
                            fontWeight: "bold",
                          }}
                        >
                          Login
                        </Button>
                      </form>
                    </CustomTabPanel>
                    <Box
                      sx={{
                        alignItem: "end",
                        textAlign: "end",
                        marginBottom: "1rem",
                        marginTop: "-20px",
                      }}
                    >
                      <Link
                        color="success"
                        style={{ marginRight: 30, marginTop: "-10px" }}
                        href={"/forget-password"}
                      >
                        Forget Password?
                      </Link>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};
export default LoginComponent;
