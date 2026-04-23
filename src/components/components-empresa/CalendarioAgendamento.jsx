import { useState, useEffect } from "react";
import NavBar from "./NavBar";

const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

function gerarCalendario(ano, mes) {
  const primeiroDia = new Date(ano, mes, 1).getDay();
  const totalDias = new Date(ano, mes + 1, 0).getDate();
  const dias = [];
  for (let i = 0; i < primeiroDia; i++) dias.push(null);
  for (let i = 1; i <= totalDias; i++) dias.push(i);
  return dias;
}

function Disponibilidade() {
  const hoje = new Date();
  const [mesAtual, setMesAtual] = useState(hoje.getMonth());
  const [anoAtual, setAnoAtual] = useState(hoje.getFullYear());
  const [diasSelecionados, setDiasSelecionados] = useState([]);
  
  // Novos estados para horário de início e fim
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("18:00");

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [disponibilidades, setDisponibilidades] = useState([]);

  useEffect(() => {
    fetchDisponibilidades();
  }, []);

  async function fetchDisponibilidades() {
    try {
      const token = localStorage.getItem("token");
      const businessId = localStorage.getItem("businessId");
      const res = await fetch(`http://localhost:8080/api/business/availability/${businessId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setDisponibilidades(Array.isArray(data) ? data : [data]);
      }
    } catch (err) {
      console.error("Erro ao carregar disponibilidades", err);
    }
  }

  async function deletarDisponibilidade(id) {
    if (!confirm("Deseja remover este horário disponível?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/api/business/availability/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setDisponibilidades(prev => prev.filter(d => d.id !== id));
      }
    } catch (err) {
      alert("Erro ao deletar");
    }
  }

  const toggleDia = (dia) => {
    setDiasSelecionados(prev =>
      prev.includes(dia) ? prev.filter(d => d !== dia) : [...prev, dia]
    );
  };

  const formatarDateStr = (dia) => {
    return `${anoAtual}-${String(mesAtual + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
  };

  async function salvarDisponibilidade() {
    if (diasSelecionados.length === 0) {
      setFeedback({ tipo: "erro", msg: "Selecione ao menos um dia no calendário." });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const businessId = localStorage.getItem("businessId");

      // Criar um payload para cada dia selecionado conforme o endpoint POST
      const promises = diasSelecionados.map(dia => {
        const payload = {
          date: formatarDateStr(dia),
          startTime: `${startTime}:00`,
          endTime: `${endTime}:00`,
          businessId: businessId
        };

        return fetch("http://localhost:8080/api/business/availability", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      });

      await Promise.all(promises);
      
      setFeedback({ tipo: "sucesso", msg: "Disponibilidade cadastrada com sucesso!" });
      setDiasSelecionados([]);
      fetchDisponibilidades();
    } catch (err) {
      setFeedback({ tipo: "erro", msg: "Erro ao salvar no servidor." });
    } finally {
      setLoading(false);
      setTimeout(() => setFeedback(null), 3000);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 pt-32 pb-12 transition-colors">
      <NavBar />
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-blue-400">Gestão de Horários</h1>
          <p className="text-gray-500 dark:text-gray-400">Defina os períodos em que sua empresa estará aberta para agendamentos.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* COLUNA DE CADASTRO */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 className="text-lg font-semibold mb-4 dark:text-white">Nova Disponibilidade</h2>
            
            {/* Calendário Simplificado */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <button onClick={() => setMesAtual(m => m === 0 ? 11 : m - 1)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">←</button>
                <span className="font-bold dark:text-white">{MESES[mesAtual]} {anoAtual}</span>
                <button onClick={() => setMesAtual(m => m === 11 ? 0 : m + 1)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">→</button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {["D","S","T","Q","Q","S","S"].map(d => <div key={d} className="text-xs text-gray-400 font-bold">{d}</div>)}
                {gerarCalendario(anoAtual, mesAtual).map((dia, i) => (
                  <button
                    key={i}
                    onClick={() => dia && toggleDia(dia)}
                    className={`aspect-square rounded-full text-sm font-medium transition-all
                      ${!dia ? "invisible" : diasSelecionados.includes(dia) 
                        ? "bg-blue-600 text-white shadow-lg scale-110" 
                        : "text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-gray-800"}`}
                  >
                    {dia}
                  </button>
                ))}
              </div>
            </div>

            {/* Seleção de Horário de Turno */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Início do Turno</label>
                <input 
                  type="time" 
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-lg p-2 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Fim do Turno</label>
                <input 
                  type="time" 
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-lg p-2 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {feedback && (
              <div className={`p-3 rounded-lg mb-4 text-sm font-medium ${feedback.tipo === "sucesso" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {feedback.msg}
              </div>
            )}

            <button
              onClick={salvarDisponibilidade}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all disabled:opacity-50"
            >
              {loading ? "Processando..." : "Liberar Horários"}
            </button>
          </div>

          {/* COLUNA DE LISTAGEM (O QUE JÁ FOI CADASTRADO) */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 className="text-lg font-semibold mb-4 dark:text-white">Horários Disponíveis</h2>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {disponibilidades.length === 0 && <p className="text-gray-400 text-sm italic">Nenhuma disponibilidade cadastrada.</p>}
              {disponibilidades.map((d) => (
                <div key={d.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div>
                    <p className="text-sm font-bold dark:text-white">{new Date(d.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</p>
                    <p className="text-xs text-gray-500">{d.startTime.substring(0,5)} às {d.endTime.substring(0,5)}</p>
                  </div>
                  <button 
                    onClick={() => deletarDisponibilidade(d.id)}
                    className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.34 6.6m-3.6 0L10.74 9m4.77-9L21 18.75V19.5a.75.75 0 0 1-.75.75H3.75A.75.75 0 0 1 3 19.5v-.75L9.23 9M11.16 9V4.5a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 .75.75V9" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Disponibilidade;