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
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Tabs,
  Tab,
  Button,
  ImageList,
  ImageListItem,
  Icon,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  IconBrandWhatsapp,
  IconCalendar,
  IconCurrencyRupee,
  IconDimensions,
  IconDog,
  IconMail,
  IconNotebook,
  IconNumber,
  IconPhone,
  IconStatusChange,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import DoorSlidingIcon from "@mui/icons-material/DoorSliding";
import BusinessIcon from "@mui/icons-material/Business";
// import {  TileLayer, Marker, Popup } from 'react-leaflet';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = L.divIcon({
  className: "custom-icon",
  html: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M255.999,94.878c-41.203,0-74.723,33.521-74.723,74.723s33.521,74.723,74.723,74.723 c41.202,0,74.723-33.521,74.723-74.723C330.723,128.399,297.202,94.878,255.999,94.878z" fill="#000000" style="fill: rgb(255, 0, 2);"/></g></g><g><g><path d="M255.999,0c-94.6,0-171.562,76.963-171.562,171.563c0,43.737,27.038,111.746,80.363,202.136 c39.049,66.193,78.663,120.97,79.058,121.516L256.028,512l12.133-16.811c0.396-0.549,40.002-55.571,79.046-121.88 c53.32-90.557,80.356-158.433,80.356-201.745C427.562,76.963,350.6,0,255.999,0z M255.999,274.319 c-57.742,0-104.718-46.976-104.718-104.718S198.257,64.883,255.999,64.883s104.718,46.977,104.718,104.718 C360.718,227.343,313.741,274.319,255.999,274.319z" fill="#000000" style="fill: rgb(255, 0, 2);"/></g></g></svg> `,
  iconSize: [40, 40], // Adjust size as needed
  iconAnchor: [15, 30],
});
const dummyData = {
  amenities: "Like:- lift, Gas Pipe, Swimming Pool Etc",
  balcony: [2],
  bathroom: [3],
  builtArea: "sdfsd",
  calculativeArea: "10900sq",
  captureArea: "1000sq",
  createdAt: "2024-10-25T09:37:42.504Z",
  createdBy: "user-1",
  direction: "Remark 1",
  facing: "like:- Nort Facing, South facing, Nort-East Facing, etc",
  finalizedArea: "safdsf",
  unitsPerFloor: 6,
  floors: [
    {
      floorNumber: 1,
      units: 5,
      UnitDetails: [
        {
          unitNumber: 1,
          unitType: "1BHK",
          unitArea: 900,
          unitPrice: 950000,
          unitStatus: "Blocked",
          unitImage: "https://example.com/unit1.jpg",
        },
        {
          unitNumber: 2,
          unitType: "2BHK",
          unitArea: 1200,
          unitPrice: 1300000,
          unitStatus: "Available",
          unitImage: "https://example.com/unit2.jpg",
        },
        {
          unitNumber: 3,
          unitType: "3BHK",
          unitArea: 1800,
          unitPrice: 2000000,
          unitStatus: "Booked",
          unitImage: "https://example.com/unit3.jpg",
        },
        {
          unitNumber: 4,
          unitType: "4BHK",
          unitArea: 2200,
          unitPrice: 2500000,
          unitStatus: "Available",
          unitImage: "https://example.com/unit4.jpg",
        },
        {
          unitNumber: 5,
          unitType: "PentHouse",
          unitArea: 3000,
          unitPrice: 5000000,
          unitStatus: "Available",
          unitImage: "https://example.com/unit5.jpg",
        },
      ],
    },

    {
      floorNumber: 2,
      units: 6,
      UnitDetails: [
        {
          unitNumber: 1,
          unitType: "1BHK",
          unitArea: 950,
          unitPrice: 975000,
          unitStatus: "Available",
          unitImage: "https://example.com/unit6.jpg",
        },
        {
          unitNumber: 2,
          unitType: "2BHK",
          unitArea: 1600,
          unitPrice: 1650000,
          unitStatus: "Available",
          unitImage: "https://example.com/unit7.jpg",
        },
        {
          unitNumber: 3,
          unitType: "3BHK",
          unitArea: 2100,
          unitPrice: 2200000,
          unitStatus: "Available",
          unitImage: "https://example.com/unit8.jpg",
        },
        {
          unitNumber: 4,
          unitType: "4BHK",
          unitArea: 2700,
          unitPrice: 2900000,
          unitStatus: "Booked",
          unitImage: "https://example.com/unit9.jpg",
        },
        {
          unitNumber: 5,
          unitType: "5BHK",
          unitArea: 3500,
          unitPrice: 4500000,
          unitStatus: "Available",
          unitImage: "https://example.com/unit10.jpg",
        },
        {
          unitNumber: 6,
          unitType: "WareHouse",
          unitArea: 4000,
          unitPrice: 5000000,
          unitStatus: "Blocked",
          unitImage: "https://example.com/unit11.jpg",
        },
      ],
    },

    {
      floorNumber: 3,
      units: 4,
      UnitDetails: [
        {
          unitNumber: 1,
          unitType: "1BHK",
          unitArea: 1100,
          unitPrice: 1100000,
          unitStatus: "Available",
          unitImage: "https://example.com/unit12.jpg",
        },
        {
          unitNumber: 2,
          unitType: "2BHK",
          unitArea: 1400,
          unitPrice: 1450000,
          unitStatus: "Blocked",
          unitImage: "https://example.com/unit13.jpg",
        },
        {
          unitNumber: 3,
          unitType: "3BHK",
          unitArea: 1900,
          unitPrice: 2050000,
          unitStatus: "Available",
          unitImage: "https://example.com/unit14.jpg",
        },
        {
          unitNumber: 4,
          unitType: "PentHouse",
          unitArea: 3200,
          unitPrice: 6000000,
          unitStatus: "Available",
          unitImage: "https://example.com/unit15.jpg",
        },
      ],
    },

    {
      floorNumber: 4,
      units: 5,
      UnitDetails: [
        {
          unitNumber: 1,
          unitType: "1BHK",
          unitArea: 1000,
          unitPrice: 1000000,
          unitStatus: "Available",
          unitImage: "https://example.com/unit16.jpg",
        },
        {
          unitNumber: 2,
          unitType: "2BHK",
          unitArea: 1300,
          unitPrice: 1350000,
          unitStatus: "Available",
          unitImage: "https://example.com/unit17.jpg",
        },
        {
          unitNumber: 3,
          unitType: "3BHK",
          unitArea: 2000,
          unitPrice: 2100000,
          unitStatus: "Booked",
          unitImage: "https://example.com/unit18.jpg",
        },
        {
          unitNumber: 4,
          unitType: "4BHK",
          unitArea: 2500,
          unitPrice: 2600000,
          unitStatus: "Available",
          unitImage: "https://example.com/unit19.jpg",
        },
        {
          unitNumber: 5,
          unitType: "WareHouse",
          unitArea: 3000,
          unitPrice: 4000000,
          unitStatus: "Booked",
          unitImage: "https://example.com/unit20.jpg",
        },
      ],
    },

    {
      floorNumber: 5,
      units: 3,
      UnitDetails: [
        {
          unitNumber: 1,
          unitType: "1BHK",
          unitArea: 950,
          unitPrice: 980000,
          unitStatus: "Available",
          unitImage: "https://example.com/unit21.jpg",
        },
        {
          unitNumber: 2,
          unitType: "2BHK",
          unitArea: 1600,
          unitPrice: 1700000,
          unitStatus: "Available",
          unitImage: "https://example.com/unit22.jpg",
        },
        {
          unitNumber: 3,
          unitType: "PentHouse",
          unitArea: 3500,
          unitPrice: 7000000,
          unitStatus: "Booked",
          unitImage: "https://example.com/unit23.jpg",
        },
      ],
    },

    {
      floorNumber: 6,
      units: 4,
      UnitDetails: [
        {
          unitNumber: 1,
          unitType: "1BHK",
          unitArea: 1050,
          unitPrice: 1050000,
          unitStatus: "Available",
          unitImage: "https://example.com/unit24.jpg",
        },
        {
          unitNumber: 2,
          unitType: "2BHK",
          unitArea: 1450,
          unitPrice: 1500000,
          unitStatus: "Booked",
          unitImage: "https://example.com/unit25.jpg",
        },
        {
          unitNumber: 3,
          unitType: "3BHK",
          unitArea: 2100,
          unitPrice: 2300000,
          unitStatus: "Available",
          unitImage: "https://example.com/unit26.jpg",
        },
        {
          unitNumber: 4,
          unitType: "4BHK",
          unitArea: 2800,
          unitPrice: 3200000,
          unitStatus: "Available",
          unitImage: "https://example.com/unit27.jpg",
        },
      ],
    },

    {
      floorNumber: 7,
      units: 5,
      UnitDetails: [
        {
          unitNumber: 1,
          unitType: "1BHK",
          unitArea: 900,
          unitPrice: 950000,
          unitStatus: "Available",
          unitImage: "https://example.com/unit28.jpg",
        },
        {
          unitNumber: 2,
          unitType: "2BHK",
          unitArea: 1300,
          unitPrice: 1400000,
          unitStatus: "Available",
          unitImage: "https://example.com/unit29.jpg",
        },
        {
          unitNumber: 3,
          "unitType ": "3BHK",
          unitArea: 1900,
          unitPrice: 2100000,
          unitStatus: "Booked",
          unitImage: "https://example.com/unit30.jpg",
        },
        {
          unitNumber: 4,
          unitType: "4BHK",
          unitArea: 2400,
          unitPrice: 2800000,
          unitStatus: "Available",
          unitImage: "https://example.com/unit31.jpg",
        },
        {
          unitNumber: 5,
          unitType: "PentHouse",
          unitArea: 3500,
          unitPrice: 7500000,
          unitStatus: "Booked",
          unitImage: "https://example.com/unit32.jpg",
        },
      ],
    },

    {
      floorNumber: 8,
      units: 4,
      UnitDetails: [
        {
          unitNumber: 1,
          unitType: "1BHK",
          unitArea: 1000,
          unitPrice: 1000000,
          unitStatus: "Available",
          unitImage: "https://example.com/unit33.jpg",
        },
        {
          unitNumber: 2,
          unitType: "2BHK",
          unitArea: 1500,
          unitPrice: 1600000,
          unitStatus: "Available",
          unitImage: "https://example.com/unit34.jpg",
        },
        {
          unitNumber: 3,
          unitType: "3BHK",
          unitArea: 2000,
          unitPrice: 2200000,
          unitStatus: "Booked",
          unitImage: "https://example.com/unit35.jpg",
        },
        {
          unitNumber: 4,
          unitType: "WareHouse",
          unitArea: 3000,
          unitPrice: 4000000,
          unitStatus: "Available",
          unitImage: "https://example.com/unit36.jpg",
        },
      ],
    },

    {
      floorNumber: 9,
      units: 5,
      UnitDetails: [
        {
          unitNumber: 1,
          unitType: "1BHK",
          unitArea: 950,
          unitPrice: 980000,
          unitStatus: "Available",
          unitImage: "https://example.com/unit37.jpg",
        },
        {
          unitNumber: 2,
          unitType: "2BHK",
          unitArea: 1400,
          unitPrice: 1500000,
          unitStatus: "Available",
          unitImage: "https://example.com/unit38.jpg",
        },
        {
          unitNumber: 3,
          unitType: "3BHK",
          unitArea: 2100,
          unitPrice: 2300000,
          unitStatus: "Booked",
          unitImage: "https://example.com/unit39.jpg",
        },
        {
          unitNumber: 4,
          unitType: "4BHK",
          unitArea: 2600,
          unitPrice: 3000000,
          unitStatus: "Available",
          unitImage: "https://example.com/unit40.jpg",
        },
        {
          unitNumber: 5,
          unitType: "PentHouse",
          unitArea: 4000,
          unitPrice: 8000000,
          unitStatus: "Booked",
          unitImage: "https://example.com/unit41.jpg",
        },
      ],
    },

    {
      floorNumber: 10,
      units: 3,
      UnitDetails: [
        {
          unitNumber: 1,
          unitType: "1BHK",
          unitArea: 1000,
          unitPrice: 1050000,
          unitStatus: "Available",
          unitImage: "https://example.com/unit42.jpg",
        },
        {
          unitNumber: 2,
          unitType: "2BHK",
          unitArea: 1600,
          unitPrice: 1700000,
          unitStatus: "Booked",
          unitImage: "https://example.com/unit43.jpg",
        },
        {
          unitNumber: 3,
          unitType: "3BHK",
          unitArea: 2200,
          unitPrice: 2400000,
          unitStatus: "Available",
          unitImage: "https:// example.com/unit44.jpg",
        },
      ],
    },
  ],
  furnishing: "semi",
  location: "locality",
  modifiedBy: "user-4",
  ownership: "lklkas",
  possessionStatus: "yes",
  projectName: "Gaur City",
  propertyType: "qw",
  reraRegisteredProperties: 0,
  reraRegisteredPropertiesNumber: "",
  superBuiltArea: "fd cxfsdf",
  transactionType: "hjhk",
  unit: "abx",
  unitCategory: "aaa",
  unitCode: "GAUR101",
  unitDescription: "new Upadted data 90",
  updatedAt: "2024-12-02T08:59:28.280Z",
  __v: 0,
  _id: "671b66e6a9f5c2379d11a392",
};

