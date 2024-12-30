"use client";

import PageContainer from "@/components/container/PageContainer";
import DashboardCard from "@/components/shared/DashboardCard";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getData } from "@/services/apiService";
import dynamic from "next/dynamic";

const UnitBooking = dynamic(() => import("./UnitBooking"), { ssr: false });

const Page = () => {
  const [leadResponse, setLeadResponse] = useState<any[]>([]);
  const [propertyData, setPropertyData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leadResponse = await getData("/v1/getLead/getUserData");
        const propertyData = await getData("/v1/property/getall");

        setLeadResponse(leadResponse?.data || []);
        setPropertyData(propertyData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <PageContainer title="Order Table" description="master-crm">
      <DashboardCard title="Post Sales" subtitle="">
        <Box>
          <UnitBooking
            leadData={leadResponse}
            propertyData={propertyData}
          />
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
