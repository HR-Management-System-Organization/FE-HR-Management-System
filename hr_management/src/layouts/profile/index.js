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
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// HR Management System React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// HR Management System React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";
import GuestInfoCard from "examples/Cards/InfoCards/GuestInfoCard";
import axios from "axios";

function Overview() {
  const [userData, setUserData] = useState({});
  const storedToken = localStorage.getItem("Authorization");
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      console.log(decodedToken.myId);
      axios
        .get(`http://localhost:7072/api/v1/user/find_by_id/${decodedToken.myId}`)
        .then((response) => {
          setUserInfo(response.data);
        })
        .catch((error) => {
          console.error("An error occurred while trying to retrieve user information:", error);
        });
    }
  }, [storedToken]);

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
      <Header fullName={[userInfo.name, " ", userInfo.surName]} />
      <MDBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={4}>
            <GuestInfoCard
              description="Profile"
              title="Profile Information"
              info={{
                name: userInfo.name && `${userInfo.name}`,

                surname: userInfo?.surName && `${userInfo.surName}`,

                personalEmail: userInfo?.personalEmail || `${userInfo.email}`,

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
