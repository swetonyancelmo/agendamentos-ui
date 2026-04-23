import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import Logo from '../../assets/logo1.png';

function NavbarLogin() {
  const navigate = useNavigate();
  const snowRef = useRef(null);

  useEffect(() => {
    const container = snowRef.current;
    if (!container) return;
    const flakes = ["❄", "❅", "❆"];
    for (let i = 0; i < 22; i++) {
      const span = document.createElement("span");
      span.textContent = flakes[i % 3];
      Object.assign(span.style, {
        position: "absolute",
        left: Math.random() * 100 + "%",
        top: Math.random() * 100 + "%",
        fontSize: 10 + Math.random() * 14 + "px",
        color: "rgba(148, 163, 184, 0.4)", // Slate 400 with opacity
        pointerEvents: "none",
        animation: `snowdrift ${7 + Math.random() * 9}s linear ${Math.random() * 5}s infinite`,
      });
      container.appendChild(span);
    }
  }, []);

  return (
    <>
      <style>{`
        @keyframes snowdrift {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 0.6; }
          100% { transform: translateY(120px) rotate(200deg); opacity: 0; }
        }
      `}</style>
      
      <div className="relative w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors z-50">
        <div ref={snowRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <img
              src={Logo}
              alt="Logo Mais Climatização"
              className="h-10 sm:h-12 object-contain cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>
          
          <div className="flex items-center gap-3">
             <button
              onClick={() => navigate("/selecao")}
              className="px-5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
            >
              Entrar
            </button>
            <button
              onClick={() => navigate("/selecao")}
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors cursor-pointer shadow-sm"
            >
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavbarLogin;
