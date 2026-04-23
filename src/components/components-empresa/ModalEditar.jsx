import { useState } from "react";

function ModalEditar({ service, onSalvar, onClose }) {
  const [nome, setNome] = useState(service.serviceName);

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4">Editar Serviço</h2>

        <label className="block mb-1 text-sm font-medium">Nome do serviço</label>
        <input
          type="text"
          className="w-full border p-2 rounded mb-4"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <div className="flex justify-between mt-2">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded cursor-pointer transition-all duration-300"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSalvar(service.id, nome)}
            disabled={!nome}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50 cursor-pointer transition-all duration-300"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalEditar;