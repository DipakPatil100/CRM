import React from "react";
import PageContainer from "@/components/container/PageContainer";
import DashboardCard from "@/components/shared/DashboardCard";
import { Box, Typography } from "@mui/material";
import { IconBoxAlignBottomLeft } from "@tabler/icons-react";
import { getData } from "@/services/apiService";
import PropertyTable from "./PropertyTable";

interface HeadCell<T> {
  id: keyof T; // This ensures that id is one of the keys in your data type
  numeric: boolean;
  label: string;
}
interface Data {
  id: number;
  name: string;
  price: number;
}
const Page = async () => {
  const res = await getData("/v1/property/getall");

  return (
    <PageContainer title="Users" description="users">
      <DashboardCard
        title="Property Table"
        subtitle=""
        sx={{ padding: 0 }}
      >
        <Box width={"100%"}>
          <PropertyTable propertyData={res.data || []}/>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
