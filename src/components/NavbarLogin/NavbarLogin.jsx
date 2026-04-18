import Logo from '../../assets/logo1.png';
import { useNavigate } from 'react-router-dom';

function NavbarLogin() { // Adicionado os parênteses () aqui
  const navigate = useNavigate(); // Hook necessário para o clique dos botões funcionar

  return (
    <nav style={{
      display: "flex", 
      alignItems: "center", 
      justifyContent: "space-between",
      padding: "5px 30px", 
      backgroundColor: "transparent",
      width: "100%",
      borderBottom: "0.5px solid rgba(255,255,255,0.12)",
      borderLeft: "0.5px solid rgba(255,255,255,0.12)",
      boxShadow: "15px 5px 15px rgba(0, 0, 0, 0.1)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div>
         <img src={Logo} alt="Logo Mais Refrigeração" className="logo" width={140} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 15 }}>
        <button onClick={() => navigate("/seleção")} style={{
          padding: "8px 20px", 
          border: "1px solid rgba(255,255,255,0.4)",
          borderRadius: 8, 
          color: "#000000", 
          fontSize: 13, 
          background: "#a0abc2", 
          cursor: "pointer",
          border: "none",
          fontWeight: 600,
          boxShadow: "0 4px 6px rgba(37, 99, 235, 0.3)"
        }}>Entrar</button>

        <button onClick={() => navigate("/seleção")} style={{ // Corrigido o "ç" aqui
          padding: "8px 20px", 
          borderRadius: 8, 
          color: "#000000",
          fontSize: 13, 
          background: "#2563EB", 
          border: "none", 
          cursor: "pointer", 
          fontWeight: 600,
          boxShadow: "0 4px 6px rgba(37, 99, 235, 0.3)"
        }}>Cadastrar</button>
      </div>
    </nav>
  );
}

export default NavbarLogin;