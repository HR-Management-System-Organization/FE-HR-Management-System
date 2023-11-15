import React from "react";
import { Box, Card, ListItem, ListItemButton, ListItemText, List, Button } from "@mui/material";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import MDTypography from "components/MDTypography";

function WelcomePage() {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/authentication/sign-up");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "#d5ead8",
        height: "100vh",
        width: "100vw",
        background: `url(${process.env.PUBLIC_URL}/background.jpeg) center/cover fixed`,
      }}
    >
      {/* manager (sol) taraf */}
      <Box
        sx={{
          width: "60%",
        }}
      >
        <MDButton
          sx={{
            marginBottom: 5,
            alignSelf: "right",
            marginTop: 3,
            color: "white",
            width: 300,
          }}
          color="info"
          onClick={() => {
            navigate("/authentication/sign-in");
          }}
        >
          Sign in
        </MDButton>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            paddingLeft: 5,
          }}
        >
          <Card
            sx={{
              display: "flex",
              width: "30%",
              height: 650,
              cursor: "pointer",
              gap: 5,
              background: "#a8d7df",
            }}
            onClick={handleCardClick}
          >
            <MDTypography variant="h2" color="dark" marginTop="50px">
              30 Days
            </MDTypography>
            <MDTypography>599 ₺</MDTypography>
            <MDTypography variant="h5">Benefits</MDTypography>
            <List
              sx={{
                paddingLeft: 3,
                display: "flex",
                gap: 2,
                flexDirection: "column",
                fontFamily: "monospace",
              }}
            >
              <ListItem>
                <ListItemText sx={{ fontFamily: "monospace" }}>Mentor</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Simple Usage</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>24/7 Help</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>View All Companies</ListItemText>
              </ListItem>
            </List>
          </Card>
          <Card
            sx={{
              display: "flex",
              width: "30%",
              height: 650,
              cursor: "pointer",
              gap: 5,
              background: "#83c6d2",
            }}
            onClick={handleCardClick}
          >
            <MDTypography variant="h2" color="dark" marginTop="50px">
              60 Days
            </MDTypography>
            <MDTypography>999 ₺</MDTypography>
            <MDTypography variant="h5">Benefits</MDTypography>
            <List sx={{ paddingLeft: 3, display: "flex", gap: 2, flexDirection: "column" }}>
              <ListItem>
                <ListItemText>Mentor</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Simple Usage</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>24/7 Help</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>View All Companies</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Subscription</ListItemText>
              </ListItem>
            </List>
          </Card>
          <Card
            sx={{
              display: "flex",
              width: "30%",
              height: 650,
              cursor: "pointer",
              gap: 5,
              background: "#2098ae",
            }}
            onClick={handleCardClick}
          >
            <MDTypography variant="h2" color="dark" marginTop="50px">
              90 Days
            </MDTypography>
            <MDTypography>1299 ₺</MDTypography>
            <MDTypography variant="h5">Benefits</MDTypography>
            <List
              sx={{
                paddingLeft: 3,
                display: "flex",
                gap: 2,
                flexDirection: "column",
              }}
            >
              <ListItem>
                <ListItemText>Mentor</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Simple Usage</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>24/7 Help</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>View All Companies</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Subscription</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Premium User</ListItemText>
              </ListItem>
            </List>
          </Card>
        </Box>
      </Box>
      {/* guest (sağ) taraf */}
      <Box sx={{ width: "40%", textAlign: "center" }}>
        <MDTypography variant="h5" color="light" sx={{ marginBottom: 3 }}>
          You can register as a guest and get basic informations about companies.
        </MDTypography>
        <MDButton
          sx={{ marginRight: 2, width: 200 }}
          color="info"
          onClick={() => {
            navigate("/authentication/sign-in");
          }}
        >
          Sign in
        </MDButton>
        <MDButton
          sx={{ marginRight: 2, width: 200 }}
          color="secondary"
          onClick={() => {
            navigate("/authentication/gsign-up");
          }}
        >
          Sign up
        </MDButton>
      </Box>
    </Box>
  );
}

export default WelcomePage;
