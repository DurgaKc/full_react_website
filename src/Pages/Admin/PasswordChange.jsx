import React, { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import NavbarAdmin from '../../Components/NavbarAdmin.jsx';

const PasswordChange = () => {
  const [formData, setFormData] = useState({
    email:'',
    current: '',
    new: '',
    confirm: '',
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  return (
    <>
    <NavbarAdmin/>
    <div className="w-full max-w-md p-6 mt-6 mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2 text-center">Change Password</h2>
      <p className="text-sm text-center text-gray-600 mb-4">
        Secure Your Account – Update Your Password
      </p>

      <TextField
      size='small'
        label="Email Address"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.email}
        InputProps={{ readOnly: true }}
      />

      <TextField
      size='small'
        label="Current Password"
        type={showPassword.current ? 'text' : 'password'}
        value={formData.current}
        onChange={handleChange('current')}
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => toggleVisibility('current')}
                onMouseDown={handleMouseDown}
              >
                {showPassword.current ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
      size='small'
        label="New Password"
        type={showPassword.new ? 'text' : 'password'}
        value={formData.new}
        onChange={handleChange('new')}
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => toggleVisibility('new')}
                onMouseDown={handleMouseDown}
              >
                {showPassword.new ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
      size='small'
        label="Confirm New Password"
        type={showPassword.confirm ? 'text' : 'password'}
        value={formData.confirm}
        onChange={handleChange('confirm')}
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => toggleVisibility('confirm')}
                onMouseDown={handleMouseDown}
              >
                {showPassword.confirm ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{marginTop:'10px', borderRadius:"9px"}}
      >
        Change Password
      </Button>
    </div>
    </>
  );
};

export default PasswordChange;
