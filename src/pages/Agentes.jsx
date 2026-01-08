import { useState, useEffect, useRef } from 'react';
import { 
  FaUser, FaIdCard, FaPhone, FaEye, FaSync, FaSearch,
  FaChevronLeft, FaChevronRight, FaFilter, FaUserShield,
  FaUserAlt, FaTrash, FaEdit, FaPlus, FaBirthdayCake, 
  FaGlobe, FaEnvelope, FaBriefcase, FaMapMarkerAlt, FaSave, 
  FaTimes, FaCheck, FaTimesCircle, FaUserTag, FaUserCog
} from 'react-icons/fa';
import './Agentes.css';

// =======================================================
// Dados Fictícios para Demonstração
// =======================================================

const agentesExemplo = [
  { 
    id: 1, 
    nome: 'Dario Nandje', 
    tipoDocumento: 'ID', 
    documento: '88889', 
    telefone: '842183536', 
    estado: 'Inactivo', 
    email: 'dariusnandja@gmail.com', 
    endereco: 'Bagamoyi', 
    data_nascimento: '05/07/1997', 
    nacionalidade: 'Moçambicana', 
    actividade: 'Petrol Station', 
    funcao: 'AGENT', 
    usuario: 'dariusnandja@gmail.com',
    sincronizado: 'Sincronizado'
  },
  { 
    id: 2, 
    nome: 'Antonio Zimila', 
    tipoDocumento: 'ID', 
    documento: '12356', 
    telefone: '845625067', 
    estado: 'Inactivo', 
    email: 'antonio.zimila@example.com', 
    endereco: 'Maputo', 
    data_nascimento: '15/03/1985', 
    nacionalidade: 'Moçambicana', 
    actividade: 'Comerciante', 
    funcao: 'AGENT', 
    usuario: 'antonio.zimila@example.com',
    sincronizado: 'Sincronizado'
  },
  { 
    id: 3, 
    nome: 'Yuran', 
    tipoDocumento: 'ID', 
    documento: 'chfgg', 
    telefone: '874240777', 
    estado: 'Inactivo', 
    email: 'yuran@example.com', 
    endereco: 'Beira', 
    data_nascimento: '22/11/1990', 
    nacionalidade: 'Moçambicana', 
    actividade: 'Motorista', 
    funcao: 'AGENT', 
    usuario: 'yuran@example.com',
    sincronizado: 'Sincronizado'
  },
  { 
    id: 4, 
    nome: 'Maria Silva', 
    tipoDocumento: 'Passaporte', 
    documento: 'AB123456', 
    telefone: '846758392', 
    estado: 'Activo', 
    email: 'maria.silva@example.com', 
    endereco: 'Nampula', 
    data_nascimento: '10/05/1988', 
    nacionalidade: 'Moçambicana', 
    actividade: 'Empresária', 
    funcao: 'SUPERVISOR', 
    usuario: 'maria.silva@example.com',
    sincronizado: 'Aprovado'
  },
  { 
    id: 5, 
    nome: 'Carlos Mendes', 
    tipoDocumento: 'ID', 
    documento: '554433Q', 
    telefone: '847654321', 
    estado: 'Activo', 
    email: 'carlos.mendes@example.com', 
    endereco: 'Pemba', 
    data_nascimento: '30/01/1975', 
    nacionalidade: 'Moçambicana', 
    actividade: 'Gerente', 
    funcao: 'AGENT', 
    usuario: 'carlos.mendes@example.com',
    sincronizado: 'Reprovado'
  },
  { 
    id: 6, 
    nome: 'Ana Sousa', 
    tipoDocumento: 'ID', 
    documento: '11223344L', 
    telefone: '848765432', 
    estado: 'Inactivo', 
    email: 'ana.sousa@example.com', 
    endereco: 'Quelimane', 
    data_nascimento: '12/12/1992', 
    nacionalidade: 'Moçambicana', 
    actividade: 'Professora', 
    funcao: 'AGENT', 
    usuario: 'ana.sousa@example.com',
    sincronizado: 'Sincronizado'
  },
  { 
    id: 7, 
    nome: 'João Manjate', 
    tipoDocumento: 'ID', 
    documento: '55667788M', 
    telefone: '849876543', 
    estado: 'Activo', 
    email: 'joao.manjate@example.com', 
    endereco: 'Tete', 
    data_nascimento: '05/09/1980', 
    nacionalidade: 'Moçambicana', 
    actividade: 'Agricultor', 
    funcao: 'AGENT', 
    usuario: 'joao.manjate@example.com',
    sincronizado: 'Aprovado'
  },
  { 
    id: 8, 
    nome: 'Fatima Abudo', 
    tipoDocumento: 'ID', 
    documento: '99001122N', 
    telefone: '840987654', 
    estado: 'Inactivo', 
    email: 'fatima.abudo@example.com', 
    endereco: 'Inhambane', 
    data_nascimento: '18/07/1995', 
    nacionalidade: 'Moçambicana', 
    actividade: 'Vendedora', 
    funcao: 'AGENT', 
    usuario: 'fatima.abudo@example.com',
    sincronizado: 'Sincronizado'
  },
  { 
    id: 9, 
    nome: 'Paulo Muenda', 
    tipoDocumento: 'Passaporte', 
    documento: 'CD987654', 
    telefone: '841234567', 
    estado: 'Activo', 
    email: 'paulo.muenda@example.com', 
    endereco: 'Xai-Xai', 
    data_nascimento: '25/03/1987', 
    nacionalidade: 'Moçambicana', 
    actividade: 'Pescador', 
    funcao: 'AGENT', 
    usuario: 'paulo.muenda@example.com',
    sincronizado: 'Reprovado'
  },
  { 
    id: 10, 
    nome: 'Lúcia Nhaca', 
    tipoDocumento: 'ID', 
    documento: '33445566O', 
    telefone: '842345678', 
    estado: 'Inactivo', 
    email: 'lucia.nhaca@example.com', 
    endereco: 'Chimoio', 
    data_nascimento: '08/11/1993', 
    nacionalidade: 'Moçambicana', 
    actividade: 'Costureira', 
    funcao: 'AGENT', 
    usuario: 'lucia.nhaca@example.com',
    sincronizado: 'Sincronizado'
  },
  { 
    id: 11, 
    nome: 'Rui Changana', 
    tipoDocumento: 'ID', 
    documento: '77889911P', 
    telefone: '843456789', 
    estado: 'Activo', 
    email: 'rui.changana@example.com', 
    endereco: 'Lichinga', 
    data_nascimento: '14/02/1978', 
    nacionalidade: 'Moçambicana', 
    actividade: 'Mecânico', 
    funcao: 'AGENT', 
    usuario: 'rui.changana@example.com',
    sincronizado: 'Aprovado'
  },
  { 
    id: 12, 
    nome: 'Sofia Macuacua', 
    tipoDocumento: 'ID', 
    documento: '11223344Q', 
    telefone: '844567890', 
    estado: 'Inactivo', 
    email: 'sofia.macuacua@example.com', 
    endereco: 'Matola', 
    data_nascimento: '29/06/1989', 
    nacionalidade: 'Moçambicana', 
    actividade: 'Enfermeira', 
    funcao: 'AGENT', 
    usuario: 'sofia.macuacua@example.com',
    sincronizado: 'Sincronizado'
  },
  { 
    id: 13, 
    nome: 'Hélder Massango', 
    tipoDocumento: 'Passaporte', 
    documento: 'EF654321', 
    telefone: '845678901', 
    estado: 'Activo', 
    email: 'helder.massango@example.com', 
    endereco: 'Maxixe', 
    data_nascimento: '03/10/1982', 
    nacionalidade: 'Moçambicana', 
    actividade: 'Electricista', 
    funcao: 'AGENT', 
    usuario: 'helder.massango@example.com',
    sincronizado: 'Reprovado'
  },
  { 
    id: 14, 
    nome: 'Teresa Nhantumbo', 
    tipoDocumento: 'ID', 
    documento: '55667788R', 
    telefone: '846789012', 
    estado: 'Inactivo', 
    email: 'teresa.nhantumbo@example.com', 
    endereco: 'Angoche', 
    data_nascimento: '17/04/1991', 
    nacionalidade: 'Moçambicana', 
    actividade: 'Professora', 
    funcao: 'AGENT', 
    usuario: 'teresa.nhantumbo@example.com',
    sincronizado: 'Sincronizado'
  },
  { 
    id: 15, 
    nome: 'Eduardo Sitoe', 
    tipoDocumento: 'ID', 
    documento: '99001122S', 
    telefone: '847890123', 
    estado: 'Activo', 
    email: 'eduardo.sitoe@example.com', 
    endereco: 'Montepuez', 
    data_nascimento: '22/08/1984', 
    nacionalidade: 'Moçambicana', 
    actividade: 'Agricultor', 
    funcao: 'AGENT', 
    usuario: 'eduardo.sitoe@example.com',
    sincronizado: 'Aprovado'
  },
  { 
    id: 16, 
    nome: 'Amélia Guambe', 
    tipoDocumento: 'ID', 
    documento: '33445566T', 
    telefone: '848901234', 
    estado: 'Inactivo', 
    email: 'amelia.guambe@example.com', 
    endereco: 'Mocuba', 
    data_nascimento: '09/05/1996', 
    nacionalidade: 'Moçambicana', 
    actividade: 'Estudante', 
    funcao: 'AGENT', 
    usuario: 'amelia.guambe@example.com',
    sincronizado: 'Sincronizado'
  },
  { 
    id: 17, 
    nome: 'Joaquim Duvane', 
    tipoDocumento: 'Passaporte', 
    documento: 'GH321654', 
    telefone: '849012345', 
    estado: 'Activo', 
    email: 'joaquim.duvane@example.com', 
    endereco: 'Nacala', 
    data_nascimento: '30/11/1979', 
    nacionalidade: 'Moçambicana', 
    actividade: 'Motorista', 
    funcao: 'AGENT', 
    usuario: 'joaquim.duvane@example.com',
    sincronizado: 'Reprovado'
  },
  { 
    id: 18, 
    nome: 'Cristina Matusse', 
    tipoDocumento: 'ID', 
    documento: '77889911U', 
    telefone: '840123456', 
    estado: 'Inactivo', 
    email: 'cristina.matusse@example.com', 
    endereco: 'Gurúè', 
    data_nascimento: '13/01/1986', 
    nacionalidade: 'Moçambicana', 
    actividade: 'Comerciante', 
    funcao: 'AGENT', 
    usuario: 'cristina.matusse@example.com',
    sincronizado: 'Sincronizado'
  },
  { 
    id: 19, 
    nome: 'Dionísio Cossa', 
    tipoDocumento: 'ID', 
    documento: '11223344V', 
    telefone: '841234567', 
    estado: 'Activo', 
    email: 'dionisio.cossa@example.com', 
    endereco: 'Cuamba', 
    data_nascimento: '27/09/1983', 
    nacionalidade: 'Moçambicana', 
    actividade: 'Técnico', 
    funcao: 'AGENT', 
    usuario: 'dionisio.cossa@example.com',
    sincronizado: 'Aprovado'
  },
  { 
    id: 20, 
    nome: 'Isabel Mabunda', 
    tipoDocumento: 'ID', 
    documento: '55667788W', 
    telefone: '842345678', 
    estado: 'Inactivo', 
    email: 'isabel.mabunda@example.com', 
    endereco: 'Manica', 
    data_nascimento: '04/07/1994', 
    nacionalidade: 'Moçambicana', 
    actividade: 'Secretária', 
    funcao: 'AGENT', 
    usuario: 'isabel.mabunda@example.com',
    sincronizado: 'Sincronizado'
  }
];

