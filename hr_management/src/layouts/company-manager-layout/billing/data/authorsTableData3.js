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
      "http://localhost/company/findalloldrequesbycompanymanager",
      { token },
      {
        headers: { "Content-Type": "application/json" },
        Authorization: `Bearer ${token}`,
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

  const rows =
    data && data instanceof Array
      ? data.map((author, index) => ({
          ExpenseType: <Author name={author.expenseType} email={""} />,

          status: (
            <MDBox ml={-1}>
              <MDBadge badgeContent={author.eexpenseStatus} variant="gradient" size="sm" />
            </MDBox>
          ),
          netAmount: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {author.netAmount}
            </MDTypography>
          ),
          tax: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {author.tax}
            </MDTypography>
          ),
          amount: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {author.amount}
            </MDTypography>
          ),
          lastpayday: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {formatDate(author.billDate)}
            </MDTypography>
          ),
        }))
      : [];

  return {
    columns: [
      { Header: "ExpenseType", accessor: "ExpenseType", width: "15%", align: "left" },

      { Header: "status", accessor: "status", align: "center" },
      { Header: "amount", accessor: "amount", align: "center" },
      { Header: "netAmount", accessor: "netAmount", align: "center" },
      { Header: "tax", accessor: "tax", align: "center" },

      { Header: "lastpayday", accessor: "lastpayday", align: "center" },
    ],
    rows: rows,
  };
}
