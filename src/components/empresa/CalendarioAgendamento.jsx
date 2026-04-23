import { useState, useEffect } from "react";

const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

function gerarCalendario(ano, mes) {
  const primeiroDia = new Date(ano, mes, 1).getDay();
  const totalDias = new Date(ano, mes + 1, 0).getDate();
  const dias = [];
  for (let i = 0; i < primeiroDia; i++) dias.push(null);
  for (let i = 1; i <= totalDias; i++) dias.push(i);
  return dias;
}

const inputTime =
  "w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition";

function CalendarioAgendamento() {
  const hoje = new Date();
  const [mesAtual, setMesAtual] = useState(hoje.getMonth());
  const [anoAtual, setAnoAtual] = useState(hoje.getFullYear());
  const [diasSelecionados, setDiasSelecionados] = useState([]);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("18:00");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [disponibilidades, setDisponibilidades] = useState([]);

  useEffect(() => {
    fetchDisponibilidades();
  }, []);

  async function fetchDisponibilidades() {
    try {
      const token = localStorage.getItem("token");
      const businessId = localStorage.getItem("businessId");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/business/availability/${businessId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setDisponibilidades(Array.isArray(data) ? data : [data]);
      }
    } catch (err) {
      console.error("Erro ao carregar disponibilidades", err);
    }
  }

  async function deletarDisponibilidade(id) {
    if (!confirm("Deseja remover este horário?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/business/availability/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setDisponibilidades((prev) => prev.filter((d) => d.id !== id));
      }
    } catch {
      alert("Erro ao deletar");
    }
  }

  const toggleDia = (dia) => {
    setDiasSelecionados((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    );
  };

  const formatarDateStr = (dia) =>
    `${anoAtual}-${String(mesAtual + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

  async function salvarDisponibilidade() {
    if (diasSelecionados.length === 0) {
      setFeedback({ tipo: "erro", msg: "Selecione ao menos um dia no calendário." });
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const businessId = localStorage.getItem("businessId");

      await Promise.all(
        diasSelecionados.map((dia) =>
          fetch(`${import.meta.env.VITE_API_URL}/api/business/availability`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({
              date: formatarDateStr(dia),
              startTime: `${startTime}:00`,
              endTime: `${endTime}:00`,
              businessId,
            }),
          })
        )
      );

      setFeedback({ tipo: "sucesso", msg: "Disponibilidade cadastrada com sucesso." });
      setDiasSelecionados([]);
      fetchDisponibilidades();
    } catch {
      setFeedback({ tipo: "erro", msg: "Erro ao salvar no servidor." });
    } finally {
      setLoading(false);
      setTimeout(() => setFeedback(null), 3000);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-5">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Gestão de Horários</h1>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
          Defina os períodos em que sua empresa estará disponível para agendamentos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* CADASTRO */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-5">
            Nova Disponibilidade
          </h2>

          {/* Navegação do calendário */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setMesAtual((m) => (m === 0 ? 11 : m - 1))}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            >
              ‹
            </button>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {MESES[mesAtual]} {anoAtual}
            </span>
            <button
              onClick={() => setMesAtual((m) => (m === 11 ? 0 : m + 1))}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            >
              ›
            </button>
          </div>

          {/* Grid do calendário */}
          <div className="grid grid-cols-7 gap-1 text-center mb-5">
            {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
              <div key={i} className="text-xs text-slate-400 font-semibold py-1">{d}</div>
            ))}
            {gerarCalendario(anoAtual, mesAtual).map((dia, i) => (
              <button
                key={i}
                onClick={() => dia && toggleDia(dia)}
                className={`aspect-square rounded-lg text-xs font-medium transition-all
                  ${!dia ? "invisible" : diasSelecionados.includes(dia)
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
              >
                {dia}
              </button>
            ))}
          </div>

          {/* Horários */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Início</label>
              <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className={inputTime} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Fim</label>
              <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className={inputTime} />
            </div>
          </div>

          {feedback && (
            <div className={`px-3 py-2.5 rounded-lg mb-4 text-xs font-medium
              ${feedback.tipo === "sucesso"
                ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
              {feedback.msg}
            </div>
          )}

          <button
            onClick={salvarDisponibilidade}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Salvando..." : "Liberar Horários"}
          </button>
        </div>

        {/* LISTAGEM */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-5">
            Horários Disponíveis
          </h2>

          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {disponibilidades.length === 0 ? (
              <p className="text-sm text-slate-400 italic">Nenhuma disponibilidade cadastrada.</p>
            ) : (
              disponibilidades.map((d) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {new Date(d.date).toLocaleDateString("pt-BR", { timeZone: "UTC" })}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {d.startTime.substring(0, 5)} – {d.endTime.substring(0, 5)}
                    </p>
                  </div>
                  <button
                    onClick={() => deletarDisponibilidade(d.id)}
                    className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.34 6.6m-3.6 0L10.74 9m4.77-9L21 18.75V19.5a.75.75 0 0 1-.75.75H3.75A.75.75 0 0 1 3 19.5v-.75L9.23 9M11.16 9V4.5a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 .75.75V9" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarioAgendamento;
