import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const STATUS_CONFIG = {
  PENDING:   { label: "Pendente",   classe: "bg-orange-100 text-orange-700" },
  CONFIRMED: { label: "Confirmado", classe: "bg-green-100 text-green-700" },
  REJECTED:  { label: "Rejeitado",  classe: "bg-red-100 text-red-700" },
  CANCELLED: { label: "Cancelado",  classe: "bg-gray-100 text-gray-600" },
  COMPLETED: { label: "Concluído",  classe: "bg-blue-100 text-blue-700" },
};

const FILTROS = [
  { label: "Todos",      value: "" },
  { label: "Pendentes",  value: "PENDING" },
  { label: "Confirmados",value: "CONFIRMED" },
  { label: "Rejeitados", value: "REJECTED" },
  { label: "Cancelados", value: "CANCELLED" },
  { label: "Concluídos", value: "COMPLETED" },
];

function formatarData(data) {
  if (!data) return "-";
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

function ModalRejeitar({ onConfirmar, onCancelar, loading }) {
  const [motivo, setMotivo] = useState("");

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
      onClick={onCancelar}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          Rejeitar agendamento
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Informe o motivo da rejeição para o cliente
        </p>

        <textarea
          rows={3}
          placeholder="Ex: Horário indisponível, técnico em férias..."
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition resize-none"
        />

        <div className="flex gap-3 mt-5">
          <button
            onClick={onCancelar}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-full transition-all duration-200 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirmar(motivo)}
            disabled={loading}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-full transition-all duration-200 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Rejeitando...
              </span>
            ) : (
              "Confirmar rejeição"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function CardAgendamento({ item, onConfirmar, onRejeitar, feedbackId }) {
  const statusInfo = STATUS_CONFIG[item.status] ?? { label: item.status, classe: "bg-gray-100 text-gray-600" };
  const isPending = item.status === "PENDING";
  const isFeedback = feedbackId === item.id;

  return (
    <div className={`bg-white border rounded-2xl p-5 shadow-sm transition-all duration-300 ${isFeedback ? "ring-2 ring-green-400" : "border-gray-100 hover:shadow-md"}`}>
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-blue-950 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {item.serviceName?.charAt(0).toUpperCase() ?? "S"}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{item.serviceName}</p>
            <p className="text-xs text-gray-400 mt-0.5">ID: {item.id?.slice(0, 8)}...</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.classe}`}>
          {statusInfo.label}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
        <div>
          <p className="text-xs text-gray-400">Data</p>
          <p className="text-sm font-medium text-gray-700 mt-0.5">
            {formatarData(item.appointmentDate)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Horário</p>
          <p className="text-sm font-medium text-gray-700 mt-0.5">
            {item.startTime} - {item.endTime}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Status</p>
          <p className="text-sm font-medium text-gray-700 mt-0.5">
            {statusInfo.label}
          </p>
        </div>
      </div>

      {isPending && (
        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 flex-wrap">
          <button
            onClick={() => onConfirmar(item.id)}
            className="flex items-center gap-1.5 bg-blue-950 hover:bg-blue-800 text-white text-sm font-medium px-5 py-2 rounded-full transition-all duration-300 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Confirmar
          </button>
          <button
            onClick={() => onRejeitar(item.id)}
            className="flex items-center gap-1.5 border border-red-300 text-red-600 hover:bg-red-600 hover:text-white text-sm font-medium px-5 py-2 rounded-full transition-all duration-300 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Rejeitar
          </button>
        </div>
      )}

      {!isPending && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            {item.status === "CONFIRMED" && "✔ Agendamento confirmado"}
            {item.status === "REJECTED"  && "✖ Agendamento rejeitado"}
            {item.status === "CANCELLED" && "✖ Cancelado pelo cliente"}
            {item.status === "COMPLETED" && "✔ Serviço concluído"}
          </p>
        </div>
      )}
    </div>
  );
}

function ConfirmarAgendamentos() {
  const navigate = useNavigate();

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
        ? `http://localhost:8080/api/appointments/business/${businessId}?status=${filtroStatus}`
        : `http://localhost:8080/api/appointments/business/${businessId}`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

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

      const res = await fetch(
        `http://localhost:8080/api/appointments/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "CONFIRMED" }),
        }
      );

      if (!res.ok) throw new Error();

      setAgendamentos((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "CONFIRMED" } : a))
      );

      setFeedbackId(id);
      mostrarToast("Agendamento confirmado com sucesso! ✅", "sucesso");
      setTimeout(() => setFeedbackId(null), 3000);
    } catch {
      mostrarToast("Erro ao confirmar agendamento. ❌", "erro");
    } finally {
      setLoadingAcao(false);
    }
  }

  async function rejeitarAgendamento(id, motivo) {
    setLoadingAcao(true);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:8080/api/appointments/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: "REJECTED",
            rejectionReason: motivo,
          }),
        }
      );

      if (!res.ok) throw new Error();

      setAgendamentos((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "REJECTED" } : a))
      );

      setModalRejeitar(null);
      mostrarToast("Agendamento rejeitado. ❌", "erro");
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
    <div className="min-h-screen bg-slate-50">
      <NavBar />

      {/* Toast */}
      {toast && (
        <div className={`fixed top-24 right-4 z-50 px-5 py-3 rounded-2xl shadow-lg text-sm font-medium transition-all duration-300
          ${toast.tipo === "sucesso"
            ? "bg-green-100 text-green-700 border border-green-200"
            : "bg-red-100 text-red-700 border border-red-200"}`}
        >
          {toast.msg}
        </div>
      )}

      {/* Modal rejeitar */}
      {modalRejeitar && (
        <ModalRejeitar
          loading={loadingAcao}
          onConfirmar={(motivo) => rejeitarAgendamento(modalRejeitar, motivo)}
          onCancelar={() => setModalRejeitar(null)}
        />
      )}

      <div className="max-w-5xl mx-auto px-4 pt-32 pb-12">

        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Confirmações</h1>
            <p className="text-sm text-gray-500 mt-1">
              Gerencie as solicitações de agendamento dos clientes
            </p>
          </div>
          {pendentes > 0 && (
            <div className="flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              {pendentes} pendente{pendentes > 1 ? "s" : ""}
            </div>
          )}
        </div>

        {/* Busca */}
        <div className="relative mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por serviço ou ID..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-white"
          />
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FILTROS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFiltroStatus(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer
                ${filtroStatus === f.value
                  ? "bg-blue-950 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-blue-950 hover:text-blue-950"}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Conteúdo */}
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-950 rounded-full animate-spin" />
          </div>
        ) : agendamentosFiltrados.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-60 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-3 text-gray-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            <p className="text-sm">Nenhum agendamento encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
    </div>
  );
}

export default ConfirmarAgendamentos;