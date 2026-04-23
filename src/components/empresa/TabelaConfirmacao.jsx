import { useEffect, useState } from "react";

const STATUS_BADGE = {
  CONFIRMED: <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700">Confirmado</span>,
  PENDING:   <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-amber-50 text-amber-700">Pendente</span>,
  CANCELLED: <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-red-50 text-red-700">Cancelado</span>,
  COMPLETED: <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-50 text-green-700">Concluído</span>,
  REJECTED:  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600">Rejeitado</span>,
};

function ModalRejeitar({ onConfirmar, onCancelar, loading }) {
  const [motivo, setMotivo] = useState("");
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4" onClick={onCancelar}>
      <div className="bg-white border border-slate-200 rounded-xl p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-sm font-semibold text-slate-800 mb-1">Rejeitar agendamento</h2>
        <p className="text-xs text-slate-600 mb-4">Informe o motivo da rejeição para o cliente</p>
        <textarea
          rows={3}
          placeholder="Ex: Horário indisponível, técnico em férias..."
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:border-red-400 transition resize-none"
        />
        <div className="flex gap-2 mt-4">
          <button
            onClick={onCancelar}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-medium py-2.5 rounded-lg transition cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirmar(motivo)}
            disabled={loading}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2.5 rounded-lg transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Rejeitando..." : "Confirmar rejeição"}
          </button>
        </div>
      </div>
    </div>
  );
}

function TabelaConfirmacao() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalRejeitar, setModalRejeitar] = useState(null);
  const [loadingAcao, setLoadingAcao] = useState(false);

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  async function fetchAgendamentos() {
    try {
      const token = localStorage.getItem("token");
      const businessId = localStorage.getItem("businessId");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/appointments/business/${businessId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.ok) throw new Error("Erro ao buscar agendamentos");

      const data = await response.json();
      setAgendamentos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function confirmarAgendamento(id) {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${import.meta.env.VITE_API_URL}/api/appointments/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: "CONFIRMED" }),
      });
      setAgendamentos((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "CONFIRMED" } : a))
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function rejeitarAgendamento(id, motivo) {
    setLoadingAcao(true);
    try {
      const token = localStorage.getItem("token");
      await fetch(`${import.meta.env.VITE_API_URL}/api/appointments/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: "REJECTED", rejectionReason: motivo }),
      });
      setAgendamentos((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "REJECTED" } : a))
      );
      setModalRejeitar(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAcao(false);
    }
  }

  function formatarData(data) {
    if (!data) return "-";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-6 h-6 border-2 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {modalRejeitar && (
        <ModalRejeitar
          loading={loadingAcao}
          onConfirmar={(motivo) => rejeitarAgendamento(modalRejeitar, motivo)}
          onCancelar={() => setModalRejeitar(null)}
        />
      )}

      <div className="bg-white border border-slate-200 rounded-xl mt-4 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-600">
            Agendamentos Recentes
          </h2>
        </div>

        {agendamentos.length === 0 ? (
          <p className="text-center text-slate-600 text-sm py-10">Nenhum agendamento encontrado</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">Serviço</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">Data</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">Horário</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {agendamentos.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">{item.serviceName}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{formatarData(item.appointmentDate)}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{item.startTime} – {item.endTime}</td>
                    <td className="px-6 py-4">{STATUS_BADGE[item.status]}</td>
                    <td className="px-6 py-4">
                      {item.status === "PENDING" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => confirmarAgendamento(item.id)}
                            className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                          >
                            Confirmar
                          </button>
                          <span className="text-slate-700">|</span>
                          <button
                            onClick={() => setModalRejeitar(item.id)}
                            className="text-xs font-medium text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                          >
                            Rejeitar
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm text-slate-700">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default TabelaConfirmacao;
