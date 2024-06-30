import { Route, Routes } from "react-router-dom";
import { ReportScreen, LoginScreen } from "../src/screns/index";

export const Rutas = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/reporte" element={<ReportScreen />} />
    </Routes>
  );
};
