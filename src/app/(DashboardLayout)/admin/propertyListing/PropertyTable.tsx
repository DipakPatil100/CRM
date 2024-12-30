"use client";
import {
  Box,
  IconButton,
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IconX } from "@tabler/icons-react";
import axios from "axios";
import LeadDynamicTable from "@/components/DynamicTable/LeadDynamicTable";
import PropertyDynamicTable from "@/components/DynamicTable/PropertyDynamicTable";
import { useRouter } from "next/navigation";

interface HeadCell<T> {
  id: any;
  numeric: boolean;
  label: string;
}

interface Data {
  id: number;
  projectName: string;
  ownership: string;
  location: string;
  furnishing: string;
  action: string;
}

const headCells: HeadCell<Data>[] = [
  { id: "id", numeric: true, label: "#" },
  { id: "projectName", numeric: true, label: "Project Name" },
  { id: "ownership", numeric: false, label: "Ownership" },
  { id: "location", numeric: true, label: "Location" },
  { id: "furnishing", numeric: true, label: "Furnishing" },
  { id: "action", numeric: true, label: "Action" },
];

const PropertyTable = ({ propertyData }: any) => {
  const [rows, setRows] = useState<any[]>([]);
  const [openLeadDialog, setOpenLeadDialog] = useState(false);
  const [singleLead, setSingleLead] = useState<any>([]);
  const [editDialog, setEditDialog] = useState(false);
  const [editData, setEditData] = useState<any>([]);

  const router = useRouter()

  useEffect(() => {
    setRows(propertyData);
  }, []);

  return (
    <Box px={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={openLeadDialog ? 8 : 12}>
          <PropertyDynamicTable
            rows={rows}
            headCells={headCells}
            title="Property List"
            enableSelect={true}
            enablePagination={true}
            enableSorting={true}
            openLeadDialog={openLeadDialog}
            setOpenLeadDialog={setOpenLeadDialog}
            singleLead={singleLead}
            setSingleLead={setSingleLead}
            setEditDialog={setEditDialog}
            editDialog={editDialog}
            editData={editData}
            setEditData={setEditData}
          />
        </Grid>

        {openLeadDialog && (
          <Grid item xs={12} md={4} sx={{ height: "100%" }}>
            {singleLead.map((property: any) => (
              <Card
                key={property.id}
                sx={{ height: "100%", p: 2, overflowY: "scroll" }}
              >
                <CardContent sx={{ overflowY: "auto" }}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="h5">Property Profile</Typography>
                    <IconButton onClick={() => setOpenLeadDialog(false)}>
                      <IconX />
                    </IconButton>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Stack spacing={2}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ bgcolor: "#1976d2" }}>
                        {property.projectName[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {property.projectName}
                        </Typography>
                        <Typography variant="body2">
                          Unit Code: {property.unitCode}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider />

                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Property Details
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography fontWeight="bold">Ownership:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{property.ownership}</Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography fontWeight="bold">Location:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{property.location}</Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography fontWeight="bold">Furnishing:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{property.furnishing}</Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography fontWeight="bold">
                          Possession Status:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{property.possessionStatus}</Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography fontWeight="bold">Bathroom:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{property.bathroom}</Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography fontWeight="bold">Balcony:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{property.balcony}</Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography fontWeight="bold">Amenities:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{property.amenities}</Typography>
                      </Grid>

                      <Box>
                      <Button onClick={()=> router.push("/admin/propertyVisualization")} variant="outlined">View More</Button>
                    </Box>  
                    </Grid>
                    
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default PropertyTable;
