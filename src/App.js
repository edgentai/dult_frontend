// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Link, Outlet, Route, useRoutes, useNavigate, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { RecoilRoot } from "recoil";
import Home from "./pages/Home/Home";
import Team from "./pages/Team";
import { login, logout } from "./mockData/fakeApi";

function App() {
  const [theme, colorMode] = useMode();
  const routes = useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Home />,
    },
    {
      path: "/team",
      element: <Team />,
    },
  ]);

  return (
    <>
      <RecoilRoot>
        <ColorModeContext.Provider value={colorMode}>
          {/* <ThemeProvider theme={theme}> */}
          <div>{routes}</div>
          {/* </ThemeProvider> */}
        </ColorModeContext.Provider>
      </RecoilRoot>
    </>
  );
}

export default App;
