import React, { useState } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import axios from "axios";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { BrowserRouter, Link } from "react-router-dom";

function ActivationFailed() {
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="error"
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
              color="success"
              mt={12}
            >
              Aktivasyon İşlemi Başarısız
            </MDTypography>
          </div>
        </MDBox>
        <MDBox textAlign="center" pt={4} pb={3} px={3}>
          <form>
            <MDBox textAlign="center" mb={2} justifyContent="center"></MDBox>
            <MDBox mt={-5} mb={1}>
              <MDButton type="submit" variant="gradient" color="warning" fullWidth>
                <Link to="/authentication/gsign-up">Kayıt Ol</Link>
              </MDButton>
            </MDBox>
          </form>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default ActivationFailed;
