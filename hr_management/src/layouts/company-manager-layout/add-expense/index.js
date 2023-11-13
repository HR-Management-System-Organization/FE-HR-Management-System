import { useState, useEffect } from "react";
import { TextField, Select, MenuItem, Button } from "@mui/material";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import Axios from "axios";
import jwtDecode from "jwt-decode";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

function MyForm() {
  const [reason, setReason] = useState("");
  const [income, setIncome] = useState("");
  const [incomeType, setIncomeType] = useState("Interest Expense");
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

    const apiUrl = `http://localhost:7073/api/v1/company/addexpense?&sebep=${reason}&companyid=${userInfo.companyId}&gelir=${income}&gelirtur=${incomeType}&gelirtarihi=${incomeDate}&id=${userInfo.id}&name=${userInfo.name}&surname=${userInfo.surName}`;

    Axios.post(apiUrl)
      .then((response) => {
        // Handle the response, e.g., display a success message
      })
      .catch((error) => {
        let errorMessage = error.response.data.message;
        console.error("Request failed", error);
        setError(errorMessage);
      });
  };

  return (
    <DashboardLayout>
      <div style={{ textAlign: "center" }}>
        <h2>Add Expense</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Expense Explanation"
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            fullWidth
          />
          <br />
          <br />
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              label="Expense Price"
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
          <p style={{ display: "flex", alignItems: "center" }}>Expense Type</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <br></br>
            <Select
              label="Income Type"
              id="incomeType"
              value={incomeType}
              onChange={(e) => setIncomeType(e.target.value)}
            >
              <MenuItem value="Fixed Expense">Fixed Expense</MenuItem>
              <MenuItem value="Buying Expense">Buying Expense</MenuItem>
              <MenuItem value="Interest Expense">Interest Expense</MenuItem>
            </Select>
          </div>
          <br />
          <p style={{ display: "flex", alignItems: "center" }}>Expense date</p>
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
