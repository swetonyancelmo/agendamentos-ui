import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

const DIAS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function agruparPorDia(agendamentos) {
  const mapa = {};
  DIAS.forEach((d) => (mapa[d] = { name: d, confirmados: 0, pendentes: 0 }));

  agendamentos.forEach((a) => {
    const dia = DIAS[new Date(a.appointmentDate + "T00:00:00").getDay()];
    if (!mapa[dia]) return;
    if (a.status === "CONFIRMED") mapa[dia].confirmados++;
    if (a.status === "PENDING") mapa[dia].pendentes++;
  });

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
          `${import.meta.env.VITE_API_URL}/api/appointments/business/${businessId}`,
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
    <div className="bg-white border border-slate-200 rounded-xl p-6 mt-4 w-full">
      <div className="mb-5">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-600">
          Agendamentos da Semana
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[280px]">
          <div className="w-6 h-6 border-2 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#475569" }} axisLine={false} tickLine={false} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "#475569" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" }} />
            <Line type="monotone" dataKey="confirmados" stroke="#2563eb" strokeWidth={2} dot={{ r: 3, fill: "#2563eb" }} name="Confirmados" />
            <Line type="monotone" dataKey="pendentes" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3, fill: "#f59e0b" }} name="Pendentes" />
          </LineChart>
        </ResponsiveContainer>
      )}

      <div className="flex items-center gap-5 mt-4">
        <span className="flex items-center gap-1.5 text-xs text-slate-700">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Confirmados
        </span>
        <span className="flex items-center gap-1.5 text-xs text-slate-700">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Pendentes
        </span>
      </div>
    </div>
  );
}

export default Grafico;
