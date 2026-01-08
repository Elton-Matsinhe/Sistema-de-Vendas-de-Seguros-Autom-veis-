import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiCreditCard, FiPieChart, FiCalendar, FiRefreshCw } from 'react-icons/fi';
import './Pagamentos.css';

// Dados mockados para simulação
const pagamentosExemplo = [
  { id: 1, descricao: 'Pagamento de fornecedor', valor: 2500.00, status: 'Pendente' },
  { id: 2, descricao: 'Salário funcionários', valor: 18000.00, status: 'Pago' }
];

const Pagamentos = () => {
  const [carregando, setCarregando] = useState(true);
  const [pagamentos, setPagamentos] = useState([]);

  // Efeito para carregar dados iniciais
  useEffect(() => {
    setCarregando(true);
    setTimeout(() => {
      setPagamentos(pagamentosExemplo);
      setCarregando(false);
    }, 1200);
  }, []);

  if (carregando) {
    return (
      <div className="carregando">
        <FiRefreshCw className="icon-spin" />
        <p>Carregando dados de pagamentos...</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="coming-soon-container payment"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="coming-soon-content">
        <motion.div
          className="floating-coins"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FiDollarSign className="coin" />
          <FiDollarSign className="coin" />
          <FiDollarSign className="coin" />
        </motion.div>
        
        <div className="title-container">
          <FiCreditCard className="section-icon" />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Gestão de Pagamentos
          </motion.h1>
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="description"
        >
          Estamos trabalhando para trazer recursos avançados de gestão financeira.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="timeline"
        >
          <div className="timeline-item">
            <div className="timeline-icon">
              <FiPieChart />
            </div>
            <div className="timeline-content">
              <h3>Relatórios Financeiros</h3>
              <p>Visualização detalhada de receitas e despesas</p>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-icon">
              <FiCalendar />
            </div>
            <div className="timeline-content">
              <h3>Agendamento Automático</h3>
              <p>Pagamentos recorrentes e lembretes</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Pagamentos;