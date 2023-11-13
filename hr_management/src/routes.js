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

/** 
  All of the routes for the HR Management System React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// HR Management System React layouts
import Activation from "layouts/authentication/activation";
import ActivationFailed from "layouts/authentication/activation-failed";
import GSignUp from "layouts/authentication/gsign-up";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Billing from "layouts/billing";
import Overview from "layouts/profile";
import UserDashboard from "layouts/user-layout/dashboard";
import MyCompany from "layouts/user-layout/my-company";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import Logout from "layouts/authentication/logout";
import AddNewEmployee from "layouts/company-manager-layout/add-new-employee";
import ManagerDashboard from "layouts/company-manager-layout/dashboard";

import ManagerMyCompany from "layouts/company-manager-layout/my-company";
import ManagerTables from "layouts/company-manager-layout/tables";
import CompanyBilling from "layouts/company-manager-layout/billing";
import GuestHomepage from "layouts/guest-layout/guest-homepage";
import GuestNotifications from "layouts/guest-layout/notifications";
import GuestTables from "layouts/guest-layout/tables";

import AdminBilling from "layouts/admin/billing";
import AdminDashboard from "layouts/admin/dashboard";
import AdminNotifications from "layouts/admin/notifications";
import AdminProfile from "layouts/admin/profile";
import AdminTables from "layouts/admin/tables";
import Comment from "layouts/user-layout/add-new-comment";
import Leaverequest from "layouts/user-layout/leaverequest";
import Company from "layouts/company";

import Addsalary from "layouts/company-manager-layout/add-sallary/tables";
import Addincome from "layouts/company-manager-layout/add-income";
import Addexpense from "layouts/company-manager-layout/add-expense";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "route",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "manager/dashboard",
    component: <ManagerDashboard />,
    visibleRoles: ["COMPANY_MANAGER"],
  },
  {
    type: "route",
    name: "Comments",
    key: "user-dashboard",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "employee/comment",
    component: <Comment />,
    visibleRoles: ["EMPLOYEE"],
  },
  {
    type: "route",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/manager/billing",
    component: <CompanyBilling />,
    visibleRoles: ["COMPANY_MANAGER"],
  },
  {
    type: "route",
    name: "Add Employee",
    key: "addEmployee",
    icon: <PersonAddIcon fontSize="medium">person</PersonAddIcon>,
    route: "/manager/addEmployee",
    component: <AddNewEmployee />,
    visibleRoles: ["COMPANY_MANAGER"],
  },
  {
    type: "route",
    name: "My Company",
    key: "sign-in",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
    visibleRoles: [],
  },
  {
    type: "route",
    name: "My Company",
    key: "myCompany",
    icon: <ApartmentIcon fontSize="small">person</ApartmentIcon>,
    route: "/employee/company",
    component: <MyCompany />,
    visibleRoles: ["EMPLOYEE"],
  },

  {
    type: "route",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
    visibleRoles: [""],
  },
  {
    type: "route",
    name: "Sign Up",
    key: "gsign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/gsign-up",
    component: <GSignUp />,
    visibleRoles: [""],
  },

  {
    type: "route",
    name: "",
    key: "activation",
    icon: <Icon fontSize="large">assignment</Icon>,
    route: "/authentication/activation",
    component: <Activation />,
    visibleRoles: [""],
  },
  {
    type: "route",
    name: "",
    key: "activation-failed",
    icon: "",
    route: "/authentication/activation-failed",
    component: <ActivationFailed />,
    visibleRoles: [""],
  },
  {
    type: "route",
    name: "Home",
    key: "homepage",
    icon: <Icon fontSize="medium">home</Icon>,
    route: "guest/homepage",
    component: <GuestHomepage />,
    visibleRoles: ["GUEST"],
  },

  {
    type: "route",
    name: "My Company",
    key: "sign-in",
    icon: <ApartmentIcon fontSize="small">person</ApartmentIcon>,
    route: "/manager/company",
    component: <ManagerMyCompany />,
    visibleRoles: ["COMPANY_MANAGER"],
  },
  {
    type: "route",
    name: "Employees",
    key: "tables",
    icon: <PeopleIcon fontSize="medium">table_view</PeopleIcon>,
    route: "manager/tables",
    component: <ManagerTables />,
    visibleRoles: ["COMPANY_MANAGER"],
  },

  {
    type: "route",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "admin/tables",
    component: <AdminTables />,
    visibleRoles: ["ADMIN"],
  },
  // {
  //   type: "route",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "admin/billing",
  //   component: <AdminBilling />,
  //   visibleRoles: ["ADMIN"],
  // },

  {
    type: "route",
    name: "Request",
    key: "request",
    icon: <Icon fontSize="medium">person</Icon>,
    route: "/employee/request",
    component: <Leaverequest />,
    visibleRoles: ["EMPLOYEE"],
  },
  {
    type: "route",
    name: "Add Income",
    key: "addincome",
    icon: <AttachMoneyIcon fontSize="medium">attachmoney</AttachMoneyIcon>,
    route: "manager/addincome",
    component: <Addincome />,
    visibleRoles: ["COMPANY_MANAGER", "EMPLOYEE"],
  },
  {
    type: "route",
    name: "companys_page",
    key: "companys_page",
    icon: "",
    route: "/companys_page",
    component: <Company />,
    visibleRoles: [""],
  },
  {
    type: "route",
    name: "companys_page",
    key: "companys_page",
    icon: "",
    route: "company/findbycompanyid/:companyId",
    component: <Company />,
    visibleRoles: [""],
  },
  {
    type: "route",
    name: "Add Salary",
    key: "employees",
    icon: <PriceChangeIcon fontSize="medium">dashboard</PriceChangeIcon>,
    route: "manager/employees",
    component: <Addsalary />,
    visibleRoles: ["COMPANY_MANAGER"],
  },
  {
    type: "route",
    name: "Add Expense",
    key: "expense",
    icon: <PriceChangeIcon fontSize="medium">dashboard</PriceChangeIcon>,
    route: "manager/addexpense",
    component: <Addexpense />,
    visibleRoles: ["COMPANY_MANAGER", "EMPLOYEE"],
  },
  {
    type: "route",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "employee/profile",
    component: <Overview />,
    visibleRoles: ["EMPLOYEE"],
  },
  {
    type: "route",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "guest/profile",
    component: <Overview />,
    visibleRoles: ["GUEST"],
  },
  {
    type: "route",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "manager/profile",
    component: <Overview />,
    visibleRoles: ["COMPANY_MANAGER"],
  },
  {
    type: "route",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "admin/profile",
    component: <AdminProfile />,
    visibleRoles: ["ADMIN"],
  },
  {
    type: "admin",
    name: "Log Out",
    key: "logout",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/logout",
    component: <Logout />,
    visibleRoles: ["ADMIN", "COMPANY_MANAGER", "GUEST", "EMPLOYEE"],
  },
];

export default routes;
