import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Footer from "examples/Footer";
import { useHistory } from "react-router-dom";

function GuestHomepage() {
  const storedToken = localStorage.getItem("Authorization");
  const [userInfo, setUserInfo] = useState({});
  const [companyList, setCompanyList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  async function getGuest() {
    const decodedToken = jwtDecode(storedToken);
    if (storedToken) {
      try {
        const response = await axios.get(`http://localhost/user/find_by_id/${decodedToken.myId}`);
        return response.data;
      } catch (error) {
        console.error("Kullanıcı bilgileri alınırken hata oluştu:", error);
        return null; // Hata durumunda null döndür
      }
    }
    return null; // Boş storedToken için null döndür
  }

  async function getCompanies() {
    if (storedToken) {
      try {
        const response = await axios.get("http://localhost/company/findall"); // Endpoint URL'sini güncelle
        return response.data;
      } catch (error) {
        console.error("Şirket bilgileri alınırken hata oluştu:", error);
        return null; // Hata durumunda null döndür
      }
    }
    return null;
  }

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (Array.isArray(companyList)) {
      const filtered = companyList.filter((item) => {
        return item.companyName.toLowerCase().includes(query.toLowerCase());
      });

      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    const apiUrl = "http://localhost/company/findall";

    axios
      .get(apiUrl)
      .then((response) => {
        setCompanyList(response.data);
      })
      .catch((error) => {
        console.error("Veri alınırken hata oluştu:", error);
      });
  }, []);

  useEffect(() => {
    async function fetchData() {
      const userInfo = await getGuest();
      if (userInfo) {
        setUserInfo(userInfo);
      }
      const companyList = await getCompanies();
      if (companyList) setCompanyList(companyList);
    }
    fetchData();
  }, [storedToken]); // storedToken'ı bağımlılık olarak dahil etmeyi unutma
  // Arama sorgusuna göre verileri filtrele
  useEffect(() => {
    const filteredData = companyList.filter((item) =>
      item.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredData);
  }, [companyList, searchQuery]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        variant="gradient"
        bgColor="success"
        borderRadius="lg"
        coloredShadow="success"
        mx={2.5}
        mt={2}
        p={4}
        mb={1}
        textAlign="center"
      >
        <MDTypography variant="h5" fontWeight="light" color="light" mt={1}>
          Hoşgeldin {userInfo.name}
        </MDTypography>
      </MDBox>
      <MDTypography variant="h6" fontWeight="light" fontFamily="monospace" margin="25px">
        Size en iyi hizmeti verebilmek için sürekli daha iyiye ideolojisi ile hareket ediyoruz.
        <br />
        <MDTypography variant="text" fontWeight="medium" paddingTop="150px">
          Aşağıda şirket isimlerini görebilirsiniz. İlgilendiğiniz ve daha fazla bilgi almak
          istediğiniz şirketin yanındaki{" "}
          <span
            style={{
              color: "red",
              fontFamily: "inherit",
              fontSize: "18px",
              fontWeight: "medium",
            }}
          >
            info
          </span>{" "}
          butonuna tıklamanız yeterlidir.
        </MDTypography>
      </MDTypography>
      <MDBox>
        <MDTypography display="block" variant="h4" color="dark" my={4}>
          Şirket Listesi:
        </MDTypography>
      </MDBox>
      <MDBox pr={1}>
        <MDInput label="Buradan arama yapın" value={searchQuery} onChange={handleSearch} />
      </MDBox>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="basit tablo">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">İsim</TableCell>
              <TableCell align="center">Konum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow
                key={row.companyName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row.companyName}</TableCell>
                <TableCell align="left">
                  {row.companyCountry} / {row.companyProvince}
                </TableCell>
                <TableCell align="right">
                  <MDButton color="warning">
                    <Link to={`http://localhost/company/findbycompanyid/${row.companyId}`}>
                      Bilgi
                    </Link>
                  </MDButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Footer />
    </DashboardLayout>
  );
}

export default GuestHomepage;
{
  /*<Navigate to={`http://localhost/company/findbycompanyid/${row.companyId}`}>
                      Bilgi
</Navigate>*/
}
