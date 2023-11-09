import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import "react-calendar/dist/Calendar.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Container, TextField } from "@mui/material";
import dayjs from "dayjs";
import { makeStyles } from "@mui/styles";
import { Password } from "@mui/icons-material";

function AddNewEmployee() {
  const storedToken = localStorage.getItem("Authorization");
  const [isEmployeeAdded, setIsEmployeeAdded] = useState(false);
  const [name, setName] = useState("");
  const [surName, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [personalEmail, setPersonalEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [info, setInfo] = useState("");
  const [avatar, setAvatar] = useState("");
  const [birthday, setBirthday] = useState("");
  const [companyname, setcompanyname] = useState("");

  const [userInfo, setUserInfo] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});
  useEffect(() => {
    async function fetchData() {
      const userInfo = await user();
      console.log("if üzeri");
      if (userInfo) {
        setUserInfo(userInfo);
        console.log(userInfo.companyId);
        const companyInfo = await company(userInfo.companyId);
        if (companyInfo) {
          setCompanyInfo(companyInfo);
        }
      }
    }
    fetchData();
  }, []);
  async function company(companyId) {
    try {
      console.log("asdad");
      const response = await axios.get(`http://localhost/company/findbycompanyid/${companyId}`);
      return response.data;
    } catch (error) {
      console.error("company error", error);
    }
  }
  async function user() {
    const decodedToken = jwt_decode(storedToken);
    if (storedToken) {
      try {
        const response = await axios.get(`http://localhost/user/find_by_id/${decodedToken.myId}`);
        return response.data;
      } catch (error) {
        console.error("An error occurred while trying to retrieve user information:", error);
      }
    }
  }

  const useStyles = makeStyles({
    root: {
      "& .MuiInputBase-root": {
        padding: 0,
        marginTop: "4px",

        "& .MuiButtonBase-root": {
          padding: 0,
          paddingLeft: 10,
          marginRight: "10px",
        },
        "& .MuiInputBase-input": {
          // padding: 15,
          paddingLeft: 11,

          height: "36px",
          width: "100%",
        },
        "& .MuiOutlinedInput-root": {
          borderRadius: "0.5rem",
        },
      },
    },
  });
  const classes = useStyles();

  const handleNameChange = (event) => {
    setName(event.target.value);
    setcompanyname(companyInfo.companyName);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePersonalEmailChange = (event) => {
    setPersonalEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleInfoChange = (event) => {
    setInfo(event.target.value);
  };
  const handleAvatarChange = (event) => {
    setAvatar(event.target.value);
  };

  const handleBirthdayChange = (date) => {
    if (date) {
      const formattedDate = dayjs(date).format("MM/DD/YYYY");
      setBirthday(formattedDate);
    } else {
      setBirthday("");
    }
  };

  const handleAddEmployeeSuccess = () => {
    setIsEmployeeAdded(true);
  };

  function handleAddNewEmployee() {
    if (storedToken) {
      const decodedToken = jwt_decode(storedToken);
      console.log(decodedToken);

      const addEmployeeCompanyDto = {
        name: name,
        surName: surName,
        username: username,
        personalEmail: personalEmail,
        password: password,
        phone: phone,
        address: address,
        info: info,
        avatar: avatar,
        birthday: birthday,
        companyname: companyname,
      };

      axios
        .post(`http://localhost:7072/api/v1/user/addEmployee`, addEmployeeCompanyDto)
        .then((response) => {
          console.log("Add employee is successfull!");
          handleAddEmployeeSuccess();
        })
        .catch((error) => {
          console.log("Add employee is failed: ", error.response.data.message);
          console.error("Add employee is failed: ", error);
        })
        .finally(() => {
          console.log("isEmployeeAdded: ", isEmployeeAdded);
        });
      setName("");
      setSurname("");
      setUsername("");
      setPersonalEmail("");
      setPassword("");
      setPhone("");
      setAddress("");
      setInfo("");
      setAvatar("");
      setBirthday("");
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mb={3}>
          <Card sx={{ width: "500px", margin: "0 auto" }}>
            <MDBox p={3} mb={1} s>
              <MDTypography variant="h5" fontWeight="medium">
                Add New Employee
              </MDTypography>
            </MDBox>

            <MDBox pt={2} pb={3} px={3}>
              <MDBox component="form" role="form">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  {/* First Column */}
                  <div style={{ flex: 1, marginRight: "16px" }}>
                    <MDBox mb={2}>
                      <MDInput
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={handleNameChange}
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={handleUsernameChange}
                      />
                    </MDBox>
                    <MDBox mb={2} width="100%">
                      <MDInput
                        placeholder="E-mail"
                        name="E-mail"
                        value={address}
                        onChange={handleAddressChange}
                      />
                    </MDBox>
                  </div>

                  {/* Second Column */}
                  <div style={{ flex: 1 }}>
                    <MDBox mb={2}>
                      <MDInput
                        placeholder="Surname"
                        name="surname"
                        value={surName}
                        onChange={handleSurnameChange}
                      />
                    </MDBox>

                    <MDBox mb={2}>
                      <PhoneInput
                        inputProps={{
                          name: "phone",
                          placeholder: "Phone Number",
                          style: {
                            width: "100%",
                            height: "38px",
                            borderRadius: "0.5rem",
                          },
                        }}
                        country={"tr"}
                        value={phone}
                        onChange={(value) => setPhone(value)}
                      />
                    </MDBox>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <MDBox mb={2}>
                        <DatePicker
                          className={classes.root}
                          value={birthday}
                          onChange={handleBirthdayChange}
                          renderInput={(props) => (
                            <TextField
                              {...props}
                              type="text"
                              InputLabelProps={{
                                shrink: value.toString(),
                              }}
                            />
                          )}
                        />
                      </MDBox>
                    </LocalizationProvider>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <MDBox mb={2} width="100%">
                    <MDInput
                      placeholder="Info"
                      name="info"
                      value={info}
                      onChange={handleInfoChange}
                    />
                  </MDBox>
                </div>
                <MDBox mt={4} mb={1}>
                  <MDButton
                    variant="gradient"
                    color="primary"
                    fullWidth
                    onClick={() => handleAddNewEmployee()}
                  >
                    Add Employee
                  </MDButton>
                </MDBox>
                <MDBox mt={2}>
                  <MDTypography color="text" fontWeight="light" fontSize="0.7em">
                    A link will be sent to employee&apos;s personal email address for verification.
                  </MDTypography>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AddNewEmployee;
