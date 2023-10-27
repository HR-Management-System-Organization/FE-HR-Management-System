import React, { useState } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from "axios";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function Cover() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  function formOnChange(e) {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  }

  function handleSignIn(e) {
    e.preventDefault();

    const { username, password } = userInfo;

    axios
      .post(
        "http://localhost:7072/api/v1/user/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Sign In successful:", response.data);
        // Handle success, e.g., navigate to another page
      })
      .catch((error) => {
        console.error("Sign In failed:", error);
        // Handle the error, e.g., show an error message to the user
      });
  }

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Welcome
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your username and password to sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <form onSubmit={handleSignIn}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                name="username"
                placeholder="Username"
                onChange={formOnChange}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                name="password"
                placeholder="Password"
                onChange={formOnChange}
                fullWidth
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="info" fullWidth>
                Sign in
              </MDButton>
            </MDBox>
          </form>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
