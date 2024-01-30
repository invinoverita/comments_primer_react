import React, { useState } from "react";
import { ThemeProvider, BaseStyles, Button } from "@primer/react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PaymentPage from "./pages/PaymentPage";
import ResultPage from "./pages/ResultPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/payment/*" element={<PaymentPage />} />
        <Route path="/result/*" element={<ResultPage />} />
      </Routes>
    </>
  );
}

export default App;
