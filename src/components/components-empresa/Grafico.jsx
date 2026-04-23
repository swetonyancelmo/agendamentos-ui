import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DIAS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function agruparPorDia(agendamentos) {
  // Monta objeto com todos os dias zerados
  const mapa = {};
  DIAS.forEach((d) => (mapa[d] = { name: d, confirmados: 0, pendentes: 0 }));

  agendamentos.forEach((a) => {
    // appointmentDate vem como "2026-04-13"
    const dia = DIAS[new Date(a.appointmentDate + "T00:00:00").getDay()];
    if (!mapa[dia]) return;

    if (a.status === "CONFIRMED") mapa[dia].confirmados++;
    if (a.status === "PENDING") mapa[dia].pendentes++;
  });

  // Retorna na ordem certa (Seg → Sáb)
  return [1, 2, 3, 4, 5, 6, 0].map((i) => mapa[DIAS[i]]);
}

function Grafico() {
  const [data, setData] = useState(
    DIAS.map((d) => ({ name: d, confirmados: 0, pendentes: 0 }))
  );
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
        setData(agruparPorDia(agendamentos));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-10 w-full">
      <h2 className="text-xl font-bold mb-4">📈 Agendamentos da Semana</h2>

      {loading ? (
        <div className="flex justify-center items-center h-[300px]">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="confirmados"
              stroke="#003366"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="pendentes"
              stroke="#FF8904"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}

      {/* Legenda */}
      <div className="flex items-center justify-center gap-6 mt-5">
        <span className="flex items-center gap-2 text-sm font-medium text-[#003366]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="#003366" className="w-5 h-5">  
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
          </svg>
          Confirmados
        </span>

        <span className="flex items-center gap-2 text-sm font-medium text-[#FF8904]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="#FF8904" className="w-5 h-5">  
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
          </svg>
          Pendentes
        </span>
      </div>
    </div>
  );
}

export default Grafico;
