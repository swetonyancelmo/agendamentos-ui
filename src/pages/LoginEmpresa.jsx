import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo1.png";
import tecnico from "../assets/tecnico.jpeg";

function LoginEmpresa() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", email: "", password: "" });
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
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.message || "Email ou senha inválidos.");
        return;
      }

      localStorage.setItem("token", data.token);
      const payload = JSON.parse(atob(data.token.split(".")[1]));
      if (payload.businessId) {
        localStorage.setItem("businessId", payload.businessId);
      }

      navigate("/home");
    } catch {
      setErro("Erro de conexão. Verifique se o servidor está rodando.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#d1e9ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          maxWidth: "900px",
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          overflow: "hidden",
          minHeight: "520px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
        }}
      >
        {/* LADO ESQUERDO — Imagem */}
        <div
          style={{
            width: "45%",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <img
            src={tecnico}
            alt="Técnico de refrigeração"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* LADO DIREITO — Formulário */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "3rem 2.5rem",
            backgroundColor: "#ffffff",
          }}
        >
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <img
              src={logo}
              alt="Logo Mais Climatização"
              style={{ width: "180px", objectFit: "contain" }}
            />
          </div>

          <h1
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#1a1a2e",
              margin: "0 0 4px 0",
            }}
          >
            Login
          </h1>
          <p
            style={{
              fontSize: "13px",
              color: "#6b7280",
              margin: "0 0 1.5rem 0",
            }}
          >
            Entre com suas credenciais para acessar o painel
          </p>

          {/* Campos */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  color: "#374151",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
               
              </label>
             
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  color: "#374151",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                E-mail
              </label>
              <input
                type="email"
                name="email"
                placeholder="exemplo@email.com"
                value={form.email}
                onChange={handleChange}
                required
                style={{
                  padding: "12px 16px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  fontSize: "14px",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  color: "#374151",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Senha
              </label>
              <input
                type="password"
                name="password"
                placeholder="insira sua senha"
                value={form.password}
                onChange={handleChange}
                required
                style={{
                  padding: "12px 16px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  fontSize: "14px",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
              />
            </div>

            {erro && (
              <p style={{ color: "#ef4444", fontSize: "12px", margin: "0" }}>
                {erro}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                marginTop: "8px",
                backgroundColor: loading ? "#93c5fd" : "#2563eb",
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "14px",
                letterSpacing: "1px",
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                width: "100%",
                fontFamily: "inherit",
              }}
            >
              {loading ? "CARREGANDO..." : "ENTRAR"}
            </button>
          </div>

          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <p style={{ fontSize: "12px", color: "#6b7280", margin: "6px 0" }}>
              Não tem uma conta?{" "}
              <Link
                to="/cadastro-empresa"
                style={{ color: "#2563eb", fontWeight: "700", textDecoration: "none" }}
              >
                Cadastre-se aqui
              </Link>
            </p>
            <p style={{ fontSize: "12px", color: "#6b7280", margin: "6px 0" }}>
              É um cliente?{" "}
              <Link
                to="/login-cliente"
                style={{ color: "#2563eb", fontWeight: "700", textDecoration: "none" }}
              >
                Acesse aqui
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginEmpresa;