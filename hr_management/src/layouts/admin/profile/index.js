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
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Overview page components
import Header from "layouts/profile/components/Header";

// Data

// Images
import axios from "axios";
import GuestInfoCard from "examples/Cards/InfoCards/GuestInfoCard";
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
        const response = await axios.get(
          `http://localhost:7072/api/v1/user/find_by_id/${decodedToken.myId}`
        );
        setUserInfo(response.data);
      } catch (error) {
        console.error("Kullanıcı bilgilerini alırken bir hata oluştu:", error);
      }
    }
  }
  useEffect(() => {
    axiosIstek();
    console.log(userInfo.companyId);
    console.log(userInfo);
  }, []);
  return (
    <DashboardLayout
      sx={{
        backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
          `${linearGradient(
            rgba(gradients.info.main, 0.6),
            rgba(gradients.info.state, 0.6)
          )}, url(${bgImage})`,
        backgroundPositionY: "50%",
      }}
    >
      <DashboardNavbar />
      <Header fullName={[userInfo.name, " ", userInfo.surName]} />
      <MDBox mt={3} mb={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={4}>
            <GuestInfoCard
              description="Profile"
              title="Profile Information"
              info={{
                name: userInfo.name && `${userInfo.name}`,

                surname: userInfo?.surName && `${userInfo.surName}`,
                phone: userInfo?.phone && `${userInfo.phone}`,

                personalEmail: userInfo?.personalEmail || `${userInfo.email}`,
                companyId: userInfo?.companyId && `${userInfo.companyId}`,

                // phone: userInfo?.phone && `${userInfo.phone}`,

                // address: userInfo?.address & `${userInfo.adress}`,
              }}
              social={[
                {
                  link: "https://www.facebook.com/",
                  icon: <FacebookIcon />,
                  color: "facebook",
                },
                {
                  link: "https://twitter.com/",
                  icon: <TwitterIcon />,
                  color: "twitter",
                },
                {
                  link: "https://www.instagram.com/",
                  icon: <InstagramIcon />,
                  color: "instagram",
                },
              ]}
              action={{ route: "", tooltip: "Edit Profile" }}
              edit={true}
              sx={{
                maxWidth: "400px",
                overflow: "auto",
              }}
            />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
