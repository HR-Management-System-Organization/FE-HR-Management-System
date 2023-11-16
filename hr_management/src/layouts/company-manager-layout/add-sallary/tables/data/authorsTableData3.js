/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

/**
 * =========================================================
 * HR Management System React - v2.2.0
 * =========================================================
 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2023 Creative Tim (https://www.creative-tim.com)
 * Coded by www.creative-tim.com
 * =========================================================
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// HR Management System React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import React, { useEffect, useState } from "react";
import Axios from "axios";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function Data() {
  const [data, setData] = useState(null);
  const token = String(localStorage.getItem("Authorization"));

  const calculateDurationInDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = Math.abs(end - start);
    const durationInDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return durationInDays;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // You can use other formatting options if needed
  };

  useEffect(() => {
    Axios.post(
      // 34.173.81.212x
      "http://34.173.81.212/user/findalloldrequesbycompanymanager",
      { token },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        const apiData = response.data;
        setData(apiData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const rows = data
    ? data.map((author, index) => ({
        Employee: <Author image={team2} name={author.username} email={""} />,
        function: <Job title={author.nedeni} description={author.managerid} />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={author.status} variant="gradient" size="sm" />
          </MDBox>
        ),
        baslangic: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {formatDate(author.izinbaslangic)}
          </MDTypography>
        ),
        izinsüresi: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {calculateDurationInDays(author.izinbaslangic, author.izinbitis)} days
          </MDTypography>
        ),
        bitis: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {formatDate(author.izinbitis)}
          </MDTypography>
        ),
      }))
    : [];

  return {
    columns: [
      { Header: "Employee", accessor: "Employee", width: "15%", align: "left" },
      { Header: "function", accessor: "function", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "baslangic", accessor: "baslangic", align: "center" },
      { Header: "izinsüresi", accessor: "izinsüresi", align: "center" },
      { Header: "bitis", accessor: "bitis", align: "center" },
    ],
    rows: rows,
  };
}
