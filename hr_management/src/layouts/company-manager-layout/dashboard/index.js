import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Chart from "chart.js/auto";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function MyCompany() {
  const bgImage = ""; // Replace with your background image

  const storedToken = localStorage.getItem("Authorization");
  const [userInfo, setUserInfo] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const chartRef = useRef({ chart: null });
  const chartRef2 = useRef({ chart: null });
  const chartRef3 = useRef({ chart: null });
  const chartRef4 = useRef({ chart: null });

  async function user() {
    const decodedToken = jwtDecode(storedToken);
    if (storedToken) {
      try {
        const response = await axios.get(
          `http://34.173.81.212/user/find_by_id/${decodedToken.myId}`
        );
        return response.data;
      } catch (error) {
        console.error("Kullanıcı bilgileri alınırken bir hata oluştu:", error);
      }
    }
  }

  async function company(companyId) {
    try {
      const response = await axios.get(
        `http://34.173.81.212/company/findbycompanyid2/${companyId}`
      );
      return response.data;
    } catch (error) {
      console.error("Şirket bilgisi alınırken bir hata oluştu:", error);
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
          updateChart(companyInfo, chartRef);
          updateChart1(companyInfo, chartRef2);
          updateChart2(companyInfo, chartRef3);
          updateChart3(companyInfo, chartRef4);
          console.log(companyInfo);
        }
      }

      setIsLoading(false);
    }

    fetchData();
  }, []);

  const updateChart = (companyInfo, chartRef) => {
    const ctx = chartRef.current.getContext("2d");

    // Eğer varsa mevcut Chart örneğini yok et
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    chartRef.current.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Hafta 1", "Hafta 2", "Hafta 3", "Hafta 4"],
        datasets: [
          {
            label: "Gider (TL)",
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

  const updateChart2 = (companyInfo, chartRef) => {
    const ctx = chartRef.current.getContext("2d");

    // Eğer varsa mevcut Chart örneğini yok et
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    chartRef.current.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Hafta 1", "Hafta 2", "Hafta 3", "Hafta 4"],
        datasets: [
          {
            label: "Gider (TL)",
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

  const updateChart1 = (companyInfo, chartRef) => {
    const ctx1 = chartRef.current.getContext("2d");

    // Eğer varsa mevcut Chart örneğini yok et
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    chartRef.current.chart = new Chart(ctx1, {
      type: "pie",
      data: {
        labels: ["Toplam Gider", "Toplam Gelir"],
        datasets: [
          {
            label: "Kategoriye Göre Giderler",
            data: [companyInfo.totalexpense, companyInfo.totalincome],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          },
        ],
      },
    });
  };

  const updateChart3 = (companyInfo, chartRef) => {
    const ctx3 = chartRef.current.getContext("2d");

    // Eğer varsa mevcut Chart örneğini yok et
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    chartRef.current.chart = new Chart(ctx3, {
      type: "bar",
      data: {
        labels: ["Aylık Gider", "Toplam Gider", "Aylık Gelir", "Toplam Gelir"],
        datasets: [
          {
            label: "Aylık ve Toplam Gider Gelir Tablosu",
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
      <DashboardNavbar />
      <div
        style={{
          width: "50%",
          // height: "calc(100vh - 64px)",
          display: "flex",
          gridTemplateColumns: "1fr 1fr",
          gridGap: "1rem",
          placeItems: "center",
          flexDirection: "column",
          maxWidth: "100vw",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div style={{ height: "100%", margin: "0 auto", width: "750px", paddingBottom: "55px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Gelir Grafiği</h2>
          <canvas ref={chartRef} style={{ width: "100%" }} />
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", marginTop: "100px" }}>
            Toplam Gelir-Gider Grafiği
          </h2>
          <canvas ref={chartRef2} style={{ width: "100%" }} />
        </div>

        <div style={{ height: "100%", margin: "0 auto", width: "750px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Gider Grafiği</h2>
          <canvas ref={chartRef3} style={{ width: "100%", marginTop: "100px" }} />
          <canvas ref={chartRef4} style={{ width: "100%", marginTop: "100px" }} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default MyCompany;
