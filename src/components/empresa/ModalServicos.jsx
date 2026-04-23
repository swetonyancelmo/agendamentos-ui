import { useState } from "react";

const inputClass =
  "w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg px-3 py-2.5 text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition";

function ModalServicos({ save, close }) {
  const [form, setForm] = useState({
    serviceName: "",
    description: "",
    price: "",
    durationInMinutes: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    if (!form.serviceName || !form.price || !form.durationInMinutes) return;
    setLoading(true);
    try {
      await save({
        serviceName: form.serviceName,
        description: form.description,
        price: parseFloat(form.price),
        durationInMinutes: parseInt(form.durationInMinutes, 10),
      });
    } finally {
      setLoading(false);
    }
  }

  const isDisabled = !form.serviceName || !form.price || !form.durationInMinutes;

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      onClick={close}
    >
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Novo Serviço</h2>
          <button
            onClick={close}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Nome do serviço *</label>
            <input type="text" name="serviceName" placeholder="Ex: Instalação de ar condicionado"
              className={inputClass} value={form.serviceName} onChange={handleChange} />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Descrição</label>
            <textarea name="description" placeholder="Descreva o serviço"
              className={`${inputClass} resize-none`} rows={3}
              value={form.description} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Preço (R$) *</label>
              <input type="number" name="price" placeholder="120"
                className={inputClass} value={form.price} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Duração (min) *</label>
              <input type="number" name="durationInMinutes" placeholder="60"
                className={inputClass} value={form.durationInMinutes} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 px-6 py-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={close}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={loading || isDisabled}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-colors cursor-pointer"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalServicos;
