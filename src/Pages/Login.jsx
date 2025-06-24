import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Paper,
} from "@mui/material";
import Navbar from "../Components/navbar";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    // Add your login logic here
  };

  return (
    <>
      {" "}
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
              fullWidth
              placeholder="Enter your email"
              value={form.email}
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
              value={form.password}
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

export default LoginForm;
