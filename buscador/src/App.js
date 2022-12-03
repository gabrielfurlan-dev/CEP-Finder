import logo from "./logo.svg";
import "./App.css";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";

import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    // 01310930/json

    if (input === "") {
      alert("Informe seu CEP!");
      return;
    }

    try {
      const response = await api.get(input + "/json");
      setCep(response.data);
      setInput("");
    } catch {
      alert("Ops! Ocorreu um erro ao buscar o CEP.");
      setInput("");
    }
  }

  return (
    <div className="mt-32">
      <div className="w-full h-full flex justify-center">
        <div>
          <h1 className="tittle text-center text-lg my-10">Cep Finder</h1>
          <div className="containerInput flex row align-middle">
            <input
              className="bg-gray-300 rounded-md p-1 mx-2"
              type="text"
              placeholder="Digite seu cep. . ."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button className="buttonSearch" onClick={handleSearch}>
              <FiSearch size={20} color="black" />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full text-sm">
        {Object.keys(cep).length > 0 && (
          <main className="main text-center mt-10">
            <h2>CEP: {cep.cep}</h2>
            <br />
            <span>Rua: {cep.logradouro}</span>
            <br />
            <span>Complemento: {cep.complemento}</span>
            <br />
            <span>Bairro: {cep.bairro}</span>
            <br />
            <span>Cidade: {cep.localidade}</span>
            <br />
            <span>Estado / UF: {cep.uf}</span>
            <br />
          </main>
        )}
      </div>
    </div>
  );
}

export default App;