// const itemData = [
//   {
//     img: "https://img.freepik.com/free-photo/luxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge_1258-150749.jpg?t=st=1733210698~exp=1733214298~hmac=14a39784ab252c30ee832479ff34f4a660615ce799f38a403374d8bf7ed47b0d&w=1380",
//     title: "Breakfast",
//   },
//   {
//     img: "https://img.freepik.com/free-photo/luxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge_1258-150765.jpg?t=st=1733210872~exp=1733214472~hmac=63cb18a519ad67cc604c6f1be0039e4487b1c43a62dc9b7be63b9a37142186f1&w=1380",
//     title: "Burger",
//   },
//   {
//     img: "https://img.freepik.com/free-photo/house-isolated-field_1303-23773.jpg?t=st=1733210550~exp=1733214150~hmac=914d8f039e30242f466f10730aeb33cee334602d2d2d449386e2663df45ddf50&w=1380",
//     title: "Camera",
//   },
//   {
//     img: "https://img.freepik.com/premium-photo/average-residential-house-with-green-lawn-cloudy-day-canada_769578-2432.jpg?w=1380",
//     title: "Coffee",
//   },

//   {
//     img: "https://img.freepik.com/premium-photo/old-wooden-buildings-streets_71985-775.jpg?w=1060",
//     title: "Mushrooms",
//   },
//   {
//     img: "https://img.freepik.com/premium-photo/home-with-driveway-that-has-driveway-that-has-driveway-that-has-car-garage_1291376-1839.jpg?w=1380",
//     title: "Tomato basil",
//   },
//   {
//     img: "https://img.freepik.com/premium-photo/home-with-driveway-that-has-driveway-that-has-driveway-that-has-large-front-door-that-says_1291376-1841.jpg?w=1380",
//     title: "Sea star",
//   },
//   {
//     img: "https://img.freepik.com/premium-photo/home-with-garage-door-garage-door_1291376-1862.jpg?w=1380",
//     title: "Bike",
//   },
// ];

