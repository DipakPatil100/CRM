"use client";
import React, { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";

const SkeletonDashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the delay time as needed
    return () => clearTimeout(timer);
  }, []);
  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f4f4f4" }}>
      {/* Sidebar */}
      {true ? (
        <>
          <Box
            sx={{
              width: "350px",
              backgroundColor: "#fff",
              // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              padding: 2,
            }}
          >
            {/* Logo */}
            <Skeleton
              variant="rectangular"
              width="80%"
              height={40}
              sx={{ mb: 3, borderRadius: "5px" }}
            />
            {/* Menu Items */}
            {[...Array(9)].map((_, index) => (
              <>
                <Skeleton
                  key={index}
                  variant="text"
                  width="20%"
                  height={15}
                  sx={{ mb: 1, borderRadius: "5px" }}
                />
                <Skeleton
                  key={index}
                  variant="text"
                  width="90%"
                  height={30}
                  sx={{ mb: 2, borderRadius: "5px" }}
                />
              </>
            ))}
          </Box>

          {/* Right Section */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {/* Header */}
            <Box
              sx={{
                height: "64px",
                backgroundColor: "#fff",
                display: "flex",
                alignItems: "center",
                paddingX: 2,
                // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Skeleton
                variant="rectangular"
                width="200px"
                height={30}
                sx={{ ml: "auto", borderRadius: "10px" }}
              />
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                sx={{ ml: 2, mr: 2 }}
              />
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                sx={{ ml: 2, mr: 2 }}
              />
              <Skeleton variant="circular" width={40} height={40} />
            </Box>

            {/* Main Content */}
            <Box sx={{ flex: 1, padding: 3 }}>
              {/* Page Header */}
              <Skeleton
                variant="rectangular"
                width="40%"
                height={30}
                sx={{ mb: 3, borderRadius: "5px" }}
              />

              <Skeleton
                variant="rectangular"
                width="14%"
                height={20}
                sx={{ mb: 3, borderRadius: "5px" }}
              />
              {/* Table Skeleton */}
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  padding: 2,
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width="20%"
                  height={30}
                  sx={{ mb: 2 }}
                />
                {[...Array(5)].map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width="100%"
                    height={50}
                    sx={{ mb: 2 }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </>
      ) : null}
    </Box>
  );
};

export default SkeletonDashboard;
