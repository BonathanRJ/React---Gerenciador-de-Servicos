import React, { useState } from 'react';
import './App.css';

const App = () => {
  // Armazenar a lista de serviços
  const [servicos, setServicos] = useState([]);
  // Armazenar o nome do serviço em edição
  const [servicoNome, setServicoNome] = useState('');
  // Armazenar a descrição do serviço em edição
  const [servicoDescricao, setServicoDescricao] = useState('');
  // Armazenar o índice do serviço em edição
  const [editandoIndex, setEditandoIndex] = useState(null);

  // Adiciona um novo serviço
  const addServico = () => {
    if (servicoNome && servicoDescricao) {
      setServicos([...servicos, { nome: servicoNome, descricao: servicoDescricao }]);
      setServicoNome('');
      setServicoDescricao('');
    }
  };

  // Inicia a edição de um serviço existente
  const editarServico = (index) => {
    setServicoNome(servicos[index].nome);
    setServicoDescricao(servicos[index].descricao);
    setEditandoIndex(index);
  };

  // Salva as alterações de um serviço editado
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

  // Exclui um serviço existente
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
