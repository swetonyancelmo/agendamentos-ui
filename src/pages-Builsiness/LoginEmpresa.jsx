import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/imgs/logo-climatizacao.jpeg";clearInterval
import tecnico from "../assets/imgs/conc.png.jpeg";

function LoginEmpresa() {
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

      // Salva o token — businessId virá do backend futuramente via /me
      localStorage.setItem("token", data.token);

      // Decodifica o JWT para pegar o businessId sem biblioteca externa
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex min-h-[600px]">

        {/* LADO ESQUERDO — imagem */}
        <div className="hidden md:block flex-1 relative">
          <img
            src={tecnico}
            alt="Técnico de climatização"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-950/40" />
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-white text-2xl font-bold leading-snug">
              Gerencie seus agendamentos com facilidade
            </p>
            <p className="text-blue-200 text-sm mt-2">
              Plataforma completa para empresas de climatização
            </p>
          </div>
        </div>

        {/* LADO DIREITO — formulário */}
        <div className="flex-1 flex flex-col justify-center px-8 py-10 md:px-12">

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src={logo}
              alt="Logo Mais Climatização"
              className="w-48 object-contain"
            />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
            Acesso Empresa
          </h1>
          <p className="text-sm text-gray-500 text-center mb-8">
            Entre com suas credenciais para acessar o painel
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-sm mx-auto">

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                placeholder="exemplo@email.com"
                value={form.email}
                onChange={handleChange}
                required
                className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              />
            </div>

            {/* Senha */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">
                Senha
              </label>
              <input
                type="password"
                name="password"
                placeholder="Insira sua senha"
                value={form.password}
                onChange={handleChange}
                required
                className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              />
            </div>

            {/* Erro */}
            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                {erro}
              </div>
            )}

            {/* Botão entrar */}
            <button
              type="submit"
              disabled={loading}
              className="relative overflow-hidden mt-2 bg-blue-950 hover:bg-blue-800 text-white font-bold py-4 rounded-full transition-all duration-300 disabled:opacity-50 cursor-pointer group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Entrando...
                  </>
                ) : (
                  <>
                    ENTRAR
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                  </>
                )}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            </button>

            {/* Link cadastro */}
            <p className="text-center text-sm text-gray-500 mt-2">
              Não tem uma conta?{" "}
              <Link
                to="/cadastro-empresa"
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
            <p className="text-center text-sm text-gray-500">
              É um cliente?{" "}
              <Link
                to="/login-cliente"
                className="text-blue-700 font-semibold hover:text-blue-950 transition-colors duration-200"
              >
                Acesse aqui
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginEmpresa;