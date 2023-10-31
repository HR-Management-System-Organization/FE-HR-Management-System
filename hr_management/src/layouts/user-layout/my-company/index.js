import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/profile/components/Header";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";

function MyCompany() {
  const [userData, setUserData] = useState({});
  const storedToken = localStorage.getItem("Authorization");
  const [userInfo, setUserInfo] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});

  useEffect(() => {
    const decodedToken = jwtDecode(storedToken);
    if (storedToken) {
      console.log(decodedToken.myId);
      axios
        .get(`http://localhost:7072/api/v1/user/find_by_id/${decodedToken.myId}`)
        .then((response) => {
          setUserInfo(response.data);
          console.log("1");
        })

        .catch((error) => {
          console.error("An error occurred while trying to retrieve user information:", error);
        });
    }
    // console.log(userInfo.companyId);
  }, [MyCompany]);
  console.log(userInfo.companyId);
  axios.get(`/findbycompanyid/${userInfo.companyId}`).then((x) => {
    console.log("2");
    setCompanyInfo(x.data);
  });

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
      <div>
        {companyInfo.companyId}
        {companyInfo.companyName}
      </div>
      <MDBox mt={5} mb={3}></MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MyCompany;
