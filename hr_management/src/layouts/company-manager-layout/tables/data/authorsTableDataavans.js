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
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";

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

  const handleEdit2 = (authorId) => {
    console.log("Author ID to edit:", authorId, " ", typeof authorId);
    if (authorId !== null) {
      Axios.post(
        `http://localhost:7072/api/v1/user/deleteavansrequestbycompanymanager?authorId=${authorId}`,
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
    } else {
      console.error("authorId is null. Cannot send the request.");
    }
  };

  const handleEdit = (authorId) => {
    console.log("Author ID to edit:", authorId, " ", typeof authorId);
    if (authorId !== null) {
      Axios.post(
        `http://localhost:7072/api/v1/user/activeavansrequestbycompanymanager?authorId=${authorId}`,
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
    } else {
      console.error("authorId is null. Cannot send the request.");
    }
  };

  useEffect(() => {
    Axios.post(
      "http://localhost:7072/api/v1/user/findallavansrequesbycompanymanager",
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
        Reason: <MDBox ml={-1}>{author.nedeni}</MDBox>,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={author.status} variant="gradient" size="sm" />
          </MDBox>
        ),

        Avans: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {author.avanstalebi}{" "}
            <CurrencyLiraIcon style={{ marginLeft: "5px" }} fontSize="small">
              receipt_long
            </CurrencyLiraIcon>
          </MDTypography>
        ),
        Salary: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {author.maas}
          </MDTypography>
        ),
        Date: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {formatDate(author.avanstarihi)}
          </MDTypography>
        ),

        Active: <button onClick={() => handleEdit(author.id)}>Accept</button>,
        Delete: <button onClick={() => handleEdit2(author.id)}>Reject</button>,
      }))
    : [];

  return {
    columns: [
      { Header: "Employee", accessor: "Employee", width: "15%", align: "left" },
      { Header: "Reason", accessor: "Reason", align: "left" },
      { Header: "status", accessor: "status", align: "center" },

      {
        Header: "Avans",
        accessor: "Avans",
        align: "center",
      },
      { Header: "Salary", accessor: "Salary", align: "center" },
      { Header: "Date", accessor: "Date", align: "center" },

      { Header: "Active", accessor: "Active", align: "center" },
      { Header: "Delete", accessor: "Delete", align: "center" },
    ],
    rows: rows,
  };
}
