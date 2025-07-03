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
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BASE_URL;

const AddTeam = ({ onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    salutation: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    category: "",
    subCategory: "",
    index: "",
    department: "",
    appointedDate: "",
    position: "",
    highestAcademicDeg: "",
    fbUrl: "",
    status: "active",
    description: "",
  });

  const [ppImage, setPpImage] = useState(null);
  const [loading, setLoading] = useState(false);
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
  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTypeChange = (event) => {
    setCategory(event.target.value);
    setSubCategory(""); //reset sub-category in type change
  };

  //post team data
  const getAuthToken = () => {
    return localStorage.getItem("authtoken");
  };

  const submitTeamData = async (formData) => {
    try {
      const token = getAuthToken();
      if (!token) throw new Error("Token is Missing");

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };
      const response = await axios.post(`${backendUrl}/teams`, formData, {
        headers,
      });
     
    } catch (error) {
      console.error("Error in Adding team data");
      toast.error("Failed to add team data");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    if (ppImage) {
      formDataToSend.append("ppImage", ppImage);
    }

    try {
      const response = await submitTeamData(formDataToSend);
     toast.success("Team added Successfully");
      navigate('/team');
    } catch (error) {
      console.error("Error in adding team data:", error);
    } finally {
      setLoading(false);
    }
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
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Salutation */}
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel id="salutation-label">Salutation</InputLabel>
                  <Select
                    labelId="salutation-label"
                    id="salutation"
                    name="salutation"
                    value={formData.salutation}
                    label="Salutation"
                    required
                    onChange={handleChange}
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
                  id="middle-name"
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
                  id="last-name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  label="Last Name"
                  size="small"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  id="email"
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
                  id="phone"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  label="Phone Number"
                  size="small"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={category}
                    label="category"
                    name="category"
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
                <FormControl fullWidth size="small" disabled={!category}>
                  <InputLabel>Sub-category</InputLabel>
                  <Select
                    value={subCategory}
                    name="Sub-category"
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
                  id="index"
                  name="index"
                  value={formData.index}
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
                  id="department"
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
                  id="appointed_date"
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
                  id="position"
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
                  id="highestAcademicDeg"
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
                  onChange={(e) => setPpImage(e.target.files[0])}
                />
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
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Status
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
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
                  id="description"
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
                <Button variant="contained" type="submit" disabled={loading}
                 onClick={onClose} >
                  {loading ? "Adding..." : "Add member"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default AddTeam;
