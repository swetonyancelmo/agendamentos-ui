import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { useState } from 'react';
import { MantineProvider, createTheme } from '@mantine/core';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Componentes
import Navbar from './components/Navbar/Navbar.jsx';
import SnowEffect from './components/SnowEffect/SnowEffect.jsx';
import Footer from './components/Footer/Footer.jsx';
import NavbarLogin from './components/NavbarLogin/NavbarLogin.jsx';

// Páginas
import WelcomeCard from './components/WelcomeCard/WelcomeCard.jsx';
import DashboardClient from './pages/DashboardClient.jsx';
import Settings from './pages/Settings.jsx';
import Agendar from './pages/Agendar.jsx';
import LoginEmpresa from './pages/LoginEmpresa.jsx';
import CadastroEmpresa from './pages/CadastroEmpresa.jsx';
import CadastroCliente from './pages/CadastroCliente.jsx';
import LoginCliente from './pages/LoginCliente';
import LandingPage from './pages/LandingPage.jsx';
import Seleção from './pages/ClienteEmpresa';

// Estilo Global
import './App.css';

const theme = createTheme({
  primaryColor: 'blue',
});

// --- NOVO: Componente para gerenciar qual Navbar exibir ---
function GerenciadorNavbar() {
  const location = useLocation();
  
  // Lista de rotas que devem usar a Navbar de Login
  const rotasDeLogin = ['/','/login-empresa', '/login-cliente', '/cadastro-empresa', '/cadastro-cliente','/seleção'];
  
  if (rotasDeLogin.includes(location.pathname)) {
    return <NavbarLogin />;
  }

  return <Navbar />;
}

function App() {
  const [exibirNeve, setExibirNeve] = useState(true);

  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <BrowserRouter>
        <div className="app-container">
          {exibirNeve && <SnowEffect />}
          <title>Mais Climatização - Agendamento de Serviços de Ar-Condicionado</title>
          {/* Substituímos a <Navbar /> fixa pelo nosso novo Gerenciador */}
          <GerenciadorNavbar />
          
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/seleção" element={<Seleção />} />
            <Route path="/Boas-vindas" element={<WelcomeCard />} />
            <Route path="/login-empresa" element={<LoginEmpresa />} />
            <Route path="/login-cliente" element={<LoginCliente />} />
            <Route path="/cadastro-empresa" element={<CadastroEmpresa />} />
            <Route path="/cadastro-cliente" element={<CadastroCliente />} />
            <Route path="/dashboard" element={<DashboardClient />} />
            <Route path="/agenda" element={<Agendar />} />
            <Route 
              path="/configuracoes" 
              element={
                <Settings 
                  neveAtiva={exibirNeve} 
                  setNeveAtiva={setExibirNeve} 
                />
              } 
            />
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;