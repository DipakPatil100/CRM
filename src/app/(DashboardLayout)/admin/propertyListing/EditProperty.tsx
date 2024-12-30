import { pathData, postData } from "@/services/apiService";
import {
  Box,
  Typography,
  InputLabel,
  TextField,
  Select,
  OutlinedInput,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  Checkbox,
  ListItemText,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

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

const EditProperty = ({ editData, close }: any) => {
  const [data, setData] = useState<any>([]);

  const [inputData, setInputData] = useState<any>({
    ...editData[0],
    amenities: editData[0].amenities.split(",") || [],
    floors: editData[0].floors,
    // createdBy: "",
    // modifiedBy: "",
  });

  console.log(editData[0].amenities.split(", "), "AMETITES");
  const [value, setValue] = useState("No");
  const [errors, setErrors] = useState<any>({});
  const { enqueueSnackbar } = useSnackbar();
  const [amenities, setAmenities] = useState<string[]>(
    editData[0].amenities.split(",") || []
  );

  useEffect(() => {
    setInputData({ ...inputData, amenities: amenities });
  }, [amenities]);
  const handleChange = (event: any) => {
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
  };

  const inputHandler = (e: any) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const submitDetails = async (event: any) => {
    try {
      const response = await pathData(`/v1/property/${editData[0]?._id}`, {
        ...inputData,
        amenities: amenities.join(", "),
      });

      if (!response.error) {
        enqueueSnackbar(response.message, { variant: "success" });
        close(false);
      } else {
        enqueueSnackbar(response.message, { variant: "error" });
      }

    } catch (error) {
      enqueueSnackbar("Failed to create property. Please try again.", {
        variant: "success",
      });
    }
  };

  return (
    <Box sx={{}}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Property Details:
      </Typography>
      <Grid
        rowSpacing={1.5}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ border: "1px solid #ccc", p: 2, borderRadius: 2 }}
      >
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 3 }}>
          <InputLabel sx={{ color: "#000" }} htmlFor={"application-no"}>
            Project Name
          </InputLabel>
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
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 3 }}>
          <InputLabel sx={{ color: "#000" }} htmlFor={"application-no"}>
            Unit Code
          </InputLabel>
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
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 3 }}>
          <InputLabel sx={{ color: "#000" }} htmlFor={"application-no"}>
            Unit Description
          </InputLabel>
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
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 3 }}>
          <InputLabel sx={{ color: "#000" }} htmlFor={"application-no"}>
            Unit
          </InputLabel>
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
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 3 }}>
          <InputLabel sx={{ color: "#000" }} htmlFor={"application-no"}>
            Unit Category
          </InputLabel>
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

        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 3 }}>
          <InputLabel sx={{ color: "#000" }} htmlFor={"application-no"}>
            Possession Status
          </InputLabel>
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
            <MenuItem disabled value="">
              Possession Status
            </MenuItem>
            <MenuItem value="Agent 1">Agent 1</MenuItem>
            <MenuItem value="Agent 2">Agent 2</MenuItem>
            <MenuItem value="Agent 3">Agent 3</MenuItem>
          </Select>
          {errors.possessionStatus && (
            <Typography variant="caption" color="error">
              {errors.possessionStatus}
            </Typography>
          )}
        </Grid>
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 3 }}>
          <InputLabel sx={{ color: "#000" }} htmlFor={"application-no"}>
            Property Type
          </InputLabel>
          <Select
            size="small"
            fullWidth
            displayEmpty
            name="propertyType"
            value={inputData.propertyType}
            onChange={inputHandler}
            error={!!errors.propertyType}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
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
            <MenuItem disabled value="">
              Property Type
            </MenuItem>
            <MenuItem value="Agent 1">Agent 1</MenuItem>
            <MenuItem value="Agent 2">Agent 2</MenuItem>
            <MenuItem value="Agent 3">Agent 3</MenuItem>
          </Select>
          {errors.propertyType && (
            <Typography variant="caption" color="error">
              {errors.propertyType}
            </Typography>
          )}
        </Grid>
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 3 }}>
          <InputLabel sx={{ color: "#000" }} htmlFor={"agent-name"}>
            Transaction Type
          </InputLabel>
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
            <MenuItem disabled value="">
              Transaction Type
            </MenuItem>
            <MenuItem value="Agent 1">Agent 1</MenuItem>
            <MenuItem value="Agent 2">Agent 2</MenuItem>
            <MenuItem value="Agent 3">Agent 3</MenuItem>
          </Select>
          {errors.transactionType && (
            <Typography variant="caption" color="error">
              {errors.transactionType}
            </Typography>
          )}
        </Grid>
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 3 }}>
          <InputLabel sx={{ color: "#000" }} htmlFor={"agent-name"}>
            Ownership
          </InputLabel>
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
            // MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              Ownership
            </MenuItem>
            <MenuItem value="Agent 1">Agent 1</MenuItem>
            <MenuItem value="Agent 2">Agent 2</MenuItem>
            <MenuItem value="Agent 3">Agent 3</MenuItem>
          </Select>
          {errors.ownership && (
            <Typography variant="caption" color="error">
              {errors.ownership}
            </Typography>
          )}
        </Grid>

        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 3 }}>
          <InputLabel sx={{ color: "#000" }} htmlFor={"agent-name"}>
            Furnishing
          </InputLabel>
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
                  <Typography sx={{ color: "#b5bcc9" }}>Furnishing</Typography>
                );
              }

              return selected;
            }}
            // MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              Furnishing
            </MenuItem>
            <MenuItem value="Agent 1">Agent 1</MenuItem>
            <MenuItem value="Agent 2">Agent 2</MenuItem>
            <MenuItem value="Agent 3">Agent 3</MenuItem>
          </Select>
          {errors.furnishing && (
            <Typography variant="caption" color="error">
              {errors.furnishing}
            </Typography>
          )}
        </Grid>
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 3 }}>
          <InputLabel sx={{ color: "#000" }} htmlFor={"agent-name"}>
            Balcony
          </InputLabel>
          <Select
            size="small"
            fullWidth
            displayEmpty
            name="balcony"
            value={inputData.balcony}
            onChange={inputHandler}
            error={!!errors.balcony}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return (
                  <Typography sx={{ color: "#b5bcc9" }}>Balcony</Typography>
                );
              }

              return selected;
            }}
            // MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              Balcony
            </MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
          </Select>
          {errors.balcony && (
            <Typography variant="caption" color="error">
              {errors.balcony}
            </Typography>
          )}
        </Grid>

        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 3 }}>
          <InputLabel sx={{ color: "#000" }} htmlFor={"agent-name"}>
            Rera Registered Properties
          </InputLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={value}
            onChange={handleChange1}
          >
            <FormControlLabel
              value="Yes"
              control={<Radio sx={{ color: "gray" }} />}
              label="Yes"
            />
            <FormControlLabel
              value="No"
              control={<Radio sx={{ color: "gray" }} />}
              label="No"
            />
          </RadioGroup>
        </Grid>

        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 3 }}>
          <InputLabel sx={{ color: "#000" }} htmlFor={"agent-name"}>
            Floor
          </InputLabel>
          <Select
            fullWidth
            size="small"
            displayEmpty
            name="floors"
            value={inputData.floors}
            onChange={inputHandler}
            error={!!errors.floors}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected?.length === 0) {
                return <Typography sx={{ color: "#b5bcc9" }}>Floor</Typography>;
              }

              return selected;
            }}
            // MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              Floor
            </MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
          </Select>
          {errors.floors && (
            <Typography variant="caption" color="error">
              {errors.floors}
            </Typography>
          )}
        </Grid>
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 3 }}>
          <InputLabel sx={{ color: "#000" }} htmlFor={"agent-name"}>
            Facing
          </InputLabel>
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
            <MenuItem disabled value="">
              Facing
            </MenuItem>
            <MenuItem value="Agent 1">Agent 1</MenuItem>
            <MenuItem value="Agent 2">Agent 2</MenuItem>
            <MenuItem value="Agent 3">Agent 3</MenuItem>
          </Select>
          {errors.facing && (
            <Typography variant="caption" color="error">
              {errors.facing}
            </Typography>
          )}
        </Grid>
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 3 }}>
          <InputLabel sx={{ color: "#000" }} htmlFor={"agent-name"}>
            Bathroom
          </InputLabel>
          <Select
            fullWidth
            displayEmpty
            size="small"
            name="bathroom"
            value={inputData.bathroom}
            onChange={inputHandler}
            error={!!errors.bathroom}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return (
                  <Typography sx={{ color: "#b5bcc9" }}>Bathroom</Typography>
                );
              }

              return selected;
            }}
            // MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              Bathroom
            </MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
          </Select>
          {errors.bathroom && (
            <Typography variant="caption" color="error">
              {errors.bathroom}
            </Typography>
          )}
        </Grid>
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 3 }}>
          <InputLabel sx={{ color: "#000" }} htmlFor={"application-no"}>
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
        </Grid>
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 6 }}>
          <InputLabel sx={{ color: "#000" }} htmlFor={"application-no"}>
            Amenities
          </InputLabel>
          <Select
            size="small"
            multiple
            fullWidth
            displayEmpty
            name="amenities"
            value={amenities || []}
            onChange={handleChange}
            // value={inputData.amenities || []}
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
                    {selected.map((value: any) => (
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
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox
                  sx={{ color: "gray" }}
                  checked={amenities.includes(name)}
                />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
          {errors.amenities && (
            <Typography variant="caption" color="error">
              {errors.amenities}
            </Typography>
          )}
        </Grid>

        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 3 }}>
          <InputLabel sx={{ color: "#000" }} htmlFor={"application-no"}>
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
        </Grid>
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 3 }}>
          <InputLabel sx={{ color: "#000" }} htmlFor={"application-no"}>
            BuiltArea
          </InputLabel>
          <TextField
            size="small"
            type="text"
            fullWidth
            placeholder="BuiltArea"
            name="builtArea"
            onChange={inputHandler}
            value={inputData.builtArea}
            error={!!errors.builtArea}
          />
          {errors.builtArea && (
            <Typography variant="caption" color="error">
              {errors.builtArea}
            </Typography>
          )}
        </Grid>
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 3 }}>
          <InputLabel sx={{ color: "#000" }} htmlFor={"application-no"}>
            SuperBuiltArea
          </InputLabel>
          <TextField
            size="small"
            type="text"
            fullWidth
            placeholder="SuperBuiltArea"
            name="superBuiltArea"
            onChange={inputHandler}
            value={inputData.superBuiltArea}
            error={!!errors.superBuiltArea}
          />
          {errors.superBuiltArea && (
            <Typography variant="caption" color="error">
              {errors.superBuiltArea}
            </Typography>
          )}
        </Grid>
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 3 }}>
          <InputLabel sx={{ color: "#000" }} htmlFor={"application-no"}>
            Capture Area
          </InputLabel>
          <TextField
            size="small"
            type="text"
            fullWidth
            placeholder="Capture Area"
            name="captureArea"
            onChange={inputHandler}
            value={inputData.captureArea}
            error={!!errors.captureArea}
          />
          {errors.captureArea && (
            <Typography variant="caption" color="error">
              {errors.captureArea}
            </Typography>
          )}
        </Grid>
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 3 }}>
          <InputLabel sx={{ color: "#000" }} htmlFor={"application-no"}>
            Calculative Area
          </InputLabel>
          <TextField
            size="small"
            type="text"
            fullWidth
            placeholder="Calculative Area"
            name="calculativeArea"
            onChange={inputHandler}
            value={inputData.calculativeArea}
            error={!!errors.calculativeArea}
          />
          {errors.calculativeArea && (
            <Typography variant="caption" color="error">
              {errors.calculativeArea}
            </Typography>
          )}
        </Grid>
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 3 }}>
          <InputLabel sx={{ color: "#000" }} htmlFor={"application-no"}>
            Finalized Area
          </InputLabel>
          <TextField
            size="small"
            type="text"
            fullWidth
            placeholder="Finalized Area"
            name="finalizedArea"
            onChange={inputHandler}
            value={inputData.finalizedArea}
            error={!!errors.finalizedArea}
          />
          {errors.finalizedArea && (
            <Typography variant="caption" color="error">
              {errors.finalizedArea}
            </Typography>
          )}
        </Grid>
        <Grid rowSpacing={1.5} size={{ xs: 2, sm: 4, md: 3 }}>
          <InputLabel sx={{ color: "#000" }} htmlFor={"application-no"}>
            Direction
          </InputLabel>
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
        <Button
          onClick={() => close(false)}
          variant="outlined"
          color="error"
          sx={{ mr: 2 }}
        >
          Cancel
        </Button>
        <Button
          onClick={submitDetails}
          variant="contained"
          disabled={JSON.stringify(inputData) === JSON.stringify(editData)}
          //sx={{ float: "right" }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default EditProperty;
