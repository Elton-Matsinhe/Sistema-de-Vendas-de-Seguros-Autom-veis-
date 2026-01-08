// src/components/Sidebar.jsx
import { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { navigationLinks } from "../../data/data";
import "./Sidebar.css";
import { SidebarContext } from "../../context/sidebarContext";
import companyLogo from "../../assets/logo.png";
import { AuthContext } from "../../contexts/AuthContext";

const Sidebar = () => {
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/imperial/login");
  };

  useEffect(() => {
    setSidebarClass(isSidebarOpen ? "sidebar-change" : "");
  }, [isSidebarOpen]);

  return (
    <div className={`sidebar ${sidebarClass}`}>
      <div className="logo-container">
        <img src={companyLogo} alt="Logo da Empresa" className="company-logo" />
      </div>

      <nav className="navigation">
        <ul className="nav-list">
          {navigationLinks.map((link) => (
            <li className="nav-item" key={link.id}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                <img
                  src={link.image}
                  className="nav-link-icon"
                  alt={link.title}
                />
                <span className="nav-link-text">{link.title}</span>
              </NavLink>
            </li>
          ))}

          {/* Botão de Logout */}
          <li className="nav-item">
            <button onClick={handleLogout} className="logout-button">
              Sair
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
