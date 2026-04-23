import { useEffect, useState } from "react";

const STATUS_STYLES = {
  CONFIRMED: "bg-blue-50 text-blue-700",
  PENDING:   "bg-amber-50 text-amber-700",
  CANCELLED: "bg-red-50 text-red-700",
  COMPLETED: "bg-green-50 text-green-700",
  REJECTED:  "bg-slate-100 text-slate-600",
};

const STATUS_LABELS = {
  CONFIRMED: "Confirmado", PENDING: "Pendente",
  CANCELLED: "Cancelado",  COMPLETED: "Concluído", REJECTED: "Rejeitado",
};

function ListaClientes() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchAgendamentos();
  }, []);

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
    <div className="bg-white border border-slate-200 rounded-xl mt-4 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-600">
          Agendamentos por Serviço
        </h2>
      </div>

      {agendamentos.length === 0 ? (
        <p className="text-center text-slate-600 text-sm py-10">Nenhum agendamento encontrado</p>
      ) : (
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {agendamentos.map((agendamento) => (
            <div
              key={agendamento.id}
              className="flex items-start justify-between gap-3 px-6 py-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">
                  {agendamento.serviceName}
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  {formatarData(agendamento.appointmentDate)} · {agendamento.startTime} – {agendamento.endTime}
                </p>
              </div>
              <span className={`flex-shrink-0 px-2.5 py-0.5 rounded-md text-xs font-medium ${STATUS_STYLES[agendamento.status] ?? "bg-slate-100 text-slate-700"}`}>
                {STATUS_LABELS[agendamento.status] ?? agendamento.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListaClientes;
