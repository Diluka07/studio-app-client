import React from "react";
const Dashboard = React.lazy(() => import("../Dashboard"));

const routes = [
  {
    path: "/user-dashboard",
    name: "Dashboard",
    exact: true,
    component: Dashboard,
  },
  //   {
  //     path: "/user-dashboard/forms/:id",
  //     name: "FormContainer",
  //     component: FormContainer,
  //     exact: true,
  //   },
];
export default routes;
