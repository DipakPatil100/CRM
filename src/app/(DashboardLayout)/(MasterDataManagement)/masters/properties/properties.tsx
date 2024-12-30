
"use client";
import {Box, TextField, InputLabel, Button, Typography, IconButton} from "@mui/material";
import {IconCirclePlus, IconTrash} from "@tabler/icons-react";
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";

const Properties = () => {

  const userKey = {};

  const [inputData, setInputData] = useState<any>(userKey);
  const [errors, setErrors] = useState<any>({});
  const [inputs, setInputs] = useState([{ property: '', subProperties: [''] }]);

  const handleAddInput = () => {
    setInputs([...inputs, { property: '', subProperties: [''] }]);
  };

  const handleRemoveInput = (index: number) => {
    if (inputs.length > 1) {
      const updatedInputs = [...inputs];
      updatedInputs.splice(index, 1);
      setInputs(updatedInputs);
    }

  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, inputIndex: number, subIndex?: number) => {
    const { name, value } = e.target;
    const updatedInputs: any = [...inputs];
    if (subIndex !== undefined) {
      updatedInputs[inputIndex].subProperties[subIndex] = value;
    } else {
      updatedInputs[inputIndex][name as keyof typeof updatedInputs[0]] = value;
    }
    setInputs(updatedInputs);
  };

  const handleAddSubInput = (index: number) => {
    const updatedInputs = [...inputs];
    updatedInputs[index].subProperties.push('');
    setInputs(updatedInputs);
  };

  const handleRemoveSubInput = (inputIndex: number, subIndex: number) => {
    if (inputs[inputIndex].subProperties.length > 1) {
      const updatedInputs = [...inputs];
      updatedInputs[inputIndex].subProperties.splice(subIndex, 1);
      setInputs(updatedInputs);
    }
  };

  const inputHandler = (e: any) => { };

  const submitDetails = async () => {
    // console.log(inputs);
    // console.log(inputData)
  };

  return (
    <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <Box sx={{ p: 2, width: "90%" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Master Properties Data
        </Typography>
        <Grid rowSpacing={1.5}
          container
          spacing={{ xs: 4, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ border: "1px solid #ccc", p: 2, borderRadius: 2, maxWidth: "100%" }}>

          <Grid rowSpacing={1.5} size={{ xs: 4, sm: 4, md: 12 }}>
            <InputLabel sx={{ color: "#000" }} htmlFor={"applicant-name"}>
              Master Name
            </InputLabel>
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                type="text"
                fullWidth
                placeholder="Master Name"
                name="applicantName"
                onChange={inputHandler}
                value={inputData.applicantName}
                error={!!errors.applicantName}
              />
            </Box>
            {errors.applicantName && (
              <Typography variant="caption" color="error">
                {errors.applicantName}
              </Typography>
            )}
          </Grid>

          <Grid container spacing={2} size={{ xs: 4, sm: 4, md: 12 }} sx={{ marginLeft: "20px" }} >
            {inputs.map((input, index) => (
              <Grid key={index} size={{ xs: 4, sm: 4, md: 12 }} sx={{ border: "1px solid #ccc", p: 2, borderRadius: 2, boxShadow: 1 }}>
                <Box sx={{ mb: 2 }}>
                  <InputLabel sx={{ color: "#000" }}>Property</InputLabel>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Property"
                      name="property"
                      value={input.property}
                      onChange={(e: any) => handleInputChange(e, index)}
                      sx={{ maxWidth: "85%" }}
                    />
                    <IconButton
                      color="error"
                      sx={{ border: "1px solid #ececec", borderRadius: "10px" }}
                      onClick={() => handleRemoveInput(index)}>
                      <IconTrash />
                    </IconButton>
                  </Box>
                </Box>

                {input.subProperties.map((subProperty, subIndex) => (
                  <Box key={subIndex} sx={{ mb: 2, marginLeft: "20px" }}>
                    <InputLabel sx={{ color: "#000" }}>Sub Property</InputLabel>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="Sub Property"
                        value={subProperty}
                        onChange={(e: any) => handleInputChange(e, index, subIndex)}
                        sx={{ maxWidth: "85%" }}
                      />
                      <IconButton
                        color="error"
                        sx={{
                          border: "1px solid #ececec",
                          borderRadius: "10px",
                        }}
                        onClick={() => handleRemoveSubInput(index, subIndex)}
                      >
                        <IconTrash />
                      </IconButton>
                      <IconButton

                        sx={{
                          border: "1px solid #ececec",
                          borderRadius: "10px",
                          color: "#ACDD33"
                        }}
                        onClick={() => handleAddSubInput(index)}
                      >
                        <IconCirclePlus />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Grid>
            ))}
          </Grid>

          <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>

            <Box sx={{ mt: 1 }}>
              <Button variant="outlined" sx={{ mr: 2, backgroundColor: "#ACDD33", color: "black", border: "none" }} onClick={handleAddInput}>
                {/* <IconCirclePlus />  */}
                Add Property
              </Button>
            </Box>

            <Box sx={{ mt: 1 }}>
              <Button variant="outlined" color="error" sx={{ mr: 2 }}>
                reset
              </Button>
              <Button onClick={submitDetails} variant="contained" sx={{ backgroundColor: "#022213" }}>
                Submit
              </Button>
            </Box>

          </Box>

        </Grid>

      </Box>
    </Box>
  );
};
export default Properties;











