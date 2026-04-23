import { useState, useEffect } from "react";
import ModalServicos from "./ModalServicos";
import ModalEditar from "./ModalEditar";
import BotaoPilula from "./BotaoPilula";

function Servicos() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalEditar, setModalEditar] = useState(null);

  const [newService, setNewService] = useState({
    serviceName: "",
    description: "",
    price: "",
    durationInMinutes: "",
  });

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      const token = localStorage.getItem("token");
      const businessId = localStorage.getItem("businessId");

      const response = await fetch(
        `http://localhost:8080/api/business/services/${businessId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.ok) throw new Error("Erro ao buscar serviços");

      const data = await response.json();
      setServices(
        data.map((s) => ({ ...s, active: s.active ?? true }))
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function addService() {
    if (!newService.serviceName) return;

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/business/services",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            serviceName: newService.serviceName,
            description: newService.description,
            price: Number(newService.price),
            durationInMinutes: Number(newService.durationInMinutes),
          }),
        }
      );

      if (!response.ok) throw new Error("Erro ao cadastrar serviço");

      const data = await response.json();
      setServices((prev) => [...prev, { ...data, active: true }]);
      setMessage("Serviço cadastrado com sucesso ✅");
      setNewService({ serviceName: "", description: "", price: "", durationInMinutes: "" });
      setShowModal(false);
    } catch (err) {
      setError("Erro ao cadastrar serviço ❌");
      console.error(err);
    } finally {
      setLoading(false);
      setTimeout(() => { setMessage(""); setError(""); }, 3000);
    }
  }

  async function salvarEdicao(id, novoNome) {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, serviceName: novoNome } : s))
    );
    setModalEditar(null);
  }

  function toggleActive(id) {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  }

  function deleteService(id) {
    setServices((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-10 mt-28">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Seus Serviços</h2>
        <BotaoPilula
          onClick={() => setShowModal(true)}
        >
          + Cadastrar serviço
        </BotaoPilula>
      </div>

      {message && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-3">
          {message}
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-3">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {services.length === 0 && (
          <p className="text-center text-gray-400 py-10">
            Nenhum serviço cadastrado ainda
          </p>
        )}

        {services.map((service) => (
          <div
            key={service.id}
            className="flex justify-between items-center border p-3 rounded-lg"
          >
            <div className="flex-1 min-w-0">
              <p className={`font-medium truncate ${!service.active ? "line-through text-gray-400" : "text-gray-800"}`}>
                {service.serviceName}
              </p>
              <p className="text-sm text-gray-500">
                R$ {Number(service.price).toFixed(2)} · {service.durationInMinutes} min
              </p>
            </div>

            <div className="flex gap-3 ml-3 flex-shrink-0">
              <button
                onClick={() => setModalEditar(service)}
                className="cursor-pointer"
                title="Editar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#1D70CF"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>

              <button
                onClick={() => toggleActive(service.id)}
                className="cursor-pointer"
                title={service.active ? "Desativar" : "Ativar"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke={service.active ? "red" : "green"}
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>

              <button
                onClick={() => deleteService(service.id)}
                className="cursor-pointer"
                title="Excluir"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="gray"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <ModalServicos
          newService={newService}
          setNewService={setNewService}
          addService={addService}
          close={() => setShowModal(false)}
          loading={loading}
        />
      )}

      {modalEditar && (
        <ModalEditar
          service={modalEditar}
          onSalvar={salvarEdicao}
          onClose={() => setModalEditar(null)}
        />
      )}
    </div>
  );
}

export default Servicos;