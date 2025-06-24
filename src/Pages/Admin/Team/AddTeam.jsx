import React from "react";
import NavbarAdmin from "../../../Components/NavbarAdmin";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const AddTeam = () => {
  return (
    <>
      <NavbarAdmin />
      <Grid>
        <Typography
          variant="h4"
          gutterBottom
          style={{
            margin: "40px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {" "}
          Add a new member
        </Typography>
        <Paper
          sx={{
            maxWidth: 1100,
            mx: "auto",
            p: 3,
            mt: 4,
            borderRadius: 2,
          }}
        >
          <Grid container spacing={2}>
  {/* Salutation */}
  <Grid item xs={12} sm={6} md={4}>
    <FormControl fullWidth>
      <InputLabel id="salutation-label">Salutation</InputLabel>
      <Select
        labelId="salutation-label"
        id="salutation"
        label="Salutation"
        size="small"
        required
        // value={salutation}
        // onChange={handleSalutationChange}
      >
        <MenuItem value="Mr.">Mr.</MenuItem>
        <MenuItem value="Mrs.">Mrs.</MenuItem>
        <MenuItem value="Miss.">Miss.</MenuItem>
        <MenuItem value="Professor">Professor</MenuItem>
        <MenuItem value="Professor Dr.">Professor Dr.</MenuItem>
      </Select>
    </FormControl>
  </Grid>

  {/* Full Name */}
  <Grid item xs={12} sm={6} md={6}>
    <TextField
      fullWidth
      id="full-name"
      label="Full Name"
      size="small"
      // value={fullName}
      // onChange={handleFullNameChange}
    />
  </Grid>
</Grid>

        </Paper>
      </Grid>
    </>
  );
};

export default AddTeam;
