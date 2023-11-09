import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

// HR Management System React components
import MDBox from "components/MDBox";

// HR Management System React example components
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

// Overview page components
import Header from "layouts/profile/components/Header";

// Data

// Images
import axios from "axios";
import GuestInfoCard from "examples/Cards/InfoCards/GuestInfoCard";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

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

import Axios from "axios";

const localizer = momentLocalizer(moment);

function MyForm() {
  const [sebep, setSebep] = useState("");
  const [gelir, setgelir] = useState("");
  const [userid, setuserid] = useState("");
  const [gelirtarihi, setgelirtarihi] = useState("");
  const [gelirtur, setgelirtur] = useState("sabittur");
  const [error, setError] = useState("");
  const storedToken = localStorage.getItem("Authorization");
  const [userInfo, setUserInfo] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});

  async function axiosIstek() {
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      console.log(decodedToken.myId);
      try {
        const response = await axios.get(`http://localhost/user/find_by_id/${decodedToken.myId}`);
        setUserInfo(response.data);
      } catch (error) {
        console.error("Kullanıcı bilgilerini alırken bir hata oluştu:", error);
      }
    }
  }
  useEffect(() => {
    axiosIstek();
    console.log(userInfo.companyId);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      sebep,
      gelirtur,
      gelirtarihi,
      gelir,
    };

    const apiUrl = `http://localhost:7073/api/v1/company/addincome?&sebep=${sebep}&companyid=${userInfo.companyId}&gelir=${gelir}&gelirtur=${gelirtur}&gelirtarihi=${gelirtarihi}&id=${userInfo.id}&name=${userInfo.name}&surname=${userInfo.surName}`;

    Axios.post(apiUrl)
      .then((response) => {
        // Handle the response, e.g., display a success message
      })
      .catch((error) => {
        let errorMessage = error.response.data.message;
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
            <label htmlFor="gelir">Gelir fiyat:</label>
            <input
              type="text"
              id="gelir"
              value={gelir}
              onChange={(e) => setgelir(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="sebep">Gelir Aciklamasi:</label>
            <input
              type="text"
              id="sebep"
              value={sebep}
              onChange={(e) => setSebep(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="gelirtur">Gelirturu:</label>
            <select id="gelirtur" value={gelirtur} onChange={(e) => setgelirtur(e.target.value)}>
              <option value="sabittur">sabit</option>
              <option value="satis">Satis</option>
              <option value="faiz">faiz</option>
            </select>
          </div>
          <div>
            <label htmlFor="gelirtarihi">Gelir Tarihi:</label>
            <input
              type="date"
              id="gelirtarihi"
              value={gelirtarihi}
              onChange={(e) => setgelirtarihi(e.target.value)}
            />
          </div>

          {error && <div style={{ color: "red", fontFamily: "monospace" }}>{error}</div>}
          <div>
            <button type="submit">Gelir Kaydet</button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default MyForm;
