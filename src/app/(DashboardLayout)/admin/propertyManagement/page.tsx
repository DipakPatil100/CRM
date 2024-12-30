import { Box } from "@mui/material";
import React from "react";
import PageContainer from "@/components/container/PageContainer";
import DashboardCard from "@/components/shared/DashboardCard";
import PropertyForm from "./propertyManagement";
import { getData } from "@/services/apiService";

async function getMasterData() {
  try {
    const properties = await getData("/v1/mdm-master/get/3");
    const transactionType = await getData("/v1/mdm-master/get/5");
    const amenitiesData = await getData("/v1/mdm-master/get/8");

    return {
      properties: properties || [],
      transactionType: transactionType || [],
      amenitiesData: amenitiesData || [],
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      properties: [],
      transactionType: [],
      amenitiesData: [],
    };
  }
}

const page = async () => {
  const { properties, transactionType, amenitiesData } = await getMasterData();

  console.log(properties, transactionType, amenitiesData, "MASTERS");

  return (
    <PageContainer title="Order Table" description="master-crm">
      <DashboardCard title="Property Form" subtitle="">
        <Box>
          <PropertyForm
            properties={properties?.data?.[0]?.data || []}
            transactionType={transactionType?.data?.[0]?.data || []}
            amenitiesData={amenitiesData?.data?.[0]?.data || []}
          />
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default page;
