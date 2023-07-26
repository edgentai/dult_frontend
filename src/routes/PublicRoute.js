import React from "react";
import { Route, Navigate } from "react-router-dom";
import { fakeIsLoggedIn } from "./fakeApi";

function PublicRoute({ path, element }) {
  if (fakeIsLoggedIn()) {
    // If user is logged in, redirect to the dashboard or any other private route
    return <Navigate to="/dashboard" replace />;
  }

  return <Route path={path} element={element} />;
}

export default PublicRoute;
