import { useState, useEffect } from "react";
import ModalServicos from "../../components/empresa/ModalServicos";

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

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/business/services/${businessId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setServices(Array.isArray(data) ? data : [data]);
      }
    } catch (err) {
      console.error("Erro ao buscar serviços", err);
    } finally {
      setLoading(false);
    }
  }

  async function addService(newServiceData) {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/business/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(newServiceData),
      });

      if (res.ok) {
        await fetchServices();
        setShowModal(false);
      } else {
        alert("Erro ao salvar serviço.");
      }
    } catch {
      alert("Erro ao conectar com o servidor.");
    }
  }

  const servicesFiltrados = services.filter((s) =>
    s.serviceName?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <main id="main-content" className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-5 pt-28 pb-16">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Serviços</h1>
            <p className="text-sm text-slate-600 mt-0.5">Gerencie os serviços oferecidos</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Novo Serviço
          </button>
        </div>

        <div className="mb-5">
          <input
            type="text"
            placeholder="Pesquisar serviços..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-slate-800"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-6 h-6 border-2 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
          </div>
        ) : servicesFiltrados.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-200 rounded-xl p-16 text-center">
            <p className="text-sm text-slate-600">Nenhum serviço disponível</p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-600">Nome</th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-600">Descrição</th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-600">Preço</th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-600">Duração</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {servicesFiltrados.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 text-sm font-medium text-slate-800">{s.serviceName}</td>
                    <td className="px-5 py-4 text-sm text-slate-700">{s.description || "—"}</td>
                    <td className="px-5 py-4 text-sm text-blue-600 font-medium">
                      R$ {Number(s.price).toFixed(2)}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-700">{s.durationInMinutes} min</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <ModalServicos save={addService} close={() => setShowModal(false)} />
      )}
    </main>
  );
}

export default Servicos;
