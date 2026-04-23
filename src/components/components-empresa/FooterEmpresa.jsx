function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-300">

      <div className="max-w-[1200px] mx-auto px-4 py-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {/* COLUNA 1 */}
          <div>
            <h3 className="text-lg font-bold text-blue-950 dark:text-blue-400 mb-2">
              MAIS CLIMATIZAÇÃO
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[280px]">
              Especialistas em conforto térmico. Instalação, manutenção e reparos com qualidade e confiança.
            </p>

            <div className="flex gap-3 mt-4">
              
                href="https://www.instagram.com/abelardovanzoff"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram da Mais Climatização"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition"
              >
                <svg className="w-5 h-5 text-blue-950 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17" cy="7" r="1" />
                </svg>
              </a>

              
                href="https://wa.me/55991999999"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp da Mais Climatização"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-green-100 dark:hover:bg-green-900 transition"
              >
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 12a8 8 0 1 0-14.5 4.5L4 20l3.7-1.5A8 8 0 1 0 20 12Z"/>
                  <path d="M8 10c1 3 3 5 6 6" />
                </svg>
              </a>
            </div>
          </div>

          {/* COLUNA 2 */}
          <div>
            <h4 className="text-sm font-semibold text-blue-950 dark:text-blue-400 mb-3">
              Navegação
            </h4>
            <nav aria-label="Links do rodapé">
              <div className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400">
                <a href="/home" className="hover:text-blue-950 dark:hover:text-blue-300 transition">Home</a>
                <a href="/criar-agendamento" className="hover:text-blue-950 dark:hover:text-blue-300 transition">Agendamentos</a>
                <a href="/servicos" className="hover:text-blue-950 dark:hover:text-blue-300 transition">Serviços</a>
                <a href="/configuracoes" className="hover:text-blue-950 dark:hover:text-blue-300 transition">Configurações</a>
              </div>
            </nav>
          </div>

          {/* COLUNA 3 */}
          <div>
            <h4 className="text-sm font-semibold text-blue-950 dark:text-blue-400 mb-3">
              Contato
            </h4>
            <address className="not-italic flex flex-col gap-3 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M2 5c0 7 10 17 17 17l3-3-5-2-2 2c-3-1-6-4-7-7l2-2-2-5-3 3Z"/>
                </svg>
                <span>(00) 0000-0000</span>
              </div>

              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 6h16v12H4z" />
                  <path d="m4 6 8 6 8-6" />
                </svg>
                <span>contato@maisclima.com.br</span>
              </div>

              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 21s-6-5-6-10a6 6 0 1 1 12 0c0 5-6 10-6 10Z"/>
                  <circle cx="12" cy="11" r="2" />
                </svg>
                <span>Recife, PE - Brasil</span>
              </div>
            </address>
          </div>
        </div>

        {/* DIVISOR */}
        <div className="border-t border-gray-100 dark:border-gray-800 mt-10 pt-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center sm:text-left">
            © 2026 Mais Climatização. Desenvolvido pela Vanzoff.
          </p>
          <div className="flex gap-4 text-xs text-gray-400 dark:text-gray-500">
            <span className="hover:text-blue-950 dark:hover:text-blue-300 cursor-pointer transition">Termos</span>
            <span className="hover:text-blue-950 dark:hover:text-blue-300 cursor-pointer transition">Privacidade</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;