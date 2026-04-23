import { useEffect, useState } from "react";

function ListaClientes() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchAgendamentos();
  }, []);

  function formatarData(data) {
    if (!data) return "-";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  function badgeStatus(status) {
    const estilos = {
      CONFIRMED: "bg-green-100 text-green-700",
      PENDING: "bg-orange-100 text-orange-700",
      CANCELLED: "bg-red-100 text-red-700",
      COMPLETED: "bg-blue-100 text-blue-700",
      REJECTED: "bg-gray-100 text-gray-600",
    };
    const labels = {
      CONFIRMED: "Confirmado",
      PENDING: "Pendente",
      CANCELLED: "Cancelado",
      COMPLETED: "Concluído",
      REJECTED: "Rejeitado",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${estilos[status] ?? "bg-gray-100 text-gray-500"}`}>
        {labels[status] ?? status}
      </span>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-10">
      <h2 className="text-xl font-bold mb-2">Agendamentos por Serviço</h2>
      <p className="text-gray-500 mb-6 text-sm">
        Lista de agendamentos registrados na plataforma.
        Os dados completos dos clientes estarão disponíveis em breve.
      </p>

      {agendamentos.length === 0 ? (
        <p className="text-center text-gray-400 py-10">
          Nenhum agendamento encontrado
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {agendamentos.map((agendamento) => (
            <div
              key={agendamento.id}
              className="border border-gray-200 rounded-xl p-4 flex justify-between items-start gap-3"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 truncate">
                  {agendamento.serviceName}
                </h3>

                <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 flex-shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                    />
                  </svg>
                  {formatarData(agendamento.appointmentDate)}
                </p>

                <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 flex-shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  {agendamento.startTime} - {agendamento.endTime}
                </p>
              </div>

              <div className="flex-shrink-0">
                {badgeStatus(agendamento.status)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListaClientes;