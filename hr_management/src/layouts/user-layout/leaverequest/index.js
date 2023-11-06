import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
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
        <h2>İzin Talebi Formu</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="sebep">İzin Sebebi:</label>
            <input
              type="text"
              id="sebep"
              value={sebep}
              onChange={(e) => setSebep(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="izinTur">İzin Türü:</label>
            <select id="izinTur" value={izinTur} onChange={(e) => setIzinTur(e.target.value)}>
              <option value="yillik">Yillik İzin</option>
              <option value="babalik">Babalik İzni</option>
              <option value="annelik">Annelik İzni</option>
            </select>
          </div>
          <div>
            <label htmlFor="baslangicTarih">İzin Başlangıç Tarihi:</label>
            <input
              type="date"
              id="baslangicTarih"
              value={baslangicTarih}
              onChange={(e) => setBaslangicTarih(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="bitisTarih">İzin Bitiş Tarihi:</label>
            <input
              type="date"
              id="bitisTarih"
              value={bitisTarih}
              onChange={(e) => setBitisTarih(e.target.value)}
            />
          </div>
          {error && <div style={{ color: "red", fontFamily: "monospace" }}>{error}</div>}
          <div>
            <button type="submit">İzni Gönder</button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default MyForm;
