"use client"
import { Box } from "@mui/material";
import React from "react";
import PageContainer from "@/components/container/PageContainer";
import DashboardCard from "@/components/shared/DashboardCard";

import { getData } from "@/services/apiService";
import LeadDetails from "./leadDetails";

const Page = ({params}:any) => {
  console.log(params, "PARAMSSSS")
  return (
    <PageContainer title="Order Table" description="master-crm">
      <DashboardCard title="Lead Details" subtitle="">
        <>
          <Box>
            <LeadDetails ID={params.viewDetails} />
          </Box>
        </>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
