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
    route: "/company_manager/dashboard",
    component: <Billing />,
    visibleRoles: ["COMPANY_MANAGER"],
  },
  {
    type: "route",
    name: "Notifications",
    key: "employee-notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "employee/notifications",
    component: <Notifications />,
    visibleRoles: ["EMPLOYEE"],
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
];

export default routes;
