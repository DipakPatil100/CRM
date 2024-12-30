import * as React from 'react';

import PageContainer from '@/components/container/PageContainer';
import DashboardCard from '@/components/shared/DashboardCard';
import Notification from './Notification';
import { Box } from '@mui/material';


export default function Page() {
  return (
    <PageContainer title="Order Table" description="master-crm">
      <DashboardCard title="Notification" subtitle="">
        <>
        <Box>
          <Notification />
        </Box>
        </>
      </DashboardCard>
    </PageContainer>
  );
}
