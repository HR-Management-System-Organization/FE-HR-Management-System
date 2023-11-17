import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import { Button, Stack, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import AccountBoxTwoToneIcon from "@mui/icons-material/AccountBoxTwoTone";
import MDButton from "components/MDButton";
import Axios from "axios"; // Axios kütüphanesini ekledik

function GuestInfoCard({ title, description, info, social, action }) {
  // Local Storage'dan token'ı al
  const storedToken = localStorage.getItem("Authorization");

  // Renk ve tipografi bilgilerini al
  const { socialMediaColors } = colors;
  const { size } = typography;

  // Token'ı çözümle (decode) et
  const decodedToken = jwt_decode(storedToken);

  // State'leri tanımla
  const [editMode, setEditMode] = useState(false);
  const [editedInfo, setEditedInfo] = useState({ ...info });

  // Bilgiyi güncelleme işlemi için kullanıcı ID'si
  const [userid, setUserId] = useState("");

  // Sayfa yüklendiğinde bilgileri güncelle
  useEffect(() => {
    setEditedInfo({ ...info });
  }, [info]);

  // Input değişikliklerini takip et
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo({
      ...editedInfo,
      [name]: value,
    });
  };

  // Edit modunu kontrol et
  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  // Edit işlemini iptal et
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedInfo({
      ...info,
    });
  };

  // Bilgiyi API'ye gönder ve güncelle
  const handleSubmit = () => {
    console.log(editedInfo);
    const apiUrl =
      "http://34.173.81.212/user/updateemployee?id=" +
      decodedToken.myId +
      "&email=" +
      editedInfo.personalEmail +
      "&phone=" +
      editedInfo.phone +
      "&name=" +
      editedInfo.name +
      "&surName=" +
      editedInfo.surname;
    // Axios ile güncelleme işlemini gerçekleştir
    Axios.put(apiUrl)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Çalışan verileri alınırken hata oluştu:", error);
      });
  };

  // Icon'a göre uygun icon'u al
  const getIcon = (label) => {
    switch (label) {
      case "address":
        return <LocationOnIcon />;
      case "phone":
        return <PhoneIcon />;
      case "personal email":
        return <EmailIcon />;
      case "name":
        return <AccountCircleTwoToneIcon />;
      case "surname":
        return <AccountBoxTwoToneIcon />;
      default:
        return null;
    }
  };

  // Bilgi alanlarını render et
  const renderItems = Object.keys(info).map((label, index) => (
    <MDBox key={label} display="flex" py={2} pr={2} alignItems="center" marginLeft="-40px">
      <MDBox
        sx={{
          position: "absolute",
          left: "30px",
          transform: "translateY(-50%)",
          color: "success",
          fontSize: "1.5rem",
          marginTop: "1px",
        }}
      >
        <MDTypography color="light">{getIcon(label)}</MDTypography>
      </MDBox>

      <MDTypography
        variant="button"
        fontWeight="bold"
        textTransform="capitalize"
        sx={{ fontSize: "0.9rem", paddingLeft: "30px", marginTop: "-1px" }}
      >
        {editMode ? "" : `${label}:`}
      </MDTypography>
      <MDTypography
        variant="button"
        fontWeight="regular"
        color="text"
        textTransform="capitalize"
        width="400px"
      >
        {editMode ? (
          <React.Fragment>
            <TextField
              label={label}
              name={label}
              value={editedInfo[label]}
              onChange={handleFieldChange}
              fullWidth
              variant="outlined"
              sx={{
                fontSize: "0.9rem",
                backgroundColor: "#f0f0f0",
                marginTop: "1px",
                marginLeft: "5px",
                border: "1px solid #ced4da",
                borderRadius: "4px",
              }}
              InputProps={{
                style: {
                  paddingTop: "4px",
                  paddingBottom: "4px",
                  paddingLeft: "5px",
                  pointerEvents: label === "personal email" && "none",
                },
              }}
              InputLabelProps={{
                sx: {
                  fontSize: "0.9rem",
                  display: "block",
                  marginTop: "-8px",
                },
              }}
            />
          </React.Fragment>
        ) : (
          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            sx={{ fontSize: "0.9rem", paddingLeft: "10px" }}
          >
            {info[label]}
          </MDTypography>
        )}
      </MDTypography>
    </MDBox>
  ));

  // Sosyal medya ikonlarını render et
  const renderSocial = social.map(({ link, icon, color }) => (
    <MDBox
      key={color}
      component="a"
      href={link}
      target="_blank"
      rel="noreferrer"
      fontSize={size.lg}
      color={socialMediaColors[color].main}
      pr={1}
      pl={0.5}
      lineHeight={1}
    >
      {icon}
    </MDBox>
  ));

  return (
    <Card
      sx={{
        width: "400px",
        backgroundColor: "#f8f9fa",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        border: "1px solid #e0e0e0",
        padding: "20px",
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
            <MDTypography variant="h4" fontWeight="bold" textTransform="capitalize">
              {title}
            </MDTypography>

            <MDTypography component={Link} to={action.route} variant="body2" color="secondary">
              <Tooltip title={action.tooltip} placement="top">
                <Stack direction="row">
                  <MDButton
                    size="small"
                    color="info"
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={handleEditClick} // Düzeltilen kısım
                    sx={{ p: "8px 16px", fontSize: "0.75rem" }}
                  >
                    Düzenle
                  </MDButton>
                </Stack>
              </Tooltip>
            </MDTypography>
          </MDBox>
        </Grid>
        <Grid item xs={12}>
          <MDBox p={2}>
            <MDBox mb={2} lineHeight={1}>
              <MDTypography variant="h6" color="text" fontWeight="bold">
                {description}
              </MDTypography>
            </MDBox>

            <MDBox width="300px" ml={2}>
              {editMode ? (
                <form>
                  {renderItems}
                  <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
                    <MDButton
                      variant="contained"
                      onClick={handleSubmit}
                      color="success"
                      sx={{
                        mt: 2,
                        mx: "auto",
                        p: "8px 16px",
                        fontSize: "0.75rem",
                      }}
                    >
                      Kaydet
                    </MDButton>
                    <MDButton
                      variant="contained"
                      onClick={handleCancelEdit}
                      color="error"
                      sx={{
                        mt: 2,
                        mx: "auto",
                        p: "8px 16px",
                        fontSize: "0.75rem",
                      }}
                    >
                      İptal
                    </MDButton>
                  </Stack>
                </form>
              ) : (
                renderItems
              )}
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </Card>
  );
}

// Props tiplerini belirt
GuestInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  social: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
};

export default GuestInfoCard;
