import MDTypography from "components/MDTypography";
import Table from "examples/Tables/Table";

import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Avatar } from "@mui/material";
import MDAvatar from "components/MDAvatar";
import burceMars from "assets/images/bruce-mars.jpg";

function EmployeeTableData() {
  const storedToken = localStorage.getItem("Authorization");
  const [employeeInfo, setEmployeeInfo] = useState([]);

  const handleImageError = () => {
    // Burce Mars fotoğrafını yükleme hatası durumunda kullan
    setProfileImage(burceMars);
  };

  const [profileImage, setProfileImage] = useState("http://34.173.81.212/user/images/");

  useEffect(() => {
    if (storedToken) {
      const decodedToken = jwt_decode(storedToken);

      axios
        .get(`http://34.173.81.212/user/get-company-employees/${decodedToken.id}`)
        .then((response) => {
          console.log("response data is...", response.data);

          const returningEmployees = response.data.map(
            (emp) => (
              console.log(profileImage + emp.authid),
              {
                avatar: (
                  <MDAvatar
                    src={"http://34.173.81.212/user/images/" + emp.authid} //getImage metotundan dönen image profil fotosu olarak yazdırılıyor
                    alt="profile-image"
                    size="l"
                    shadow="sm"
                    onError={handleImageError}
                  />
                ),
                name: (
                  <MDTypography variant="caption" color="secondary" fontWeight="medium">
                    {emp.name} {emp.surname}
                  </MDTypography>
                ),
                email: (
                  <MDTypography variant="caption" color="secondary" fontWeight="medium">
                    {emp.companyEmail}
                  </MDTypography>
                ),
                phone: (
                  <MDTypography variant="caption" color="secondary" fontWeight="medium">
                    {emp.phone}
                  </MDTypography>
                ),
                address: (
                  <MDTypography variant="caption" color="secondary" fontWeight="medium">
                    {emp.address}
                  </MDTypography>
                ),
                info: (
                  <MDTypography variant="caption" color="secondary" fontWeight="medium">
                    {emp.info}
                  </MDTypography>
                ),
                birthday: (
                  <MDTypography variant="caption" color="secondary" fontWeight="medium">
                    {emp.birthday}
                  </MDTypography>
                ),
              }
            )
          );

          console.log("returning employees array is... ", returningEmployees);

          setEmployeeInfo(returningEmployees);
        })
        .catch((error) => {
          console.error("An error occured while trying to retrieve employee information: ", error);
        });
    }
  }, [storedToken]);

  const employeeTableData = {
    columns: [
      { name: "avatar", align: "center" },
      { name: "name", align: "center" },
      { name: "email", align: "center" },
      { name: "phone", align: "center" },
      { name: "address", align: "center" },
      { name: "info", align: "center" },
      { name: "birthday", align: "center" },
    ],

    rows: employeeInfo,
  };

  return <Table columns={employeeTableData.columns} rows={employeeTableData.rows} />;
}

export default EmployeeTableData;
