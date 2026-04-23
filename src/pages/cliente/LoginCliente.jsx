import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/logo1.png";
import cliente from "../../assets/images.jpeg";

function LoginCliente() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/customer/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.message || "Email ou senha inválidos.");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/dashboard-cliente");
    } catch {
      setErro("Erro de conexão. Verifique se o servidor está rodando.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-wrapper">
      <div style={{
        display: "flex", width: "100%", maxWidth: "900px",
        backgroundColor: "var(--bg-card)", borderRadius: "24px",
        overflow: "hidden", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15)",
        transition: "all 0.4s ease"
      }}>
        {/* Lado Imagem */}
        <div style={{
          width: "45%", position: "relative",
          display: window.innerWidth > 768 ? "block" : "none"
        }}>
          <img
            src={cliente}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt="Pessoa ligando o ar-condicionado"
          />
        </div>

        {/* Lado Formulário */}
        <div style={{
          flex: 1, padding: "3rem",
          backgroundColor: "var(--bg-form-side)", color: "var(--text-main)",
          transition: "background-color 0.4s ease"
        }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <img src={logo} style={{ width: "160px" }} alt="logo" />
          </div>

          <h1 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "0.5rem" }}>
            Login Cliente
          </h1>
          <p style={{ color: "var(--text-sub)", fontSize: "14px", marginBottom: "2rem" }}>
            Entre com suas credenciais para acessar
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "11px", fontWeight: "bold", opacity: 0.8 }}>E-MAIL</label>
              <input
                type="email"
                name="email"
                placeholder="exemplo@email.com"
                value={form.email}
                onChange={handleChange}
                required
                style={{
                  padding: "12px 16px", borderRadius: "12px",
                  border: "1px solid var(--input-border)",
                  backgroundColor: "var(--input-bg)", color: "var(--text-main)",
                  outline: "none", transition: "all 0.3s ease",
                  boxShadow: "inset 0 1px 3px rgba(60,63,203,0.5)",
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "11px", fontWeight: "bold", opacity: 0.8 }}>SENHA</label>
              <input
                type="password"
                name="password"
                placeholder="Insira sua senha"
                value={form.password}
                onChange={handleChange}
                required
                style={{
                  padding: "12px 16px", borderRadius: "12px",
                  border: "1px solid var(--input-border)",
                  backgroundColor: "var(--input-bg)", color: "var(--text-main)",
                  outline: "none",
                  boxShadow: "inset 0 1px 3px rgba(60,63,203,0.5)",
                }}
              />
            </div>

            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                {erro}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: "1rem", padding: "14px",
                backgroundColor: "var(--btn-primary)", color: "#fff",
                border: "none", borderRadius: "12px",
                fontWeight: "bold", fontSize: "14px",
                letterSpacing: "0.5px", cursor: "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Entrando..." : "ENTRAR"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Não tem uma conta?{" "}
            <Link to="/cadastro-cliente" className="text-blue-700 font-semibold hover:text-blue-950 transition-colors duration-200">
              Cadastre-se aqui
            </Link>
          </p>

          <div className="flex items-center gap-3 my-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">ou</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <p className="text-center text-sm text-gray-500">
            É uma empresa?{" "}
            <Link to="/login-empresa" className="text-blue-700 font-semibold hover:text-blue-950 transition-colors duration-200">
              Acesse aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginCliente;
