import { useState, useEffect } from "react";
import axios from "axios"; // Axios kütüphanesini içe aktarın
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import Typography from "@mui/material/Typography";
import MDAvatar from "components/MDAvatar";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import breakpoints from "assets/theme/base/breakpoints";
import burceMars from "assets/images/bruce-mars.jpg";
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";
import MDButton from "components/MDButton";

function Header({ fullName }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const handleUpload = async () => {
    const selectedFile = await promptForFile();
    if (!selectedFile) return;

    if (selectedFile.size > 1024 * 1024) {
      alert("Dosya boyutu 1MB'tan büyük olamaz.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile); // dosyayı seçiyoruz

      const storedToken = localStorage.getItem("Authorization");
      const decodedToken = jwt_decode(storedToken);

      formData.append("userId", decodedToken.id);

      const response = await axios.post("http://localhost:7072/api/v1/user/photoUrl", formData, {
        headers: {
          "Content-Type": "multipart/form-data", //Multi part data olarak database deki metota gönderiyorum
        },
      });

      console.log("Dosya yükleme başarılı:", response.data);
      alert("Fotoğraf başarıyla değiştirildi. ID: " + decodedToken.id);
      window.location.reload(); //sayfa yenileniyor
    } catch (error) {
      console.error("Dosya yükleme hatası:", error);
      alert("Fotoğraf değiştirme sırasında bir hata oluştu.");
    }
  };

  const promptForFile = () => {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = (event) => {
        resolve(event.target.files[0]);
      };
      input.click();
    });
  };
  const handleImageError = () => {
    // Burce Mars fotoğrafını yükleme hatası durumunda kullan
    setProfileImage(burceMars);
  };
  const storedToken = localStorage.getItem("Authorization");
  const decodedToken = jwt_decode(storedToken);
  const [profileImage, setProfileImage] = useState();

  return (
    <MDBox position="relative">
      <DashboardNavbar />
      <MDBox height="220px" margin="-110px" />
      <Card
        sx={{
          py: 5,
          px: 2.5,
          boxShadow: ({ boxShadows: { md } }) => md,
        }}
      >
        <Grid
          item
          display="flex"
          justifyContent="center"
          alignContent="space-between"
          alignItems="center"
        >
          <MDBox
            display="flex"
            alignContent="space-between"
            gap="15px"
            justifyContent="center"
            alignItems="center"
          >
            <MDAvatar
              src={
                "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
              } //getImage metotundan dönen image profil fotosu olarak yazdırılıyor
              alt="profile-image"
              size="xxl"
              shadow="sm"
              onError={handleImageError}
            />
            <Typography>{fullName}</Typography>
          </MDBox>
          <MDBox sx={{ ml: "60%" }}>
            <MDButton color="warning" size="small" onClick={handleUpload}>
              Change Photo
            </MDButton>
          </MDBox>
        </Grid>
      </Card>
    </MDBox>
  );
  Header.propTypes = {
    fullName: PropTypes.string.isRequired, // fullName prop'unun bir dize olduğunu ve zorunlu olduğunu belirtiyoruz.
  };
}

export default Header;
