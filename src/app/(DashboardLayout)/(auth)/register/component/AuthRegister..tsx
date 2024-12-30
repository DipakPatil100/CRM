import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

import CustomTextField from "@/components/forms/CustomTextfield";

import { Stack } from "@mui/system";

interface registerType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
  onChange: any;
  registerUser: any;
}

const AuthRegister = ({
  title,
  subtitle,
  subtext,
  onChange,
  registerUser,
}: registerType) => (
  <>
    {title ? (
      <Typography fontWeight="700" variant="h2" mb={1}>
        {title}
      </Typography>
    ) : null}

    {subtext}

    <Box>
      <Stack mb={3}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="name"
          mb="5px"
        >
          Name
        </Typography>
        <CustomTextField
          onChange={(e: any) => onChange(e, "name")}
          id="name"
          variant="outlined"
          fullWidth
        />

        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="email"
          mb="5px"
          mt="25px"
        >
          Email Address
        </Typography>
        <CustomTextField
          onChange={(e: any) => onChange(e, "email")}
          id="email"
          variant="outlined"
          fullWidth
        />

        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="password"
          mb="5px"
          mt="25px"
        >
          Password
        </Typography>
        <CustomTextField
          onChange={(e: any) => onChange(e, "password")}
          id="password"
          variant="outlined"
          fullWidth
        />
      </Stack>
      <Button
        onClick={registerUser}
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        component={Link}
        href="/"
      >
        Sign Up
      </Button>
    </Box>

    {subtitle}
  </>
);

export default AuthRegister;
