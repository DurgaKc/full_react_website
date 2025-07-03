import axios from "axios";

const getAuthToken = () => localStorage.getItem("authToken")

const backendUrl = import.meta.env.VITE_BASE_URL;

export const getTeamById= async (id) =>{
    const response = await axios.get(`${backendUrl}/teams/${id}`);
  return response.data;
}

export const updateTeamById = async (id, data) =>{
    try{
        const token = getAuthToken();
        if (!token) throw new Error("Token is Missing");
        const headers = {
      Authorization: `Bearer ${token}`,
    };
     const response = await axios.patch(`${backendUrl}/teams/${id}`,data,{ headers}); 
         return response.data;
    } catch (error) {
    console.error("Error while updating team:", error.response?.data || error.message);
    throw error;
  }
}