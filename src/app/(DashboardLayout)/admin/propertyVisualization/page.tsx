import DashboardCard from "@/components/shared/DashboardCard";
import { Box } from "@mui/material";
import { PageContainer } from "@toolpad/core/PageContainer";
// import { Head } from "next/document";
import dynamic from "next/dynamic";
// import { Script } from "vm";

const Visualization = dynamic(() => import("./Visualization"), { ssr: false });

const page = () => {
  return (
    <>
      {/* <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin="anonymous"
        />
      </Head> */}
      <PageContainer title="Visualization" description="master-crm">
        <DashboardCard title="Property Visualization" subtitle="">
          <Box>
            <Visualization />
          </Box>
        </DashboardCard>
      </PageContainer>
      {/* <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossOrigin="anonymous"
      /> */}
    </>
  );
};

export default page;
