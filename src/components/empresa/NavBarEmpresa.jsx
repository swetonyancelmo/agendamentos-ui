import logo from "../../assets/logo1.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import SkipLink from "../common/SkipLink";

const LINKS = [
  { name: "Dashboard",     path: "/dashboard-empresa" },
  { name: "Agendamentos",  path: "/empresa/confirmar" },
  { name: "Horários",      path: "/empresa/criar-agendamento" },
  { name: "Serviços",      path: "/empresa/servicos" },
  { name: "Configurações", path: "/configuracoes" },
];

function NavBarEmpresa() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ opacity: 0, left: 0, width: 0 });
  const navRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  const handleMouseEnter = (e) => {
    if (!navRef.current) return;
    const linkRect = e.currentTarget.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    setIndicatorStyle({ opacity: 1, left: linkRect.left - navRect.left, width: linkRect.width });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("businessId");
    navigate("/");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
        <SkipLink />

        <div className="w-full max-w-[1200px] mx-auto px-5 py-2.5 flex items-center justify-between bg-white/80 backdrop-blur-xl border border-slate-200/70 rounded-2xl shadow-sm">

          <img
            src={logo}
            alt="Logo"
            className="h-9 cursor-pointer flex-shrink-0"
            onClick={() => navigate("/dashboard-empresa")}
          />

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-4">
            <ul
              ref={navRef}
              onMouseLeave={() => setIndicatorStyle((p) => ({ ...p, opacity: 0 }))}
              className="relative flex items-center bg-slate-100 rounded-xl px-1 py-1"
            >
              {LINKS.map((item) => (
                <li key={item.path} className="z-[2]">
                  <button
                    onClick={() => navigate(item.path)}
                    onMouseEnter={handleMouseEnter}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200
                      ${isActive(item.path)
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 hover:text-white"
                      }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}

              <div
                className="absolute top-1 bottom-1 rounded-lg z-[1] bg-blue-600 pointer-events-none transition-all duration-300 ease-out"
                style={{ left: indicatorStyle.left, width: indicatorStyle.width, opacity: indicatorStyle.opacity }}
              />
            </ul>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-700 transition-colors cursor-pointer pl-3 border-l border-slate-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6A2.25 2.25 0 0 0 15.75 18.75V15M18 12h-9m0 0 3-3m-3 3 3 3" />
              </svg>
              Sair
            </button>
          </div>

          {/* HAMBÚRGUER */}
          <button
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Abrir menu"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* MENU MOBILE */}
        <div className={`md:hidden mt-2 mx-auto w-full max-w-xs bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg transition-all duration-200 origin-top ${isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-95 pointer-events-none"}`}>
          {LINKS.map((item) => (
            <button
              key={item.path}
              onClick={() => { navigate(item.path); setIsOpen(false); }}
              className={`w-full text-left px-5 py-3 text-sm border-b border-slate-50 last:border-0 transition-colors
                ${isActive(item.path)
                  ? "text-blue-600 font-semibold bg-blue-50"
                  : "text-slate-700 hover:bg-slate-50"
                }`}
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="w-full text-left px-5 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
          >
            Sair
          </button>
        </div>
      </nav>
    </>
  );
}

export default NavBarEmpresa;
