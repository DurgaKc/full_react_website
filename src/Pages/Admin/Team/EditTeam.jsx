import React, { useEffect, useState } from "react";
import {
  Button,
  DialogContent,
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
import axios from "axios";

const EditTeam = ({id}) => {
  console.log(id)
  const [formData, setFormdata] = useState({
    salutation: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    category: "",
    subCategory: "",
    employeeIndex: "",
    department: "",
    appointedDate: "",
    position: "",
    highestAcademicDeg: "",
    fbUrl: "",
    status: "active",
    description: "",
  });
  //image state
  const [ppImage, setPpImage] = useState(null);

  const handleChange = ({ target: { name, value } }) => {
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleImageChange = (e) => {
    setPpImage(e.target.files[0]);
  };

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const options = {
    "Committe Member": ["Chairman", "Vice-Chairman", "Member"],
    "Teaching Staff": [
      "Campus chief",
      "Ast Campus Chief",
      "Professor",
      "Lecturer",
    ],
    "Non-teaching Staff": ["Information Officer", "Accountant", "Librarian"],
  };

  const handleTypeChange = (event) => {
    setCategory(event.target.value);
    setSubCategory(""); //reset sub-category in type change
  };

  //fetch data by id
  useEffect(() => {
    const getTeamData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.67:5001/api/teams/${id}`
        );
        const data = response.data;

        setFormdata({
          salutation: data.salutation || "",
          firstName: data.firstName || "",
          middleName: data.middleName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phoneNo: data.phoneNumber || "",
          category: data.category || "",
          subCategory: data.subCategory || "",
          employeeIndex: data.employeeIndex || "",
          department: data.department || "",
          appointedDate: data.appointedDate || "",
          position: data.positionInTeam || "",
          highestAcademicDeg: data.acquiredDegree || "",
          fbUrl: data.fbUrl || "",
         status: data.status === "inactive" ? "inactive" : "active", 
          description: data.description || "",
        });
        setCategory(data.category || "");
        setSubCategory(data.subCategory || "");
      } catch (error) {
        console.error("Failed to fetch team data:", error);
      }
    };
    if (id) {  // Only fetch if id exists
      getTeamData();
    }
    getTeamData();
  }, [id]);

  
  return (
    <>
      <Grid>
        <DialogContent>
          <Typography
            variant="h4"
            gutterBottom
            style={{
              margin: "40px",
              display: "flex",
              justifyContent: "center",
            }}
          >
          
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
                    name="salutation"
                    value={formData.salutation}
                    label="Salutation"
                    onChange={handleChange}
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
                  name="firstName"
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  size="small"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3.3}>
                <TextField
                  fullWidth
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  label="Middle Name"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3.3}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  size="small"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  label="Email"
                  size="small"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  label="Phone Number"
                  size="small"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl
                  fullWidth
                  size="small"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={category}
                    name="category"
                    label="category"
                    onChange={handleTypeChange}
                    required
                  >
                    <MenuItem value="Committe Member">Committe Member</MenuItem>
                    <MenuItem value="Teaching Staff">Teaching Staff</MenuItem>
                    <MenuItem value="Non-teaching Staff">
                      Non-teaching Staff
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl
                  fullWidth
                  size="small"
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleChange}
                  disabled={!category}
                >
                  <InputLabel>Sub-category</InputLabel>
                  <Select
                    value={subCategory}
                    label="Sub-category"
                    onChange={(e) => setSubCategory(e.target.value)}
                    required
                  >
                    {(options[category] || []).map((option, index) => (
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
                  name="employeeIndex"
                  value={formData.employeeIndex}
                  onChange={handleChange}
                  label="Employee Index"
                  size="small"
                  type="number"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  label="Department"
                  size="small"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  name="appointedDate"
                  value={formData.appointedDate}
                  onChange={handleChange}
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
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  label="Position in the Team"
                  size="small"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  name="highestAcademicDeg"
                  value={formData.highestAcademicDeg}
                  onChange={handleChange}
                  label="Highest academic degree acquired"
                  size="small"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  name="ppImage"
                  type="file"
                  size="small"
                  accept="image/*"
                  label="Member Image"
                  onChange={handleImageChange}
                  InputLabelProps={{ shrink: true }}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  name="fbUrl"
                  value={formData.fbUrl}
                  onChange={handleChange}
                  label="Facebook URL"
                  size="small"
                  required
                />
              </Grid>
              <Grid sx={{ margin: 2 }}>
                <FormControl
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Status
                  </FormLabel>
                  <RadioGroup
                    row
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
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
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
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
        </DialogContent>
      </Grid>
    </>
  );
};

export default EditTeam;
