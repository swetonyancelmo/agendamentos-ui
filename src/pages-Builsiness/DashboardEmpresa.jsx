import NavBar from "../components/NavBar";
import Cards from "../components/Cards";
import Grafico from "../components/Grafico";
import GraficoPizza from "../components/GraficoPizza";
import TabelaConfirmacao from "../components/TabelaConfirmacao";
import { useState } from "react";
import ListaClientes from "../components/ListaClientes";

function Home() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      clientName: "João Silva",
      serviceName: "Instalação",
      date: "28/03/2026",
      time: "14:00",
      status: "PENDING",
    },
  ]);

  return (
    <>
      <NavBar />
     <div className="max-w-7xl mx-auto px-6">
        <Cards />
        <Grafico />
        <GraficoPizza />
        <TabelaConfirmacao data={appointments} />
        <ListaClientes/>
      </div>
    </>
  );
}

export default Home;