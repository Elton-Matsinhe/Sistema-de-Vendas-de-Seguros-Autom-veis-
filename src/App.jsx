// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

import Login from "./components/Login/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Clientes from "./pages/Clientes";
import Seguros from "./pages/Seguros";
import Agentes from "./pages/Agentes";
import Veiculos from "./pages/Veiculos";
import Pagamentos from "./pages/Pagamentos";
import Relatorios from "./pages/Relatorios";
import Settings from "./pages/Settings";

function AppRoutes() {
  const { usuario, carregando } = useContext(AuthContext);

  if (carregando) return <p>Carregando...</p>;

  return (
    <Routes>
      {usuario ? (
        <>
          <Route path="/imperial/dashboard" element={<Dashboard />}>
            <Route path="home" element={<Home />} />
            <Route path="clientes" element={<Clientes />} />
            <Route path="seguros" element={<Seguros />} />
            <Route path="agentes" element={<Agentes />} />
            <Route path="veiculos" element={<Veiculos />} />
            <Route path="pagamentos" element={<Pagamentos />} />
            <Route path="relatorios" element={<Relatorios />} />
            <Route path="settings" element={<Settings />} />
            {/* Se quiser logout pode implementar a rota para isso */}
          </Route>
          <Route path="*" element={<Navigate to="/imperial/dashboard/home" replace />} />
        </>
      ) : (
        <>
          <Route path="/imperial/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/imperial/login" replace />} />
        </>
      )}
    </Routes>
  );
}

export default AppRoutes;
