import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#1d70cf", "#E24B4A", "#FF8904", "#639922"];

const PERIODOS = [
  { label: "Dia",     value: "day" },
  { label: "Semana",  value: "week" },
  { label: "15 dias", value: "15days" },
  { label: "Mês",     value: "month" },
];

function filtrarPorPeriodo(agendamentos, periodo) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  return agendamentos.filter((a) => {
    const data = new Date(a.appointmentDate + "T00:00:00");

    if (periodo === "day") {
      return data.toDateString() === hoje.toDateString();
    }
    if (periodo === "week") {
      const diff = (data - hoje) / (1000 * 60 * 60 * 24);
      return diff >= 0 && diff < 7;
    }
    if (periodo === "15days") {
      const diff = (data - hoje) / (1000 * 60 * 60 * 24);
      return diff >= 0 && diff < 15;
    }
    if (periodo === "month") {
      return (
        data.getMonth() === hoje.getMonth() &&
        data.getFullYear() === hoje.getFullYear()
      );
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

  // Remove categorias zeradas para o gráfico não ficar poluído
  return Object.entries(contagem)
    .filter(([, v]) => v > 0)
    .map(([name, value]) => ({ name, value }));
}

function GraficoPizza() {
  const [periodo, setPeriodo] = useState("month"); // ✅ estado declarado corretamente
  const [todosAgendamentos, setTodosAgendamentos] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const businessId = localStorage.getItem("businessId");

        const response = await fetch(
          `http://localhost:8080/api/appointments/business/${businessId}`,
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

  // Sempre que o período mudar, recalcula os dados sem nova requisição
  useEffect(() => {
    if (todosAgendamentos.length === 0) return;
    setData(montarDados(filtrarPorPeriodo(todosAgendamentos, periodo)));
  }, [periodo, todosAgendamentos]);

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-10">
      <h2 className="text-xl font-bold mb-4">📊 Status dos Agendamentos</h2>

      {/* Botões de período ✅ funcionando */}
      <div className="flex flex-wrap gap-2 mb-4">
        {PERIODOS.map((p) => (
          <button
            key={p.value}
            onClick={() => setPeriodo(p.value)}
            className={`px-5 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-300
              ${periodo === p.value
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-blue-600 hover:text-white"
              }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[300px]">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        </div>
      ) : data.length === 0 ? (
        <div className="flex justify-center items-center h-[300px] text-gray-400">
          Nenhum agendamento neste período
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}> {/* ✅ innerRadius removido daqui */}
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}  
              outerRadius={100}
              label={({ percent }) => `${Math.round(percent * 100)}%`}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default GraficoPizza;