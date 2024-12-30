import { Box } from "@mui/material";
import React, { useEffect } from "react";
import PageContainer from "@/components/container/PageContainer";
import DashboardCard from "@/components/shared/DashboardCard";
import CreationForm from "../lead-creation/LeadForm";
import { DataGrid } from "@mui/x-data-grid";
import LeadLists from "./LeadLists";
import { getData } from "@/services/apiService";
const page = async () => {
  let leadResponse = await getData("/v1/getLead/getUserData");

  const userResponse = await getData("/v1/user/get-all");
  const propertData = await getData("/v1/property/get-properties");

   const getUser = async ()=> {
    "use server"
    leadResponse = await getData("/v1/user/get-all");
     
  }

  return (
    <PageContainer title="Order Table" description="master-crm">
      <DashboardCard title="Lead Listing" subtitle="">
        <>
          <Box>
            <LeadLists
              leadData={leadResponse?.data || []}
              userData={userResponse.data || []}
              propertyData={propertData?.data}
              getUser={getUser}
            />
          </Box>
        </>
      </DashboardCard>
    </PageContainer>
  );
};

export default page;