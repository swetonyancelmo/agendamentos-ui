import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

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

      const res = await fetch("http://localhost:8080/api/customers", {
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
    <div className="min-h-screen bg-slate-50">
      <NavBar />

      <div className="max-w-5xl mx-auto px-4 pt-32 pb-12">

        {/* Cabeçalho */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-blue-950 flex items-center justify-center flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Clientes que já realizaram serviços com sua empresa
            </p>
          </div>
          <div className="ml-auto bg-blue-950 text-white text-sm font-semibold px-4 py-2 rounded-full">
            {clientes.length} cliente{clientes.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Busca */}
        <div className="relative mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="text"
            placeholder="Buscar por nome, e-mail ou telefone..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
          />
        </div>

        {/* Erro */}
        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-2xl mb-6">
            {erro}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-950 rounded-full animate-spin" />
          </div>
        ) : clientesFiltrados.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-60 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 mb-3 text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <p className="text-sm">
              {busca ? "Nenhum cliente encontrado para essa busca" : "Nenhum cliente cadastrado ainda"}
            </p>
          </div>
        ) : (
          /* Tabela */
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[540px]">
                <thead>
                  <tr className="border-b border-gray-100 bg-slate-50">
                    <th className="py-4 px-5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      Cliente
                    </th>
                    <th className="py-4 px-5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      E-mail
                    </th>
                    <th className="py-4 px-5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      Telefone
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {clientesFiltrados.map((cliente) => (
                    <tr
                      key={cliente.id}
                      className="hover:bg-slate-50 transition-colors duration-150"
                    >
                      {/* Nome + avatar */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-950 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {getIniciais(cliente.name)}
                          </div>
                          <span className="font-medium text-gray-800 text-sm">
                            {cliente.name ?? "-"}
                          </span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-1.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 text-gray-400 flex-shrink-0"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                            />
                          </svg>
                          <span className="text-sm text-gray-600 truncate max-w-[200px]">
                            {cliente.email ?? "-"}
                          </span>
                        </div>
                      </td>

                      {/* Telefone */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-1.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 text-gray-400 flex-shrink-0"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                            />
                          </svg>
                          <span className="text-sm text-gray-600">
                            {cliente.phone ?? "-"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Rodapé da tabela */}
            <div className="px-5 py-3 border-t border-gray-100 bg-slate-50">
              <p className="text-xs text-gray-400">
                Mostrando {clientesFiltrados.length} de {clientes.length} cliente{clientes.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Clientes;