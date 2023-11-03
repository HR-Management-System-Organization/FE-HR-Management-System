import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import axios from "axios";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { BrowserRouter, Link } from "react-router-dom";
import { blue } from "@mui/material/colors";

function Logout() {
  const navigate = useNavigate(); // Fonksiyonu çağırır

  const handleLoginClick = () => {
    // "/authentication/sign-in" sayfasına yönlendirme yapar
    localStorage.removeItem("token");
    console.log(localStorage);

    navigate("/authentication/sign-in");
    window.location.reload();
  };
  useEffect(() => {
    // Sayfa yüklendiğinde çalışacak kod
    localStorage.clear(); // Authorization anahtarını sıfırlar
    console.log(localStorage);
  }, []);
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="success"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={2}
          p={1}
          mb={1}
          justifyContent="center"
          alignItems="center"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "transparent",
              justifyContent: "center",
              textAlign: "center",
              marginBottom: "120px",
            }}
          >
            <MDTypography
              alignSelf="center"
              display="flex"
              textAlign="center"
              justifyContent="center"
              variant="h1"
              fontWeight="medium"
              color="white"
              mt={12}
            >
              Cikis islemi basarili
            </MDTypography>
          </div>
        </MDBox>
        <MDBox textAlign="center" pt={4} pb={3} px={3}>
          <form>
            <MDBox textAlign="center" mb={2} justifyContent="center"></MDBox>
            <MDBox mt={-5} mb={1}>
              <MDButton
                type="button"
                variant="gradient"
                color="success"
                fullWidth
                onClick={handleLoginClick}
              >
                Giris
              </MDButton>
            </MDBox>
          </form>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Logout;
