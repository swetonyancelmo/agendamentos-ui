import { useState, useEffect } from "react";

const STATUS_CONFIG = {
  PENDING:   { label: "Pendente",   style: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  CONFIRMED: { label: "Confirmado", style: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  REJECTED:  { label: "Rejeitado",  style: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
  CANCELLED: { label: "Cancelado",  style: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400" },
  COMPLETED: { label: "Concluído",  style: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
};

const FILTROS = [
  { label: "Todos",       value: "" },
  { label: "Pendentes",   value: "PENDING" },
  { label: "Confirmados", value: "CONFIRMED" },
  { label: "Rejeitados",  value: "REJECTED" },
  { label: "Cancelados",  value: "CANCELLED" },
  { label: "Concluídos",  value: "COMPLETED" },
];

function formatarData(data) {
  if (!data) return "-";
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

function ModalRejeitar({ onConfirmar, onCancelar, loading }) {
  const [motivo, setMotivo] = useState("");
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4" onClick={onCancelar}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">Rejeitar agendamento</h2>
        <p className="text-xs text-slate-400 mb-4">Informe o motivo da rejeição para o cliente</p>
        <textarea
          rows={3}
          placeholder="Ex: Horário indisponível, técnico em férias..."
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 rounded-lg px-3 py-2.5 text-sm placeholder-slate-400 focus:outline-none focus:border-red-400 transition resize-none"
        />
        <div className="flex gap-2 mt-4">
          <button onClick={onCancelar}
            className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium py-2.5 rounded-lg transition cursor-pointer">
            Cancelar
          </button>
          <button onClick={() => onConfirmar(motivo)} disabled={loading}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2.5 rounded-lg transition disabled:opacity-50 cursor-pointer">
            {loading ? "Rejeitando..." : "Confirmar rejeição"}
          </button>
        </div>
      </div>
    </div>
  );
}

function CardAgendamento({ item, onConfirmar, onRejeitar, feedbackId }) {
  const statusInfo = STATUS_CONFIG[item.status] ?? { label: item.status, style: "bg-slate-100 text-slate-600" };
  const isPending = item.status === "PENDING";
  const isFeedback = feedbackId === item.id;

  return (
    <div className={`bg-white dark:bg-slate-900 border rounded-xl p-5 transition-all duration-300
      ${isFeedback ? "border-blue-300 dark:border-blue-700 ring-1 ring-blue-300 dark:ring-blue-700" : "border-slate-200 dark:border-slate-800"}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
            {item.serviceName?.charAt(0).toUpperCase() ?? "S"}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.serviceName}</p>
            <p className="text-xs text-slate-400 mt-0.5">ID: {item.id?.slice(0, 8)}…</p>
          </div>
        </div>
        <span className={`px-2.5 py-0.5 rounded-md text-xs font-medium ${statusInfo.style}`}>
          {statusInfo.label}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4">
        <div>
          <p className="text-xs text-slate-400">Data</p>
          <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-0.5">{formatarData(item.appointmentDate)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Horário</p>
          <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-0.5">{item.startTime} – {item.endTime}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Status</p>
          <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-0.5">{statusInfo.label}</p>
        </div>
      </div>

      {isPending && (
        <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => onConfirmar(item.id)}
            className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition cursor-pointer"
          >
            Confirmar
          </button>
          <button
            onClick={() => onRejeitar(item.id)}
            className="text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-red-300 hover:text-red-600 dark:hover:text-red-400 px-4 py-2 rounded-lg transition cursor-pointer"
          >
            Rejeitar
          </button>
        </div>
      )}
    </div>
  );
}

function ConfirmarAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState("");
  const [busca, setBusca] = useState("");
  const [feedbackId, setFeedbackId] = useState(null);
  const [toast, setToast] = useState(null);
  const [modalRejeitar, setModalRejeitar] = useState(null);
  const [loadingAcao, setLoadingAcao] = useState(false);

  useEffect(() => {
    fetchAgendamentos();
  }, [filtroStatus]);

  async function fetchAgendamentos() {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const businessId = localStorage.getItem("businessId");

      const url = filtroStatus
        ? `${import.meta.env.VITE_API_URL}/api/appointments/business/${businessId}?status=${filtroStatus}`
        : `${import.meta.env.VITE_API_URL}/api/appointments/business/${businessId}`;

      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setAgendamentos(Array.isArray(data) ? data : [data]);
    } catch {
      mostrarToast("Erro ao carregar agendamentos.", "erro");
    } finally {
      setLoading(false);
    }
  }

  async function confirmarAgendamento(id) {
    setLoadingAcao(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/appointments/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: "CONFIRMED" }),
      });
      if (!res.ok) throw new Error();
      setAgendamentos((prev) => prev.map((a) => (a.id === id ? { ...a, status: "CONFIRMED" } : a)));
      setFeedbackId(id);
      mostrarToast("Agendamento confirmado.", "sucesso");
      setTimeout(() => setFeedbackId(null), 3000);
    } catch {
      mostrarToast("Erro ao confirmar.", "erro");
    } finally {
      setLoadingAcao(false);
    }
  }

  async function rejeitarAgendamento(id, motivo) {
    setLoadingAcao(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/appointments/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: "REJECTED", rejectionReason: motivo }),
      });
      if (!res.ok) throw new Error();
      setAgendamentos((prev) => prev.map((a) => (a.id === id ? { ...a, status: "REJECTED" } : a)));
      setModalRejeitar(null);
      mostrarToast("Agendamento rejeitado.", "erro");
    } catch {
      mostrarToast("Erro ao rejeitar agendamento.", "erro");
    } finally {
      setLoadingAcao(false);
    }
  }

  function mostrarToast(msg, tipo) {
    setToast({ msg, tipo });
    setTimeout(() => setToast(null), 4000);
  }

  const agendamentosFiltrados = agendamentos.filter((a) =>
    a.serviceName?.toLowerCase().includes(busca.toLowerCase()) ||
    a.id?.toLowerCase().includes(busca.toLowerCase())
  );

  const pendentes = agendamentos.filter((a) => a.status === "PENDING").length;

  return (
    <main id="main-content" className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {toast && (
        <div className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-lg text-sm font-medium shadow-md border
          ${toast.tipo === "sucesso"
            ? "bg-white dark:bg-slate-900 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
            : "bg-white dark:bg-slate-900 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800"}`}>
          {toast.msg}
        </div>
      )}

      {modalRejeitar && (
        <ModalRejeitar
          loading={loadingAcao}
          onConfirmar={(motivo) => rejeitarAgendamento(modalRejeitar, motivo)}
          onCancelar={() => setModalRejeitar(null)}
        />
      )}

      <div className="max-w-4xl mx-auto px-5 pt-28 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Agendamentos</h1>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
              Gerencie as solicitações dos clientes
            </p>
          </div>
          {pendentes > 0 && (
            <span className="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-lg border border-amber-200 dark:border-amber-800">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
              {pendentes} pendente{pendentes > 1 ? "s" : ""}
            </span>
          )}
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar por serviço ou ID..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-lg text-sm bg-white dark:bg-slate-900 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {FILTROS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFiltroStatus(f.value)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer
                ${filtroStatus === f.value
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400"}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="w-6 h-6 border-2 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
          </div>
        ) : agendamentosFiltrados.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-sm text-slate-400">
            Nenhum agendamento encontrado
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {agendamentosFiltrados.map((item) => (
              <CardAgendamento
                key={item.id}
                item={item}
                feedbackId={feedbackId}
                onConfirmar={confirmarAgendamento}
                onRejeitar={(id) => setModalRejeitar(id)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default ConfirmarAgendamentos;
