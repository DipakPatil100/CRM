import { Typography } from "@mui/material";
import { SidebarFooterProps } from "@toolpad/core/DashboardLayout";

function SidebarFooter({ mini }: SidebarFooterProps) {
    return (
      <Typography
        variant="caption"
        sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
      >
        { ` © ${new Date().getFullYear()}, made by Innoblooms for a better web.`}
      </Typography>
    );
  }

  export default SidebarFooter