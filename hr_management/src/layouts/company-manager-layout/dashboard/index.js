import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Chart from "chart.js/auto";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDButton from "components/MDButton";

function MyCompany() {
  const storedToken = localStorage.getItem("Authorization");
  const [userInfo, setUserInfo] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  const chartRef3 = useRef(null);
  const chartRef4 = useRef(null);

  async function user() {
    const decodedToken = jwtDecode(storedToken);
    if (storedToken) {
      try {
        const response = await axios.get(`http://localhost/user/find_by_id/${decodedToken.myId}`);
        return response.data;
      } catch (error) {
        console.error("An error occurred while trying to retrieve user information:", error);
      }
    }
  }

  async function company(companyId) {
    try {
      const response = await axios.get(`http://localhost/company/findbycompanyid2/${companyId}`);
      return response.data;
    } catch (error) {
      console.error("company error", error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const userInfo = await user();

      if (userInfo) {
        setUserInfo(userInfo);
        const companyInfo = await company(userInfo.companyId);

        if (companyInfo) {
          setCompanyInfo(companyInfo);
          updateChart(companyInfo);
          updateChart1(companyInfo);
          updateChart2(companyInfo);
          updateChart3(companyInfo);
          console.log(companyInfo);
        }
      }

      setIsLoading(false);
    }

    fetchData();
  }, []);

  const updateChart = (companyInfo) => {
    const ctx = chartRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
          {
            label: "Expense (TL)",
            data: [
              companyInfo.totalincome1,
              companyInfo.totalincome2,
              companyInfo.totalincome3,
              companyInfo.totalincome4,
            ],
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            fill: false,
          },
        ],
      },
    });
  };
  const updateChart2 = (companyInfo) => {
    const ctx = chartRef3.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
          {
            label: "Expense (TL)",
            data: [
              companyInfo.totalexpense1,
              companyInfo.totalexpense2,
              companyInfo.totalexpense3,
              companyInfo.totalexpense4,
            ],
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            fill: false,
          },
        ],
      },
    });
  };
  const updateChart1 = (companyInfo) => {
    const ctx1 = chartRef2.current.getContext("2d");
    const chart1 = new Chart(ctx1, {
      type: "pie",
      data: {
        labels: ["Total Expense", "Total Income"],
        datasets: [
          {
            label: "Expenses by Category",
            data: [companyInfo.totalexpense, companyInfo.totalincome],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          },
        ],
      },
    });
  };
  const updateChart3 = (companyInfo) => {
    const ctx3 = chartRef4.current.getContext("2d");
    const chart3 = new Chart(ctx3, {
      type: "bar",
      data: {
        labels: ["Montly Expense", "Total Expense", "Montly Income", "Total Income"],
        datasets: [
          {
            label: "Monthly and Total Expense Income Statement",
            data: [
              companyInfo.montlytotalexpense,
              companyInfo.totalexpense,
              companyInfo.montlytotalincome,
              companyInfo.totalincome,
            ],
            backgroundColor: ["#28A745", "#DC3545", "#FFCE56"],
          },
        ],
      },
    });
  };

  return (
    <DashboardLayout
      sx={{
        backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
          `${linearGradient(
            rgba(gradients.info.main, 0.6),
            rgba(gradients.info.state, 0.6)
          )}, url(${bgImage})`,
        backgroundPositionY: "50%",
      }}
    >
      <div
        style={{
          width: "50%",
          height: "calc(100vh - 64px)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridGap: "1rem",
          placeItems: "center",
        }}
      >
        <div style={{ height: "100%", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Income Chart</h2>
          <canvas ref={chartRef} />
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Total Income-Expense Chart</h2>
          <canvas ref={chartRef2} />
        </div>

        <div style={{ height: "100%", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Expense Chart</h2>
          <canvas ref={chartRef3} style={{ padding: "60px" }} />
          <canvas ref={chartRef4} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default MyCompany;
