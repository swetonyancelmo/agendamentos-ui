import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate,useLocation } from 'react-router-dom'; // Adicionado useNavigate
import Nav from './Components/Nav/Nav';
import Services from './Components/Services/Services';
import Sobre from './Components/Sobre/Sobre';
import Footer from './Components/Footer/Footer';
import Marketing from './Components/Marketing/Marketing';
import Cadastro_Emp from './Components/Cadastro_Emp/Cadastro_Emp';
import Cadastro_Client from './Components/Cadastro_Client/Cadastro_Client';


// Criamos esse componente para que o 'useNavigate' funcione corretamente
function ConteudoApp() {
 const [estaLogado, setEstaLogado] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [forcarAbrirLogin, setForcarAbrirLogin] = useState(false);
  const location = useLocation();

  const esconderNav = location.pathname === "/Cadastro_Emp" || location.pathname === "/Cadastro_Client";

  useEffect(() => {
    const token = localStorage.getItem('token');
    const nomeSalvo = localStorage.getItem('nomeUsuario');
    if (token && nomeSalvo) {
      setEstaLogado(true);
      setNomeUsuario(nomeSalvo);
    }
  }, []);

  const handleSucesso = (dados) => {
    setEstaLogado(true);
    // Salvamos o nome que veio do Java (BusinessDto ou CustomerDto)
    const nomeReal = dados.name || dados.nome || "Abelardo";
     setNomeUsuario(nomeReal);
    localStorage.setItem('nomeUsuario', nomeReal);
    localStorage.setItem('token', dados.token);
    window.scrollTo(0, 0);
  };
const handleSair = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nomeUsuario');
    setEstaLogado(false);
    setNomeUsuario('');
    window.location.href = "/"; // Recarrega na Home
  };

  const handleAbrirCadastroEmpresa = () => {
    // ABRE EM OUTRA ABA como você pediu
    window.open("/Cadastro_Emp", "_blank"); 
  };

 return (
    <>
      {/* 1. SÓ MOSTRA A NAV E O VÍDEO SE NÃO ESTIVERMOS NO CADASTRO */}
      {!esconderNav && (
        <div id='Home'>
          <Nav 
            onLoginSucesso={handleSucesso} 
            usuario={nomeUsuario}
            aoSair={handleSair}
            forcarAbrir={forcarAbrirLogin} 
            setForcarAbrir={setForcarAbrirLogin}
          />
        </div>
      )}

      {/* 2. AS ROTAS (O CONTEÚDO CENTRAL) */}
      <Routes>
        <Route path="/" element={
          <>
            <div id='Ser'>
              {estaLogado ? <Services /> : <Marketing 
                abrirLogin={() => setForcarAbrirLogin(true)} 
                abrirCadastro={handleAbrirCadastroEmpresa} 
              />}
            </div>
            <div id='sobre'><Sobre /></div>
          </>
        } />
        
        <Route path="/Cadastro_Emp" element={<Cadastro_Emp />} />
        <Route path="/Cadastro_Client" element={<Cadastro_Client />} />
      </Routes>
  
      {/* 3. O FOOTER SEMPRE APARECE (FORA DO IF) */}
      <div id="Rodape_Geral">
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <ConteudoApp />
    </Router>
  );
}

export default App;