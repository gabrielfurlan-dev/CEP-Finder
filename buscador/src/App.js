import logo from './logo.svg';
import './App.css';

import  { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';

import api from './services/api';

function App() 
{

  const[input, setInput] = useState('')
  const[cep, setCep] = useState({});

  async function handleSearch()
  {
    // 01310930/json

    if(input === '')
    {
      alert("Informe seu CEP!")
      return;
    }

    try
    {
      const response = await api.get(input + '/json');
      setCep(response.data);
      setInput("");
    }
    catch
    {
      alert("Ops! Ocorreu um erro ao buscar o CEP.")
      setInput("")
    }
  }

  return (
    <div className='container'>
      <h1 className='tittle'>Cep Finder</h1>
      <div className='containerInput'>
        <input
          type='text'
          placeholder='Digite seu cep. . .'

          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button 
          className='buttonSearch'
          onClick={handleSearch}
        >
          <FiSearch size={20} color='white'/>
        </button>
      </div>
      

      {
        Object.keys(cep).length > 0 && 
        (
          <main className='main'>
            <h2>CEP: {cep.cep}</h2>
            <span>Rua: {cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>Cidade: {cep.localidade}</span>
            <span>Estado / UF: {cep.uf}</span>
          </main>
        )
      }
    </div>
  );
}

export default App;
