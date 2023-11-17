import React from "react";
import { Box, Card, ListItem, ListItemButton, ListItemText, List, Button } from "@mui/material";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import MDTypography from "components/MDTypography";
import Axios from "axios";
function WelcomePage() {
  const navigate = useNavigate();
  const token = String(localStorage.getItem("Authorization"));
  const handleCardClick30 = () => {
    Axios.post(
      `http://34.173.81.212/user/activedate?p=1`,
      { token },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        // Handle the successful response here
        navigate("/authentication/sign-in");
      })
      .catch((error) => {
        console.error("Error editing data:", error);
      });
  };
  const handleCardClick60 = () => {
    Axios.post(
      `http://34.173.81.212/user/activedate?p=2`,
      { token },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        // Handle the successful response here
      })
      .catch((error) => {
        console.error("Error editing data:", error);
      });
  };
  const handleCardClick90 = () => {
    Axios.post(
      `http://34.173.81.212/user/activedate?p=3`,
      { token },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        // Handle the successful response here
      })
      .catch((error) => {
        console.error("Error editing data:", error);
      });
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
            onClick={handleCardClick30}
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
            onClick={handleCardClick60}
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
            onClick={handleCardClick90}
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
    </Box>
  );
}

export default WelcomePage;
