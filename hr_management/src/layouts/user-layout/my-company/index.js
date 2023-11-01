import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Header from "layouts/profile/components/Header";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function MyCompany() {
  const storedToken = localStorage.getItem("Authorization");
  const [userInfo, setUserInfo] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});

  async function user() {
    const decodedToken = jwtDecode(storedToken);
    if (storedToken) {
      try {
        const response = await axios.get(
          `http://localhost:7072/api/v1/user/find_by_id/${decodedToken.myId}`
        );
        return response.data;
      } catch (error) {
        console.error("An error occurred while trying to retrieve user information:", error);
      }
    }
  }

  async function company(companyId) {
    try {
      console.log("asdad");
      const response = await axios.get(
        `http://localhost:7073/api/v1/company/findbycompanyid/${companyId}`
      );
      return response.data;
    } catch (error) {
      console.error("company error", error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const userInfo = await user();
      console.log("if üzeri");
      if (userInfo) {
        setUserInfo(userInfo);
        console.log(userInfo.companyId);
        const companyInfo = await company(userInfo.companyId);
        if (companyInfo) {
          setCompanyInfo(companyInfo);
        }
      }
    }
    fetchData();
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
      <Card sx={{ maxWidth: "%100" }}>
        <CardMedia
          sx={{ height: 250 }}
          image="https://images.tech.co/wp-content/uploads/2022/03/31082824/AdobeStock_303541183_Editorial_Use_Only-min-scaled.jpeg"
          title="company"
        />
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {companyInfo.companyName}
          </Typography>
          <Typography variant="body3" color="text.secondary">
            {companyInfo.sector}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {companyInfo.companyCountry} <span> / </span>
            {companyInfo.companyProvince}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {companyInfo.companyMail}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {companyInfo.companyPhone}
          </Typography>
        </CardContent>
      </Card>

      <Footer px={5000} />
    </DashboardLayout>
  );
}

export default MyCompany;
