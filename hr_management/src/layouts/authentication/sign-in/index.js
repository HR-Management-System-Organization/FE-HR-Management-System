import React, { useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from "axios";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

const API_URL = "http://localhost:7072/api/v1/user/login";

function Cover() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  // const { setUserRole } = useCentralState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState();

  // const storedToken = localStorage.getItem("Authorization");
  // try {
  //   const storedRole = jwt_decode(storedToken).role;
  //   return storedRole;
  // } catch (error) {
  //   console.log(error);
  // }
  useEffect(() => {
    const storedToken = localStorage.getItem("Authorization");
    if (storedToken) {
      const decodedToken = jwt_decode(storedToken);
      const decodedUserRole = decodedToken.role;
      setRole(decodedUserRole);
      console.log(role);
      localStorage.setItem(role, decodedUserRole);
    }
  });

  const navigate = useNavigate();

  const formOnChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem("Authorization");
      const decoded = jwt_decode(token);
      if (role === "COMPANY_MANAGER") {
        navigate("/manager/dashboard");
      } else if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (role === "EMPLOYEE") {
        navigate("/employee/dashboard");
      } else if (role === "GUEST") {
        navigate("/guest/dashboard");
      } else {
        navigate("/authentication/activation-failed");
      }
    }
  }, [isLoggedIn, navigate]);

  const handleSignInSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const { username, password } = credentials;

    axios
      .post(
        API_URL,
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        const token = response.data;
        localStorage.setItem("Authorization", `Bearer ${token}`);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log("Login successful!", response.data);
        // console.log(role);
        handleSignInSuccess();
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setError("Login failed. Please check your credentials.");
      }, []);

    // Clear the input fields
    setCredentials({ username: "", password: "" });
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2.5}
          mt={2}
          p={4}
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
        <MDBox pt={4} pb={3} px={3} textAlign="center">
          <form onSubmit={handleSignIn}>
            {error && <div style={{ color: "red", fontFamily: "monospace" }}>{error}</div>}
            <MDBox mb={2}>
              <MDInput
                type="text"
                name="username"
                placeholder="Username"
                value={credentials.username}
                onChange={formOnChange}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
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
