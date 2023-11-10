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

const localizer = momentLocalizer(moment);

function MyForm() {
  const [sebep, setSebep] = useState("");
  const [baslangicTarih, setBaslangicTarih] = useState("");
  const [bitisTarih, setBitisTarih] = useState("");
  const [izinTur, setIzinTur] = useState("yillik"); // You can choose your default value
  const [error, setError] = useState(""); // Define the error state

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object to send as the request data
    const requestData = {
      sebep: sebep,
      izinTur: izinTur, // İzin türünü ekle
      baslangicTarih: baslangicTarih,
      bitisTarih: bitisTarih,
    };

    // Your authentication token
    const authToken = localStorage.getItem("Authorization");

    Axios.post(
      "http://localhost:7072/api/v1/user/izinal?token=" +
        authToken +
        "&sebep=" +
        requestData.sebep +
        "&izinTur=" +
        requestData.izinTur + // İzin Türünü ekledik
        "&tarihler=" +
        requestData.baslangicTarih +
        requestData.bitisTarih
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
      <div>
        <h2>Leave Request Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="sebep">Reason:</label>
            <TextField
              type="text"
              id="sebep"
              value={sebep}
              onChange={(e) => setSebep(e.target.value)}
            />
          </div>
          <div>
            <br></br>
            <label htmlFor="izinTur">Permission Type:</label>
            <Select id="izinTur" value={izinTur} onChange={(e) => setIzinTur(e.target.value)}>
              <MenuItem value="yillik">Annual Leave</MenuItem>
              <MenuItem value="babalik">Paternity Leave</MenuItem>
              <MenuItem value="annelik">Maternity Leave</MenuItem>
            </Select>
          </div>
          <br></br>
          <div>
            <label htmlFor="baslangicTarih">Permit Start Date:</label>
            <TextField
              type="date"
              id="baslangicTarih"
              value={baslangicTarih}
              onChange={(e) => setBaslangicTarih(e.target.value)}
            />
          </div>
          <br></br>
          <div>
            <label htmlFor="bitisTarih">First Working Day After Leave:</label>
            <TextField
              type="date"
              id="bitisTarih"
              value={bitisTarih}
              onChange={(e) => setBitisTarih(e.target.value)}
            />
          </div>
          {error && <div style={{ color: "red", fontFamily: "monospace" }}>{error}</div>}
          <div>
            <Button type="submit" variant="contained" color="white">
              {" "}
              İzni Gönder
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default MyForm;
