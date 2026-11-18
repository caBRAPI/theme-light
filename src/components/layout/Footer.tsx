export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#1a1714] text-white mt-auto border-t border-white/10">
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#c8502a] to-transparent opacity-80" />
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#c8502a]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-white/5 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
          <div className="md:col-span-5 flex flex-col items-start gap-5">
            <a href="#hero" className="group flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#c8502a] flex items-center justify-center text-white shadow-lg shadow-[#c8502a]/25 transition-transform duration-300 group-hover:scale-105">
                <i className="fas fa-store-alt text-lg" />
              </div>
              <span
                className="text-2xl tracking-tight text-white"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Loja <span className="text-[#c8502a]">Virtual</span>
              </span>
            </a>

            <p className="text-sm text-[#a09a94] leading-relaxed max-w-sm">
              Produtos selecionados com entrega instantânea, checkout simplificado e suporte dedicado em cada pedido.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#d6d0c9]">
                <i className="fas fa-bolt text-[#c8502a]" />
                Entrega automática
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#d6d0c9]">
                <i className="fas fa-lock text-[#c8502a]" />
                PIX &amp; Cartão
              </span>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/90 mb-4">
              Navegação
            </h3>
            <ul className="space-y-3 text-sm text-[#a09a94] list-none p-0 m-0">
              <li>
                <a href="#hero" className="inline-flex items-center gap-2 hover:text-white transition-colors">
                  <i className="fas fa-chevron-right text-[10px] text-[#c8502a]" />
                  Início
                </a>
              </li>
              <li>
                <a href="#shop" className="inline-flex items-center gap-2 hover:text-white transition-colors">
                  <i className="fas fa-chevron-right text-[10px] text-[#c8502a]" />
                  Produtos
                </a>
              </li>
              <li>
                <a href="#suporte" className="inline-flex items-center gap-2 hover:text-[#5865F2] transition-colors">
                  <i className="fas fa-chevron-right text-[10px] text-[#c8502a]" />
                  Discord
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/90 mb-4">
              Atendimento
            </h3>
            <ul className="space-y-3 text-sm text-[#a09a94] list-none p-0 m-0">
              <li className="flex items-start gap-2.5">
                <i className="fas fa-headset text-[#c8502a] mt-1 text-xs" />
                <span>Suporte ativo 24h pelo Discord</span>
              </li>
              <li className="flex items-start gap-2.5">
                <i className="fas fa-shield-halved text-[#c8502a] mt-1 text-xs" />
                <span>Pagamentos 100% criptografados</span>
              </li>
              <li className="flex items-start gap-2.5">
                <i className="fas fa-clock text-[#c8502a] mt-1 text-xs" />
                <span>Confirmação em segundos</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/90 mb-4">
              Comunidade
            </h3>
            <div className="flex flex-wrap gap-2.5">
              <a
                href="#suporte"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#a09a94] hover:text-white hover:bg-[#c8502a] hover:border-[#c8502a] hover:-translate-y-0.5 transition-all duration-300"
              >
                <i className="fab fa-instagram" />
              </a>
              <a
                href="#suporte"
                aria-label="YouTube"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#a09a94] hover:text-white hover:bg-[#c8502a] hover:border-[#c8502a] hover:-translate-y-0.5 transition-all duration-300"
              >
                <i className="fab fa-youtube" />
              </a>
              <a
                href="#suporte"
                aria-label="TikTok"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#a09a94] hover:text-white hover:bg-[#c8502a] hover:border-[#c8502a] hover:-translate-y-0.5 transition-all duration-300"
              >
                <i className="fab fa-tiktok" />
              </a>
              <a
                href="#suporte"
                aria-label="Discord"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#a09a94] hover:text-white hover:bg-[#5865F2] hover:border-[#5865F2] hover:-translate-y-0.5 transition-all duration-300"
              >
                <i className="fab fa-discord" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-7 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#a09a94]">
          <span>© 2026 Loja Virtual · Todos os direitos reservados</span>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
            <i className="fas fa-code text-[11px] text-[#c8502a]" />
            <span>Powered by</span>
            <span className="text-[#c8502a] font-semibold tracking-wide">caBRAPI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
