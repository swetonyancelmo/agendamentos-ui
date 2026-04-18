import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "sans-serif", margin: 0, padding: 0 }}>

     

      {/* HERO */}
      <div style={{
        backgroundColor: "#4a6e96", display: "flex",
        alignItems: "center", padding: "60px 40px 70px", gap: 40
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            display: "inline-block", background: "rgba(55,138,221,0.25)",
            color: "#85b7eb", fontSize: 11, letterSpacing: 2,
            padding: "4px 12px", borderRadius: 4, marginBottom: 20
          }}>REFRIGERAÇÃO PROFISSIONAL</div>

          <h1 style={{ fontSize: 36, fontWeight: 600, color: "#000000", lineHeight: 1.2, marginBottom: 16 }}>
            Conforto térmico com{" "}
            <span style={{ color: "#378add" }}>qualidade e eficiência</span>
          </h1>

          <p style={{ fontSize: 14, color: "rgba(255, 255, 255, 0.23)", lineHeight: 1.7, maxWidth: 420, marginBottom: 32 }}>
            Instalação, manutenção e assistência técnica de ar-condicionado com
            profissionais certificados e atendimento rápido.
          </p>

          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => navigate("/seleção")} style={{
              padding: "13px 28px", background: "#2563eb", color: "#000000",
              border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer"
            }}>Agendar serviço</button>
            <button onClick={() => {
              document.getElementById("servicos").scrollIntoView({ behavior: "smooth" });
            }} style={{
              padding: "13px 28px", background: "transparent", color: "#000000",
              border: "1px solid rgba(255,255,255,0.35)", borderRadius: 10, fontSize: 14, cursor: "pointer"
            }}>Ver serviços</button>
          </div>

          <div style={{ display: "flex", gap: 32, marginTop: 40 }}>
            {[["500+", "Clientes atendidos"], ["5 anos", "De experiência"], ["98%", "Satisfação"]].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontSize: 24, fontWeight: 600, color: "#000000" }}>{num}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SERVIÇOS */}
      <div id="servicos" style={{ padding: "60px 40px", backgroundColor: "#000000" }}>
        <div style={{ fontSize: 11, color: "#185fa5", letterSpacing: 2, fontWeight: 600, marginBottom: 8 }}>NOSSOS SERVIÇOS</div>
        <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 8 }}>Tudo que você precisa em climatização</h2>
        <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, marginBottom: 36 }}>
          Soluções completas para residências e empresas com técnicos especializados.
        </p>
        <div style={{ color: "black", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {[
            { nome: "Instalação", desc: "Instalação de splits e centrais com certificação técnica." },
            { nome: "Manutenção", desc: "Revisão periódica e limpeza para máximo desempenho." },
            { nome: "Assistência técnica", desc: "Diagnóstico e reparo rápido de qualquer defeito." },
            { nome: "Higienização", desc: "Limpeza profunda e sanitização do sistema completo." },
          ].map((s) => (
            <div key={s.nome} style={{
              background: "#000000", border: "1px solid #e5e7eb",
              borderRadius: 14, padding: "20px 18px"
            }}>
              <div style={{
                width: 40, height: 40, background: "#e6f1fb",
                borderRadius: 10, marginBottom: 14
              }} />
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{s.nome}</div>
              <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* POR QUE NOS ESCOLHER */}
      <div style={{ backgroundColor: "#f9fafb", padding: "60px 40px" }}>
        <div style={{ fontSize: 11, color: "#185fa5", letterSpacing: 2, fontWeight: 600, marginBottom: 8 }}>POR QUE NOS ESCOLHER</div>
        <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 32 }}>Diferenciais que fazem a diferença</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {[
            ["Atendimento rápido", "Agendamento fácil e técnicos sempre disponíveis."],
            ["Técnicos certificados", "Profissionais treinados e com certificação oficial."],
            ["Garantia no serviço", "Garantia de 90 dias em todos os serviços realizados."],
            ["Preço justo", "Orçamento transparente sem surpresas na hora de pagar."],
          ].map(([titulo, desc]) => (
            <div key={titulo} style={{ display: "flex", gap: 14 }}>
              <div style={{ width: 8, height: 8, background: "#2563eb", borderRadius: "50%", marginTop: 5, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{titulo}</div>
                <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ backgroundColor: "#0c3563", padding: "60px 40px", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontWeight: 600, color: "#fff", marginBottom: 12 }}>Pronto para ter mais conforto?</h2>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 32 }}>Crie sua conta e agende seu serviço em minutos.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={() => navigate("/seleção")} style={{
            padding: "13px 28px", background: "#2563eb", color: "#fff",
            border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer"
          }}>Entrar na plataforma</button>
          <button onClick={() => navigate("/seleção")} style={{
            padding: "13px 28px", background: "transparent", color: "#fff",
            border: "1px solid rgba(255,255,255,0.35)", borderRadius: 10, fontSize: 14, cursor: "pointer"
          }}>Criar conta grátis</button>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{
        backgroundColor: "#071e3d", padding: "28px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>© 2026 Mais Climatização. Todos os direitos reservados.</div>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacidade", "Termos de uso", "Suporte"].map(l => (
            <a key={l} href="#" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </div>

    </div>
  );
}

export default LandingPage;