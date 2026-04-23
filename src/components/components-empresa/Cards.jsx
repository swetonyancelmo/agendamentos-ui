import { useEffect, useState } from "react";

function Cards() {
  const [totals, setTotals] = useState({
    confirmados: 0,
    pendentes: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTotals() {
      try {
        const token = localStorage.getItem("token");
        const businessId = localStorage.getItem("businessId"); // salve o ID ao fazer login

        const response = await fetch(
          `http://localhost:8080/api/appointments/business/${businessId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error("Erro ao buscar agendamentos");

        const data = await response.json();

        // A API retorna array — calculamos os totais aqui no front
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
    { label: "Clientes agendados", emoji: "📅", value: totals.confirmados },
    { label: "Solicitações Pendentes", emoji: "⏳", value: totals.pendentes },
    { label: "Total de Agendamentos", emoji: "📊", value: totals.total },
  ];

  return (
    // ✅ mt-40 virou mt-24 md:mt-40 — respeitando o tamanho da navbar no mobile
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-24 md:mt-40">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white p-6 py-10 rounded-xl shadow hover:shadow-gray-400 text-center transition-shadow duration-300"
        >
          <h3 className="text-blue-950 font-bold text-lg uppercase mb-5">
            {card.emoji} {card.label}
          </h3>
          <p className="text-4xl text-gray-700 mt-2">
            {loading ? (
              <span className="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
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