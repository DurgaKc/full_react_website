import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  Paper,
} from "@mui/material";
import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import Navbar from "../Components/navbar";
import { useAuth } from "../context/AuthContextProvider";

const AdminSignin = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
 const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   try{
    // Sending POST request to the backend
    const response = await axios.post(`${BASE_URL}/admin/signin`,{
      email: formData.email,
      password: formData.password,
    });
    const token = response.data.token;
    const role = response.data.user.role;
    const email = response.data.user.email;
    const userName = response.data.user.userName;
   
   login({email, role, token, userName})
   toast.success('Login Successful', { autoClose: 600 })
   setTimeout(()=>{
    navigate('/home')
   }, 600)
  } catch(error){
    
    toast.error('No user found', { autoClose: 200 })
    console.error('Error during login:', error.response?.data || error.message);

  }
  };

  return (
    <>
    
      <Navbar />
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        sx={{ marginTop: "50px" }}
      >
        Admin Login
      </Typography>
      <Box
        sx={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: 500,
            borderRadius: 3,
            boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
          }}
        >
          <Box component="form" onSubmit={handleSubmit}>
            {/* Email Field */}
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              Email
            </Typography>
            <TextField
              name="email"
              type="email"
               id="login_email"
              fullWidth
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              sx={{
                mb: 2,
                bgcolor: "#eaf1ff",
                border: "none",
                borderRadius: 4,
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& input": { p: 1.5 },
              }}
            />

            {/* Password Field */}
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              Password
            </Typography>
            <TextField
              name="password"
              type={showPassword ? "text" : "password"}
              fullWidth
              placeholder="Enter password"
                id="login_password"
              value={formData.password}
              onChange={handleChange}
              sx={{
                mb: 3,
                bgcolor: "#eaf1ff",
                borderRadius: 4,
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& input": { p: 1.5 },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    edge="end"
                    sx={{ cursor: "pointer" }}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <Box sx={{ color: "gray", fontSize: "13px" }}>
                      {showPassword ? "Hide" : "Show"}
                    </Box>
                  </InputAdornment>
                ),
              }}
            />

            {/* Login Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "rgb(17, 105, 191)",
                borderRadius: 5,
                py: 1,
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
             
              Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default AdminSignin;
