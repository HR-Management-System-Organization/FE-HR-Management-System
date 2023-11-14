import React, { useState } from "react";
import holidays from "layouts/company/holiday";
import { Box, Typography, Paper, Card } from "@mui/material";

function formatDay(date) {
  return date.getDate();
}

function EmployeeHolidays() {
  const [selectedHoliday, setSelectedHoliday] = useState(null);

  const handleDayClick = (holiday) => {
    setSelectedHoliday(selectedHoliday === holiday ? null : holiday);
  };

  return (
    <Box sx={{ marginLeft: 35, marginTop: 10, maxWidth: "80%" }}>
      <Typography
        variant="h1"
        sx={{
          fontSize: 50,
          color: "red",
          textAlign: "center",
          paddingBottom: 5,
          fontFamily: "monospace",
          fontWeight: "bold",
        }}
      >
        Holidays
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {holidays.map((holiday) => (
          <Card
            key={holiday.date}
            sx={{
              height: 450,
              width: 400,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: selectedHoliday === holiday ? "#8DDBB8" : "#E1F3EB",
              cursor: "pointer",
              textAlign: "center",
              color: "white",
              gap: 1,
            }}
            onClick={() => handleDayClick(holiday)}
          >
            {selectedHoliday === holiday && (
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: 36,
                    color: "darkred",
                    fontWeight: "bold",
                    display: "flex",
                    gap: 5,
                  }}
                >
                  {holiday.name}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "sherif",
                    fontSize: 26,
                    color: "dark",
                    fontWeight: "medium",
                  }}
                >
                  {holiday.date}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "sherif",
                    fontSize: 22,
                    color: "dark",
                    fontWeight: "light",
                  }}
                >
                  {holiday.day}
                </Typography>
              </Box>
            )}
            {selectedHoliday !== holiday && (
              <Typography variant="h2" sx={{ fontFamily: "monospace" }}>
                {holiday.name}
              </Typography>
            )}
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default EmployeeHolidays;
