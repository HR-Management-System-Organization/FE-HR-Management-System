/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* HR Management System React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

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

export default function data() {
  const [data, setData] = useState(null);
  const token = String(localStorage.getItem("Authorization"));

  useEffect(() => {
    Axios.post(
      // 34.173.81.212x
      "http://34.173.81.212/user/findallguestbycompanymanager",
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
  console.log(data);
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
        Employee: <Author image={team2} name={author.username} email={author.email} />,
        function: <Job title={author.role} description={author.description} />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={author.status} variant="gradient" size="sm" />
          </MDBox>
        ),
        gender: (
          <MDTypography component="b" href="#" variant="caption" color="text" fontWeight="medium">
            {author.gender}
          </MDTypography>
        ),
        Maas: (
          <MDTypography component="b" href="#" variant="caption" color="text" fontWeight="medium">
            {author.totalAnnualLeave}
          </MDTypography>
        ),
        Maasduzenle: (
          <MDTypography component="b" href="#" variant="caption" color="text" fontWeight="medium">
            {author.totalAnnualLeave}
          </MDTypography>
        ),
        Active: <button onClick={() => handleEdit(author.id)}>Onayla</button>,
      }))
    : [];

  return {
    columns: [
      { Header: "Employee", accessor: "Employee", width: "45%", align: "left" },
      { Header: "function", accessor: "function", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "Gender", accessor: "gender", align: "center" },
      { Header: "Maas", accessor: "Maas", align: "center" },
      { Header: "Maasduzenle", accessor: "Maasduzenle", align: "center" },
      { Header: "Active", accessor: "Active", align: "center" },
    ],

    rows: rows,
  };
}
