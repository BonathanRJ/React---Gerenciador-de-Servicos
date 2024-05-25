import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [servicos, setServicos] = useState([]);
  const [servicoNome, setServicoNome] = useState('');
  const [servicoDescricao, setServicoDescricao] = useState('');
  const [editandoIndex, setEditandoIndex] = useState(null);

  const addServico = () => {
    if (servicoNome && servicoDescricao) {
      setServicos([...servicos, { nome: servicoNome, descricao: servicoDescricao }]);
      setServicoNome('');
      setServicoDescricao('');
    }
  };

  const editarServico = (index) => {
    setServicoNome(servicos[index].nome);
    setServicoDescricao(servicos[index].descricao);
    setEditandoIndex(index);
  };

  const saveServico = () => {
    if (servicoNome && servicoDescricao && editandoIndex !== null) {
      const updatedServicos = servicos.map((servico, index) =>
        index === editandoIndex ? { nome: servicoNome, descricao: servicoDescricao } : servico
      );
      setServicos(updatedServicos);
      setServicoNome('');
      setServicoDescricao('');
      setEditandoIndex(null);
    }
  };

  const deletarServico = (index) => {
    setServicos(servicos.filter((_, i) => i !== index));
  };

  return (
    <div className="App">

      <div className="app__gerenciador_container">
        <h1 className='titulo_gerenciador'>Gerenciador de Serviços</h1>
        
        <div className="form">
          <input
            type="text"
            placeholder="Título do Serviço"
            id='titulo'
            value={servicoNome}
            onChange={(e) => setServicoNome(e.target.value)}
          />
          <textarea
            type="text"
            id='descricao'
            placeholder="Descrição do Serviço"
            value={servicoDescricao}
            onChange={(e) => setServicoDescricao(e.target.value)}
          />
          {editandoIndex !== null ? (
            <button id="salvarBt" onClick={saveServico}>Salvar</button>
          ) : (
            <button id="adicionarBt" onClick={addServico}>Adicionar</button>
          )}
        </div>
      </div>
      
      <div className="servicos-lista">
        {servicos.map((servico, index) => (
          <div key={index} className="servico-item">
            <div className="servicos-titulo">
              <strong>{servico.nome}</strong>
              <p>{servico.descricao}</p>
            </div>
            <div className="actions">
              <button id="editarBt" onClick={() => editarServico(index)}>Editar</button>
              <button id="excluirBt" onClick={() => deletarServico(index)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    
   
  );
};

export default App;
