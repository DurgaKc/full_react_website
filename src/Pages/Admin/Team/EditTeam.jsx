import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Box,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BASE_URL;
const imageUrl = import.meta.env.VITE_UPLOAD_URL;

const EditTeam = ({ id, onClose, updatedTeam }) => {
  console.log(id);
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
  const [previewImage, setPreviewImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  //refs
  const ppImageRef = useRef();

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
    setFormData((prev) => ({
      ...prev,
      category: event.target.value,
      subCategory: "",
    }));
  };

  //fetch team data by id
  useEffect(() => {
    const getTeamData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/teams/${id}`);
        const data = response.data;

        setFormData({
          salutation: data.salutation || "",
          firstName: data.firstName || "",
          middleName: data.middleName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phoneNo: data.phoneNo || "",
          category: data.category || "",
          subCategory: data.subCategory || "",
          index: data.index || "",
          department: data.department || "",
          appointedDate: data.appointedDate || "",
          position: data.position || "",
          highestAcademicDeg: data.highestAcademicDeg || "",
          fbUrl: data.fbUrl || "",
          status: data.status === "inactive" ? "inactive" : "active",
          description: data.description || "",
          ppImage: data.ppImage || "",
        });
        setCategory(data.category || "");
        setSubCategory(data.subCategory || "");
        setPpImage(null);
        setExistingImage(data.ppImage || null);
        setPreviewImage(
          data.ppImage ? `${imageUrl}/team/${data.ppImage}` : null
        );
      } catch (error) {
        console.error("Failed to fetch team data:", error);
        toast.error("Failed to load team data");
      }
    };
    if (id) {
      getTeamData();
    }
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPpImage(file); // Store File object
      setPreviewImage(URL.createObjectURL(file)); // Create preview
      setExistingImage(null); // Clear existing image
    }
  };

  const handleRemoveFetchedImage = () => {
    setPpImage(null);
    setPreviewImage(null);
    setExistingImage(null);
    if (ppImageRef.current) ppImageRef.current.value = "";
    setFormData((prev) => ({ ...prev, ppImage: "" }));
    data;
  };

  //Update Team data
  const getAuthToken = () => {
    return localStorage.getItem("authtoken");
  };

  const updateTeamData = async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      if (!token) throw new Error("Token is Missing");

      const form = new FormData();

      //Append all form data
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          form.append(key, value);
        }
      });

      //Append image
      if (ppImage) {
        form.append("ppImage", ppImage);
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const response = await axios.patch(`${backendUrl}/teams/${id}`, form, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating team:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
     const updatedTeam = await updateTeamData();
      toast.success("Team updated successfully!");

      // Close the dialog after successful update
      if (onClose) {
        onClose(updatedTeam);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update team");
    }
  };
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
            Edit a team member
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
            <form onSubmit={handleEdit}>
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
                  <FormControl fullWidth size="small">
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={category}
                      label="category"
                      name="category"
                      onChange={handleTypeChange}
                      required
                    >
                      <MenuItem value="Committe Member">
                        Committe Member
                      </MenuItem>
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
                      label="Sub-category"
                      name="Sub-category"
                      onChange={(e) => setSubCategory(e.target.value)}
                      // required
                    >
                      {options[category]?.map((option, i) => (
                        <MenuItem key={i} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    name="index"
                    value={formData.index}
                    onChange={handleChange}
                    label="Employee Index"
                    size="small"
                    type="number"
                    InputLabelProps={{ shrink: true }}
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
                    // required
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

                {/* profile picture upload */}
                <Grid item xs={12} sm={6} md={4}>
                  <Box>
                    <TextField
                      inputRef={ppImageRef}
                      // value={ppImage}
                      fullWidth
                      name="ppImage"
                      type="file"
                      size="small"
                      accept="image/*"
                      label="Member Image"
                      onChange={handleImageChange}
                      InputLabelProps={{ shrink: true }}
                    />

                    {(previewImage || existingImage) && (
                      <Box
                        sx={{
                          position: "relative",
                          mt: 1,
                          width: 260,
                          height: 160,
                        }}
                      >
                        <Box
                          component="img"
                          src={
                            previewImage || `${imageUrl}/team/${existingImage}`
                          }
                          alt="profile"
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: 1,
                          }}
                        />
                        <IconButton
                          size="small"
                          onClick={handleRemoveFetchedImage}
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            bgcolor: "rgba(255, 255, 255, 0.8)",
                            "&:hover": { bgcolor: "rgba(255, 255, 255, 1)" },
                          }}
                        >
                          <IoMdClose fontSize="small" />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
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
                    variant="outlined"
                  />
                </Grid>
                <Grid sx={{ margin: 2 }}>
                  <Button variant="contained" type="submit">
                    Update member
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </DialogContent>
      </Grid>
    </>
  );
};

export default EditTeam;
