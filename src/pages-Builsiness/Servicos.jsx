import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import ModalServicos from "../components/ModalServicos";
import Footer from "../components/Footer";

function Servicos() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const businessId = localStorage.getItem("businessId");

      const res = await fetch(`http://localhost:8080/api/business/services/${businessId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        setServices(Array.isArray(data) ? data : [data]);
      }
    } catch (err) {
      console.error("Erro ao buscar serviços");
    } finally {
      setLoading(false);
    }
  }

  async function addService(newServiceData) {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/business/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newServiceData),
      });

      if (res.ok) {
        // FORÇA O REFRESH DO BANCO
        await fetchServices(); 
        setShowModal(false);
      }
    } catch (err) {
      alert("Erro ao conectar com o servidor.");
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] text-gray-100 font-sans">
      <NavBar />

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-12">
        {/* Header Estilo Mais Climatização */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Serviços
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-blue-900/20"
          >
            + Novo Serviço
          </button>
        </div>

        {/* Input de Busca Dark */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Pesquisar serviços..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-[#0f172a] border border-gray-800 rounded-2xl outline-none focus:border-blue-500 transition-colors text-gray-200"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>
        ) : services.length === 0 ? (
          /* ÍCONE DE FERRAMENTAS PARA LISTA VAZIA */
          <div className="bg-[#0f172a] rounded-3xl p-20 text-center border border-dashed border-gray-800">
            <div className="text-6xl mb-4">⚙️</div>
            <h2 className="text-xl font-semibold text-gray-400">Nenhum serviço disponível</h2>
          </div>
        ) : (
          /* TABELA ESTILIZADA */
          <div className="bg-[#0f172a] rounded-2xl overflow-hidden border border-gray-800">
            <table className="w-full text-left">
              <thead className="bg-[#1e293b] text-blue-400 text-xs uppercase font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">Nome</th>
                  <th className="px-6 py-4">Preço</th>
                  <th className="px-6 py-4">Duração</th>
                  <th className="px-6 py-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {services.map((s) => (
                  <tr key={s.id} className="hover:bg-blue-900/5 transition-colors">
                    <td className="px-6 py-4 font-medium">{s.serviceName}</td>
                    <td className="px-6 py-4 text-blue-400">R$ {s.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-gray-400">{s.durationInMinutes} min</td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-blue-500 hover:underline mr-4">Editar</button>
                      <button className="text-red-500 hover:underline">Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <ModalServicos 
          close={() => setShowModal(false)} 
          save={addService} 
        />
      )}
      <Footer />
    </div>
  );
}

export default Servicos;