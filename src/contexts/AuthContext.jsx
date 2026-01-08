// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log('Token carregado do localStorage:', token ? 'Token presente' : 'Token ausente');
      // Aqui você pode buscar dados do usuário com token
      // Exemplo (descomente se tiver rota):
      // api.get("/api/auth/me").then(res => setUsuario(res.data.user)).catch(() => setUsuario(null));
      setUsuario({ token }); // temporário, até implementar acima
    } else {
      console.log('Nenhum token encontrado no localStorage');
    }
    setCarregando(false);
  }, []);

  const login = async (email, senha) => {
    try {
      const response = await api.post("/api/auth/login", {
        email,
        senha,
      });
      console.log('Resposta do login:', response);
      const { token, tipo, nome } = response.data;

      if (!token) {
        console.error('Token não retornado pelo backend:', response.data);
        throw new Error('Token não retornado pelo backend');
      }
      
      // Salvar token no localStorage
      localStorage.setItem("token", token);
      console.log('Token salvo no localStorage:', token ? 'Token salvo' : 'Erro ao salvar');
      
      // Configurar token no axios
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log('Token configurado no axios:', api.defaults.headers.common["Authorization"] ? 'Configurado' : 'Erro na configuração');
      
      setUsuario({ tipo, nome });
    } catch (error) {
      console.error("Erro no login:", error);
      throw error; // para tratar no componente de login
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUsuario(null);
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ usuario, carregando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
