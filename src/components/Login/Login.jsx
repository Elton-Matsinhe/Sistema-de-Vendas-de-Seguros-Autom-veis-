import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from '../../assets/logo.png';
import "./Login.css";

const Login = () => {
  const { usuario, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeField, setActiveField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redireciona automaticamente para dashboard se já estiver logado
  useEffect(() => {
    if (usuario) {
      navigate("/imperial/dashboard/home", { replace: true });
    }
  }, [usuario, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Aqui chamamos o login do contexto que faz a chamada axios e seta usuário
      await login(username, password);

    } catch (error) {
      alert("Credenciais inválidas ou erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <motion.div 
        className="glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="logo-container">
          <motion.img 
            src={logo} 
            alt="Logotipo Imperial" 
            className="logo"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            {/* Campo Email */}
            <motion.div 
              className={`input-field ${activeField === 'username' ? 'active' : ''}`}
              whileHover={{ scale: 1.02 }}
            >
              <FaUser className="input-icon" />
              <input
                type="text"
                placeholder="E-mail"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setActiveField('username')}
                onBlur={() => setActiveField(null)}
              />
            </motion.div>

            {/* Campo Senha */}
            <motion.div 
              className={`input-field ${activeField === 'password' ? 'active' : ''}`}
              whileHover={{ scale: 1.02 }}
            >
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setActiveField('password')}
                onBlur={() => setActiveField(null)}
              />
              <motion.button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </motion.button>
            </motion.div>
          </div>

          <motion.button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Login"} <FaArrowRight />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
