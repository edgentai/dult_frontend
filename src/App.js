import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import LineChart from "./components/LineChart/LineChart";
import StackBarChart from "./components/StackBarChart/StackBarChart";
import Home from "./pages/Home/Home";
import React from "react";
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from "recoil";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <RecoilRoot>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {/* <CssBaseline /> */}
          <div className="app">
            {/* <Sidebar isSidebar={isSidebar} /> */}
            <main className="content">
              {/* <Topbar setIsSidebar={setIsSidebar} /> */}
              <Routes>
              
                <Route path="/" element={<Home></Home>} />
                {/* <Route path="/" element={<LineChart></LineChart>} /> */}
                <Route path="/stackBarChart" element={<StackBarChart></StackBarChart>} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </RecoilRoot>
  );
}

export default App;
