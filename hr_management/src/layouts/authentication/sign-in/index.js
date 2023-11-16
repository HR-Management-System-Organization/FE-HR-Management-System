import React, { useState, useEffect } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert } from "reactstrap";

const API_URL = "http://localhost/user/login";

function Cover() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      const storedToken = localStorage.getItem("Authorization");
      if (storedToken) {
        const decodedToken = jwt_decode(storedToken);
        const decodedUserRole = decodedToken.role;
        setRole(decodedUserRole);
        setIsLoggedIn(true);
        localStorage.setItem("role", decodedUserRole); // Burada "role" olarak kaydediyorum
      }
    }
  }, [isLoggedIn]);

  const handleSignInSuccess = () => {
    toast.success("Login successful!");

    setTimeout(() => {
      const token = localStorage.getItem("Authorization");
      const decoded = jwt_decode(token);
      const decodedUserRole = decoded.role; // decodedUserRole burada tanımlanıyor
      const decodedUserstatus = decoded.status; // decodedUserRole burada tanımlanıyor

      if (decodedUserRole === "COMPANY_MANAGER") {
        if (decodedUserstatus === "INACTIVE") {
          navigate("/authentication/uyelikyenile");
        } else navigate("/manager/dashboard");
      } else if (decodedUserRole === "ADMIN") {
        navigate("/admin/profile");
      } else if (decodedUserRole === "EMPLOYEE") {
        navigate("/employee/company");
      } else if (decodedUserRole === "GUEST") {
        navigate("/guest/homepage");
      } else {
        navigate("/authentication/activation-failed");
      }
    }, 2000);
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
        setIsLoggedIn(true);
        handleSignInSuccess();
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        setError(errorMessage);
      });
    setCredentials({ username: "", password: "" });
  };

  return (
    <CoverLayout image={bgImage}>
      <ToastContainer position="top-center" autoClose={3000} />
      {error && <Alert color="danger">{error}</Alert>}
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
            Enter your username or email and password to sign in
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
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
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
