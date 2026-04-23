import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Componentes de layout
import Navbar from '../components/Navbar/Navbar.jsx';
import NavbarLogin from '../components/NavbarLogin/NavbarLogin.jsx';
import NavBarEmpresa from '../components/empresa/NavBarEmpresa.jsx';
import Footer from '../components/Footer/Footer.jsx';
import FooterEmpresa from '../components/empresa/FooterEmpresa.jsx';
import SnowEffect from '../components/SnowEffect/SnowEffect.jsx';
import WelcomeCard from '../components/WelcomeCard/WelcomeCard.jsx';

// Páginas públicas
import LandingPage from '../pages/LandingPage.jsx';
import Home from '../pages/Home.jsx';

// Páginas cliente
import LoginCliente from '../pages/cliente/LoginCliente.jsx';
import CadastroCliente from '../pages/cliente/CadastroCliente.jsx';
import DashboardCliente from '../pages/cliente/DashboardCliente.jsx';
import Agendar from '../pages/cliente/Agendar.jsx';

// Páginas empresa
import LoginEmpresa from '../pages/empresa/LoginEmpresa.jsx';
import CadastroEmpresa from '../pages/empresa/CadastroEmpresa.jsx';
import DashboardEmpresa from '../pages/empresa/DashboardEmpresa.jsx';
import Servicos from '../pages/empresa/Servicos.jsx';
import CriarAgendamento from '../pages/empresa/CriarAgendamento.jsx';
import ConfirmarAgendamentos from '../pages/empresa/ConfirmarAgendamentos.jsx';

// Página compartilhada
import Configuracoes from '../pages/shared/Configuracoes.jsx';

const ROTAS_LOGIN = [
  '/', '/selecao', '/login-empresa', '/login-cliente',
  '/cadastro-empresa', '/cadastro-cliente',
];

const ROTAS_EMPRESA = [
  '/dashboard-empresa', '/empresa/servicos',
  '/empresa/criar-agendamento', '/empresa/confirmar',
];

function ProtectedRouteEmpresa({ children }) {
  const token = localStorage.getItem('token');
  const businessId = localStorage.getItem('businessId');
  if (!token || !businessId) {
    return <Navigate to="/login-empresa" replace />;
  }
  return children;
}

function GerenciadorNavbar() {
  const location = useLocation();
  const path = location.pathname;

  if (ROTAS_EMPRESA.some((r) => path.startsWith(r))) {
    return <NavBarEmpresa />;
  }
  if (ROTAS_LOGIN.includes(path)) {
    return <NavbarLogin />;
  }
  return <Navbar />;
}

function GerenciadorFooter() {
  const location = useLocation();
  const path = location.pathname;

  if (path === '/') return null;

  if (ROTAS_EMPRESA.some((r) => path.startsWith(r))) {
    return <FooterEmpresa />;
  }
  return <Footer />;
}

function AppRoutes({ exibirNeve, setExibirNeve }) {
  return (
    <div className="app-container">
      {exibirNeve && <SnowEffect />}

      <GerenciadorNavbar />

      <Routes>
        {/* Públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/selecao" element={<Home />} />

        {/* Autenticação — compartilhadas */}
        <Route path="/login-cliente" element={<LoginCliente />} />
        <Route path="/cadastro-cliente" element={<CadastroCliente />} />
        <Route path="/login-empresa" element={<LoginEmpresa />} />
        <Route path="/cadastro-empresa" element={<CadastroEmpresa />} />

        {/* Cliente autenticado */}
        <Route path="/dashboard-cliente" element={<DashboardCliente />} />
        <Route path="/agendar" element={<Agendar />} />
        <Route path="/Boas-vindas" element={<WelcomeCard />} />
        <Route
          path="/configuracoes"
          element={
            <Configuracoes
              neveAtiva={exibirNeve}
              setNeveAtiva={setExibirNeve}
            />
          }
        />

        {/* Empresa autenticada */}
        <Route path="/dashboard-empresa" element={<ProtectedRouteEmpresa><DashboardEmpresa /></ProtectedRouteEmpresa>} />
        <Route path="/empresa/servicos" element={<ProtectedRouteEmpresa><Servicos /></ProtectedRouteEmpresa>} />
        <Route path="/empresa/criar-agendamento" element={<ProtectedRouteEmpresa><CriarAgendamento /></ProtectedRouteEmpresa>} />
        <Route path="/empresa/confirmar" element={<ProtectedRouteEmpresa><ConfirmarAgendamentos /></ProtectedRouteEmpresa>} />
      </Routes>

      <GerenciadorFooter />
    </div>
  );
}

export default AppRoutes;
