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
  const [incomeType, setIncomeType] = useState("Interest Expense");
  const [incomeDate, setIncomeDate] = useState("");
  const [error, setError] = useState("");
  const [expenseid, setexpenseid] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleFileUpload = (e) => {
    e.preventDefault();

    const apiUrl = `http://34.173.81.212/company/uploadpdf`;

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      Axios.post(apiUrl, formData)
        .then((response) => {
          // İşlem başarılıysa, response'dan gerekli bilgileri alabilirsiniz.
          console.log(response.data);
          window.location.reload();
          // Başka işlemler yapabilirsiniz, örneğin bir mesaj gösterme.
        })
        .catch((error) => {
          let errorMessage = error.response ? error.response.data.message : "Sunucu hatası";
          console.error("Dosya yükleme hatası", error);
          setError(errorMessage);
        });
    } else {
      console.log("Dosya seçilmedi, PDF yoksa boş bırakabilirsiniz.");
    }
  };

  useEffect(() => {
    async function fetchUserInfo() {
      const storedToken = localStorage.getItem("Authorization");

      if (storedToken) {
        const decodedToken = jwtDecode(storedToken);
        try {
          const response = await axios.get(
            `http://34.173.81.212/user/find_by_id/${decodedToken.myId}`
          );
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

    const apiUrl = `http://34.173.81.212/company/addexpense?&sebep=${reason}&companyid=${userInfo.companyId}&gelir=${income}&gelirtur=${incomeType}&gelirtarihi=${incomeDate}&id=${userInfo.id}&name=${userInfo.name}&surname=${userInfo.surName}`;

    Axios.post(apiUrl)
      .then((response) => {
        console.log(response);
        setexpenseid(response.data);
        handleFileUpload(e);
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
          <br></br>

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
          <div style={{ display: "flex", alignItems: "center" }}>
            <input type="file" onChange={handleFileChange} />
          </div>
          <br></br>
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
