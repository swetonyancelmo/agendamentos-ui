import { useState, useEffect } from "react";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    fetchClientes();
  }, []);

  async function fetchClientes() {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/customers`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setClientes(Array.isArray(data) ? data : [data]);
    } catch {
      setErro("Erro ao carregar clientes. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function getIniciais(nome) {
    if (!nome) return "?";
    const partes = nome.trim().split(" ");
    if (partes.length === 1) return partes[0].charAt(0).toUpperCase();
    return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase();
  }

  const clientesFiltrados = clientes.filter(
    (c) =>
      c.name?.toLowerCase().includes(busca.toLowerCase()) ||
      c.email?.toLowerCase().includes(busca.toLowerCase()) ||
      c.phone?.includes(busca)
  );

  return (
    <main id="main-content" className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-5 pt-28 pb-16">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Clientes</h1>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
              Clientes que já realizaram serviços
            </p>
          </div>
          <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold px-3 py-1.5 rounded-lg">
            {clientes.length} cliente{clientes.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="relative mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
            className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por nome, e-mail ou telefone..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-lg text-sm bg-white dark:bg-slate-900 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          />
        </div>

        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-5">{erro}</div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="w-6 h-6 border-2 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
          </div>
        ) : clientesFiltrados.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-sm text-slate-400">
            {busca ? "Nenhum cliente encontrado para essa busca" : "Nenhum cliente cadastrado ainda"}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full min-w-[500px]">
              <thead className="border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-3.5 px-5 text-left text-xs font-semibold text-slate-400 uppercase tracking-widest">Cliente</th>
                  <th className="py-3.5 px-5 text-left text-xs font-semibold text-slate-400 uppercase tracking-widest">E-mail</th>
                  <th className="py-3.5 px-5 text-left text-xs font-semibold text-slate-400 uppercase tracking-widest">Telefone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {clientesFiltrados.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {getIniciais(cliente.name)}
                        </div>
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{cliente.name ?? "-"}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-sm text-slate-500 dark:text-slate-400">{cliente.email ?? "-"}</td>
                    <td className="py-3.5 px-5 text-sm text-slate-500 dark:text-slate-400">{cliente.phone ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-400">
                {clientesFiltrados.length} de {clientes.length} cliente{clientes.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Clientes;
