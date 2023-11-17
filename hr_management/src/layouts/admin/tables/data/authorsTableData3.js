/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
 * HR Management System React - v2.2.0
 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2023 Creative Tim (https://www.creative-tim.com)
 * Coded by www.creative-tim.com
 */

// HR Management System React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import DoneIcon from "@mui/icons-material/Done";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function CommentTable() {
  const [data, setData] = useState(null);
  const token = String(localStorage.getItem("Authorization"));

  const handleEdit = (commentId) => {
    console.log("Comment ID to accept:", commentId, " ", typeof commentId);

    if (commentId !== null) {
      Axios.post(
        `http://34.173.81.212/comment/activationbyadmin?commentId=${commentId}`,
        { token },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => {
          // Filter out the accepted comment from the data state
          setData((prevData) => prevData.filter((comment) => comment.commentId !== commentId));
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error accepting data:", error);
        });
    } else {
      console.error("commentId is null. Cannot send the request.");
    }
  };

  const handleEdit2 = (commentId) => {
    console.log("Comment ID to delete:", commentId, " ", typeof commentId);

    if (commentId !== null) {
      Axios.post(
        `http://34.173.81.212/comment/deletebyadmin?commentId=${commentId}`,
        { token },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => {
          // Filter out the deleted comment from the data state
          setData((prevData) => prevData.filter((comment) => comment.commentId !== commentId));
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
        });
    } else {
      console.error("commentId is null. Cannot send the request.");
    }
  };

  useEffect(() => {
    Axios.post(
      "http://34.173.81.212/comment/findallbyadminpending",
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
    ? data.map((comment, index) => ({
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={comment.ecommentStatus} variant="gradient" size="sm" />
          </MDBox>
        ),
        Comment: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {comment.comment}
          </MDTypography>
        ),
        Active: (
          <MDButton color="success" onClick={() => handleEdit(comment.commentId)}>
            Accept
          </MDButton>
        ),
        Delete: (
          <MDButton color="error" onClick={() => handleEdit2(comment.commentId)}>
            Delete
          </MDButton>
        ),
      }))
    : [];

  return {
    columns: [
      { Header: "status", accessor: "status", align: "center" },
      { Header: "Comment", accessor: "Comment", align: "center" },
      { Header: "Active", accessor: "Active", align: "center" },
      { Header: "Delete", accessor: "Delete", align: "center" },
    ],

    rows: rows,
  };
}
