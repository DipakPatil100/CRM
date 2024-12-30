/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-key */
"use client";
import {
  Box,
  TextField,
  InputLabel,
  Button,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Grid2,
  SelectChangeEvent,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  ListItemText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import React, { useEffect, useState } from "react";
import { postData } from "@/services/apiService";
import { useSnackbar } from "notistack";
import "./propertymanagement.css";
import { EditFlex } from "./property";
import CustomMap from "@/components/map/CustomMap";
import Map from "@/components/map/CustomMap";
import { exceptThisSymbols, hideArrowUpDown } from "@/utils/validation";
import { CustomInputLabel } from "@/utils/CustomComponents/InputLabel";
import { useRouter } from "next/navigation";
import { IconCaretLeftFilled } from "@tabler/icons-react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const PropertyForm = ({ properties, transactionType, amenitiesData }: any) => {


  const [data, setData] = useState<any>([]);
  // Temporary
  const [bathroom, setBathroom] = useState<any>([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [floors, setFloors] = useState<any>([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [balcony, setBalcony] = useState<any>([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const [inputData, setInputData] = useState<any>({
    projectName: "",
    unitCode: "",
    unitDescription: "",
    unit: "",
    unitCategory: "",
    possessionStatus: "",
    propertyType: "",
    transactionType: "",
    noOfUnitPerFloor: "",
    ownership: "",
    reraRegisteredProperties: "0",
    furnishing: "",
    balcony: [],
    floors: [],
    facing: "",
    bathroom: [],
    amenities: [],
    location: "",
    builtArea: "",
    superBuiltArea: "",
    captureArea: "",
    calculativeArea: "",
    finalizedArea: "",
    direction: "",
  });
  const [value, setValue] = useState<any>(0);
  const [errors, setErrors] = useState<any>({});
  const [amenities, setAmenities] = useState<string[]>([]);
  const [codeInputVisible, setCodeInputVisible] = useState(false);

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const inputHandler = (e: any) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const submitDetails = async () => {
    const newErrors: any = {};
    Object.entries(inputData).forEach(([key, value]: any) => {
      if (
        key === "amenities" ||
        key == "bathroom" ||
        key == "balcony" ||
        key == "floors"
      ) {
        if (value.length === 0) newErrors[key] = "This field is required";
      } else if (value === "") {
        newErrors[key] = "This field is required";
      }
    });
    if (Object.keys(newErrors).length > 0) {
      console.log(newErrors, "++++++++");
      setErrors(newErrors);
      return;
    }

    const payload = {
      ...inputData,
      bathroom: inputData.bathroom,
      balcony: inputData.balcony,
      amenities: amenities.join(", "),
      floors: inputData.floors,
      reraRegisteredProperties: inputData.reraRegisteredProperties,
      createdBy: inputData.createdBy || "user-1",
      modifiedBy: inputData.modifiedBy || "user-4",
    };
    try {
      const response = await postData("/v1/property/create", payload);
      console.log(response);
      if (!response?.error) {
        enqueueSnackbar(response?.message, {
          variant: "success",
        });
        setData((prevData: any) => [
          ...prevData,
          { ...inputData, id: Math.floor(Math.random() * 10000) },
        ]);
        setInputData({
          projectName: "",
          unitCode: "",
          unitDescription: "",
          unit: "",
          unitCategory: "",
          possessionStatus: "",
          propertyType: "",
          transactionType: "",
          noOfUnitPerFloor: "",
          ownership: "",
          reraRegisteredProperties: "0",
          furnishing: "",
          balcony: [],
          floors: [],
          facing: "",
          bathroom: [],
          amenities: [],
          location: "",
          builtArea: "",
          superBuiltArea: "",
          captureArea: "",
          calculativeArea: "",
          finalizedArea: "",
          direction: "",
        });
        setAmenities([]);
      } else {
        enqueueSnackbar(response?.message, {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Failed to create property. Please try again.", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    setInputData({ ...inputData, amenities: amenities });
  }, [amenities]);
  const handleChange = (event: SelectChangeEvent<typeof amenities>) => {
    const {
      target: { value },
    } = event;
    setAmenities(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    if (value == 0) {
      setCodeInputVisible(true);
    } else {
      setCodeInputVisible(false);
    }
  };
  // const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue((event.target as HTMLInputElement).value);
  // };
  return (
    <>
      <Button
        onClick={() => router.back()}
        variant="outlined"
        size="small"
        startIcon={<IconCaretLeftFilled />}
        sx={{ mb: 2}}
      >
        Back
      </Button>
      <Box sx={{}}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Property Details:
        </Typography>
        <Grid
          rowSpacing={1.5}
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ border: "1px solid #ededed", p: 2, borderRadius: 2, mt: 1 }}
        >
          <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
            <CustomInputLabel reqiredField={true}>
              {" "}
              Project Name
            </CustomInputLabel>
            <TextField
              size="small"
              type="text"
              fullWidth
              placeholder="Project Name"
              name="projectName"
              onChange={inputHandler}
              value={inputData.projectName}
              error={!!errors.projectName}
            />
            {errors.projectName && (
              <Typography variant="caption" color="error">
                {errors.projectName}
              </Typography>
            )}
          </Grid>
          <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
            <CustomInputLabel reqiredField={true}> Unit Code</CustomInputLabel>

            <TextField
              size="small"
              type="text"
              fullWidth
              placeholder="Unit Code"
              name="unitCode"
              onChange={inputHandler}
              value={inputData.unitCode}
              error={!!errors.unitCode}
            />
            {errors.unitCode && (
              <Typography variant="caption" color="error">
                {errors.unitCode}
              </Typography>
            )}
          </Grid>
          <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
            <CustomInputLabel reqiredField={true}>
              Unit Description
            </CustomInputLabel>

            <TextField
              size="small"
              type="text"
              fullWidth
              placeholder="Unit Description"
              name="unitDescription"
              onChange={inputHandler}
              value={inputData.unitDescription}
              error={!!errors.unitDescription}
            />
            {errors.unitDescription && (
              <Typography variant="caption" color="error">
                {errors.unitDescription}
              </Typography>
            )}
          </Grid>
          <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
            <CustomInputLabel reqiredField={true}>Unit</CustomInputLabel>

            <TextField
              size="small"
              type="text"
              fullWidth
              placeholder="Unit"
              name="unit"
              onChange={inputHandler}
              value={inputData.unit}
              error={!!errors.unit}
            />
            {errors.unit && (
              <Typography variant="caption" color="error">
                {errors.unit}
              </Typography>
            )}
          </Grid>
          <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
            <CustomInputLabel reqiredField={true}>
              Unit Category
            </CustomInputLabel>

            <TextField
              size="small"
              type="text"
              fullWidth
              placeholder="Unit Category"
              name="unitCategory"
              onChange={inputHandler}
              value={inputData.unitCategory}
              error={!!errors.unitCategory}
            />
            {errors.unitCategory && (
              <Typography variant="caption" color="error">
                {errors.unitCategory}
              </Typography>
            )}
          </Grid>

          <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
            <CustomInputLabel reqiredField={true}>
              {" "}
              Possession Status
            </CustomInputLabel>

            <Select
              size="small"
              fullWidth
              displayEmpty
              name="possessionStatus"
              value={inputData.possessionStatus}
              onChange={inputHandler}
              error={!!errors.possessionStatus}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <Typography sx={{ color: "#b5bcc9" }}>
                      Possession Status
                    </Typography>
                  );
                }

                return selected;
              }}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem
                sx={{ "&:hover": { backgroundColor: "#ffe3e3a9" } }}
                value="Approved"
              >
                Approved
              </MenuItem>
              <MenuItem
                sx={{ "&:hover": { backgroundColor: "#ffe3e3a9" } }}
                value="Hold"
              >
                Hold
              </MenuItem>
              <MenuItem
                sx={{ "&:hover": { backgroundColor: "#ffe3e3a9" } }}
                value="Pending"
              >
                Pending
              </MenuItem>
            </Select>
            {errors.possessionStatus && (
              <Typography variant="caption" color="error">
                {errors.possessionStatus}
              </Typography>
            )}
          </Grid>
          <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
            <CustomInputLabel reqiredField={true}>
              Property Type
            </CustomInputLabel>

            <Select
              fullWidth
              displayEmpty
              size="small"
              name="propertyType"
              value={inputData.propertyType}
              onChange={inputHandler}
              error={!!errors.propertyType}
              input={<OutlinedInput />}
              MenuProps={MenuProps}
              renderValue={(selected) => {
                if (!selected) {
                  return (
                    <Typography sx={{ color: "#b5bcc9" }}>
                      {" "}
                      Property Type
                    </Typography>
                  );
                }
                return selected;
              }}
              inputProps={{ "aria-label": "Without label" }}
            >
              {properties.map((item: any) => [
                // Display property name as a disabled menu item
                <EditFlex
                  key={`${item.propertyId}-heading`}
                  // disabled
                  sx={{ fontWeight: 700, opacity: "1", padding: "10px" }}
                >
                  {item.property}
                </EditFlex>,
                ...item.subProperties.map((subItem: any) => (
                  <MenuItem
                    sx={{
                      "&:hover": { backgroundColor: "#ffe3e3a9" },
                      marginLeft: "15px",
                      marginRight: "15px",
                    }}
                    key={subItem.subPropertyId}
                    value={subItem.subProperty}
                  >
                    {subItem.subProperty}
                  </MenuItem>
                )),
              ])}
            </Select>
            {errors.propertyType && (
              <Typography variant="caption" color="error">
                {errors.propertyType}
              </Typography>
            )}
          </Grid>

          <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
            <CustomInputLabel reqiredField={true}>
              Transaction Type
            </CustomInputLabel>

            <Select
              size="small"
              fullWidth
              displayEmpty
              // placeholder="Transaction Type"
              name="transactionType"
              value={inputData.transactionType}
              onChange={inputHandler}
              error={!!errors.transactionType}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <Typography sx={{ color: "#b5bcc9" }}>
                      Transaction Type
                    </Typography>
                  );
                }

                return selected;
              }}
              // MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              {transactionType?.map((item: any) => (
                <MenuItem
                  sx={{ "&:hover": { backgroundColor: "#ffe3e3a9" } }}
                  key={item?.transactionName}
                  value={item?.transactionName}
                >
                  {item?.transactionName}
                </MenuItem>
              ))}
            </Select>
            {errors.transactionType && (
              <Typography variant="caption" color="error">
                {errors.transactionType}
              </Typography>
            )}
          </Grid>
          <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
            <CustomInputLabel reqiredField={true}>
              {" "}
              Number Unit Per Floor
            </CustomInputLabel>

            <Select
              size="small"
              fullWidth
              displayEmpty
              // placeholder="Transaction Type"
              name="noOfUnitPerFloor"
              value={inputData.noOfUnitPerFloor}
              onChange={inputHandler}
              error={!!errors.noOfUnitPerFloor}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <Typography sx={{ color: "#b5bcc9" }}>
                      Number Unit Per Floor
                    </Typography>
                  );
                }

                return selected;
              }}
              // MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem
                sx={{ "&:hover": { backgroundColor: "#ffe3e3a9" } }}
                value={1}
              >
                1
              </MenuItem>
              <MenuItem
                sx={{ "&:hover": { backgroundColor: "#ffe3e3a9" } }}
                value={2}
              >
                2
              </MenuItem>
              <MenuItem
                sx={{ "&:hover": { backgroundColor: "#ffe3e3a9" } }}
                value={3}
              >
                3
              </MenuItem>
              <MenuItem
                sx={{ "&:hover": { backgroundColor: "#ffe3e3a9" } }}
                value={4}
              >
                4
              </MenuItem>

              <MenuItem
                sx={{ "&:hover": { backgroundColor: "#ffe3e3a9" } }}
                value={5}
              >
                5
              </MenuItem>
              <MenuItem
                sx={{ "&:hover": { backgroundColor: "#ffe3e3a9" } }}
                value={6}
              >
                6
              </MenuItem>
              <MenuItem
                sx={{ "&:hover": { backgroundColor: "#ffe3e3a9" } }}
                value={7}
              >
                7
              </MenuItem>
            </Select>
            {errors.transactionType && (
              <Typography variant="caption" color="error">
                {errors.transactionType}
              </Typography>
            )}
          </Grid>
        </Grid>

        <Grid
          rowSpacing={1.5}
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ border: "1px solid #ededed", p: 2, borderRadius: 2, mt: 1 }}
        >
          <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
            <CustomInputLabel reqiredField={true}>Ownership</CustomInputLabel>

            <Select
              size="small"
              fullWidth
              displayEmpty
              name="ownership"
              value={inputData.ownership}
              onChange={inputHandler}
              error={!!errors.ownership}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <Typography sx={{ color: "#b5bcc9" }}>Ownership</Typography>
                  );
                }

                return selected;
              }}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem
                sx={{ "&:hover": { backgroundColor: "#ffe3e3a9" } }}
                value="Free Hold"
              >
                Free Hold
              </MenuItem>
              <MenuItem
                sx={{ "&:hover": { backgroundColor: "#ffe3e3a9" } }}
                value="Lease Hold"
              >
                Lease Hold
              </MenuItem>
            </Select>
            {errors.ownership && (
              <Typography variant="caption" color="error">
                {errors.ownership}
              </Typography>
            )}
          </Grid>

          <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
            <CustomInputLabel reqiredField={true}>Furnishing</CustomInputLabel>

            <Select
              size="small"
              fullWidth
              displayEmpty
              name="furnishing"
              value={inputData.furnishing}
              onChange={inputHandler}
              error={!!errors.furnishing}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <Typography sx={{ color: "#b5bcc9" }}>
                      Furnishing
                    </Typography>
                  );
                }

                return selected;
              }}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem
                sx={{ "&:hover": { backgroundColor: "#ffe3e3a9" } }}
                value="fully furnished"
              >
                Full Furnished
              </MenuItem>
              <MenuItem
                sx={{ "&:hover": { backgroundColor: "#ffe3e3a9" } }}
                value="semi furnished"
              >
                Semi Furnished
              </MenuItem>
              <MenuItem
                sx={{ "&:hover": { backgroundColor: "#ffe3e3a9" } }}
                value="non furnished"
              >
                Non Furnished
              </MenuItem>
            </Select>
            {errors.furnishing && (
              <Typography variant="caption" color="error">
                {errors.furnishing}
              </Typography>
            )}
          </Grid>
          <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
            <CustomInputLabel reqiredField={true}>Balcony</CustomInputLabel>

            <Select
              size="small"
              fullWidth
              displayEmpty
              multiple
              name="balcony"
              value={inputData.balcony}
              // onChange={inputHandler}
              error={!!errors.balcony}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <Typography sx={{ color: "#b5bcc9" }}>Balcony</Typography>
                  );
                } else {
                  return (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value: any) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  );
                }
              }}
              MenuProps={MenuProps}
              // inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="">
                Balcony
              </MenuItem>
              {balcony.map((item: any, index: any) => {
                return (
                  <MenuItem
                    key={index}
                    value={item}
                    onClick={() => {
                      !inputData.balcony.includes(item)
                        ? setInputData({
                            ...inputData,
                            balcony: [...inputData.balcony, item],
                          })
                        : setInputData({
                            ...inputData,
                            balcony: inputData.balcony.filter((value: any) => {
                              value != item;
                            }),
                          });
                    }}
                  >
                    <Checkbox
                      sx={{ color: "gray" }}
                      checked={inputData.balcony.includes(item)}
                    />
                    <ListItemText primary={item} />
                  </MenuItem>
                );
              })}
            </Select>
            {errors.balcony && (
              <Typography variant="caption" color="error">
                {errors.balcony}
              </Typography>
            )}
          </Grid>

          <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
            <CustomInputLabel reqiredField={true}>Balcony</CustomInputLabel>

            <Select
              fullWidth
              size="small"
              multiple
              displayEmpty
              name="floors"
              value={inputData.floors}
              // onChange={inputHandler}
              error={!!errors.floor}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <Typography sx={{ color: "#b5bcc9" }}>Floor</Typography>
                  );
                } else {
                  return (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value: any) => (
                        <Chip key={value} label={value + " Floor"} />
                      ))}
                    </Box>
                  );
                }
              }}
              MenuProps={MenuProps}
              // inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="">
                Floors
              </MenuItem>
              {floors.map((item: any, index: any) => {
                return (
                  <MenuItem
                    key={index}
                    value={item}
                    onClick={() => {
                      !inputData.floors.includes(item)
                        ? setInputData({
                            ...inputData,
                            floors: [...inputData.floors, item],
                          })
                        : setInputData({
                            ...inputData,
                            floors: inputData.floors.filter((value: any) => {
                              value != item;
                            }),
                          });
                    }}
                  >
                    <Checkbox
                      sx={{ color: "gray" }}
                      checked={inputData.floors.includes(item)}
                    />
                    <ListItemText primary={item + " Floor"} />
                  </MenuItem>
                );
              })}
            </Select>
            {errors.floor && (
              <Typography variant="caption" color="error">
                {errors.floor}
              </Typography>
            )}
          </Grid>

          <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
            <CustomInputLabel reqiredField={true}>Facing</CustomInputLabel>

            <Select
              size="small"
              displayEmpty
              fullWidth
              name="facing"
              value={inputData.facing}
              onChange={inputHandler}
              error={!!errors.facing}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <Typography sx={{ color: "#b5bcc9" }}>Facing</Typography>
                  );
                }

                return selected;
              }}
              // MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem
                sx={{ "&:hover": { backgroundColor: "#ffe3e3a9" } }}
                value="South Facing"
              >
                South Facing
              </MenuItem>
              <MenuItem
                sx={{ "&:hover": { backgroundColor: "#ffe3e3a9" } }}
                value="North Facing"
              >
                North Facing
              </MenuItem>
              <MenuItem
                sx={{ "&:hover": { backgroundColor: "#ffe3e3a9" } }}
                value="East Facing"
              >
                East Facing
              </MenuItem>
              <MenuItem
                sx={{ "&:hover": { backgroundColor: "#ffe3e3a9" } }}
                value="West Facing"
              >
                West Facing
              </MenuItem>
            </Select>
            {errors.facing && (
              <Typography variant="caption" color="error">
                {errors.facing}
              </Typography>
            )}
          </Grid>

          <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
            <CustomInputLabel reqiredField={true}>Location</CustomInputLabel>

            <TextField
              size="small"
              type="text"
              fullWidth
              placeholder="Location"
              name="location"
              onChange={inputHandler}
              value={inputData.location}
              error={!!errors.location}
            />
            {errors.location && (
              <Typography variant="caption" color="error">
                {errors.location}
              </Typography>
            )}
          </Grid>

          <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
            <CustomInputLabel reqiredField={true}>Bathroom</CustomInputLabel>

            <Select
              fullWidth
              multiple
              displayEmpty
              size="small"
              name="bathroom"
              value={inputData.bathroom}
              error={!!errors.bathroom}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <Typography sx={{ color: "#b5bcc9" }}>Bathroom</Typography>
                  );
                } else {
                  return (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value: any) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  );
                }
              }}
              MenuProps={MenuProps}
              // inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="">
                Bathroom
              </MenuItem>
              {bathroom.map((item: any, index: any) => {
                return (
                  <MenuItem
                    key={index}
                    value={item}
                    onClick={() => {
                      !inputData.bathroom.includes(item)
                        ? setInputData({
                            ...inputData,
                            bathroom: [...inputData.bathroom, item],
                          })
                        : setInputData({
                            ...inputData,
                            bathroom: inputData.bathroom.filter(
                              (value: any) => {
                                value != item;
                              }
                            ),
                          });
                    }}
                  >
                    <Checkbox
                      sx={{ color: "gray" }}
                      checked={inputData.bathroom.includes(item)}
                    />
                    <ListItemText primary={item} />
                  </MenuItem>
                );
              })}
            </Select>
            {errors.bathroom && (
              <Typography variant="caption" color="error">
                {errors.bathroom}
              </Typography>
            )}
          </Grid>

          <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
            <CustomInputLabel reqiredField={true}>
              Rera Registered Properties
            </CustomInputLabel>

            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={inputData.reraRegisteredProperties}
              onChange={handleChange1}
            >
              <FormControlLabel
                value={1}
                control={
                  <Radio
                    sx={{ color: "gray" }}
                    checked={inputData.reraRegisteredProperties == "1"}
                    onClick={() => {
                      setInputData({
                        ...inputData,
                        reraRegisteredProperties: "1",
                      });
                    }}
                  />
                }
                label="Yes"
              />
              <FormControlLabel
                value={0}
                control={
                  <Radio
                    sx={{ color: "gray" }}
                    checked={inputData.reraRegisteredProperties == "0"}
                    onClick={() => {
                      setInputData({
                        ...inputData,
                        reraRegisteredProperties: "0",
                      });
                    }}
                  />
                }
                label="No"
              />
            </RadioGroup>
          </Grid>

          {/* <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
          <Map address="1600 Amphitheatre Parkway, Mountain View, CA" />
        </Grid> */}
          {codeInputVisible && (
            <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
              <CustomInputLabel reqiredField={true}>
                Rera Registration Number
              </CustomInputLabel>

              <TextField
                size="small"
                type="text"
                fullWidth
                placeholder="reraRegisteredPropertiesNumber"
                name="reraRegisteredPropertiesNumber"
                onChange={inputHandler}
                value={inputData.reraRegisteredPropertiesNumber}
                error={!!errors.reraRegisteredPropertiesNumber}
              />
              {/* {errors.reraRegisteredPropertiesNumber && (
            <Typography variant="caption" color="error">
              {errors.reraRegisteredPropertiesNumber}
            </Typography>
          )} */}
            </Grid>
          )}
        </Grid>

        <Grid
          rowSpacing={1.5}
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ border: "1px solid #ededed", p: 2, borderRadius: 2, mt: 1 }}
        >
          <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
            <CustomInputLabel reqiredField={true}>Amenities</CustomInputLabel>

            <Select
              size="small"
              multiple
              fullWidth
              displayEmpty
              name="amenities"
              value={amenities}
              onChange={handleChange}
              error={!!errors.amenities}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <Typography sx={{ color: "#b5bcc9" }}>Amenities</Typography>
                  );
                } else {
                  return (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  );
                }
              }}
              MenuProps={MenuProps}
            >
              {" "}
              <MenuItem disabled value="">
                Amenities
              </MenuItem>
              {amenitiesData.map((item: any) => (
                <MenuItem key={item.aminitiesId} value={item?.aminitiesName}>
                  <Checkbox
                    sx={{ color: "gray" }}
                    checked={amenities.includes(item.aminitiesName)}
                  />
                  <ListItemText primary={item.aminitiesName} />
                </MenuItem>
              ))}
            </Select>
            {errors.amenities && (
              <Typography variant="caption" color="error">
                {errors.amenities}
              </Typography>
            )}
          </Grid>

          {/* <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
                    <InputLabel sx={{ color: "#000", }} htmlFor={"application-no"}>
                        Location
                    </InputLabel>
                    <TextField
                        size="small"
                        type="text"
                        fullWidth
                        placeholder="Location"
                        name="location"
                        onChange={inputHandler}
                        value={inputData.location}
                        error={!!errors.location}
                    />
                    {errors.location && (
                        <Typography variant="caption" color="error">
                            {errors.location}
                        </Typography>
                    )}
                </Grid> */}
          <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
            <CustomInputLabel reqiredField={true}>
              BuiltArea (sq. ft.)
            </CustomInputLabel>

            <TextField
              size="small"
              type="number"
              fullWidth
              placeholder="BuiltArea"
              name="builtArea"
              onChange={inputHandler}
              value={inputData.builtArea}
              error={!!errors.builtArea}
              onKeyDown={(e) =>
                exceptThisSymbols.includes(e.key) && e.preventDefault()
              }
              sx={hideArrowUpDown}
            />
            {errors.builtArea && (
              <Typography variant="caption" color="error">
                {errors.builtArea}
              </Typography>
            )}
          </Grid>
          <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
            <CustomInputLabel reqiredField={true}>
              SuperBuiltArea (sq. ft.)
            </CustomInputLabel>

            <TextField
              size="small"
              type="number"
              fullWidth
              placeholder="SuperBuiltArea"
              name="superBuiltArea"
              onChange={inputHandler}
              value={inputData.superBuiltArea}
              error={!!errors.superBuiltArea}
              onKeyDown={(e) =>
                exceptThisSymbols.includes(e.key) && e.preventDefault()
              }
              sx={hideArrowUpDown}
            />
            {errors.superBuiltArea && (
              <Typography variant="caption" color="error">
                {errors.superBuiltArea}
              </Typography>
            )}
          </Grid>
          <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
            <CustomInputLabel reqiredField={true}>
              Capture Area (sq. ft.)
            </CustomInputLabel>

            <TextField
              size="small"
              type="number"
              fullWidth
              placeholder="Capture Area"
              name="captureArea"
              onChange={inputHandler}
              value={inputData.captureArea}
              error={!!errors.captureArea}
              onKeyDown={(e) =>
                exceptThisSymbols.includes(e.key) && e.preventDefault()
              }
              sx={hideArrowUpDown}
            />
            {errors.captureArea && (
              <Typography variant="caption" color="error">
                {errors.captureArea}
              </Typography>
            )}
          </Grid>
          <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
            <CustomInputLabel reqiredField={true}>
              {" "}
              Calculative Area (sq. ft.)
            </CustomInputLabel>

            <TextField
              size="small"
              type="number"
              fullWidth
              placeholder="Calculative Area"
              name="calculativeArea"
              onChange={inputHandler}
              value={inputData.calculativeArea}
              error={!!errors.calculativeArea}
              onKeyDown={(e) =>
                exceptThisSymbols.includes(e.key) && e.preventDefault()
              }
              sx={hideArrowUpDown}
            />
            {errors.calculativeArea && (
              <Typography variant="caption" color="error">
                {errors.calculativeArea}
              </Typography>
            )}
          </Grid>
          <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
            <CustomInputLabel reqiredField={true}>
              Finalized Area (sq. ft.)
            </CustomInputLabel>

            <TextField
              size="small"
              type="number"
              fullWidth
              placeholder="Finalized Area"
              name="finalizedArea"
              onChange={inputHandler}
              value={inputData.finalizedArea}
              error={!!errors.finalizedArea}
              onKeyDown={(e) =>
                exceptThisSymbols.includes(e.key) && e.preventDefault()
              }
              sx={hideArrowUpDown}
            />
            {errors.finalizedArea && (
              <Typography variant="caption" color="error">
                {errors.finalizedArea}
              </Typography>
            )}
          </Grid>
          <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 4 }}>
            <CustomInputLabel reqiredField={true}>Direction</CustomInputLabel>
            <TextField
              size="small"
              type="text"
              fullWidth
              placeholder="Direction"
              name="direction"
              onChange={inputHandler}
              value={inputData.direction}
              error={!!errors.direction}
            />
            {errors.direction && (
              <Typography variant="caption" color="error">
                {errors.direction}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button variant="outlined" color="error" sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button
            onClick={submitDetails}
            variant="contained"
            //sx={{ float: "right" }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default PropertyForm;
