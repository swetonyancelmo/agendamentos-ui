function FooterEmpresa() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-3">
              Mais Climatização
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Especialistas em conforto térmico. Instalação, manutenção e reparos com qualidade.
            </p>
            <div className="flex gap-2 mt-4">
              <a href="https://www.instagram.com/abelardovanzoff" target="_blank" rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">
                <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17" cy="7" r="1" />
                </svg>
              </a>
              <a href="https://wa.me/55991999999" target="_blank" rel="noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">
                <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path d="M20 12a8 8 0 1 0-14.5 4.5L4 20l3.7-1.5A8 8 0 1 0 20 12Z"/>
                  <path d="M8 10c1 3 3 5 6 6" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-3">
              Navegação
            </p>
            <nav aria-label="Links do rodapé" className="flex flex-col gap-2">
              {[
                { href: "/dashboard-empresa", label: "Dashboard" },
                { href: "/empresa/confirmar",  label: "Agendamentos" },
                { href: "/empresa/servicos",   label: "Serviços" },
                { href: "/configuracoes",      label: "Configurações" },
              ].map((l) => (
                <a key={l.href} href={l.href} className="text-sm text-slate-700 hover:text-slate-800 transition-colors">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-3">
              Contato
            </p>
            <address className="not-italic flex flex-col gap-2.5 text-sm text-slate-700">
              <span>(00) 0000-0000</span>
              <span>contato@maisclima.com.br</span>
              <span>Recife, PE – Brasil</span>
            </address>
          </div>
        </div>

        <div className="border-t border-slate-100 mt-8 pt-5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-slate-600">
            © 2026 Mais Climatização. Desenvolvido pela Vanzoff.
          </p>
          <div className="flex gap-4 text-xs text-slate-600">
            <span className="cursor-pointer hover:text-slate-600 transition-colors">Termos</span>
            <span className="cursor-pointer hover:text-slate-600 transition-colors">Privacidade</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterEmpresa;
