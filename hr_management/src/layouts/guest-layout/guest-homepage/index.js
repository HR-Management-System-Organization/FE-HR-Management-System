import {
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
} from "@mui/material";
import contained from "assets/theme-dark/components/button/contained";
import axios from "axios";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

function GuestHomepage() {
  const storedToken = localStorage.getItem("Authorization");
  const [userInfo, setUserInfo] = useState({});
  const [companyList, setCompanyList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate(); // useNavigate fonksiyonunu ekleyin

  async function getGuest() {
    const decodedToken = jwtDecode(storedToken);
    if (storedToken) {
      try {
        const response = await axios.get(`http://localhost/user/find_by_id/${decodedToken.myId}`);
        return response.data;
      } catch (error) {
        console.error("Kullanıcı bilgileri alınırken hata oluştu:", error);
        return null;
      }
    }
    return null;
  }

  async function getCompanies() {
    if (storedToken) {
      try {
        const response = await axios.get("http://localhost/company/findall");
        return response.data;
      } catch (error) {
        console.error("Şirket bilgileri alınırken hata oluştu:", error);
        return null;
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
  }, [storedToken]);

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
          Welcome {userInfo.name}
        </MDTypography>
      </MDBox>
      <Card>
        <CardMedia
          sx={{ height: 450 }}
          image={`${process.env.PUBLIC_URL}/indir.jpeg`}
          title="company"
        />
      </Card>

      <MDTypography variant="h6" fontWeight="light" fontFamily="monospace" margin="25px">
        We act with the ideology of constantly improving in order to provide you with the best
        service.
        <br />
        <MDTypography variant="text" fontWeight="medium" paddingTop="150px">
          You can see the company names below. Just click on the{" "}
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
          button next to the company you want to be interested in and get more information about.
        </MDTypography>
      </MDTypography>
      <MDBox>
        <MDTypography display="block" variant="h4" color="dark" my={4}>
          Company List:
        </MDTypography>
      </MDBox>

      <MDBox pr={1} sx={{}}>
        <MDInput
          sx={{ width: 350, paddingBottom: 5 }}
          label="Search"
          value={searchQuery}
          onChange={handleSearch}
        />
      </MDBox>
      <MDBox sx={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {filteredData.map((row) => (
          <Card
            key={row.companyId}
            sx={{ width: 350, maxHeight: "%100", display: "flex", gap: 5, cursor: "pointer" }}
            onClick={() => {
              navigate(`/company/${row.companyId}`);
            }}
          >
            <CardMedia
              sx={{ height: 250, cursor: "pointer" }}
              image={`${process.env.PUBLIC_URL}/pxfuel.jpg`}
              title="company"
            />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 5,
                textAlign: "center",
              }}
            >
              <MDTypography variant="h3" color="primary">
                {row.companyName}
              </MDTypography>
              <MDTypography variant="h5" color="secondary">
                {row.companyCountry} / {row.companyProvince}
              </MDTypography>
              <MDButton
                color="warning"
                onClick={() => {
                  navigate(`/company/${row.companyId}`);
                }}
              >
                INFO
              </MDButton>
            </CardContent>
          </Card>
        ))}
      </MDBox>

      {/* <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="basit tablo">
          <TableHead
            sx={{
              backgroundColor: "#f5f5f5",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <TableCell padding="center">Company Name</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Location
            </TableCell>
            <TableCell align="center">Info</TableCell>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow
                key={row.companyName}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "0,25px solid",
                }}
              >
                <TableCell align="center">{row.companyName}</TableCell>
                <TableCell align="center">
                  {row.companyCountry} / {row.companyProvince}
                </TableCell>
                <TableCell align="center">
                  <MDButton
                    color="warning"
                    onClick={() => {
                      navigate(`/company/${row.companyId}`);
                    }}
                  >
                    INFO
                  </MDButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      <Footer />
    </DashboardLayout>
  );
}

export default GuestHomepage;
