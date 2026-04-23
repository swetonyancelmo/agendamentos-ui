import { useEffect, useState } from "react";

function TabelaConfirmacao() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  async function fetchAgendamentos() {
    try {
      const token = localStorage.getItem("token");
      const businessId = localStorage.getItem("businessId");

      const response = await fetch(
        `http://localhost:8080/api/appointments/business/${businessId}`,
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

  async function confirmarAgendamento(id) {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
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

      if (!response.ok) throw new Error("Erro ao confirmar");

      setAgendamentos((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "CONFIRMED" } : a))
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function cancelarAgendamento(id) {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8080/api/appointments/${id}/cancel`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Erro ao cancelar");

      setAgendamentos((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "CANCELLED" } : a))
      );
    } catch (err) {
      console.error(err);
    }
  }

  function formatarData(data) {
    if (!data) return "-";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-10 border border-gray-100">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Agendamentos Recentes
        </h2>
        <p className="text-sm text-gray-500">
          Gerencie e acompanhe seus próximos agendamentos
        </p>
      </div>

      {agendamentos.length === 0 ? (
        <p className="text-center text-gray-400 py-10">
          Nenhum agendamento encontrado
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="text-gray-400 text-sm uppercase tracking-wide border-b">
                <th className="py-3 text-center">Serviço</th>
                <th className="py-3 text-center">Data</th>
                <th className="py-3 text-center">Horário</th>
                <th className="py-3 text-center">Status</th>
                <th className="py-3 text-center">Ações</th>
              </tr>
            </thead>

            <tbody>
              {agendamentos.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-4 font-medium text-gray-800 text-center">
                    {item.serviceName}
                  </td>

                  <td className="py-4 text-gray-600 text-center">
                    {formatarData(item.appointmentDate)}
                  </td>

                  <td className="py-4 text-gray-600 text-center">
                    {item.startTime} - {item.endTime}
                  </td>

                  <td className="py-4 text-center">
                    {item.status === "CONFIRMED" && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Confirmado
                      </span>
                    )}
                    {item.status === "PENDING" && (
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                        Pendente
                      </span>
                    )}
                    {item.status === "CANCELLED" && (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                        Cancelado
                      </span>
                    )}
                    {item.status === "COMPLETED" && (
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        Concluído
                      </span>
                    )}
                    {item.status === "REJECTED" && (
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                        Rejeitado
                      </span>
                    )}
                  </td>

                  <td className="py-4">
                    <div className="flex gap-2 justify-center">
                      {item.status === "PENDING" ? (
                        <>
                          <button
                            onClick={() => confirmarAgendamento(item.id)}
                            className="bg-blue-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-1 cursor-pointer transition-all duration-300"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                            Confirmar
                          </button>

                          <button
                            onClick={() => cancelarAgendamento(item.id)}
                            className="bg-orange-400 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-1 cursor-pointer transition-all duration-300"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <span className="text-sm text-gray-400">
                          {item.status === "CONFIRMED" && "✔ Confirmado"}
                          {item.status === "CANCELLED" && "✖ Cancelado"}
                          {item.status === "COMPLETED" && "✔ Concluído"}
                          {item.status === "REJECTED" && "✖ Rejeitado"}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TabelaConfirmacao;