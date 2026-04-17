import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { useState } from 'react';
import { MantineProvider, createTheme } from '@mantine/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componentes
import Navbar from './components/Navbar/Navbar.jsx';
import SnowEffect from './components/SnowEffect/SnowEffect.jsx';
import Footer from './components/Footer/Footer.jsx';

// Páginas
import WelcomeCard from './components/WelcomeCard/WelcomeCard.jsx';
import DashboardClient from './pages/DashboardClient.jsx';
import Settings from './pages/Settings.jsx';
import Agendar from './pages/Agendar.jsx';

// Estilo Global
import './App.css';

const theme = createTheme({
  primaryColor: 'blue',
});

function App() {
  // Estado global da neve
  const [exibirNeve, setExibirNeve] = useState(true);

  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <BrowserRouter>
        <div className="app-container">
          {/* Efeito visual persistente em todas as rotas */}
          {exibirNeve && <SnowEffect />}
          
          <Navbar />
          
          <Routes>
            {/* Página Principal */}
            <Route path="/" element={<WelcomeCard />} />
            
            {/* Histórico do Cliente */}
            <Route path="/dashboard" element={<DashboardClient />} />
            
            {/* Formulário de Novo Serviço */}
            <Route path="/agenda" element={<Agendar />} />
            
            {/* Configurações (Modo Noturno / Neve) */}
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