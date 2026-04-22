import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import Logo from '../../assets/logo1.png';

function Navbar() {
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
        color: "rgba(100,150,220,0.45)",
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

        .nb-wrap {
          background: #d6e8f7;
          position: relative;
          overflow: hidden;
        }

        /* ── faixa central com largura máxima ── */
        .nb-inner {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;       /* centraliza em telas grandes */
          margin: 0 auto;          /* margem automática dos lados  */
          padding: 14px 32px;
          background: rgba(255,255,255,0.45);
          border-bottom: 1px solid rgba(255,255,255,0.6);
        }

        .nb-entrar:hover  { background: rgba(255,255,255,0.95) !important; }
        .nb-cadastrar:hover { background: #1d3e8f !important; }

        /* ── Dark mode ── */
        @media (prefers-color-scheme: dark) {
          .nb-wrap   { background: #0d1f3c !important; }
          .nb-inner  {
            background: rgba(10,24,56,0.7) !important;
            border-color: rgba(100,150,220,0.15) !important;
          }
          .nb-name   { color: #c8daf5 !important; }
          .nb-sub    { color: #5d90e0 !important; }
          .nb-entrar {
            background: rgba(40,80,160,0.3) !important;
            color: #8ab8f0 !important;
            border-color: rgba(100,160,240,0.4) !important;
          }
          .nb-entrar:hover { background: rgba(60,110,200,0.5) !important; }
        }

        /* ── Mobile ── */
        @media (max-width: 480px) {
          .nb-inner     { padding: 12px 16px; }
          .nb-logo-img  { height: 36px !important; }
          .nb-entrar,
          .nb-cadastrar { padding: 9px 16px; font-size: 13px; }
        }
      `}</style>

      <div className="nb-wrap">
        {/* Flocos de neve */}
        <div
          ref={snowRef}
          style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
        />

        {/* Conteúdo centralizado com max-width */}
        <div className="nb-inner">

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img
              src={Logo}
              alt="Logo Mais Climatização"
              className="nb-logo-img"
              style={{ height: 44, objectFit: "contain" }}
            />
            <div style={{ lineHeight: 1.15 }}>
              <div
                className="nb-name"
                style={{ fontSize: 18, fontWeight: 800, color: "#1a3a6e", letterSpacing: 1 }}
              >
                
              </div>
              <div
                className="nb-sub"
                style={{ fontSize: 8, color: "#3b6fd4", letterSpacing: 3 }}
              >
                
              </div>
            </div>
          </div>

          {/* Botões */}
          <div style={{ display: "flex", gap: 10 }}>
            <button
              className="nb-entrar"
              onClick={() => navigate("/seleção")}
              style={{
                padding: "10px 26px",
                background: "rgba(255,255,255,0.7)",
                color: "#1a3a6e",
                border: "1.5px solid rgba(37,80,167,0.3)",
                borderRadius: 24,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Entrar
            </button>

            <button
              className="nb-cadastrar"
              onClick={() => navigate("/seleção")}
              style={{
                padding: "10px 26px",
                background: "#2550a7",
                color: "#fff",
                border: "none",
                borderRadius: 24,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Cadastrar
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Navbar;