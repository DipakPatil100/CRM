import { Box } from "@mui/material";
import React from "react";
import PageContainer from "@/components/container/PageContainer";
import DashboardCard from "@/components/shared/DashboardCard";
import CreationForm from "./LeadForm";
import { getData } from "@/services/apiService";
const page = async() => {
  const propertData= await getData("/v1/property/get-properties");
 
  return (
    <PageContainer title="Order Table" description="master-crm">
      <DashboardCard title="Lead Creation" subtitle="">
        <>
          <Box>
          
            <CreationForm propertyData = {propertData?.data}/>
          </Box>
        </>
      </DashboardCard>
    </PageContainer>
  );
};

export default page;
