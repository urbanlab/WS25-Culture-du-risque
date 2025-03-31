import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ControlRoom from "./ControlRoom/ControlRoom.jsx";
import PanicRoom from "./PanicRoom/PanicRoom.jsx";
import { BrowserRouter, Route, Routes } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/control-room" element={<ControlRoom />} />
        <Route path="/panic-room" element={<PanicRoom />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
