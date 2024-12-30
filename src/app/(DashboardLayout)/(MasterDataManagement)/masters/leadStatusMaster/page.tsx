import { Box } from "@mui/material";
import React from "react";
import PageContainer from "@/components/container/PageContainer";
import DashboardCard from "@/components/shared/DashboardCard";
import Properties from "./leadstatus";
import { getData } from "@/services/apiService";
const page = async() => {
  const propertData= await getData("/v1/property/get-properties");
 
  return (
    <PageContainer title="Order Table" description="master-crm">
      <DashboardCard title="Properties" subtitle="">
        <>
          <Box>
            <Properties />
          </Box>
        </>
      </DashboardCard>
    </PageContainer>
  );
};

export default page;
