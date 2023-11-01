import React, { useState } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from "axios";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { Link } from "react-router-dom";

function Cover() {
  const [error, setError] = useState();
  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    password: "",
    rePassword: "",
    gender: "MALE", // Default değeri belirleyebilirsiniz
  });

  function formOnChange(e) {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  }

  function handleSignup(e) {
    e.preventDefault();

    const { email, username, password, rePassword, taxNumber, companyName, gender } = userInfo;

    axios
      .post(
        "http://localhost:7071/api/v1/auth/register_with_rabbitmqguset",
        {
          email,
          username,
          password,
          rePassword,
          gender,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Kayıt başarılı:", response.data);
      })
      .catch((error) => {
        setError("Kayıt hatalı");
        console.error("İstek hatası:", error);
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
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <form onSubmit={handleSignup}>
            {error && <div style={{ color: "red", fontFamily: "monospace" }}>{error}</div>}
            <MDBox mb={2}>
              <MDInput
                type="text"
                name="username"
                placeholder="Kullanıcı Adı"
                onChange={formOnChange}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                name="email"
                placeholder="Email"
                onChange={formOnChange}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                name="password"
                placeholder="Şifre"
                onChange={formOnChange}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                name="rePassword"
                placeholder="Şifreyi Tekrar Girin"
                onChange={formOnChange}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <select
                name="gender"
                onChange={formOnChange}
                value={userInfo.gender} // Seçili değeri göstermek için value ekleyin
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </MDBox>
            <MDBox mt={4} mb={1}></MDBox>
            <MDButton type="submit" variant="gradient" color="info" fullWidth>
              Kayıt Ol
            </MDButton>
          </form>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;