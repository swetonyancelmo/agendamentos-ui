import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#2563eb", "#ef4444", "#f59e0b", "#22c55e"];

const PERIODOS = [
  { label: "Hoje",    value: "day" },
  { label: "Semana",  value: "week" },
  { label: "15 dias", value: "15days" },
  { label: "Mês",     value: "month" },
];

function filtrarPorPeriodo(agendamentos, periodo) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  return agendamentos.filter((a) => {
    const data = new Date(a.appointmentDate + "T00:00:00");
    if (periodo === "day") return data.toDateString() === hoje.toDateString();
    if (periodo === "week") {
      const diff = (data - hoje) / (1000 * 60 * 60 * 24);
      return diff >= 0 && diff < 7;
    }
    if (periodo === "15days") {
      const diff = (data - hoje) / (1000 * 60 * 60 * 24);
      return diff >= 0 && diff < 15;
    }
    if (periodo === "month") {
      return data.getMonth() === hoje.getMonth() && data.getFullYear() === hoje.getFullYear();
    }
    return true;
  });
}

function montarDados(agendamentos) {
  const contagem = {
    Concluídos:  agendamentos.filter((a) => a.status === "COMPLETED").length,
    Cancelados:  agendamentos.filter((a) => a.status === "CANCELLED").length,
    Pendentes:   agendamentos.filter((a) => a.status === "PENDING").length,
    Confirmados: agendamentos.filter((a) => a.status === "CONFIRMED").length,
  };

  return Object.entries(contagem)
    .filter(([, v]) => v > 0)
    .map(([name, value]) => ({ name, value }));
}

function GraficoPizza() {
  const [periodo, setPeriodo] = useState("month");
  const [todosAgendamentos, setTodosAgendamentos] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const businessId = localStorage.getItem("businessId");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/appointments/business/${businessId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!response.ok) throw new Error("Erro ao buscar agendamentos");

        const agendamentos = await response.json();
        setTodosAgendamentos(agendamentos);
        setData(montarDados(filtrarPorPeriodo(agendamentos, "month")));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (todosAgendamentos.length === 0) return;
    setData(montarDados(filtrarPorPeriodo(todosAgendamentos, periodo)));
  }, [periodo, todosAgendamentos]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 mt-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-600">
          Status dos Agendamentos
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {PERIODOS.map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriodo(p.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer
                ${periodo === p.value
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[280px]">
          <div className="w-6 h-6 border-2 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
        </div>
      ) : data.length === 0 ? (
        <div className="flex justify-center items-center h-[280px] text-slate-600 text-sm">
          Nenhum agendamento neste período
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={105}
              label={({ percent }) => `${Math.round(percent * 100)}%`}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" }} />
            <Legend iconType="circle" iconSize={8} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default GraficoPizza;
