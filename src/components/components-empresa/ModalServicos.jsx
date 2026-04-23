function ModalServicos({ newService, setNewService, addService, close, loading }) {
  function handleChange(e) {
    const { name, value } = e.target;
    setNewService((prev) => ({ ...prev, [name]: value }));
  }

  const isDisabled =
    !newService.serviceName ||
    !newService.price ||
    !newService.durationInMinutes;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={close}
    >
      <div
        className="bg-white p-6 rounded-xl w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4">Novo Serviço</h2>

        <label className="block mb-1 text-sm font-medium">Nome do serviço</label>
        <input
          type="text"
          name="serviceName"
          placeholder="Ex: Instalação de ar condicionado"
          className="w-full border p-2 rounded mb-3"
          value={newService.serviceName}
          onChange={handleChange}
        />

        <label className="block mb-1 text-sm font-medium">Descrição</label>
        <textarea
          name="description"
          placeholder="Descreva o serviço"
          className="w-full border p-2 rounded mb-3"
          value={newService.description}
          onChange={handleChange}
        />

        <label className="block mb-1 text-sm font-medium">Preço (R$)</label>
        <input
          type="number"
          name="price"
          placeholder="Ex: 120"
          className="w-full border p-2 rounded mb-3"
          value={newService.price}
          onChange={handleChange}
        />

        <label className="block mb-1 text-sm font-medium">Duração (minutos)</label>
        <input
          type="number"
          name="durationInMinutes"
          placeholder="Ex: 60"
          className="w-full border p-2 rounded mb-4"
          value={newService.durationInMinutes}
          onChange={handleChange}
        />

        <div className="flex justify-between mt-4">
          <button
            onClick={close}
            className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded cursor-pointer transition-all duration-300"
          >
            Cancelar
          </button>
          <button
            onClick={addService}
            disabled={loading || isDisabled}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50 cursor-pointer transition-all duration-300"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalServicos;