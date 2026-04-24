import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

function LandingPage() {
  const navigate = useNavigate();
  const snowRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const businessId = localStorage.getItem('businessId');
      navigate(businessId ? '/dashboard-empresa' : '/dashboard-cliente', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const container = snowRef.current;
    if (!container) return;
    const flakes = ["❄", "❅", "❆"];
    for (let i = 0; i < 28; i++) {
      const span = document.createElement("span");
      span.textContent = flakes[i % 3];
      span.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        font-size: ${12 + Math.random() * 14}px;
        color: rgba(148, 163, 184, 0.4);
        animation: snowfall ${6 + Math.random() * 10}s linear ${Math.random() * 8}s infinite;
        pointer-events: none;
      `;
      container.appendChild(span);
    }
  }, []);

  const services = [
    { title: "Instalação", desc: "Splits e centrais com certificação técnica." },
    { title: "Manutenção", desc: "Revisão periódica e limpeza completa." },
    { title: "Assistência", desc: "Diagnóstico e reparo rápido." },
    { title: "Higienização", desc: "Limpeza profunda e sanitização." },
  ];

  const reasons = [
    ["Atendimento rápido", "Agendamento fácil e técnicos sempre disponíveis."],
    ["Técnicos certificados", "Profissionais com certificação oficial."],
    ["Garantia de 90 dias", "Em todos os serviços realizados."],
    ["Preço justo", "Orçamento transparente sem surpresas."],
  ];

  return (
    <>
      <style>{`
        @keyframes snowfall {
          0% { transform: translateY(-30px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.6; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
      
      <div className="min-h-screen bg-slate-50 text-slate-800 relative overflow-hidden transition-colors font-sans">
        <div ref={snowRef} className="absolute inset-0 pointer-events-none z-0" />
        
        {/* HERO */}
        <div className="relative z-10 px-6 py-20 md:py-32 text-center max-w-4xl mx-auto">
           <div className="inline-block bg-blue-100 text-blue-700 text-xs tracking-widest font-bold px-4 py-1.5 rounded-full mb-6 border border-blue-200">
             ❄ REFRIGERAÇÃO PROFISSIONAL
           </div>
           <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
             Conforto térmico com <span className="text-blue-600">qualidade e eficiência</span>
           </h1>
           <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
             Instalação, manutenção e assistência técnica com profissionais certificados e atendimento rápido.
           </p>
           
           <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 max-w-md mx-auto sm:max-w-none">
             <button onClick={() => navigate("/login-cliente")} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl transition-colors shadow-lg shadow-blue-600/20 cursor-pointer">
               Agendar serviço
             </button>
             <button onClick={() => document.getElementById("servicos")?.scrollIntoView({ behavior: "smooth" })} className="bg-white text-blue-600 border border-slate-200 hover:bg-slate-50 font-bold py-3.5 px-8 rounded-xl transition-colors cursor-pointer">
               Ver serviços
             </button>
           </div>
           
           <div className="flex flex-wrap justify-center gap-8 md:gap-16">
             {[["200+", "Clientes"], ["+5 anos", "Experiência"], ["98%", "Satisfação"]].map(([n, l]) => (
               <div key={l} className="text-center">
                 <div className="text-3xl font-extrabold text-slate-900">{n}</div>
                 <div className="text-xs text-slate-700 uppercase tracking-wide mt-1">{l}</div>
               </div>
             ))}
           </div>
        </div>

        {/* SERVIÇOS */}
        <div id="servicos" className="relative z-10 px-6 py-20 bg-white border-y border-slate-100 transition-colors">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
               <div className="text-xs font-bold text-blue-600 tracking-widest mb-3">NOSSOS SERVIÇOS</div>
               <h2 className="text-3xl font-bold text-slate-900 mb-4">Tudo em climatização</h2>
               <p className="text-slate-600">Soluções completas para residências e empresas.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((s) => (
                <div key={s.title} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl hover:shadow-md transition-shadow">
                   <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-5 text-blue-600">
                     <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                       <rect x="2" y="5" width="16" height="7" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                       <rect x="6" y="12" width="8" height="3" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                     </svg>
                   </div>
                   <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                   <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* POR QUE NOS ESCOLHER */}
        <div className="relative z-10 px-6 py-20 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs font-bold text-blue-600 tracking-widest mb-3">POR QUE NOS ESCOLHER</div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Diferenciais que fazem a diferença</h2>
              <div className="space-y-6">
                {reasons.map(([titulo, desc]) => (
                  <div key={titulo} className="flex gap-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-1">{titulo}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Bloco de cor minimalista com emoji ou ícone */}
            <div className="bg-slate-200 rounded-3xl aspect-square sm:aspect-[4/3] w-full flex items-center justify-center">
               <span className="text-6xl" role="img" aria-label="Floco de Neve">❄️</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="relative z-10 px-6 py-24 bg-blue-50 border-t border-slate-200 text-center">
           <h2 className="text-3xl font-bold text-slate-900 mb-4">Pronto para ter mais conforto?</h2>
           <p className="text-slate-600 mb-10 max-w-md mx-auto">Crie sua conta e agende em minutos.</p>
           <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto sm:max-w-none">
             <button onClick={() => navigate("/login-cliente")} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl transition-colors cursor-pointer shadow-lg shadow-blue-600/20">
               Entrar na plataforma
             </button>
             <button onClick={() => navigate("/cadastro-cliente")} className="bg-white text-blue-600 border border-slate-200 hover:bg-slate-50 font-bold py-3.5 px-8 rounded-xl transition-colors cursor-pointer">
               Criar conta grátis
             </button>
           </div>
        </div>

        {/* FOOTER */}
        <footer className="relative z-10 py-10 text-center border-t border-slate-200 bg-white">
           <p className="text-xs text-slate-700 mb-4">© 2026 Mais Climatização. Todos os direitos reservados.</p>
           <div className="flex gap-6 justify-center text-xs text-slate-700">
             <a href="#" className="hover:text-slate-800 transition-colors">Privacidade</a>
             <a href="#" className="hover:text-slate-800 transition-colors">Termos</a>
             <a href="#" className="hover:text-slate-800 transition-colors">Suporte</a>
           </div>
        </footer>

      </div>
    </>
  );
}

export default LandingPage;