// =======================================================
// Componente Principal
// =======================================================

const Agentes = () => {
  // Estados do componente
  const [agentes, setAgentes] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [agenteSelecionado, setAgenteSelecionado] = useState(null);
  const [agenteEditando, setAgenteEditando] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState('info');
  const tabelaRef = useRef(null);

  // Constantes
  const itensPorPagina = 10;
  
  // Efeito para carregar dados iniciais
  useEffect(() => {
    setCarregando(true);
    setTimeout(() => {
      setAgentes(agentesExemplo);
      setCarregando(false);
    }, 1200);
  }, []);

  // Efeito para animação de entrada da tabela
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const rows = entry.target.querySelectorAll('tr');
          rows.forEach((row, index) => {
            row.style.setProperty('--row-index', index);
            row.classList.add('visible');
          });
        }
      });
    }, { threshold: 0.1 });

    if (tabelaRef.current) {
      observer.observe(tabelaRef.current);
    }

    return () => observer.disconnect();
  }, [agentes]);

  // Lógica de filtragem e paginação
  const agentesFiltrados = agentes.filter(agente =>
    Object.values(agente).some(valor =>
      String(valor).toLowerCase().includes(filtro.toLowerCase())
    )
  );
  const totalPaginas = Math.ceil(agentesFiltrados.length / itensPorPagina);
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const agentesPagina = agentesFiltrados.slice(indiceInicial, indiceInicial + itensPorPagina);

  const mudarPagina = (novaPagina) => {
    setPaginaAtual(Math.max(1, Math.min(novaPagina, totalPaginas)));
  };

  const recarregarDados = () => {
    setCarregando(true);
    setTimeout(() => {
      setAgentes([...agentesExemplo]);
      setPaginaAtual(1);
      setFiltro('');
      setCarregando(false);
    }, 800);
  };
  
  // Funções para o modal de edição
  const iniciarEdicao = (agente) => {
    setAgenteEditando({...agente});
    setAgenteSelecionado(null);
  };

  const cancelarEdicao = () => {
    setAgenteEditando(null);
  };

  const salvarEdicao = () => {
    setAgentes(agentes.map(a => 
      a.id === agenteEditando.id ? agenteEditando : a
    ));
    setAgenteEditando(null);
  };

  const handleCampoEditado = (campo, valor) => {
    setAgenteEditando({
      ...agenteEditando,
      [campo]: valor
    });
  };

  const eliminarAgente = (id) => {
    if (window.confirm('Tem certeza que deseja eliminar este agente?')) {
      setAgentes(agentes.filter(a => a.id !== id));
    }
  };

  const toggleEstadoConta = (id) => {
    setAgentes(agentes.map(a => 
      a.id === id ? { ...a, estado: a.estado === 'Activo' ? 'Inactivo' : 'Activo' } : a
    ));
  };

  const FormularioEdicao = () => (
    <div className="modal-overlay" onClick={cancelarEdicao}>
      <div className="modal-container-edicao" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <FaEdit className="icon-user" /> Editar Agente: {agenteEditando.nome}
          </h2>
          <button onClick={cancelarEdicao} className="botao-fechar">
            <FaTimes />
          </button>
        </div>

        <div className="modal-body">
          <div className="formulario-edicao">
            <div className="form-group">
              <label><FaUser /> Nome Completo *</label>
              <input 
                type="text" 
                value={agenteEditando.nome || ''} 
                onChange={(e) => handleCampoEditado('nome', e.target.value)} 
                required
              />
            </div>
            <div className="form-group">
              <label><FaBirthdayCake /> Data de Nascimento *</label>
              <input 
                type="text" 
                value={agenteEditando.data_nascimento || ''} 
                onChange={(e) => handleCampoEditado('data_nascimento', e.target.value)} 
                required
              />
            </div>
            <div className="form-group">
              <label><FaGlobe /> Nacionalidade *</label>
              <input 
                type="text" 
                value={agenteEditando.nacionalidade || ''} 
                onChange={(e) => handleCampoEditado('nacionalidade', e.target.value)} 
                required
              />
            </div>
            <div className="form-group">
              <label><FaIdCard /> Tipo Documento *</label>
              <select 
                value={agenteEditando.tipoDocumento || 'ID'} 
                onChange={(e) => handleCampoEditado('tipoDocumento', e.target.value)}
                required
              >
                <option value="ID">ID</option>
                <option value="Passaporte">Passaporte</option>
              </select>
            </div>
            <div className="form-group">
              <label><FaIdCard /> Nº Documento *</label>
              <input 
                type="text" 
                value={agenteEditando.documento || ''} 
                onChange={(e) => handleCampoEditado('documento', e.target.value)} 
                required
              />
            </div>
            <div className="form-group">
              <label><FaPhone /> Nº de Telefone *</label>
              <input 
                type="text" 
                value={agenteEditando.telefone || ''} 
                onChange={(e) => handleCampoEditado('telefone', e.target.value)} 
                required
              />
            </div>
            <div className="form-group">
              <label><FaEnvelope /> Email *</label>
              <input 
                type="email" 
                value={agenteEditando.email || ''} 
                onChange={(e) => handleCampoEditado('email', e.target.value)} 
                required
              />
            </div>
            <div className="form-group">
              <label><FaBriefcase /> Actividade *</label>
              <input 
                type="text" 
                value={agenteEditando.actividade || ''} 
                onChange={(e) => handleCampoEditado('actividade', e.target.value)} 
                required
              />
            </div>
            <div className="form-group">
              <label><FaMapMarkerAlt /> Localização *</label>
              <input 
                type="text" 
                value={agenteEditando.endereco || ''} 
                onChange={(e) => handleCampoEditado('endereco', e.target.value)} 
                required
              />
            </div>
            <div className="form-group">
              <label><FaUserTag /> Função *</label>
              <select 
                value={agenteEditando.funcao || 'AGENT'} 
                onChange={(e) => handleCampoEditado('funcao', e.target.value)}
                required
              >
                <option value="AGENT">AGENT</option>
                <option value="SUPERVISOR">SUPERVISOR</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={salvarEdicao} className="botao-primario">
            <FaSave /> Salvar Alterações
          </button>
          <button onClick={cancelarEdicao} className="botao-secundario">
            <FaTimes /> Cancelar
          </button>
        </div>
      </div>
    </div>
  );

  // Renderização do componente
  return (
    <div className="agentes-container">
      <h1 className="titulo-principal">
        <FaUserCog className="icon-titulo pulse" /> Lista de Agentes
      </h1>

      <div className="barra-ferramentas slide-in-right">
        <div className="filtro-container">
          <FaSearch className="icon-filtro" />
          <input
            type="text"
            placeholder="Filtrar agentes..."
            value={filtro}
            onChange={(e) => {
              setFiltro(e.target.value);
              setPaginaAtual(1);
            }}
            className="input-filtro"
          />
          {filtro && <FaFilter className="icon-filtro-ativo bounce" />}
        </div>

        <button 
          onClick={recarregarDados}
          className="botao-recargar"
          disabled={carregando}
        >
          <FaSync className={`icon-recargar ${carregando ? 'girando' : ''}`} />
          {carregando ? 'Carregando...' : 'Recarregar'}
        </button>
      </div>

      <div className="tabela-container" ref={tabelaRef}>
        {carregando ? (
          <div className="carregando">
            <div className="loading-wave">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="loading-bar" style={{ '--delay': i * 0.1 + 's' }}></div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <table className="tabela-agentes">
              <thead>
                <tr className="header-row">
                  <th>Sincronizado</th>
                  <th>Nome Completo</th>
                  <th>Tipo de Documento</th>
                  <th>Nº do Documento</th>
                  <th>Nº de Telefone</th>
                  <th>Minha Conta</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {agentesPagina.map((agente) => (
                  <tr 
                    key={agente.id} 
                    className={`${agente.estado === 'Activo' ? 'activo' : 'inactivo'} fade-in-row`}
                  >
                    <td>
                      <span className={`sincronizado-badge ${agente.sincronizado.toLowerCase()}`}>
                        {agente.sincronizado}
                      </span>
                    </td>
                    <td className="dado-nome">{agente.nome}</td>
                    <td className="dado-tipo">{agente.tipoDocumento}</td>
                    <td className="dado-documento">{agente.documento}</td>
                    <td className="dado-telefone">{agente.telefone}</td>
                    <td>
                      <span className={`estado-badge ${agente.estado.toLowerCase()}`}>
                        {agente.estado}
                      </span>
                    </td>
                    <td className="acoes-cell">
                      <button 
                        onClick={() => {
                          setAgenteSelecionado(agente);
                          setAbaAtiva('info');
                        }}
                        className="botao-acao"
                        title="Visualizar"
                      >
                        <FaEye className="icon-eye" />
                      </button>
                      <button 
                        onClick={() => iniciarEdicao(agente)}
                        className="botao-acao"
                        title="Editar"
                      >
                        <FaEdit className="icon-edit" />
                      </button>
                      <button 
                        onClick={() => eliminarAgente(agente.id)}
                        className="botao-acao botao-eliminar"
                        title="Eliminar"
                      >
                        <FaTrash className="icon-trash" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {agentesPagina.length === 0 && (
              <div className="sem-resultados slide-in-right">
                <img src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" alt="Sem resultados" width="80" />
                <p>Nenhum agente encontrado com o filtro aplicado.</p>
              </div>
            )}
          </>
        )}
      </div>

      {agentesFiltrados.length > 0 && (
        <div className="paginacao">
          <button 
            onClick={() => mudarPagina(paginaAtual - 1)}
            disabled={paginaAtual === 1}
            className="botao-paginacao hover-float"
          >
            <FaChevronLeft />
          </button>

          <span className="info-paginacao">
            Página {paginaAtual} de {totalPaginas}
          </span>

          <button 
            onClick={() => mudarPagina(paginaAtual + 1)}
            disabled={paginaAtual === totalPaginas || totalPaginas === 0}
            className="botao-paginacao hover-float"
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      {/* Modal de Visualização */}
      {agenteSelecionado && (
        <div className="modal-overlay" onClick={() => setAgenteSelecionado(null)}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <FaUser className="icon-user" /> {agenteSelecionado.nome}
              </h2>
              <button onClick={() => setAgenteSelecionado(null)} className="botao-fechar">
                <FaTimes />
              </button>
            </div>

            <div className="modal-tabs">
              <button className={`tab-btn ${abaAtiva === 'info' ? 'active' : ''}`} onClick={() => setAbaAtiva('info')}>
                <FaUserAlt className="tab-icon" /> Informações Pessoais
              </button>
              <button className={`tab-btn ${abaAtiva === 'conta' ? 'active' : ''}`} onClick={() => setAbaAtiva('conta')}>
                <FaUserCog className="tab-icon" /> Detalhes da Conta
              </button>
            </div>

            <div className="modal-content-wrapper">
              {/* Conteúdo da Aba de Informações Pessoais */}
              {abaAtiva === 'info' && (
                <div className="tab-content fade-in">
                  <div className="detalhes-grid">
                    <div className="detalhe-item">
                      <span className="detalhe-label">
                        <FaUser className="icon-detalhe" /> Nome Completo:
                      </span>
                      <span className="detalhe-valor">{agenteSelecionado.nome}</span>
                    </div>
                    <div className="detalhe-item">
                      <span className="detalhe-label">
                        <FaBirthdayCake className="icon-detalhe" /> Data de Nascimento:
                      </span>
                      <span className="detalhe-valor">{agenteSelecionado.data_nascimento}</span>
                    </div>
                    <div className="detalhe-item">
                      <span className="detalhe-label">
                        <FaGlobe className="icon-detalhe" /> Nacionalidade:
                      </span>
                      <span className="detalhe-valor">{agenteSelecionado.nacionalidade}</span>
                    </div>
                    <div className="detalhe-item">
                      <span className="detalhe-label">
                        <FaIdCard className="icon-detalhe" /> Tipo de Documento:
                      </span>
                      <span className="detalhe-valor">{agenteSelecionado.tipoDocumento}</span>
                    </div>
                    <div className="detalhe-item">
                      <span className="detalhe-label">
                        <FaIdCard className="icon-detalhe" /> Nº do Documento:
                      </span>
                      <span className="detalhe-valor">{agenteSelecionado.documento}</span>
                    </div>
                    <div className="detalhe-item">
                      <span className="detalhe-label">
                        <FaPhone className="icon-detalhe" /> Nº de Telefone:
                      </span>
                      <span className="detalhe-valor">{agenteSelecionado.telefone}</span>
                    </div>
                    <div className="detalhe-item">
                      <span className="detalhe-label">
                        <FaEnvelope className="icon-detalhe" /> Email:
                      </span>
                      <span className="detalhe-valor">{agenteSelecionado.email}</span>
                    </div>
                    <div className="detalhe-item">
                      <span className="detalhe-label">
                        <FaBriefcase className="icon-detalhe" /> Actividade:
                      </span>
                      <span className="detalhe-valor">{agenteSelecionado.actividade}</span>
                    </div>
                    <div className="detalhe-item">
                      <span className="detalhe-label">
                        <FaMapMarkerAlt className="icon-detalhe" /> Endereço:
                      </span>
                      <span className="detalhe-valor">{agenteSelecionado.endereco}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Conteúdo da Aba de Detalhes da Conta */}
              {abaAtiva === 'conta' && (
                <div className="tab-content fade-in">
                  <div className="detalhes-grid">
                    <div className="detalhe-item">
                      <span className="detalhe-label">
                        <FaUserTag className="icon-detalhe" /> Função:
                      </span>
                      <span className="detalhe-valor">{agenteSelecionado.funcao}</span>
                    </div>
                    <div className="detalhe-item">
                      <span className="detalhe-label">Usuário:</span>
                      <span className="detalhe-valor">{agenteSelecionado.usuario}</span>
                    </div>
                    <div className="detalhe-item">
                      <span className="detalhe-label">Estado da Conta:</span>
                      <span className={`detalhe-valor estado-badge ${agenteSelecionado.estado.toLowerCase()}`}>
                        {agenteSelecionado.estado}
                      </span>
                    </div>
                    <div className="detalhe-item">
                      <span className="detalhe-label">Sincronização:</span>
                      <span className={`detalhe-valor sincronizado-badge ${agenteSelecionado.sincronizado.toLowerCase()}`}>
                        {agenteSelecionado.sincronizado}
                      </span>
                    </div>
                  </div>

                  <div className="acoes-conta">
                    <button 
                      onClick={() => toggleEstadoConta(agenteSelecionado.id)}
                      className={`botao-conta ${agenteSelecionado.estado === 'Activo' ? 'botao-desativar' : 'botao-ativar'}`}
                    >
                      {agenteSelecionado.estado === 'Activo' ? 'Desactivar Conta' : 'Activar Conta'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button onClick={() => iniciarEdicao(agenteSelecionado)} className="botao-primario">
                <FaEdit /> Editar Agente
              </button>
              <button onClick={() => setAgenteSelecionado(null)} className="botao-secundario">
                <FaTimes /> Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edição */}
      {agenteEditando && <FormularioEdicao />}
    </div>
  );
};

export default Agentes;