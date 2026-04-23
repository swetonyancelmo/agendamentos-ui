import { useEffect, useState } from "react";

function Cards() {
  const [totals, setTotals] = useState({ confirmados: 0, pendentes: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTotals() {
      try {
        const token = localStorage.getItem("token");
        const businessId = localStorage.getItem("businessId");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/appointments/business/${businessId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!response.ok) throw new Error("Erro ao buscar agendamentos");

        const data = await response.json();
        const confirmados = data.filter((a) => a.status === "CONFIRMED").length;
        const pendentes = data.filter((a) => a.status === "PENDING").length;
        setTotals({ confirmados, pendentes, total: data.length });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchTotals();
  }, []);

  const cards = [
    { label: "Confirmados", value: totals.confirmados, color: "text-blue-600" },
    { label: "Pendentes",   value: totals.pendentes,   color: "text-amber-500" },
    { label: "Total",       value: totals.total,        color: "text-slate-700" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-24 md:mt-36">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white border border-slate-200 rounded-xl p-6 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-3">
            {card.label}
          </p>
          <p className={`text-4xl font-bold ${card.color}`}>
            {loading ? (
              <span className="inline-block w-6 h-6 border-2 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
            ) : (
              card.value
            )}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Cards;
