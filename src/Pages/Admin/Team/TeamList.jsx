import React from "react";
import NavbarAdmin from "../../../Components/NavbarAdmin";
import { IoAddSharp } from "react-icons/io5";
import {
    Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const TeamList = () => {
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
        
        >  List of Team Members
        </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, mr:12 }}>
         <Link to="/addTeam" style={{ textDecoration: 'none' }}>
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
                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    border: "1px solid #c2c2c2",
                    paddingTop: "7px",
                  }}
                >
                  SNo
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    border: "1px solid #c2c2c2",
                    padding: "7px",
                  }}
                >
                  Full Name
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    border: "1px solid #c2c2c2",
                    padding: "7px",
                  }}
                >
                  Index
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    border: "1px solid #c2c2c2",
                    padding: "7px",
                  }}
                >
                  Position
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    border: "1px solid #c2c2c2",
                    padding: "7px",
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    border: "1px solid #c2c2c2",
                    padding: "7px",
                  }}
                >
                  Contact Number
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    border: "1px solid #c2c2c2",
                    padding: "7px",
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    border: "1px solid #c2c2c2",
                    padding: "7px",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ border: "1px solid #c2c2c2" }}
                >
                  1
                </TableCell>
                <TableCell align="left" sx={{ border: "1px solid #c2c2c2" }}>
                  Lina Singh
                </TableCell>
                <TableCell align="left" sx={{ border: "1px solid #c2c2c2" }}>
                  9
                </TableCell>
                <TableCell align="left" sx={{ border: "1px solid #c2c2c2" }}>
                  chairman
                </TableCell>
                <TableCell align="left" sx={{ border: "1px solid #c2c2c2" }}>
                  lina45@gmail.com
                </TableCell>
                <TableCell align="left" sx={{ border: "1px solid #c2c2c2" }}>
                  9866712345
                </TableCell>
                <TableCell align="left" sx={{ border: "1px solid #c2c2c2" }}>
                  Active
                </TableCell>
                <TableCell align="left" sx={{ border: "1px solid #c2c2c2" }}>
                  <Button size="small" sx={{ mx: 1, padding: "2px" }}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    sx={{ mx: 1, padding: "2px", color: "red" }}
                  >
                    delete
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default TeamList;
