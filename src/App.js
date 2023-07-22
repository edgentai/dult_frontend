import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Home from "./pages/Home/Home";
import Team from "./pages/Team";
import LoginPage from "./pages/Login";
import { RecoilRoot } from "recoil";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <RecoilRoot>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <div className="app">
            <main className="content">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Home />} />
                <Route path="/team" element={<Team />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </RecoilRoot>
  );
}

export default App;
