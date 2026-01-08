import { useState, useEffect } from 'react';
import { 
  FaFilePdf, FaFileExcel, FaFileWord, FaFileCsv, FaFileAlt, 
  FaDownload, FaSync, FaChevronDown, FaFilter 
} from 'react-icons/fa';
import './Relatorios.css';

const Relatorios = () => {
  // Estados do componente
  const [tipoRelatorio, setTipoRelatorio] = useState('');
  const [numero, setNumero] = useState('');
  const [formato, setFormato] = useState('PDF');
  const [carregando, setCarregando] = useState(false);
  const [mostrarParametros, setMostrarParametros] = useState(false);
  const [dadosCarregados, setDadosCarregados] = useState(false);

  // Opções para o dropdown de tipos de relatório
  const tiposRelatorio = [
    'Certificado de Responsabilidade Automóvel',
    'Relatório de Vendas Mensal',
    'Relatório de Clientes Ativos',
    'Relatório de Comissões',
    'Relatório Financeiro Anual',
    'Relatório de Sinistros'
  ];

  // Opções de formato de download
  const formatosDownload = [
    { valor: 'PDF', icone: <FaFilePdf />, cor: '#e74c3c' },
    { valor: 'XLSX', icone: <FaFileExcel />, cor: '#2ecc71' },
    { valor: 'DOCX', icone: <FaFileWord />, cor: '#3498db' },
    { valor: 'CSV', icone: <FaFileCsv />, cor: '#f39c12' },
    { valor: 'TXT', icone: <FaFileAlt />, cor: '#7f8c8d' },
    { valor: 'JSON', icone: <FaFileAlt />, cor: '#9b59b6' }
  ];

  // Efeito para carregar dados iniciais (simulado)
  useEffect(() => {
    setCarregando(true);
    setTimeout(() => {
      setDadosCarregados(true);
      setCarregando(false);
    }, 1200);
  }, []);

  // Simular geração de relatório
  const gerarRelatorio = (e) => {
    e.preventDefault();
    if (!tipoRelatorio) {
      alert('Por favor, selecione o tipo de relatório');
      return;
    }

    setCarregando(true);
    
    // Simular tempo de processamento
    setTimeout(() => {
      setCarregando(false);
      // Aqui normalmente faria o download do relatório
      alert(`Relatório "${tipoRelatorio}" gerado com sucesso em formato ${formato}`);
    }, 2000);
  };

  // Alternar visibilidade dos parâmetros
  const toggleParametros = () => {
    setMostrarParametros(!mostrarParametros);
  };

  return (
    <div className="relatorios-container">
      <h1 className="titulo-principal">
        <FaFileAlt className="icon-titulo pulse" /> Relatórios
      </h1>

      {carregando && !dadosCarregados ? (
        <div className="carregando">
          <div className="loading-wave">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="loading-bar" style={{ '--delay': i * 0.1 + 's' }}></div>
            ))}
          </div>
        </div>
      ) : (
        <div className="relatorios-card slide-in-right">
          <form onSubmit={gerarRelatorio}>
            <div className="form-group">
              <label>Tipo de Relatório *</label>
              <div className="custom-select">
                <select
                  value={tipoRelatorio}
                  onChange={(e) => setTipoRelatorio(e.target.value)}
                  required
                >
                  <option value="">Selecione um tipo de relatório</option>
                  {tiposRelatorio.map((tipo, index) => (
                    <option key={index} value={tipo}>{tipo}</option>
                  ))}
                </select>
                <FaChevronDown className="select-arrow" />
              </div>
            </div>

            <div className="parametros-header">
              <button 
                type="button" 
                onClick={toggleParametros}
                className="botao-parametros"
              >
                <FaFilter /> Parâmetros
                <FaChevronDown className={`parametro-arrow ${mostrarParametros ? 'rotated' : ''}`} />
              </button>
            </div>

            {mostrarParametros && (
              <div className="parametros-content fade-in">
                <div className="form-group">
                  <label>Número *</label>
                  <input
                    type="text"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    placeholder="Digite o número do relatório"
                    required
                  />
                </div>
              </div>
            )}

            <div className="formatos-download">
              <label>Formato de Download:</label>
              <div className="formatos-botoes">
                {formatosDownload.map((formatoItem) => (
                  <button
                    key={formatoItem.valor}
                    type="button"
                    className={`formato-botao ${formato === formatoItem.valor ? 'ativo' : ''}`}
                    onClick={() => setFormato(formatoItem.valor)}
                    style={{ color: formatoItem.cor }}
                  >
                    {formatoItem.icone} {formatoItem.valor}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-footer">
              <button 
                type="submit" 
                className="botao-gerar"
                disabled={carregando}
              >
                {carregando ? (
                  <>
                    <FaSync className="icon-recargar girando" /> Gerando...
                  </>
                ) : (
                  <>
                    <FaDownload /> Baixar Relatório
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Relatorios;