export const Visualization = ({
  property,
  singleLead,
  setOpenPropertyVisualize,
}: any) => {
  console.log(singleLead, "Heyyyyyyyy");

  const [unitData, setUnitData] = useState<any>();
  const [displayType, setDisplayType] = useState<any>(0);
  return (
    <CardContent
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        padding: "0",
        margin: "0",
      }}
    >
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "100%",
            md: "50%",
            border: "2px solid #ececec",
            borderRadius: "8px",
          },
        }}
      >
        <CardContent>
          <Stack spacing={2}>
            {/* <Box> */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Box display="flex" justifyContent="space-between" gap={2}>
                <Avatar sx={{ bgcolor: "#1976d2" }}>
                  {dummyData.projectName}
                </Avatar>

                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {dummyData.projectName}
                  </Typography>
                  <Typography variant="body2">
                    Unit Code: {dummyData.unitCode}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography
                  sx={{
                    color: "black",
                    fontWeight: 500,
                    fontSize: 15,
                    letterSpacing: 1,
                  }}
                >
                  {" "}
                  Floors: (10){" "}
                </Typography>
                <Typography
                  sx={{
                    color: "black",
                    fontWeight: 500,
                    fontSize: 15,
                    letterSpacing: 1,
                  }}
                >
                  {" "}
                  Units: (60)
                </Typography>
              </Box>
            </Box>

            <Divider />

            <Box bgcolor={"white"} display="flex" alignItems="center" gap={2}>
              <Grid container>
                <Box sx={{ display: "flex", mx: 1 }}>
                  <Box
                    sx={{
                      bgcolor: "green",
                      height: 20,
                      width: 20,
                      outline: "none",
                      border: "1px solid black",
                    }}
                  ></Box>
                  <Typography mx={1} fontWeight={500}>
                    49 Available
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mx: 1 }}>
                  <Box
                    sx={{
                      bgcolor: "gray",
                      height: 20,
                      width: 20,
                      outline: "none",
                      border: "1px solid black",
                    }}
                  ></Box>
                  <Typography mx={1} fontWeight={500}>
                    {" "}
                    11 Booked
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mx: 1 }}>
                  <Box
                    sx={{
                      bgcolor: "blue",
                      height: 20,
                      width: 20,
                      outline: "none",
                      border: "1px solid black",
                    }}
                  ></Box>
                  <Typography mx={1} fontWeight={500}>
                    Not Available
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mx: 1 }}>
                  <Box
                    sx={{
                      bgcolor: "red",
                      height: 20,
                      width: 20,
                      outline: "none",
                      border: "1px solid black",
                    }}
                  ></Box>
                  <Typography mx={1} fontWeight={500}>
                   Blocked
                  </Typography>
                </Box>
              </Grid>
            </Box>
            <Divider />
            {/* </Box> */}
            <Box sx={{ maxHeight: 620, overflowY: "auto" }}>
              <TableContainer>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography fontWeight={800} variant="h5">
                          Floors
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <Typography fontWeight={800} mr={5} variant="h5">
                          Number Of Units
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dummyData.floors.map((value, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell
                            sx={{
                              width: 200,
                              fontWeight: "bold",
                              fontSize: 18,
                              wordSpacing: 3,
                            }}
                          >
                            <Box>
                              Floor - {dummyData.floors[index].floorNumber}
                            </Box>
                          </TableCell>
                          <TableCell
                            sx={{
                              display: "flex",
                              fontSize: 14,
                              fontWeight: 500,
                              boxShadow: 3,
                              justifyContent: "center",
                              border: "1px solid #E5E7EB",
                              width: "fit-content",
                              minWidth: 300,
                              bgcolor: "#F9FAFB",
                              paddingX: "10px",
                            }}
                          >
                            {dummyData.floors[index].UnitDetails.map(
                              (value, key) => {
                                const Nonunits = [];
                                if (
                                  key < dummyData.unitsPerFloor - 1 &&
                                  key ==
                                    dummyData.floors[index].UnitDetails.length -
                                      1
                                ) {
                                  for (
                                    let Forindex = key;
                                    Forindex < dummyData.unitsPerFloor;
                                    Forindex++
                                  ) {
                                    // Nonunits.push(<Box sx={{ bgcolor: "#F05252", padding: 0.8, paddingX: 1.3,boxShadow:1, outline: "none", border: "1px solid black", marginX: 1, textAlign: "center", color: "white", fontWeight: 600, cursor: "pointer" }}></Box>)
                                    Nonunits.push(
                                      <DoorSlidingIcon
                                        fontSize="large"
                                        color="success"
                                        sx={{
                                          fontSize: "35px",
                                          outline: "none",
                                          marginX: 1,
                                          textAlign: "center",
                                          color: (value.unitStatus = "blue"),
                                          fontWeight: 600,
                                          cursor: "not-allowed",
                                        }}
                                      />
                                    );
                                  }
                                }
                                return key < dummyData.unitsPerFloor - 1 &&
                                  key ==
                                    dummyData.floors[index].UnitDetails.length -
                                      1 ? (
                                  <>
                                    {/* <Box key={key} onClick={() => { setUnitData({ ...value }) }} sx={{ bgcolor: value.unitStatus == "Available" ? "green" : "gray", padding: 0.8, paddingX: 1, outline: "none", border: "1px solid black", marginX: 1, textAlign: "center", color: "white", fontWeight: 600, cursor: "pointer" }}>{value.unitNumber}</Box> */}
                                    {/* <DoorSlidingIcon onClick={() => { setUnitData({ ...value }) }} fontSize="large" color="success" sx={{  fontSize:"35px", outline: "none",  marginX: 1, textAlign: "center", color: value.unitStatus == "Available" ? "green" : "gray", fontWeight: 600, cursor: "pointer" }}/> */}
                                    {/* <Box sx={{ bgcolor:  "#F05252", padding: 0.8, paddingX: 1.3, outline: "none", border: "1px solid black", marginX: 1, textAlign: "center", color: "white", fontWeight: 600, cursor: "pointer" }}></Box> */}
                                    {Nonunits}
                                  </>
                                ) : (
                                  // <Box key={key} onClick={() => { setUnitData({ ...value }) }} sx={{ bgcolor: value.unitStatus == "Available" ? "green" : "gray", padding: 0.8, paddingX: 1,boxShadow:1, outline: "none", border: "1px solid black", marginX: 1, textAlign: "center", color: "white", fontWeight: 600, cursor: "pointer" }}>{value.unitNumber}</Box>
                                  <DoorSlidingIcon
                                    onClick={() => {
                                      setUnitData({ ...value });
                                    }}
                                    fontSize="large"
                                    color="success"
                                    sx={{
                                      fontSize: "35px",
                                      outline: "none",
                                      marginX: 1,
                                      textAlign: "center",
                                     
                                      color:
                                        value.unitStatus == "Available"
                                          ? "green"
                                          : value.unitStatus == "Blocked"
                                            ? "red"
                                            : "gray",
                                      fontWeight: 600,
                                      cursor: value.unitStatus == "Blocked" ? "not-allowed": "pointer",
                                    }}
                                  />
                                );
                              }
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Stack>
        </CardContent>
      </Box>

      {unitData && (
        <Box sx={{ width: { xs: "100 %", sm: "100%", md: "48%" } }}>
          <Box
            sx={{
              border: "2px solid #ececec",
              width: "100%",
              borderRadius: "8px",
              paddingBottom: "10px",
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={displayType}
                aria-label="basic tabs example"
                sx={{ color: "black" }}
              >
                <Tab
                  onClick={() => {
                    setDisplayType(0);
                  }}
                  sx={{
                    color: displayType == 0 ? "black" : "gray",
                    fontSize: displayType == 0 ? 16 : 14,
                    fontWeight: displayType == 0 ? 800 : 500,
                  }}
                  label="Unit details"
                />
                <Tab
                  onClick={() => {
                    setDisplayType(1);
                  }}
                  sx={{
                    color: displayType == 1 ? "black" : "gray",
                    fontSize: displayType == 1 ? 16 : 14,
                    fontWeight: displayType == 1 ? 800 : 500,
                  }}
                  label="Unit Dimensions"
                />
                <Tab
                  onClick={() => {
                    setDisplayType(2);
                  }}
                  sx={{
                    color: displayType == 2 ? "black" : "gray",
                    fontSize: displayType == 2 ? 16 : 14,
                    fontWeight: displayType == 2 ? 800 : 500,
                  }}
                  label="Unit Owner"
                />
                <Tab
                  onClick={() => {
                    setDisplayType(3);
                  }}
                  sx={{
                    color: displayType == 3 ? "black" : "gray",
                    fontSize: displayType == 3 ? 16 : 14,
                    fontWeight: displayType == 3 ? 800 : 500,
                  }}
                  label="Images"
                />
                <Tab
                  onClick={() => {
                    setDisplayType(4);
                  }}
                  sx={{
                    color: displayType == 4 ? "black" : "gray",
                    fontSize: displayType == 4 ? 16 : 14,
                    fontWeight: displayType == 4 ? 800 : 500,
                  }}
                  label="Map"
                />{" "}
              </Tabs>
            </Box>
            <Box sx={{ padding: "10px" }}>
              <TableContainer>
                {/* Unit Details */}
                {displayType == 0 && (
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography fontWeight={800} variant="h5">
                            Detail Type
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography fontWeight={800} variant="h5">
                            Details
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          sx={{ width: 200, fontWeight: 500, fontSize: 14 }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconNumber />
                            <Typography
                              ml={1}
                              sx={{ fontWeight: 500, fontSize: 14 }}
                            >
                              Unit Number
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            display: "flex",
                            fontSize: 14,
                            fontWeight: 500,
                          }}
                        >
                          {unitData.unitNumber}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{ width: 200, fontWeight: 500, fontSize: 14 }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconNotebook />
                            <Typography
                              ml={1}
                              sx={{ fontWeight: 500, fontSize: 14 }}
                            >
                              Unit Type
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            display: "flex",
                            fontSize: 14,
                            fontWeight: 500,
                          }}
                        >
                          {unitData.unitType}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{ width: 200, fontWeight: 500, fontSize: 14 }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconCurrencyRupee />
                            <Typography
                              ml={1}
                              sx={{ fontWeight: 500, fontSize: 14 }}
                            >
                              Unit Price
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            display: "flex",
                            fontSize: 14,
                            fontWeight: 500,
                          }}
                        >
                          {unitData.unitPrice} -/
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{ width: 200, fontWeight: 500, fontSize: 14 }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconStatusChange />
                            <Typography
                              ml={1}
                              sx={{ fontWeight: 500, fontSize: 14 }}
                            >
                              Unit Status
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            display: "flex",
                            fontSize: 14,
                            fontWeight: 500,
                          }}
                        >
                          {unitData.unitStatus}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                )}

                {/* Unit Dimension */}
                {displayType == 1 && (
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography fontWeight={800} variant="h5">
                            Detail Type
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography fontWeight={800} variant="h5">
                            Details
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          sx={{ width: 200, fontWeight: 500, fontSize: 14 }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconDimensions />
                            <Typography
                              ml={1}
                              sx={{ fontWeight: 500, fontSize: 14 }}
                            >
                              Unit Area
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            display: "flex",
                            fontSize: 14,
                            fontWeight: 500,
                          }}
                        >
                          {unitData.unitArea} cm sq
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                )}
                {displayType == 2 && (
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography fontWeight={800} variant="h5">
                            Unit Owner
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography fontWeight={800} variant="h5">
                            Details
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          sx={{ width: 200, fontWeight: 500, fontSize: 14 }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconUser />
                            <Typography
                              ml={1}
                              sx={{ fontWeight: 500, fontSize: 14 }}
                            >
                              Owner Name
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            display: "flex",
                            fontSize: 14,
                            fontWeight: 500,
                          }}
                        >
                          Alok
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{ width: 200, fontWeight: 500, fontSize: 14 }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconPhone />
                            <Typography
                              ml={1}
                              sx={{ fontWeight: 500, fontSize: 14 }}
                            >
                              Owner Contact
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            display: "flex",
                            fontSize: 14,
                            fontWeight: 500,
                          }}
                        >
                          +91 9879668795
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{ width: 200, fontWeight: 500, fontSize: 14 }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconMail />
                            <Typography
                              ml={1}
                              sx={{ fontWeight: 500, fontSize: 14 }}
                            >
                              Owner Email
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            display: "flex",
                            fontSize: 14,
                            fontWeight: 500,
                          }}
                        >
                          Alok@gmail.com
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{ width: 200, fontWeight: 500, fontSize: 14 }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconCalendar />
                            <Typography
                              ml={1}
                              sx={{ fontWeight: 500, fontSize: 14 }}
                            >
                              Ownership Date
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            display: "flex",
                            fontSize: 14,
                            fontWeight: 500,
                          }}
                        >
                          2024-12-01
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                )}

                {/* Unit Images */}
                {/* {displayType == 3 && (
                  <ImageList
                    sx={{ width: "100%", height: 620 }}
                    cols={3}
                    rowHeight={164}
                  >
                    {itemData.map((item) => (
                      <ImageListItem key={item.img}>
                        <img
                          srcSet={`${item.img}`}
                          src={`${item.img} `}
                          alt={item.title}
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                )} */}

                {/* Unit  Map  */}
                {displayType == 4 && (
                  <MapContainer
                    center={[28.585, 77.3665]}
                    zoom={15}
                    style={{ height: "700px", width: "600px" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker icon={customIcon} position={[28.585, 77.3665]}>
                      <Popup>Sector 52</Popup>
                    </Marker>
                  </MapContainer>
                )}
              </TableContainer>
            </Box>
          </Box>
        </Box>
      )}
    </CardContent>
  );
};

export default Visualization;
