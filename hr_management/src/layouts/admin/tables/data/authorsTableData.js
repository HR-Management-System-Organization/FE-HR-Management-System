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

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import Modal from "@mui/material/Modal";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useHistory } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EmployeeTable() {
  const [data, setData] = useState(null);
  const token = String(localStorage.getItem("Authorization"));
  const [open, setOpen] = React.useState(false);
  const handleOpen = (id) => {
    setOpen(true);
    setuserid(id);
  };
  const handleClose = () => setOpen(false);
  const [employee, setEmployee] = useState({});
  const [name, setName] = useState("");
  const [surName, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userid, setuserid] = useState("");

  useEffect(() => {
    Axios.post(
      "http://localhost:7072/api/v1/user/findallbyadmin",
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

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleEdit = (author) => {
    const id = author.id; // Assuming you want to get the id from the clicked author
    // Navigate using the id
    navigate(`/manager/edit/${id}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Fetch the employee data from the API
    const apiUrl =
      "http://localhost:7072/api/v1/user/updateemployee?id=" +
      userid +
      "&email=" +
      email +
      "&phone=" +
      phone +
      "&name=" +
      name +
      "&surName=" +
      surName;
    Axios.put(apiUrl)
      .then((response) => {})
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });

    console.log(data);
  };
  const handleEdit2 = (authorId) => {
    console.log("Author ID to delete:", authorId, " ", typeof authorId);
    if (authorId !== null) {
      Axios.post(
        `http://localhost:7072/api/v1/user/deleteprofilebycompanymanager?authorId=${authorId}`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          // Filter out the deleted profile from the data state
          setData((prevData) => prevData.filter((author) => author.id !== authorId));
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
        });
    } else {
      console.error("authorId is null. Cannot send the request.");
    }
  };

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
        function: <Job title={author.role} description={author.name} />,
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
        KalanizinSayisi: (
          <MDTypography component="b" href="#" variant="caption" color="text" fontWeight="medium">
            {author.totalAnnualLeave}
          </MDTypography>
        ),
        edit: (
          <MDBox mt={4} mb={1}>
            <div>
              <MDButton color="success" onClick={() => handleOpen(author.id)}>
                EDIT
                <EditIcon fontSize="big" />
              </MDButton>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <MDBox sx={style}>
                  <MDInput
                    type="text"
                    placeholder="Name"
                    onChange={handleNameChange}
                    value={name}
                  />
                  <MDInput
                    type="text"
                    placeholder="Surname"
                    onChange={handleSurnameChange}
                    value={surName}
                  />
                  <MDInput
                    type="text"
                    placeholder="MAİL"
                    onChange={handleEmailChange}
                    value={email}
                  />
                  <MDInput
                    type="text"
                    placeholder="Phone"
                    onChange={handlePhoneChange}
                    value={phone}
                  />
                  <br></br>
                  <MDButton color="success" onClick={handleSubmit}>
                    Done
                    <DoneOutlineIcon fontSize="big" />
                  </MDButton>
                </MDBox>
              </Modal>
            </div>
          </MDBox>
        ),
        Delete: (
          <MDButton color="error" onClick={() => handleEdit2(author.id)}>
            Delete
          </MDButton>
        ),
      }))
    : [];

  return {
    columns: [
      { Header: "Employee", accessor: "Employee", align: "left" },
      { Header: "function", accessor: "function", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "Gender", accessor: "gender", align: "center" },

      { Header: "Edit", accessor: "edit", align: "center" },
      { Header: "Delete", accessor: "Delete", align: "center" },
    ],

    rows: rows,
  };
}
