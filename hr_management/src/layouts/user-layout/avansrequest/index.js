import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
} from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Axios from "axios";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

const localizer = momentLocalizer(moment);

function MyForm() {
  const [sebep, setSebep] = useState("");
  const [miktar, setMiktar] = useState("yillik"); // You can choose your default value
  const [error, setError] = useState(""); // Define the error state

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object to send as the request data
    const requestData = {
      sebep: sebep,
      miktar: miktar, // İzin türünü ekle
    };

    // Your authentication token
    const authToken = localStorage.getItem("Authorization");

    Axios.post(
      "http://34.173.81.212/user/avansal?token=" +
        authToken +
        "&sebep=" +
        requestData.sebep +
        "&miktar=" +
        requestData.miktar
    )
      .then((response) => {
        // Handle the response, e.g., display a success message
        console.log("Request successful", response.data);
      })
      .catch((error) => {
        let errorMessage = error.response.data.message;
        // Handle errors, e.g., display an error message
        console.error("Request failed", error);
        setError(errorMessage);
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div>
        <h2>Avans Request Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="sebep" style={{ marginRight: "10px" }}>
              Reason:
            </label>
            <TextField
              type="text"
              id="sebep"
              value={sebep}
              onChange={(e) => setSebep(e.target.value)}
            />
          </div>
          <br></br>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor="Price" style={{ marginRight: "30px" }}>
              Price:
            </label>
            <TextField
              label="Income Price"
              id="income"
              type="number"
              value={miktar}
              onChange={(e) => setMiktar(e.target.value)}
            />
            <CurrencyLiraIcon style={{ marginLeft: "5px" }} fontSize="small">
              receipt_long
            </CurrencyLiraIcon>
          </div>
          <br></br>

          {error && <div style={{ color: "red", fontFamily: "monospace" }}>{error}</div>}
          <div>
            <Button type="submit" variant="contained" color="white">
              {" "}
              Request advance payment
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default MyForm;
