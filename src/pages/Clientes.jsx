import { useState, useEffect, useRef } from 'react';
import { 
  FaUser, FaIdCard, FaPhone, FaEye, FaSync, FaSearch,
  FaChevronLeft, FaChevronRight, FaFilter, FaUserShield,
  FaUserAlt, FaCar, FaWallet, FaEdit, FaPlus, FaBirthdayCake, 
  FaGlobe, FaEnvelope, FaBriefcase, FaMapMarkerAlt, FaSave, FaTimes,
  FaCheck, FaTimesCircle
} from 'react-icons/fa';
import './Clientes.css';
import api from '../services/api'; // Importando o serviço de API


// =======================================================
// Componente Principal
// =======================================================

const baseURL = 'https://5b3ace426025.ngrok-free.app'; // Atualize aqui quando mudar o ngrok
const Clientes = () => {
  // Estado para visualização ampliada de imagens
  const [imagemModal, setImagemModal] = useState({ aberto: false, imagens: [], indice: 0 });
  // Estados do componente
  const [clientes, setClientes] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [viaturasPorCliente, setViaturasPorCliente] = useState({});
  const [clienteEditando, setClienteEditando] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState('info');
  const tabelaRef = useRef(null);
  const [estadosSeguros, setEstadosSeguros] = useState({});

  const itensPorPagina = 10;

  // Busca clientes da API
  useEffect(() => {
    const fetchClientes = async () => {
      setCarregando(true);
      // Verifica se o token está presente antes de buscar clientes
      const token = localStorage.getItem('token');
      console.log('Token antes de buscar clientes:', token);
      if (!token) {
        alert('Você precisa estar logado para visualizar os clientes!');
        setCarregando(false);
        setClientes([]);
        return;
      }
      try {
        let data;
        try {
          const res = await api.get('/api/clientes');
          data = res.data;
          console.log('Dados recebidos dos clientes:', data);
          // Aceita array direto ou objeto com clientes
          if (Array.isArray(data)) {
            setClientes(data);
          } else if (Array.isArray(data.clientes)) {
            setClientes(data.clientes);
          } else if (data.cliente) {
            setClientes([data.cliente]);
          } else {
            setClientes([]);
            console.error('Formato inesperado da resposta:', data);
          }
        } catch (err) {
          let msg = err?.response?.data?.message || err.message || err.toString();
          alert('Erro ao buscar clientes: ' + msg);
          console.error('Erro na resposta da API clientes:', err);
          setClientes([]);
          setCarregando(false);
          return;
        }

        // Para cada cliente, busca o status do seguro e as viaturas
        const estados = {};
        const viaturasMap = {};
        await Promise.all(
          data.map(async (cliente) => {
            // Busca status do seguro
            try {
              try {
                const resSeguro = await api.get(`/api/seguros?cliente_id=${cliente.id}`);
                const seguros = resSeguro.data;
                estados[cliente.id] = seguros.length > 0 ? seguros[0].status : 'Sem seguro';
              } catch (err) {
                console.error('Erro na resposta da API seguros:', err);
                estados[cliente.id] = 'Erro';
              }
            } catch (err) {
              console.error('Erro ao buscar seguro:', err);
              estados[cliente.id] = 'Erro';
            }
            // Busca todas viaturas e filtra pelo cliente_id
            try {
              try {
                const resViaturas = await api.get('/api/viaturas');
                let viaturas = resViaturas.data;
                if (Array.isArray(viaturas)) {
                  viaturas = viaturas.filter(v => v.cliente_id === cliente.id);
                } else {
                  viaturas = viaturas.cliente_id === cliente.id ? [viaturas] : [];
                }
                viaturasMap[cliente.id] = viaturas;
              } catch (err) {
                console.error('Erro na resposta da API viaturas:', err);
                viaturasMap[cliente.id] = [];
              }
            } catch (err) {
              console.error('Erro ao buscar viaturas:', err);
              viaturasMap[cliente.id] = [];
            }
          })
        );
        setEstadosSeguros(estados);
        setViaturasPorCliente(viaturasMap);
      } catch (err) {
        console.error('Erro geral ao buscar clientes:', err);
        setClientes([]);
      }
      setCarregando(false);
    };
    fetchClientes();
  // ...existing code...
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
  }, [clientes]);

  // Lógica de filtragem e paginação
  const clientesFiltrados = clientes.filter(cliente =>
    Object.values(cliente).some(valor =>
      String(valor).toLowerCase().includes(filtro.toLowerCase())
    )
  );
  const totalPaginas = Math.ceil(clientesFiltrados.length / itensPorPagina);
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const clientesPagina = clientesFiltrados.slice(indiceInicial, indiceInicial + itensPorPagina);

  const mudarPagina = (novaPagina) => {
    setPaginaAtual(Math.max(1, Math.min(novaPagina, totalPaginas)));
  };

  const recarregarDados = () => {
    setCarregando(true);
    setTimeout(() => {
      setClientes([...clientesExemplo]);
      setPaginaAtual(1);
      setFiltro('');
      setCarregando(false);
    }, 800);
  };
  
  // Funções para o modal de edição
  const iniciarEdicao = (cliente) => {
  setClienteEditando({ ...cliente });
  };

  const cancelarEdicao = () => {
    setClienteEditando(null);
  };

  const salvarEdicao = () => {
    const token = localStorage.getItem('token');
    api.put(`/api/clientes/${clienteEditando.id}`, clienteEditando)
      .then(res => {
        setClientes(clientes.map(c => c.id === clienteEditando.id ? res.data.cliente || clienteEditando : c));
        setClienteEditando(null);
      })
      .catch((err) => {
        alert('Erro ao atualizar cliente');
        console.error('Erro ao atualizar cliente:', err);
        setClienteEditando(null);
      });
  };

  const handleCampoEditado = (campo, valor) => {
    setClienteEditando({
      ...clienteEditando,
      [campo]: valor
    });
  };

  const FormularioEdicao = () => (
    <div className="modal-overlay" style={{ zIndex: 9999 }}>
      <div className="modal-container-edicao">
        <div className="modal-header">
          <h2>
            <FaEdit className="icon-user" /> Editar Cliente: {clienteEditando.nome}
          </h2>
          <button onClick={cancelarEdicao} className="botao-fechar">
            <FaTimes />
          </button>
        </div>

        <div className="modal-body">
          <div className="formulario-edicao">
            <div className="form-group">
              <label><FaUser /> Nome Completo</label>
              <input type="text" value={clienteEditando.nome || ''} onChange={(e) => handleCampoEditado('nome', e.target.value)} style={{ color: '#000' }} />
            </div>
            <div className="form-group">
              <label><FaIdCard /> Nº Documento</label>
              <input type="text" value={clienteEditando.documento || ''} onChange={(e) => handleCampoEditado('documento', e.target.value)} style={{ color: '#000' }} />
            </div>
            <div className="form-group">
              <label><FaPhone /> Telefone</label>
              <input type="text" value={clienteEditando.contacto || clienteEditando.telefone || ''} onChange={(e) => handleCampoEditado('contacto', e.target.value)} style={{ color: '#000' }} />
            </div>
            <div className="form-group">
              <label><FaEnvelope /> Email</label>
              <input type="email" value={clienteEditando.email || ''} onChange={(e) => handleCampoEditado('email', e.target.value)} style={{ color: '#000' }} />
            </div>
            <div className="form-group">
              <label><FaMapMarkerAlt /> Morada</label>
              <textarea value={clienteEditando.morada || ''} onChange={(e) => handleCampoEditado('morada', e.target.value)} style={{ color: '#000' }} />
            </div>
            <div className="form-group">
              <label><FaBirthdayCake /> Data Nascimento</label>
              <input type="date" value={clienteEditando.data_nascimento || ''} onChange={(e) => handleCampoEditado('data_nascimento', e.target.value)} style={{ color: '#000' }} />
            </div>
            <div className="form-group">
              <label><FaGlobe /> Nacionalidade</label>
              <input type="text" value={clienteEditando.nacionalidade || ''} onChange={(e) => handleCampoEditado('nacionalidade', e.target.value)} style={{ color: '#000' }} />
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

  // Componente interno para a tabela de veículos
  const TabelaVeiculos = ({ veiculos }) => (
    <div className="tabela-veiculos-container">
      <div className="table-header">
        <h3>Veículos do Cliente</h3>
        <button className="botao-adicionar">
          <FaPlus /> Adicionar Veículo
        </button>
      </div>
      <div className="tabela-scroll"> {/* Adicionado um container para rolagem */}
        <table className="tabela-veiculos">
          <thead>
            <tr>
              <th>Estado</th>
              <th>Número</th>
              <th>Tipo de Seguro</th>
              <th>Registo</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Ano</th>
              <th>Sincronizado</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {veiculos.map((veiculo) => (
              <tr key={veiculo.id}>
                <td>
                  <span className={`estado-badge ${veiculo.estado.toLowerCase()}`}>
                    {veiculo.estado}
                  </span>
                </td>
                <td>{veiculo.numero}</td>
                <td>{veiculo.tipoSeguro}</td>
                <td>{veiculo.numeroRegisto}</td>
                <td>{veiculo.marca}</td>
                <td>{veiculo.modelo}</td>
                <td>{veiculo.anoFabrico}</td>
                <td>
                  {veiculo.sincronizado ? (
                    <FaCheck className="icon-success" />
                  ) : (
                    <FaTimesCircle className="icon-error" />
                  )}
                </td>
                <td>
                  <button className="botao-acao">
                    <FaEdit /> Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Renderização do componente
  return (
    <div className="clientes-container">
      <h1 className="titulo-principal">
        <FaUserShield className="icon-titulo pulse" /> Lista de Clientes
      </h1>

      <div className="barra-ferramentas slide-in-right">
        <div className="filtro-container">
          <FaSearch className="icon-filtro" />
          <input
            type="text"
            placeholder="Filtrar clientes..."
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
            <table className="tabela-clientes">
              <thead>
                <tr className="header-row">
                  <th>ID</th>
                  <th>Nome Completo</th>
                  <th>Nº do Documento</th>
                  <th>Nº de Telefone</th>
                  <th>Estado</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {clientesPagina.map((cliente) => (
                  <tr key={cliente.id} className="fade-in-row">
                    <td>{cliente.id}</td>
                    <td className="dado-nome">{cliente.nome}</td>
                    <td className="dado-documento">{cliente.documento}</td>
                    <td className="dado-telefone">{cliente.contacto}</td>
                    <td>
                      <span className={`estado-badge`}>
                        {estadosSeguros[cliente.id] || 'Carregando...'}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => {
                          setClienteSelecionado(cliente);
                          setAbaAtiva('info');
                        }}
                        className="botao-visualizar"
                      >
                        <FaEye className="icon-eye" /> Visualizar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {clientesPagina.length === 0 && (
              <div className="sem-resultados slide-in-right">
                <img src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" alt="Sem resultados" width="80" />
                <p>Nenhum cliente encontrado com o filtro aplicado.</p>
              </div>
            )}
          </>
        )}
      </div>

      {clientesFiltrados.length > 0 && (
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
      {clienteSelecionado && (
        <div className="modal-overlay" onClick={() => setClienteSelecionado(null)}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <FaUser className="icon-user" /> {clienteSelecionado.nome}
              </h2>
              <button onClick={() => setClienteSelecionado(null)} className="botao-fechar">
                <FaTimes />
              </button>
            </div>

            <div className="modal-tabs">
              <button className={`tab-btn ${abaAtiva === 'info' ? 'active' : ''}`} onClick={() => setAbaAtiva('info')}>
                <FaUserAlt className="tab-icon" /> Informações Pessoais
              </button>
              <button className={`tab-btn ${abaAtiva === 'veiculos' ? 'active' : ''}`} onClick={() => setAbaAtiva('veiculos')}>
                <FaCar className="tab-icon" /> Veículos
              </button>
              <button className={`tab-btn ${abaAtiva === 'conta' ? 'active' : ''}`} onClick={() => setAbaAtiva('conta')}>
                <FaWallet className="tab-icon" /> Detalhes da Conta
              </button>
            </div>

            <div className="modal-content-wrapper">
              {/* Conteúdo da Aba de Informações Pessoais */}
              {abaAtiva === 'info' && (
                <div className="tab-content fade-in">
                  <div className="detalhes-grid">
                    <div className="detalhe-item">
                      <span className="detalhe-label">
                        <FaIdCard className="icon-detalhe" /> Tipo de Documento:
                      </span>
                      <span className="detalhe-valor">{clienteSelecionado.tipoDocumento}</span>
                    </div>
                    <div className="detalhe-item">
                      <span className="detalhe-label">
                        <FaIdCard className="icon-detalhe" /> Nº Documento:
                      </span>
                      <span className="detalhe-valor">{clienteSelecionado.documento}</span>
                    </div>
                    <div className="detalhe-item">
                      <span className="detalhe-label">
                        <FaPhone className="icon-detalhe" /> Telefone:
                      </span>
                      <span className="detalhe-valor">{clienteSelecionado.telefone}</span>
                    </div>
                    <div className="detalhe-item">
                      <span className="detalhe-label">
                        <FaBirthdayCake className="icon-detalhe" /> Data de Nascimento:
                      </span>
                      <span className="detalhe-valor">{clienteSelecionado.data_nascimento || 'Não informado'}</span>
                    </div>
                    <div className="detalhe-item">
                      <span className="detalhe-label">
                        <FaGlobe className="icon-detalhe" /> Nacionalidade:
                      </span>
                      <span className="detalhe-valor">{clienteSelecionado.nacionalidade || 'Não informado'}</span>
                    </div>
                    <div className="detalhe-item">
                      <span className="detalhe-label">
                        <FaMapMarkerAlt className="icon-detalhe" /> Morada:
                      </span>
                      <span className="detalhe-valor">{clienteSelecionado.morada || 'Não informado'}</span>
                    </div>
                    <div className="detalhe-item">
                      <span className="detalhe-label">
                        <FaEnvelope className="icon-detalhe" /> Email:
                      </span>
                      <span className="detalhe-valor">{clienteSelecionado.email || 'Não informado'}</span>
                    </div>
                    <div className="detalhe-item">
                      <span className="detalhe-label">
                        <FaBriefcase className="icon-detalhe" /> Actividade:
                      </span>
                      <span className="detalhe-valor">{clienteSelecionado.actividade || 'Não informado'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Conteúdo da Aba de Veículos */}
              {abaAtiva === 'veiculos' && (
                <div className="tab-content fade-in">
                  {viaturasPorCliente[clienteSelecionado?.id]?.length > 0 ? (
                    <div>
                      <table className="tabela-veiculos">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Ano</th>
                            <th>Matrícula</th>
                            <th>Classificação</th>
                            <th>Tipo Cobertura</th>
                            <th>Valor</th>
                            <th>Imagens</th>
                          </tr>
                        </thead>
                        <tbody>
                          {viaturasPorCliente[clienteSelecionado.id].map((v) => (
                            <tr key={v.id}>
                              <td>{v.id}</td>
                              <td>{v.marca}</td>
                              <td>{v.modelo}</td>
                              <td>{v.ano_fabricacao}</td>
                              <td>{v.matricula}</td>
                              <td>{v.classificacao?.nome_classificacao}</td>
                              <td>{v.tipo_cobertura?.nome_cobertura}</td>
                              <td>{v.valor_viatura}</td>
                              <td>
                                {Array.isArray(v.imagens) && v.imagens.length > 0 ? (
                                  <div style={{ display: 'flex', gap: '4px' }}>
                                    {v.imagens.map((img, idx) => (
                                      <img
                                        key={idx}
                                        src={`${baseURL}/uploads/viaturas/${img}`}
                                        alt={`Viatura ${v.marca} ${v.modelo}`}
                                        style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4, cursor: 'pointer' }}
                                        onClick={() => setImagemModal({ aberto: true, imagens: v.imagens, indice: idx })}
                                      />
                                    ))}
                                  </div>
                                ) : 'Sem imagens'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {/* Modal de Imagem Ampliada */}
                      {imagemModal.aberto && (
                        <div className="imagem-modal-overlay" style={{ position: 'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:9999 }} onClick={() => setImagemModal({ aberto: false, imagens: [], indice: 0 })}>
                          <div style={{ position:'relative', background:'#fff', padding:16, borderRadius:8, boxShadow:'0 2px 8px #0008', display:'flex', flexDirection:'column', alignItems:'center' }} onClick={e => e.stopPropagation()}>
                            <img
                              src={`${baseURL}/uploads/viaturas/${imagemModal.imagens[imagemModal.indice]}`}
                              alt="Imagem ampliada"
                              style={{ maxWidth:'80vw', maxHeight:'70vh', borderRadius:8 }}
                            />
                            <div style={{ marginTop:12, display:'flex', gap:16 }}>
                              <button onClick={() => setImagemModal(m => ({ ...m, indice: Math.max(0, m.indice-1) }))} disabled={imagemModal.indice === 0} style={{ fontSize:24, padding:'4px 12px', borderRadius:4 }}>⟨</button>
                              <span style={{ fontWeight:'bold' }}>{imagemModal.indice+1} / {imagemModal.imagens.length}</span>
                              <button onClick={() => setImagemModal(m => ({ ...m, indice: Math.min(m.imagens.length-1, m.indice+1) }))} disabled={imagemModal.indice === imagemModal.imagens.length-1} style={{ fontSize:24, padding:'4px 12px', borderRadius:4 }}>⟩</button>
                              <button onClick={() => setImagemModal({ aberto: false, imagens: [], indice: 0 })} style={{ fontSize:18, padding:'4px 12px', borderRadius:4 }}>Fechar</button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="sem-dados">
                      <FaCar className="icon-grande" />
                      <p>Nenhum veículo registado para este cliente.</p>
                      <button className="botao-adicionar">
                       
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Conteúdo da Aba de Detalhes da Conta */}
              {abaAtiva === 'conta' && (
                <div className="tab-content fade-in">
                   <div className="detalhes-grid">
                      <div className="detalhe-item">
                        <span className="detalhe-label">
                          <FaIdCard className="icon-detalhe" /> ID do Cliente:
                        </span>
                        <span className="detalhe-valor">{clienteSelecionado.id}</span>
                      </div>
                      <div className="detalhe-item">
                        <span className="detalhe-label">Estado da Conta:</span>
                        <span className={`detalhe-valor estado-badge ${clienteSelecionado.estado.toLowerCase()}`}>
                          {clienteSelecionado.estado}
                        </span>
                      </div>
                   </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button onClick={() => iniciarEdicao(clienteSelecionado)} className="botao-primario">
                <FaEdit /> Editar Cliente
              </button>
              <button onClick={() => setClienteSelecionado(null)} className="botao-secundario">
                <FaTimes /> Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edição */}
      {clienteEditando && <FormularioEdicao />}
  {/* Modal de edição é independente, não fecha o modal de visualização */}
    </div>
  );
};

export default Clientes;
