import Cards from "../../components/empresa/Cards";
import Grafico from "../../components/empresa/Grafico";
import GraficoPizza from "../../components/empresa/GraficoPizza";
import TabelaConfirmacao from "../../components/empresa/TabelaConfirmacao";
import ListaClientes from "../../components/empresa/ListaClientes";

function DashboardEmpresa() {
  return (
    <main id="main-content" className="max-w-6xl mx-auto px-5 pb-16">
      <Cards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <Grafico />
        <GraficoPizza />
      </div>
      <TabelaConfirmacao />
      <ListaClientes />
    </main>
  );
}

export default DashboardEmpresa;
