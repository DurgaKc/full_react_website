import React, { useState } from "react";
import NavbarAdmin from "../../../Components/NavbarAdmin";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const AddTeam = () => {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const options = {
    "Committe Member": ["Chairman", "Vice-Chairman", "Member"],
    "Teaching Staff": ["Campus chief", "Ast Campus Chief", "Professor", "Lecturer"],
    "Non-teaching Staff": ["Information Officer", "Accountant", "Librarian"],
  };

  const handleTypeChange = (event) => {
    setCategory(event.target.value);
    setSubCategory(""); //reset sub-category in type change
  };
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
          elevation={2}
          sx={{
            maxWidth: 1150,
            mx: "auto",
            p: 3,
            my: 4,
            borderRadius: 2,
          }}
        >
          <Grid container spacing={2}>
            {/* Salutation */}
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel id="salutation-label">Salutation</InputLabel>
                <Select
                  labelId="salutation-label"
                  id="salutation"
                  label="Salutation"
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
            <Grid item xs={12} sm={6} md={3.3}>
              <TextField
                fullWidth
                id="first-name"
                label="First Name"
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3.3}>
              <TextField
                fullWidth
                id="middle-name"
                label="Middle Name"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3.3}>
              <TextField
                fullWidth
                id="last-name"
                label="Last Name"
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                id="phone"
                label="Phone Number"
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Type</InputLabel>
                <Select value="category" label="Type" onChange={handleTypeChange} required>
                  <MenuItem value="Committe Member">Committe Member</MenuItem>
                  <MenuItem value="Teaching Staff">Teaching Staff</MenuItem>
                  <MenuItem value="Non-teaching Staff">
                    Non-teaching Staff
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small" disabled={!type}>
                <InputLabel>Sub-category</InputLabel>
                <Select
                  value={subCategory}
                  label="Sub-category"
                  onChange={(e) => setSubCategory(e.target.value)}
                  required
                >
                  {(options[type] || []).map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                id="employee_index"
                label="Employee Index"
                size="small"
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                id="department"
                label="Department"
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                id="appointed_date"
                label="Appointed Date**"
                type="date"
                InputLabelProps={{ shrink: true }}
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                id="position"
                label="Position in the Team"
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="academic_degree"
                label="Highest academic degree acquired"
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                type="file"
                name="ppImage"
                size="small"
                accept="image/*"
                label="Member Image"
                InputLabelProps={{ shrink: true }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="fb_URL"
                label="Facebook URL"
                size="small"
                required
              />
            </Grid>
            <Grid sx={{ margin: 2 }}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Status
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="active"
                    control={<Radio />}
                    label="Active"
                  />
                  <FormControlLabel
                    value="inactive"
                    control={<Radio />}
                    label="Inactive"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                label="Add description"
                multiline
                rows={4}
                size="small"
                required
                variant="outlined"
              />
            </Grid>
            <Grid sx={{ margin: 2 }}>
              <Button variant="contained">Add member</Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default AddTeam;
