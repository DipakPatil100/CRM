import React from "react";
import PageContainer from "@/components/container/PageContainer";
import DashboardCard from "@/components/shared/DashboardCard";
import { Box, Typography } from "@mui/material";
import { IconBoxAlignBottomLeft } from "@tabler/icons-react";
import { getData } from "@/services/apiService";
import BookingList from "./BookingList";


const Page = async () => {
  const res = await getData("/v1/booking/get");
  
  return (
    <PageContainer title="Booking List" description="unit booking">
      <DashboardCard
        title="Booking Table"
        subtitle=""
        sx={{ padding: 0 }}
      >
        <Box width={"100%"}>
          <BookingList bookingData={res.data || []}/>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
