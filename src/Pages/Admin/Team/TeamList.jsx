import React, { useState, useEffect } from "react";
import NavbarAdmin from "../../../Components/NavbarAdmin";
import { IoAddSharp } from "react-icons/io5";
import {
  Box,
  Button,
  Dialog,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import EditTeam from "./EditTeam";

const TeamList = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [teamData, setTeamData] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  const handleEdit = (id) => {
    setSelectedTeamId(id);
    console.log(id);
    setOpenEditDialog(true);
  };

  const getTeamData = async () => {
    try {
      const response = await axios.get("http://192.168.1.67:5001/api/teams");
      setTeamData(response.data);
    } catch (error) {
      console.error("Error fetching team data:", error);
    }
  };

  useEffect(() => {
    getTeamData();
  }, []);
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
          List of Team Members
        </Typography>

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", mb: 2, mr: 12 }}
        >
          <Link to="/addTeam" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              startIcon={<IoAddSharp />}
              sx={{
                color: "#2B6EB5",
                borderColor: "#2B6EB5",
                textTransform: "none",
                fontWeight: 500,
                paddingY: "2px",
                paddingX: "12px",
              }}
            >
              Add a new team Member
            </Button>
          </Link>
        </Box>

        <TableContainer sx={{ maxWidth: 1100, mx: "auto" }}>
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: "rgb(43, 110, 181)" }}>
              <TableRow>
                {[
                  "SNo",
                  "Full Name",
                  "Index",
                  "Position",
                  "Email",
                  "Contact Number",
                  "Mem_Img",
                  "Status",
                  "Action",
                ].map((heading) => (
                  <TableCell
                    key={heading}
                    align="left"
                    sx={{
                      color: "white",
                      border: "1px solid #c2c2c2",
                      padding: "7px",
                    }}
                  >
                    {heading}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {teamData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ border: "1px solid #c2c2c2" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #c2c2c2" }}>
                    {`${item.firstName} ${
                      item.middleName ? item.middleName + " " : ""
                    }${item.lastName}`.trim()}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #c2c2c2" }}>
                    {item.index}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #c2c2c2" }}>
                    {item.position}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #c2c2c2" }}>
                    {item.email}
                  </TableCell>

                  <TableCell sx={{ border: "1px solid #c2c2c2" }}>
                    {item.phoneNo}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #c2c2c2" }}>
                    <img
                      // src={item.ppImage}
                       src="https://static.vecteezy.com/system/resources/thumbnails/057/068/323/small/single-fresh-red-strawberry-on-table-green-background-food-fruit-sweet-macro-juicy-plant-image-photo.jpg"
                      alt="Profile"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #c2c2c2" }}>
                    {item.status === true ? "Active" : "Inactive"}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #c2c2c2" }}>
                    <Button
                      size="small"
                      sx={{ mx: 1, padding: "2px" }}
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      sx={{ mx: 1, padding: "2px", color: "red" }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Edit dialog */}
        <Dialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          maxWidth="lg"
          fullWidth
        >
          <EditTeam id={selectedTeamId} />
        </Dialog>
      </Grid>
    </>
  );
};

export default TeamList;
