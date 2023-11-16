import {
  AccountBalanceWallet as AccountBalanceWalletIcon,
  AttachMoney as AttachMoneyIcon,
  Business as BusinessIcon,
  Email as EmailIcon,
  Event as EventIcon,
  LocationOn as LocationOnIcon,
  MonetizationOn as MonetizationOnIcon,
  MoneyOff as MoneyOffIcon,
  Phone as PhoneIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";

function CompanyInformationData() {
  const storedToken = localStorage.getItem("Authorization");
  const [companyInfo, setCompanyInfo] = useState(null);

  useEffect(() => {
    if (storedToken) {
      const decodedToken = jwt_decode(storedToken);
      console.log(decodedToken);
      axios
        // 34.173.81.212x
        .get(`http://34.173.81.212/company/findbycompanyid/${decodedToken.id}`)
        .then((response) => {
          setCompanyInfo(response.data);
        })
        .catch((error) => {
          console.error("An error occurred while trying to retrieve company information: ", error);
        });
    }
  }, [storedToken]);

  const renderInformationRow = (header, information, icon) => (
    <TableRow>
      <TableCell>
        <Grid container alignItems="center">
          <Grid item>
            <IconButton size="small" color="primary">
              {icon}
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">{header}</Typography>
          </Grid>
        </Grid>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{information}</Typography>
      </TableCell>
    </TableRow>
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: 16 }}>
          <Typography variant="h6" gutterBottom align="center">
            Company Information
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                {renderInformationRow("Name", companyInfo?.companyName, <BusinessIcon />)}
                {renderInformationRow("Phone", companyInfo?.companyPhone, <PhoneIcon />)}
                {renderInformationRow("Email", companyInfo?.infoEmail, <EmailIcon />)}
                {renderInformationRow("Address", companyInfo?.companyAddress, <LocationOnIcon />)}
                {renderInformationRow(
                  "Establishment Date",
                  companyInfo?.establishmentDate,
                  <EventIcon />
                )}
                {renderInformationRow("City", companyInfo?.city, <LocationOnIcon />)}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: 16 }}>
          <Typography variant="h6" gutterBottom align="center">
            Financial Information
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                {renderInformationRow(
                  "Tax ID Number",
                  companyInfo?.taxId,
                  <AccountBalanceWalletIcon />
                )}
                {renderInformationRow("Revenue", companyInfo?.revenue, <AttachMoneyIcon />)}
                {renderInformationRow("Expense", companyInfo?.expense, <AttachMoneyIcon />)}
                {renderInformationRow("Profit", companyInfo?.profit, <MonetizationOnIcon />)}
                {renderInformationRow("Loss", companyInfo?.loss, <MoneyOffIcon />)}
                {renderInformationRow("Net Income", companyInfo?.netIncome, <TrendingUpIcon />)}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default CompanyInformationData;
