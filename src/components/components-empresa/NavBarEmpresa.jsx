import logo from "../assets/imgs/logo-sem-fundo.png";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import SkipLink from "./SkipLink";

function NavBarEmpresa() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isOpen, setIsOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({
    opacity: 0,
    left: 0,
    width: 0,
  });

  const navRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/");
  };

  const handleMouseEnter = (e) => {
    const linkRect = e.currentTarget.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    setIndicatorStyle({
      opacity: 1,
      left: linkRect.left - navRect.left,
      width: linkRect.width,
    });
  };

  const links = [
    { name: "Home", path: "/home" },
    { name: "Agendamentos", path: "/criar-agendamento" },
    { name: "Clientes", path: "/clientes" },
    { name: "Serviços", path: "/servicos" },
    { name: "Configurações", path: "/configuracoes" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-3 pt-3">
        <SkipLink />

        <div
          className="w-full max-w-[1200px] mx-auto px-6 py-3
            flex items-center justify-between
            bg-white/70 backdrop-blur-xl border border-white/40 rounded-full
            shadow-[0_4px_20px_rgba(0,0,0,0.08)]
            dark:bg-gray-900/80 dark:border-gray-800"
        >
          {/* LOGO À ESQUERDA */}
          <img
            src={logo}
            alt="logo"
            className="w-[110px] md:w-[140px] cursor-pointer flex-shrink-0"
            onClick={() => navigate("/")}
          />

          {/* CONTAINER DIREITO (MENU + SAIR) */}
          <div className="hidden md:flex items-center gap-6">
            
            {/* LISTA DE LINKS COM HOVER CORRIGIDO */}
            <ul
              ref={navRef}
              onMouseLeave={() => setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }))}
              className="relative flex bg-gray-100/70 dark:bg-gray-800/40 rounded-full px-2 py-1"
            >
              {links.map((item) => (
                <li key={item.path} className="z-[2]">
                  <button
                    onClick={() => navigate(item.path)}
                    onMouseEnter={handleMouseEnter}
                    className="px-4 py-1.5 uppercase text-xs lg:text-sm font-semibold text-gray-700 dark:text-gray-300
                      hover:text-white transition-all duration-300"
                  >
                    {item.name}
                  </button>
                </li>
              ))}

              {/* INDICADOR AZUL (O "HOVER") */}
              <div
                className="absolute top-0 bottom-0 my-auto h-[80%] rounded-full z-[1]
                  bg-gradient-to-br from-[#007bff] to-[#002bec]
                  shadow-[0_4px_12px_rgba(0,43,236,0.25)]
                  pointer-events-none transition-all duration-500 ease-out"
                style={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                  opacity: indicatorStyle.opacity,
                }}
              />
            </ul>

            {/* BOTÃO SAIR */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-full
                text-xs font-bold text-red-600 dark:text-red-400
                hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 border-l border-gray-200 dark:border-gray-700 ml-2 pl-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6A2.25 2.25 0 0 0 15.75 18.75V15" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 12h-9m0 0 3-3m-3 3 3 3" />
              </svg>
              SAIR
            </button>
          </div>

          {/* HAMBÚRGUER MOBILE */}
          <button
            className="md:hidden text-2xl w-10 h-10 flex items-center justify-center rounded-full text-gray-800 dark:text-gray-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* MENU MOBILE (DROPDOWN) */}
        <div
          className={`
            md:hidden mt-2 mx-auto w-full max-w-[320px]
            bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 
            backdrop-blur-xl rounded-2xl p-5 shadow-xl flex flex-col gap-4
            transition-all duration-300 origin-top
            ${isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-95 pointer-events-none"}
          `}
        >
          {links.map((item) => (
            <button
              key={item.path}
              onClick={() => { navigate(item.path); setIsOpen(false); }}
              className="text-left font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 py-2 border-b dark:border-gray-800 last:border-0"
            >
              {item.name}
            </button>
          ))}
          <button onClick={handleLogout} className="text-left font-bold text-red-600 pt-2 flex items-center gap-2">
            SAIR
          </button>
        </div>
      </nav>
    </>
  );
}

export default NavBarEmpresa;