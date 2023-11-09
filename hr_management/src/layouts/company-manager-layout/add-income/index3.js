/**
=========================================================
* HR Management System React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// @mui icons
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
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

function Overview() {
  const [userData, setUserData] = useState({});
  const storedToken = localStorage.getItem("Authorization");
  const [userInfo, setUserInfo] = useState({});

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
  return <DashboardLayout></DashboardLayout>;
}

export default Overview;
