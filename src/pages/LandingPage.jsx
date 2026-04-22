import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

function LandingPage() {
  const navigate = useNavigate();
  const snowRef = useRef(null);

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
        color: rgba(100,140,210,0.5);
        animation: snowfall ${6 + Math.random() * 10}s linear ${Math.random() * 8}s infinite;
        pointer-events: none;
      `;
      container.appendChild(span);
    }
  }, []);

  const styles = {
    page: {
      minHeight: "100vh",
      background: "TRANSPARENT",
      fontFamily: "sans-serif",
      position: "relative",
      overflow: "hidden",
    },
    nav: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 20px",
      background: "rgba(255,255,255,0.25)",
      borderBottom: "0.5px solid rgba(255,255,255,0.6)",
      position: "relative",
      zIndex: 10,
   },
    logoMark: {
      width: 36, height: 36, borderRadius: "50%",
      border: "1.5px solid #3b6fd4",
      display: "flex", alignItems: "center", justifyContent: "center",
    },
    logoName: { fontSize: 15, fontWeight: 700, color: "#1a3a6e", letterSpacing: 1 },
    logoSub: { fontSize: 8, color: "#3b6fd4", letterSpacing: 2 },
    btnPrimary: {
      padding: "9px 18px", background: "#2550a7", color: "#fff",
      border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer",
    },
    btnGhost: {
      padding: "9px 18px", background: "rgba(255,255,255,0.5)",
      color: "#2550a7", border: "1px solid rgba(37,80,167,0.3)",
      borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer",
    },
    hero: {
      position: "relative", zIndex: 5,
      padding: "48px 20px 32px", textAlign: "center",
    },
    heroTag: {
      display: "inline-block",
      background: "rgba(37,80,167,0.12)",
      color: "#3b6fd4", fontSize: 10, letterSpacing: 2,
      fontWeight: 700, padding: "4px 14px", borderRadius: 20,
      border: "1px solid rgba(37,80,167,0.2)", marginBottom: 20,
    },
    heroTitle: {
      fontSize: 28, fontWeight: 700, color: "#1a3a6e",
      lineHeight: 1.25, marginBottom: 14,
    },
    heroDesc: {
      fontSize: 13, color: "#3a5080", lineHeight: 1.7,
      marginBottom: 28, maxWidth: 320, margin: "0 auto 28px",
    },
    heroBtns: {
      display: "flex", flexDirection: "column",
      gap: 10, maxWidth: 300, margin: "0 auto 36px",
    },
    btnHeroPrimary: {
      padding: 14, background: "#2550a7", color: "#fff",
      borderRadius: 12, fontSize: 14, fontWeight: 700,
      cursor: "pointer", border: "none", width: "100%",
    },
    btnHeroGhost: {
      padding: 14, background: "rgba(255,255,255,0.5)",
      color: "#2550a7", border: "1px solid rgba(37,80,167,0.3)",
      borderRadius: 12, fontSize: 14, fontWeight: 600,
      cursor: "pointer", width: "100%",
    },
    stats: {
      display: "flex", justifyContent: "center", gap: 28, marginBottom: 48,
    },
    statNum: { fontSize: 22, fontWeight: 700, color: "#1a3a6e", textAlign: "center" },
    statLabel: { fontSize: 10, color: "#6080a8", textAlign: "center", marginTop: 2 },
    section: { position: "relative", zIndex: 5, padding: "32px 20px" },
    sectionTag: {
      fontSize: 10, color: "#3b6fd4", letterSpacing: 2,
      fontWeight: 700, marginBottom: 6,
    },
    sectionTitle: { fontSize: 20, fontWeight: 700, color: "#1a3a6e", marginBottom: 8 },
    sectionDesc: { fontSize: 12, color: "#3a5080", lineHeight: 1.7, marginBottom: 20 },
    cardsGrid: {
      display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12,
    },
    card: {
      background: "#f0f4f8",
      border: "1px solid rgba(255,255,255,0.7)",
      borderRadius: 18, padding: "18px 14px",
    },
    cardIcon: {
      width: 36, height: 36, background: "rgba(37,80,167,0.12)",
      borderRadius: 10, display: "flex", alignItems: "center",
      justifyContent: "center", marginBottom: 12,
    },
    cardTitle: { fontSize: 13, fontWeight: 700, color: "#1a3a6e", marginBottom: 4 },
    cardDesc: { fontSize: 11, color: "#6080a8", lineHeight: 1.6 },
    whyList: { display: "flex", flexDirection: "column", gap: 16 },
    whyItem: { display: "flex", gap: 12, alignItems: "flex-start" },
    whyDot: {
      width: 8, height: 8, background: "#3b6fd4",
      borderRadius: "50%", marginTop: 4, flexShrink: 0,
    },
    whyTitle: { fontSize: 13, fontWeight: 700, color: "#1a3a6e", marginBottom: 2 },
    whyDesc: { fontSize: 11, color: "#6080a8", lineHeight: 1.6 },
    ctaSection: {
      position: "relative", zIndex: 5, padding: "40px 20px", textAlign: "center",
      background: "rgba(37,80,167,0.07)",
      borderTop: "0.5px solid rgba(255,255,255,0.6)",
    },
    ctaTitle: { fontSize: 20, fontWeight: 700, color: "#1a3a6e", marginBottom: 8 },
    ctaDesc: { fontSize: 12, color: "#3a5080", marginBottom: 24 },
    footer: {
      position: "relative", zIndex: 5,
      background: "rgba(0,0,0,0.1)", padding: 20, textAlign: "center",
    },
  };

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
        @media (prefers-color-scheme: dark) {
          .landing-page { background: #3f5a86 !important; }
          .landing-nav { background: rgba(10,24,56,0.6) !important; }
          .landing-card { background: #0f2440 !important; border-color: rgba(60,100,180,0.3) !important; }
          .landing-card-title, .hero-title-el, .stat-num-el, .section-title-el, .why-title-el, .cta-title-el { color: #c8daf5 !important; }
          .landing-desc, .stat-label-el, .card-desc-el, .why-desc-el, .cta-desc-el { color: #6888b0 !important; }
          .btn-hero-primary-el { background: #2a5fc0 !important; }
          .btn-hero-ghost-el { background: rgba(40,80,160,0.3) !important; color: #8ab8f0 !important; border-color: rgba(100,160,240,0.4) !important; }
          .hero-tag-el { background: rgba(60,120,210,0.2) !important; color: #7aabf0 !important; }
          .section-tag-el { color: #7aabf0 !important; }
          .why-dot-el { background: #5d90e0 !important; }
          .cta-section-el { background: rgba(20,50,120,0.3) !important; }
          .logo-name-el { color: #c8daf5 !important; }
          .btn-ghost-nav { background: rgba(40,80,160,0.3) !important; color: #8ab8f0 !important; border-color: rgba(100,160,240,0.4) !important; }
          .card-icon-el { background: rgba(60,120,220,0.2) !important; }
        }
      `}</style>

      <div className="landing-page" style={styles.page}>

        {/* Flocos de neve */}
        <div ref={snowRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />

        {/* NAVBAR
       <nav className="landing-nav" style={styles.nav}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={styles.logoMark}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <line x1="9" y1="1" x2="9" y2="17" stroke="#3b6fd4" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="1" y1="9" x2="17" y2="9" stroke="#3b6fd4" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="3" y1="3" x2="15" y2="15" stroke="#3b6fd4" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="15" y1="3" x2="3" y2="15" stroke="#3b6fd4" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="9" cy="9" r="2.2" fill="#3b6fd4"/>
              </svg>
            </div>
            <div>
              <div className="logo-name-el" style={styles.logoName}>MAIS</div>
              <div style={styles.logoSub}>CLIMATIZAÇÃO</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn-ghost-nav" style={styles.btnGhost} onClick={() => navigate("/login-empresa")}>Entrar</button>
            <button style={styles.btnPrimary} onClick={() => navigate("/cadastro-empresa")}>Cadastrar</button>
          </div>
        </nav> */}

        {/* HERO */}
        <div style={styles.hero}>
          <div className="hero-tag-el" style={styles.heroTag}>❄ REFRIGERAÇÃO PROFISSIONAL</div>
          <h1 className="hero-title-el" style={styles.heroTitle}>
            Conforto térmico com{" "}
            <span style={{ color: "#3b6fd4" }}>qualidade e eficiência</span>
          </h1>
          <p className="landing-desc" style={styles.heroDesc}>
            Instalação, manutenção e assistência técnica com profissionais certificados e atendimento rápido.
          </p>
          <div style={styles.heroBtns}>
            <button className="btn-hero-primary-el" style={styles.btnHeroPrimary} onClick={() => navigate("/login-cliente")}>
              Agendar serviço
            </button>
            <button className="btn-hero-ghost-el" style={styles.btnHeroGhost}
              onClick={() => document.getElementById("servicos")?.scrollIntoView({ behavior: "smooth" })}>
              Ver serviços
            </button>
          </div>
          <div style={styles.stats}>
            {[["500+", "Clientes"], ["5 anos", "Experiência"], ["98%", "Satisfação"]].map(([n, l]) => (
              <div key={l}>
                <div className="stat-num-el" style={styles.statNum}>{n}</div>
                <div className="stat-label-el" style={styles.statLabel}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SERVIÇOS */}
        <div id="servicos" style={styles.section}>
          <div className="section-tag-el" style={styles.sectionTag}>NOSSOS SERVIÇOS</div>
          <div className="section-title-el" style={styles.sectionTitle}>Tudo em climatização</div>
          <p className="landing-desc" style={styles.sectionDesc}>Soluções completas para residências e empresas.</p>
          <div style={styles.cardsGrid}>
            {services.map((s) => (
              <div key={s.title} className="landing-card" style={styles.card}>
                <div className="card-icon-el" style={styles.cardIcon}>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <rect x="2" y="5" width="16" height="7" rx="2" stroke="#2550a7" strokeWidth="1.5"/>
                    <rect x="6" y="12" width="8" height="3" rx="1" stroke="#2550a7" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="landing-card-title" style={styles.cardTitle}>{s.title}</div>
                <div className="card-desc-el" style={styles.cardDesc}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* POR QUE NOS ESCOLHER */}
        <div style={{ ...styles.section, paddingTop: 8 }}>
          <div className="section-tag-el" style={styles.sectionTag}>POR QUE NOS ESCOLHER</div>
          <div className="section-title-el" style={styles.sectionTitle}>Diferenciais que fazem a diferença</div>
          <div style={styles.whyList}>
            {reasons.map(([titulo, desc]) => (
              <div key={titulo} style={styles.whyItem}>
                <div className="why-dot-el" style={styles.whyDot} />
                <div>
                  <div className="why-title-el" style={styles.whyTitle}>{titulo}</div>
                  <div className="why-desc-el" style={styles.whyDesc}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="cta-section-el" style={styles.ctaSection}>
          <h2 className="cta-title-el" style={styles.ctaTitle}>Pronto para ter mais conforto?</h2>
          <p className="cta-desc-el" style={styles.ctaDesc}>Crie sua conta e agende em minutos.</p>
          <div style={{ ...styles.heroBtns, marginBottom: 0 }}>
            <button className="btn-hero-primary-el" style={styles.btnHeroPrimary} onClick={() => navigate("/login-cliente")}>
              Entrar na plataforma
            </button>
            <button className="btn-hero-ghost-el" style={styles.btnHeroGhost} onClick={() => navigate("/cadastro-cliente")}>
              Criar conta grátis
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <footer style={styles.footer}>
          <div style={{ fontSize: 11, color: "#6080a8", marginBottom: 8 }}>
            © 2026 Mais Climatização. Todos os direitos reservados.
          </div>
          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            {["Privacidade", "Termos", "Suporte"].map((l) => (
              <a key={l} href="#" style={{ fontSize: 11, color: "#6080a8", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </footer>

      </div>
    </>
  );
}

export default LandingPage;