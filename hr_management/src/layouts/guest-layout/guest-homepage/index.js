import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "examples/Footer";

function GuestHomepage() {
  const storedToken = localStorage.getItem("Authorization");
  const [userInfo, setUserInfo] = useState({});
  const [companyList, setCompanyList] = useState([]);

  async function getGuest() {
    const decodedToken = jwtDecode(storedToken);
    if (storedToken) {
      try {
        const response = await axios.get(`http://localhost/user/find_by_id/${decodedToken.myId}`);
        return response.data;
      } catch (error) {
        console.error("An error occurred while trying to retrieve user information:", error);
        return null; // Return null in case of an error
      }
    }
    return null; // Return null if storedToken is empty
  }

  async function getCompanies() {
    if (storedToken) {
      try {
        const response = await axios.get("http://localhost/company/findall"); // Update the endpoint URL
        return response.data;
      } catch (error) {
        console.error("An error occurred while trying to retrieve company information:", error);
        return null; // Return null in case of an error
      }
    }
    return null;
  }

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
  }, [storedToken]); // Make sure to include storedToken as a dependency

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
        Size en iyi hizmeti verebilmek için sürekli daha iyiye ideolojisi ile hareket ediyoruz.{" "}
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
          Company List:
        </MDTypography>
      </MDBox>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">Name</TableCell>
              <TableCell align="center">Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companyList.map((row) => (
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
                    <Link to={`findbycompanyid/${row.companyId}`}>Info</Link>
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
