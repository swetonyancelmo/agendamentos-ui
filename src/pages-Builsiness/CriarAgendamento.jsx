import Servicos from "../components/Servicos";
import CalendarioAgendamento from "../components/CalendarioAgendamento";
import NavBar from "../components/NavBar";

function CriarAgendamento() {
  return (
    <div className="max-w-7xl mx-auto px-6 mt-10">
      <NavBar/>
      <CalendarioAgendamento />
    </div>
  );
}

export default CriarAgendamento;
