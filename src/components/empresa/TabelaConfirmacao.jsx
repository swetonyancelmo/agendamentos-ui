import { useEffect, useState } from "react";

const STATUS_BADGE = {
  CONFIRMED: <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Confirmado</span>,
  PENDING:   <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Pendente</span>,
  CANCELLED: <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400">Cancelado</span>,
  COMPLETED: <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">Concluído</span>,
  REJECTED:  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">Rejeitado</span>,
};

function TabelaConfirmacao() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);

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

  async function cancelarAgendamento(id) {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${import.meta.env.VITE_API_URL}/api/appointments/${id}/cancel`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      setAgendamentos((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "CANCELLED" } : a))
      );
    } catch (err) {
      console.error(err);
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
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl mt-4 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          Agendamentos Recentes
        </h2>
      </div>

      {agendamentos.length === 0 ? (
        <p className="text-center text-slate-400 text-sm py-10">Nenhum agendamento encontrado</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Serviço</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Data</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Horário</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {agendamentos.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-800 dark:text-slate-200">{item.serviceName}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{formatarData(item.appointmentDate)}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{item.startTime} – {item.endTime}</td>
                  <td className="px-6 py-4">{STATUS_BADGE[item.status]}</td>
                  <td className="px-6 py-4">
                    {item.status === "PENDING" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => confirmarAgendamento(item.id)}
                          className="text-xs font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer"
                        >
                          Confirmar
                        </button>
                        <span className="text-slate-300 dark:text-slate-700">|</span>
                        <button
                          onClick={() => cancelarAgendamento(item.id)}
                          className="text-xs font-medium text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors cursor-pointer"
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <span className="text-sm text-slate-300 dark:text-slate-700">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TabelaConfirmacao;
