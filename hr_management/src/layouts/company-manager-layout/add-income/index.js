import { useState, useEffect } from "react";
import { TextField, Select, MenuItem, Button } from "@mui/material";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import Axios from "axios";
import jwtDecode from "jwt-decode";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function MyForm() {
  const [reason, setReason] = useState("");
  const [income, setIncome] = useState("");
  const [incomeType, setIncomeType] = useState("Rate");
  const [incomeDate, setIncomeDate] = useState("");
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    async function fetchUserInfo() {
      const storedToken = localStorage.getItem("Authorization");

      if (storedToken) {
        const decodedToken = jwtDecode(storedToken);
        try {
          const response = await axios.get(`http://localhost/user/find_by_id/${decodedToken.myId}`);
          setUserInfo(response.data);
        } catch (error) {
          console.error("Kullanıcı bilgilerini alırken bir hata oluştu:", error);
        }
      }
    }

    fetchUserInfo();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl = `http://localhost:7073/api/v1/company/addincome?&sebep=${reason}&companyid=${userInfo.companyId}&gelir=${income}&gelirtur=${incomeType}&gelirtarihi=${incomeDate}&id=${userInfo.id}&name=${userInfo.name}&surname=${userInfo.surName}`;

    Axios.post(apiUrl)
      .then((response) => {
        // Handle the response, e.g., display a success message
        window.location.reload();
      })
      .catch((error) => {
        let errorMessage = error.response.data.message;
        console.error("Request failed", error);
        setError(errorMessage);
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={{ textAlign: "center" }}>
        <h2>Add Income</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Income Explanation"
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            fullWidth
          />
          <br />
          <br />
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              label="Income Price"
              id="income"
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
            <CurrencyLiraIcon style={{ marginLeft: "5px" }} fontSize="small">
              receipt_long
            </CurrencyLiraIcon>
          </div>
          <br />
          <p style={{ display: "flex", alignItems: "center" }}>Income Type</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <br></br>
            <Select
              label="Income Type"
              id="incomeType"
              value={incomeType}
              onChange={(e) => setIncomeType(e.target.value)}
            >
              <MenuItem value="Fixed Income">Fixed Income</MenuItem>
              <MenuItem value="Selling Income">Selling Income</MenuItem>
              <MenuItem value="Rate">Interest Income</MenuItem>
            </Select>
          </div>
          <br />
          <p style={{ display: "flex", alignItems: "center" }}>Income date</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              label=""
              id="incomeDate"
              type="date"
              value={incomeDate}
              onChange={(e) => setIncomeDate(e.target.value)}
              center
            />
          </div>
          <br />
          {error && <div style={{ color: "red" }}>{error}</div>}
          <Button
            style={{ display: "flex", alignItems: "center" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Save Income
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default MyForm;
