import { useState, useEffect, useRef } from 'react';
import { 
  FiSettings, FiUser, FiLock, FiBell, FiMoon, FiSun,
  FiWifi, FiDatabase, FiCreditCard, FiGlobe, FiBarChart2,
  FiCheck, FiX, FiChevronDown, FiSave, FiRefreshCw
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Switch from 'react-switch';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(false);
  const [privacyLevel, setPrivacyLevel] = useState(70);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const settingsRef = useRef(null);

  // Efeito para animação de entrada
  useEffect(() => {
    const timer = setTimeout(() => {
      if (settingsRef.current) {
        settingsRef.current.style.opacity = 1;
        settingsRef.current.style.transform = 'translateY(0)';
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Simular salvamento
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }, 1500);
  };

  // Alternar seção expandida
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Configurações de animação
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className={`settings-container ${darkMode ? 'dark-mode' : ''}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      ref={settingsRef}
    >
      <div className="settings-header">
        <div className="header-content">
          <FiSettings className="settings-icon" />
          <h1>Configurações do Sistema</h1>
          <div className="header-actions">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`save-btn ${isSaving ? 'saving' : ''}`}
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <FiRefreshCw className="spin" /> Salvando...
                </>
              ) : (
                <>
                  <FiSave /> Salvar Alterações
                </>
              )}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {saveSuccess && (
            <motion.div
              className="save-success"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <FiCheck /> Configurações salvas com sucesso!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="settings-layout">
        <div className="settings-sidebar">
          <motion.div 
            className={`sidebar-item ${activeTab === 'account' ? 'active' : ''}`}
            whileHover={{ x: 5 }}
            onClick={() => setActiveTab('account')}
          >
            <FiUser /> Conta
          </motion.div>
          <motion.div 
            className={`sidebar-item ${activeTab === 'security' ? 'active' : ''}`}
            whileHover={{ x: 5 }}
            onClick={() => setActiveTab('security')}
          >
            <FiLock /> Segurança
          </motion.div>
          <motion.div 
            className={`sidebar-item ${activeTab === 'notifications' ? 'active' : ''}`}
            whileHover={{ x: 5 }}
            onClick={() => setActiveTab('notifications')}
          >
            <FiBell /> Notificações
          </motion.div>
          <motion.div 
            className={`sidebar-item ${activeTab === 'appearance' ? 'active' : ''}`}
            whileHover={{ x: 5 }}
            onClick={() => setActiveTab('appearance')}
          >
            {darkMode ? <FiMoon /> : <FiSun />} Aparência
          </motion.div>
          <motion.div 
            className={`sidebar-item ${activeTab === 'network' ? 'active' : ''}`}
            whileHover={{ x: 5 }}
            onClick={() => setActiveTab('network')}
          >
            <FiWifi /> Rede
          </motion.div>
          <motion.div 
            className={`sidebar-item ${activeTab === 'data' ? 'active' : ''}`}
            whileHover={{ x: 5 }}
            onClick={() => setActiveTab('data')}
          >
            <FiDatabase /> Dados
          </motion.div>
        </div>

        <div className="settings-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="tab-content"
            >
              {activeTab === 'account' && (
                <div className="account-settings">
                  <motion.div variants={itemVariants} className="setting-section">
                    <div className="section-header" onClick={() => toggleSection('profile')}>
                      <h2>Perfil do Usuário</h2>
                      <FiChevronDown className={`expand-icon ${expandedSection === 'profile' ? 'expanded' : ''}`} />
                    </div>
                    <AnimatePresence>
                      {expandedSection === 'profile' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="section-content"
                        >
                          <div className="form-group">
                            <label>Nome Completo</label>
                            <input type="text" placeholder="Digite seu nome" />
                          </div>
                          <div className="form-group">
                            <label>Email</label>
                            <input type="email" placeholder="seu@email.com" />
                          </div>
                          <div className="form-group">
                            <label>Foto de Perfil</label>
                            <div className="avatar-upload">
                              <div className="avatar-preview"></div>
                              <button className="upload-btn">Alterar Foto</button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div variants={itemVariants} className="setting-section">
                    <div className="section-header" onClick={() => toggleSection('preferences')}>
                      <h2>Preferências</h2>
                      <FiChevronDown className={`expand-icon ${expandedSection === 'preferences' ? 'expanded' : ''}`} />
                    </div>
                    <AnimatePresence>
                      {expandedSection === 'preferences' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="section-content"
                        >
                          <div className="toggle-item">
                            <div className="toggle-label">
                              <span>Idioma Automático</span>
                              <span className="toggle-description">Detectar idioma com base na localização</span>
                            </div>
                            <Switch
                              checked={autoSave}
                              onChange={setAutoSave}
                              onColor="#4CAF50"
                              offColor="#dddddd"
                              checkedIcon={false}
                              uncheckedIcon={false}
                              height={24}
                              width={48}
                            />
                          </div>
                          <div className="toggle-item">
                            <div className="toggle-label">
                              <span>Modo de Economia de Dados</span>
                              <span className="toggle-description">Reduzir uso de dados em redes móveis</span>
                            </div>
                            <Switch
                              checked={!autoSave}
                              onChange={() => setAutoSave(!autoSave)}
                              onColor="#4CAF50"
                              offColor="#dddddd"
                              checkedIcon={false}
                              uncheckedIcon={false}
                              height={24}
                              width={48}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="appearance-settings">
                  <motion.div variants={itemVariants} className="setting-section">
                    <div className="section-header" onClick={() => toggleSection('theme')}>
                      <h2>Tema</h2>
                      <FiChevronDown className={`expand-icon ${expandedSection === 'theme' ? 'expanded' : ''}`} />
                    </div>
                    <AnimatePresence>
                      {expandedSection === 'theme' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="section-content"
                        >
                          <div className="toggle-item">
                            <div className="toggle-label">
                              <span>Modo Escuro</span>
                              <span className="toggle-description">Ativar interface em cores escuras</span>
                            </div>
                            <Switch
                              checked={darkMode}
                              onChange={setDarkMode}
                              onColor="#3498db"
                              offColor="#dddddd"
                              checkedIcon={<FiMoon className="switch-icon" />}
                              uncheckedIcon={<FiSun className="switch-icon" />}
                              height={24}
                              width={48}
                            />
                          </div>

                          <div className="theme-colors">
                            <h3>Cores do Tema</h3>
                            <div className="color-options">
                              {['#3498db', '#e74c3c', '#2ecc71', '#9b59b6', '#f39c12'].map(color => (
                                <motion.div
                                  key={color}
                                  className="color-option"
                                  style={{ backgroundColor: color }}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div variants={itemVariants} className="setting-section">
                    <div className="section-header" onClick={() => toggleSection('display')}>
                      <h2>Exibição</h2>
                      <FiChevronDown className={`expand-icon ${expandedSection === 'display' ? 'expanded' : ''}`} />
                    </div>
                    <AnimatePresence>
                      {expandedSection === 'display' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="section-content"
                        >
                          <div className="slider-item">
                            <label>Tamanho da Fonte</label>
                            <Slider
                              min={12}
                              max={24}
                              defaultValue={16}
                              trackStyle={{ backgroundColor: '#3498db' }}
                              handleStyle={{
                                borderColor: '#3498db',
                                backgroundColor: '#fff',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                              }}
                            />
                            <div className="slider-values">
                              <span>Pequeno</span>
                              <span>Grande</span>
                            </div>
                          </div>

                          <div className="slider-item">
                            <label>Densidade da Interface</label>
                            <Slider
                              min={1}
                              max={3}
                              defaultValue={2}
                              marks={{ 1: 'Compacto', 2: 'Padrão', 3: 'Espaçado' }}
                              trackStyle={{ backgroundColor: '#3498db' }}
                              handleStyle={{
                                borderColor: '#3498db',
                                backgroundColor: '#fff',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                              }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              )}

              {/* Outras abas podem ser adicionadas aqui */}
              {activeTab !== 'account' && activeTab !== 'appearance' && (
                <div className="coming-soon">
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="soon-content"
                  >
                    <h2>Configurações de {activeTab}</h2>
                    <p>Esta seção está em desenvolvimento e estará disponível em breve.</p>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                      className="gear-icon"
                    >
                      <FiSettings />
                    </motion.div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;