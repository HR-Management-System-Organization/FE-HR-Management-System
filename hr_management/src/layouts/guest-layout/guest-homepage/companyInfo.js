import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

function CompanyInfo() {
  const { companyId } = useParams();
  const [companyInfo, setCompanyInfo] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchCompanyInfo() {
      try {
        const response = await axios.get(
          `http://34.173.81.212/company/findbycompanyid/${companyId}`
        );
        setCompanyInfo(response.data);
      } catch (error) {
        console.error("Şirket bilgileri alınırken hata oluştu:", error);
      }
    }

    async function fetchUsers(userId) {
      try {
        const response = await axios.get(`http://34.173.81.212/user/find_by_id/${userId}`);
        return response.data;
      } catch (error) {
        console.error("Kullanıcı bilgileri alınırken hata oluştu:", error);
        return null;
      }
    }

    async function getComments() {
      try {
        const response = await axios.get(
          `http://34.173.81.212/comment/commentbycompanyid?companyId=${companyId}`
        );
        const commentsWithUsers = await Promise.all(
          response.data.map(async (comment) => {
            const user = await fetchUsers(comment.userId);
            return { ...comment, user };
          })
        );
        setComments(commentsWithUsers);
      } catch (error) {
        console.error("Yorum bilgileri alınırken hata oluştu:", error);
      }
    }

    fetchCompanyInfo();
    getComments();
  }, [companyId]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="success"
        mx={2.5}
        mt={2}
        p={4}
        mb={1}
        textAlign="center"
      >
        <MDTypography color="white">{companyInfo.companyName}</MDTypography>
      </MDBox>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="basit tablo">
          <TableHead>
            {companyInfo.companyCountry && (
              <TableRow>
                <TableCell align="left">Country: {companyInfo.companyCountry}</TableCell>
              </TableRow>
            )}
            {companyInfo.companyProvince && (
              <TableRow>
                <TableCell align="left">City: {companyInfo.companyProvince}</TableCell>
              </TableRow>
            )}
            {companyInfo.companyMail && (
              <TableRow>
                <TableCell align="left">Email: {companyInfo.companyMail}</TableCell>
              </TableRow>
            )}
            {companyInfo.companyPhone && (
              <TableRow>
                <TableCell align="left">Phone: {companyInfo.companyPhone}</TableCell>
              </TableRow>
            )}
            {companyInfo.sector && (
              <TableRow>
                <TableCell align="left">Sector: {companyInfo.sector}</TableCell>
              </TableRow>
            )}
            {companyInfo.description && (
              <TableRow>
                <TableCell align="left">Description: {companyInfo.description}</TableCell>
              </TableRow>
            )}
            {companyInfo.companyDistrict && (
              <TableRow>
                <TableCell align="left">District: {companyInfo.companyDistrict}</TableCell>
              </TableRow>
            )}
            {companyInfo.companyNeighbourhood && (
              <TableRow>
                <TableCell align="left">Neighborhood: {companyInfo.companyNeighbourhood}</TableCell>
              </TableRow>
            )}
            {companyInfo.taxNumber && (
              <TableRow>
                <TableCell align="left">Tax Number: {companyInfo.taxNumber}</TableCell>
              </TableRow>
            )}
            {companyInfo.companyBuildingNumber && companyInfo.companyApartmentNumber && (
              <TableRow>
                <TableCell align="left">
                  Adress: {companyInfo.companyBuildingNumber} / {companyInfo.companyApartmentNumber}
                </TableCell>
              </TableRow>
            )}
          </TableHead>
        </Table>
      </TableContainer>
      <br />
      <h2>Comments:</h2>
      <br />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comments.map((comment, index) => (
              <TableRow key={index}>
                <TableCell>
                  <MDTypography
                    color="info"
                    variant="h5"
                    fontWeight="bold"
                    fontFamily="sherif"
                    margin="25px"
                  >
                    {comment.user ? comment.user.name : "Unknown User"}
                  </MDTypography>
                </TableCell>
                <TableCell align="left">
                  <MDTypography
                    color="success"
                    textAlign="left"
                    variant="h6"
                    fontWeight="light"
                    fontFamily="monospace"
                    margin="20px"
                  >
                    {comment.comment}
                  </MDTypography>
                </TableCell>
                {/* Diğer yorum özelliklerini buraya ekleyebilirsin */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Footer />
    </DashboardLayout>
  );
}

export default CompanyInfo;
