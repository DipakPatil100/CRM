"use client";
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  SxProps,
  Breadcrumbs,
  Link,
  Button,
} from "@mui/material";
import { IconHome, IconCaretLeftFilled } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  title?: string;
  subtitle?: string;
  action?: JSX.Element | any;
  footer?: JSX.Element;
  cardheading?: string | JSX.Element;
  headtitle?: string | JSX.Element;
  headsubtitle?: string | JSX.Element;
  children?: JSX.Element;
  middlecontent?: string | JSX.Element;
  sx?: SxProps; // Accepts the sx prop
};

const DashboardCard = ({
  title,
  subtitle,
  children,
  action,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
  middlecontent,
  sx, // Add this here to accept sx
}: Props) => {
  const path = usePathname();
  const router = useRouter();

  return (
    <Card
      variant="outlined"
      sx={{
        padding: 0,
        overflow: "revert !important",
        ...sx,
      }}
    >
      {cardheading ? (
        <CardContent>
          <Typography variant="h5">{headtitle}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {headsubtitle}
          </Typography>
        </CardContent>
      ) : (
        <>
          <CardContent sx={{ maxWidth: "100% !important" }}>
            {title ? (
              <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                alignItems={"center"}
                mb={3}
              >
                <Box>
                  {title ? (
                    <Typography color="#" variant="h5">
                      {title}
                    </Typography>
                  ) : (
                    ""
                  )}

                  {subtitle ? (
                    <Typography variant="subtitle2" color="#7B809A">
                      {subtitle}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Box>
                {action}
              </Stack>
            ) : null}
            {path !== "/home" && (
              <Box sx={{ margin: "20px 0" }}>
                {/* <Breadcrumbs aria-label="breadcrumb">
                <Link
                  underline="hover"
                  sx={{ display: "flex", alignItems: "center", gap: 2 }}
                  color="text.primary"
                  href="/home"
                >
                  <IconHome />
                  Home
                </Link>

                <Box
                  sx={{
                    color: "#000",
                  }}
                >
                  {path}
                </Box>
              </Breadcrumbs> */}
              </Box>
            )}

            {children}
          </CardContent>
        </>
      )}

      {middlecontent}
      {footer}
    </Card>
  );
};

export default DashboardCard;
