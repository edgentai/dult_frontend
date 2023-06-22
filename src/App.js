import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import StackBarChart from "./components/StackBarChart";
import Home from "./pages/Home/Home";
import Team from "./pages/Team";
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
                <Route path="/" element={<Home />} />
                <Route path="/stackBarChart" element={<StackBarChart />} />
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
