import { Link } from "react-router-dom";

export function BotaoPilula({ to, children, onClick, type = "button", className = "" }) {
  const baseClasses =
    "relative bg-[#003366] text-white px-4 py-4 rounded-full font-bold text-base cursor-pointer overflow-hidden transition-all duration-300 ease-in-out z-[1] hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,43,236,0.4)]";

  const content = (
    <>
      <span className="relative z-[3]">{children}</span>

      <div
        className="absolute top-1/2 left-1/2 w-0 h-0 bg-gradient-to-br from-[#007bff] to-[#002bec] rounded-full 
        -translate-x-1/2 -translate-y-1/2 transition-all duration-700 
        ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] z-[2] 
        group-hover:w-[400px] group-hover:h-[400px]"
      />
    </>
  );

  // Se for navegação
  if (to) {
    return (
      <Link to={to} className={`group inline-block ${baseClasses} ${className}`}>
        {content}
      </Link>
    );
  }

  // Se for ação (form, click, etc)
  return (
    <button
      type={type}
      onClick={onClick}
      className={`group ${baseClasses} ${className}`}
    >
      {content}
    </button>
  );
}

export default BotaoPilula;