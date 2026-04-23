import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/logo1.png";
import cliente from "../../assets/images.jpeg";

function CadastroCliente() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", phone: "", email: "", password: "", confirmarSenha: "",
  });
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function formatarTelefone(valor) {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);
    if (numeros.length <= 2) return `(${numeros}`;
    if (numeros.length <= 7) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  }

  function handleTelefone(e) {
    setForm((prev) => ({ ...prev, phone: formatarTelefone(e.target.value) }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (form.password !== form.confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }
    if (form.password.length < 6) {
      setErro("A senha deve ter ao menos 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/customer/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone.replace(/\D/g, ""),
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.message || "Erro ao cadastrar cliente.");
        return;
      }

      setSucesso("Cadastro realizado com sucesso! Redirecionando...");
      setTimeout(() => navigate("/login-cliente"), 2000);
    } catch {
      setErro("Erro de conexão. Verifique se o servidor está rodando.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-wrapper">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex min-h-[600px]">

        {/* LADO ESQUERDO — imagem */}
        <div className="hidden md:block flex-1 relative">
          <img src={cliente} alt="Cliente" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-blue-950/40" />
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-white text-2xl font-bold leading-snug">
              Agende serviços com facilidade
            </p>
            <p className="text-blue-200 text-sm mt-2">
              Plataforma de climatização para sua casa e empresa
            </p>
          </div>
        </div>

        {/* LADO DIREITO — formulário */}
        <div className="flex-1 flex flex-col justify-center px-8 py-10 md:px-12 overflow-y-auto">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="w-40 object-contain" />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 text-center mb-1">Cadastro de Cliente</h1>
          <p className="text-sm text-gray-500 text-center mb-6">Preencha os dados para criar sua conta</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm mx-auto">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">Nome completo</label>
              <input
                type="text" name="name" placeholder="Ex: João Gustavo da Silva"
                value={form.name} onChange={handleChange} required
                className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">Telefone</label>
              <input
                type="tel" name="phone" placeholder="(11) 98765-4321"
                value={form.phone} onChange={handleTelefone} required
                className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">E-mail</label>
              <input
                type="email" name="email" placeholder="contato@email.com"
                value={form.email} onChange={handleChange} required
                className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">Senha</label>
              <input
                type="password" name="password" placeholder="Mínimo 6 caracteres"
                value={form.password} onChange={handleChange} required
                className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">Confirmar senha</label>
              <input
                type="password" name="confirmarSenha" placeholder="Repita a senha"
                value={form.confirmarSenha} onChange={handleChange} required
                className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                {erro}
              </div>
            )}
            {sucesso && (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl">
                {sucesso}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              className="relative overflow-hidden mt-1 bg-blue-950 hover:bg-blue-800 text-white font-bold py-4 rounded-full transition-all duration-300 disabled:opacity-50 cursor-pointer group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Cadastrando...
                  </>
                ) : "CADASTRAR"}
              </span>
              <span className="absolute inset-0 bg-linear-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            </button>

            <p className="text-center text-sm text-gray-500 mt-1">
              Já tem uma conta?{" "}
              <Link to="/login-cliente" className="text-blue-700 font-semibold hover:text-blue-950 transition-colors duration-200">
                Faça login aqui
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastroCliente;
