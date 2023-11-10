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
  const handleEdit = (authorId) => {
    console.log("Author ID to edit:", authorId, " ", typeof authorId); // Add this line for debugging
    // Burada POST isteğinizi göndermek için Axios veya başka bir HTTP istemci kullanabilirsiniz,
    if (authorId !== null) {
      Axios.post(
        "http://localhost:7072/api/v1/user/activationbyadmin?authorId=" + authorId,
        null, // Boş bir body, çünkü veriyi parametre olarak gönderiyoruz
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

        .then((response) => {
          // İsteğiniz başarıyla tamamlandığında yapılması gereken işlemler
        })
        .catch((error) => {
          console.error("Error editing data:", error);
        });
    } else {
      console.error("authorId is null. Cannot send the request.");
    }
  };
  const handleEdit2 = (authorId) => {
    console.log("Author ID to edit:", authorId, " ", typeof authorId); // Add this line for debugging
    // Burada POST isteğinizi göndermek için Axios veya başka bir HTTP istemci kullanabilirsiniz,
    if (authorId !== null) {
      Axios.post(
        "http://localhost:7072/api/v1/user/deletebyadmin?authorId=" + authorId,
        null, // Boş bir body, çünkü veriyi parametre olarak gönderiyoruz
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

        .then((response) => {
          // İsteğiniz başarıyla tamamlandığında yapılması gereken işlemler
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
      "http://localhost:7072/api/v1/user/findallbyadminpending",
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
        author: <Author image={team2} name={author.username} email={author.email} />,
        function: <Job title={author.role} description={author.description} />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={author.status} variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {author.createDate}
          </MDTypography>
        ),
        Active: <button onClick={() => handleEdit(author.id)}>Accept</button>,
        Delete: <button onClick={() => handleEdit2(author.id)}>Delete</button>,
      }))
    : [];

  return {
    columns: [
      { Header: "author", accessor: "author", width: "45%", align: "left" },
      { Header: "function", accessor: "function", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "employed", accessor: "employed", align: "center" },
      { Header: "Active", accessor: "Active", align: "center" },
      { Header: "Delete", accessor: "Delete", align: "center" },
    ],

    rows: rows,
  };
}
