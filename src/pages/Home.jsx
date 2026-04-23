import { Link } from 'react-router-dom';
import { Building2, UserCircle } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-[100vh] flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 transition-colors pt-24 pb-12">
      <div className="flex flex-wrap gap-8 justify-center max-w-4xl mx-auto w-full">

        <div className="flex-1 min-w-[280px] max-w-[360px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-200 dark:hover:shadow-black/40 transition-all duration-300 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
            <UserCircle size={32} className="text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Sou Cliente</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-8 flex-grow">
            Agende serviços de ar-condicionado com profissionais qualificados da sua região.
          </p>
          <div className="w-full space-y-3 mt-auto">
            <Link to="/login-cliente" className="block w-full">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer shadow-md shadow-blue-600/20">
                Entrar como Cliente →
              </button>
            </Link>
            <Link to="/cadastro-cliente" className="block w-full">
              <button className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold py-3 rounded-xl transition-colors cursor-pointer border border-transparent dark:border-slate-700">
                Cadastrar-se como Cliente
              </button>
            </Link>
          </div>
        </div>

        <div className="flex-1 min-w-[280px] max-w-[360px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-200 dark:hover:shadow-black/40 transition-all duration-300 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
            <Building2 size={32} className="text-slate-600 dark:text-slate-400" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Sou Empresa</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-8 flex-grow">
            Gerencie seus agendamentos, serviços e disponibilidade em uma única plataforma.
          </p>
          <div className="w-full space-y-3 mt-auto">
            <Link to="/login-empresa" className="block w-full">
              <button className="w-full bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer shadow-md">
                Entrar como Empresa →
              </button>
            </Link>
            <Link to="/cadastro-empresa" className="block w-full">
              <button className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold py-3 rounded-xl transition-colors cursor-pointer border border-transparent dark:border-slate-700">
                Cadastrar Empresa
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
