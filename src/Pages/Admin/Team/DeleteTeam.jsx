import {
  Button,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
 const backendUrl = import.meta.env.VITE_BASE_URL;

const DeleteTeam = ({ id, onClose }) => {
console.log(id)
  const [loading, setLoading] = useState(false);

 const getAuthtoken = () => {
    return localStorage.getItem("authtoken");
  };
 const deleteTeamData = async () =>{
  setLoading(true);
   try{
    const token = getAuthtoken();
      if (!token) throw new Error("Token is Missing");

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };
      const response = await axios.delete(`${backendUrl}/teams/${id}`,{
        headers
      });
      toast.success('Team deleted Successfully');
      //close dialog box and auto refresh list
      if (onClose) {
        onClose(response);
      }
    }catch (error) {
      console.error("Error updating team:", error);
      toast.error("Failed to delete team data.Please try again")
    } 
    
  }

  return (
    <DialogContent sx={{ maxWidth: 600 }}>
      <Typography>
        Are you sure you want to delete this team member ? All associated data
        will also be permanently removed.
      </Typography>
      <DialogActions sx={{ pb: 2, pr: 2 }}>
        <Button variant="outlined" size="small" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="outlined"
          size="small"
          sx={{ color: "red", borderColor: "red" }}
          onClick={deleteTeamData}
        >
          Delete
        </Button>
      </DialogActions>
    </DialogContent>
  );
};

export default DeleteTeam;
