// PrivateRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { fakeIsLoggedIn } from "../mockData/fakeApi";

import Home from "../pages/Home/Home";

function PrivateRoute() {
  if (!fakeIsLoggedIn()) {
    // If user is not logged in, redirect to the login page
    return <Navigate to="/" />;
  }

  return <Home />;
}

export default PrivateRoute;
