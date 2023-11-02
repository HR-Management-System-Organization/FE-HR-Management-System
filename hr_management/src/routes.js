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
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import GSignUp from "layouts/authentication/gsign-up";
import ActivationFailed from "layouts/authentication/activation-failed";
import Activation from "layouts/authentication/activation";
import UserNotification from "layouts/user-layout/notifications";
import Overview from "layouts/profile";
import UserDashboard from "layouts/user-layout/dashboard";
import AddNewComment from "layouts/user-layout/add-new-comment";
import MyCompany from "layouts/user-layout/my-company";
import ManagerDashboard from "layouts/company-manager-layout/dashboard";
import ManagerEmplyees from "layouts/company-manager-layout/employees";
import ManagerMyCompany from "layouts/company-manager-layout/my-company";
import ManagerTables from "layouts/company-manager-layout/tables";
import Logout from "layouts/authentication/logout";

import GuestDashboard from "layouts/guest-layout/dashboard";
import GuestTables from "layouts/guest-layout/tables";
import GuestNotifications from "layouts/guest-layout/notifications";

import AdminDashboard from "layouts/admin/dashboard";
import AdminTables from "layouts/admin/tables";
import AdminBilling from "layouts/admin/billing";
import AdminNotifications from "layouts/admin/notifications";
import AdminProfile from "layouts/admin/profile";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "route",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "employee/dashboard",
    component: <UserDashboard />,
    visibleRoles: ["EMPLOYEE"],
  },
  {
    type: "route",
    name: "Comments",
    key: "user-dashboard",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "employee/comment",
    component: <AddNewComment />,
    visibleRoles: ["EMPLOYEE"],
  },
  {
    type: "route",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/manager/billing",
    component: <Billing />,
    visibleRoles: ["COMPANY_MANAGER"],
  },

  {
    type: "route",
    name: "My Company",
    key: "myCompany",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
    visibleRoles: [],
  },
  {
    type: "route",
    name: "My Company",
    key: "sign-in",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/employee/company",
    component: <MyCompany />,
    visibleRoles: ["EMPLOYEE"],
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
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "guest/dashboard",
    component: <GuestDashboard />,
    visibleRoles: ["GUEST"],
  },
  {
    type: "route",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "guest/tables",
    component: <GuestTables />,
    visibleRoles: ["GUEST"],
  },
  {
    type: "route",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "guest/notifications",
    component: <GuestNotifications />,
    visibleRoles: ["GUEST"],
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
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "manager/dashboard",
    component: <ManagerDashboard />,
    visibleRoles: ["COMPANY_MANAGER"],
  },
  {
    type: "route",
    name: "Employees",
    key: "employees",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "manager/employees",
    component: <ManagerEmplyees />,
    visibleRoles: ["COMPANY_MANAGER"],
  },
  {
    type: "route",
    name: "My Company",
    key: "sign-in",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/manager/company",
    component: <ManagerMyCompany />,
    visibleRoles: ["COMPANY_MANAGER"],
  },
  {
    type: "route",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "manager/tables",
    component: <ManagerTables />,
    visibleRoles: ["COMPANY_MANAGER"],
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
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "admin/tables",
    component: <AdminTables />,
    visibleRoles: ["ADMIN"],
  },
  {
    type: "route",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "admin/billing",
    component: <AdminBilling />,
    visibleRoles: ["ADMIN"],
  },
  {
    type: "route",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "admin/notifications",
    component: <AdminNotifications />,
    visibleRoles: ["ADMIN"],
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
    name: "Admindashboard",
    key: "admindashboard",
    icon: <Icon fontSize="large">assignment</Icon>,
    route: "/admin/dashboard",
    component: <AdminDashboard />,
    visibleRoles: ["ADMIN"],
  },
  {
    type: "admin",
    name: "LOGOUT",
    key: "logout",
    icon: <Icon fontSize="large">assignment</Icon>,
    route: "/authentication/logout",
    component: <Logout />,
    visibleRoles: ["ADMIN", "COMPANY_MANAGER", "GUEST", "EMPLOYEE"],
  },
];

export default routes;