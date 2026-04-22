import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo1.png";
import cliente from "../assets/images.jpeg";

function LoginCliente() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  return (
    // Adicionei a classe login-wrapper para pegar o fundo do site
    <div className="login-wrapper" style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem"
    }}>
      <div style={{
        display: "flex",
        width: "100%",
        maxWidth: "900px",
        backgroundColor: "var(--bg-card)",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15)",
        transition: "all 0.4s ease"
      }}>
        
        {/* Lado da Imagem (Aparece em telas maiores) */}
        <div className="hidden-mobile" style={{ 
            width: "45%", 
            position: "relative",
            display: window.innerWidth > 768 ? "block" : "none" 
        }}>
           <img 
            src={cliente} 
            style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "cover",
                filter: "var(--mantine-color-scheme) === 'dark' ? 'brightness(0.7)' : 'none'" 
            }} 
            alt="Pessoa ligando o ar-condicionado" 
           />
        </div>

        {/* Lado do Formulário */}
        <div style={{
          flex: 1,
          padding: "3rem",
          backgroundColor: "var(--bg-form-side)",
          color: "var(--text-main)",
          transition: "background-color 0.4s ease"
        }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <img src={logo} style={{ width: "160px" }} alt="logo" />
          </div>

          <h1 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "0.5rem" }}>Login</h1>
          <p style={{ color: "var(--text-sub)", fontSize: "14px", marginBottom: "2rem" }}>
            Entre com suas credenciais para acessar o painel
          </p>

          <form style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "11px", fontWeight: "bold", opacity: 0.8 }}>E-MAIL</label>
              <input 
                type="email" 
                placeholder="exemplo@clima.com"
                style={{
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid var(--input-border)",
                  backgroundColor: "var(--input-bg)",
                  color: "var(--text-main)",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxShadow: "inset 0 1px 3px rgba(60, 63, 203, 0.5)",
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "11px", fontWeight: "bold", opacity: 0.8 }}>SENHA</label>
              <input 
                type="password" 
                placeholder="Insira sua senha"
                style={{
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid var(--input-border)",
                  backgroundColor: "var(--input-bg)",
                  color: "var(--text-main)",
                  outline: "none",
                  boxShadow: "inset 0 1px 3px rgba(60, 63, 203, 0.5)",
                }}
              />
            </div>

            <button style={{
              marginTop: "1rem",
              padding: "14px",
              backgroundColor: "var(--btn-primary)",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontWeight: "bold",
              fontSize: "14px",
              letterSpacing: "0.5px",
              cursor: "pointer",
              transition: "transform 0.2s active"
            }}>
              ENTRAR
            </button>
          </form>
              {/* Link cadastro */}
            <p className="text-center text-sm text-gray-500 mt-2">
              Não tem uma conta?{" "}
              <Link
                to="/cadastro-cliente"
                className="text-blue-700 font-semibold hover:text-blue-950 transition-colors duration-200"
              >
                Cadastre-se aqui
              </Link>
            </p>

            {/* Divisor */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">ou</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Link cliente */}
            <p className="text-center text-sm text-gray-500"/>
              É um empresario?{" "}
              <Link
                to="/login-empresa"
                className="text-blue-700 font-semibold hover:text-blue-950 transition-colors duration-200"
              >
                Acesse aqui
              </Link>
         
          </div>
        </div>
      </div>
  );
}

export default LoginCliente;