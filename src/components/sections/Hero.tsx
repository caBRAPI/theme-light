export function Hero() {
  return (
    <header id="hero" className="relative overflow-hidden py-20 md:py-28 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8f7f4] via-[#faf8f6] to-[#f4f1ed] -z-10" />
      <div className="absolute top-[-120px] right-[-80px] w-[320px] h-[320px] bg-[#c8502a]/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-[-100px] left-[-80px] w-[260px] h-[260px] bg-[#1a1714]/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#ebe5df] rounded-full mb-6 shadow-sm">
              <span className="w-2 h-2 bg-[#c8502a] rounded-full animate-pulse" />
              <span className="text-sm font-medium text-[#4f4a46]">
                Loja online • Entrega expressa
              </span>
            </div>

            <h1
              className="text-4xl md:text-6xl leading-[1.05] font-bold tracking-tight text-[#1a1714] mb-6"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Sua loja virtual
              <span className="block text-[#c8502a]">moderna e completa</span>
            </h1>

            <p className="text-lg text-[#6b6560] leading-relaxed max-w-xl mb-8">
              Produtos selecionados, preços acessíveis e uma experiência premium para quem busca qualidade, velocidade e praticidade.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="#shop"
                className="group inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-white border border-[#e8e4df] text-[#1a1714] font-semibold shadow-sm transition-all duration-300 hover:border-[#c8502a] hover:-translate-y-1 hover:shadow-lg"
              >
                <i className="fas fa-store transition-all duration-300 group-hover:scale-110 group-hover:text-[#c8502a]" />
                <span className="transition-colors duration-300 group-hover:text-[#c8502a]">
                  Ver produtos
                </span>
              </a>

              <a
                href="#suporte"
                className="group inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-white border border-[#e8e4df] text-[#1a1714] font-semibold shadow-sm transition-all duration-300 hover:border-[#c8502a] hover:-translate-y-1 hover:shadow-lg"
              >
                <i className="fab fa-discord transition-all duration-300 group-hover:scale-110 group-hover:text-[#c8502a]" />
                <span className="transition-colors duration-300 group-hover:text-[#c8502a]">
                  Discord
                </span>
              </a>
            </div>

            <div className="flex flex-wrap gap-8">
              <div>
                <strong className="block text-2xl font-bold text-[#1a1714]">+12k</strong>
                <span className="text-sm text-[#6b6560]">Clientes ativos</span>
              </div>
              <div>
                <strong className="block text-2xl font-bold text-[#1a1714]">24h</strong>
                <span className="text-sm text-[#6b6560]">Entrega rápida</span>
              </div>
              <div>
                <strong className="block text-2xl font-bold text-[#1a1714]">4.9★</strong>
                <span className="text-sm text-[#6b6560]">Avaliação média</span>
              </div>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-[#c8502a]/10 rounded-full blur-3xl" />
            <div className="relative overflow-hidden rounded-[32px] shadow-[0_35px_80px_rgba(0,0,0,0.14)]">
              <img
                src="https://blob.cabrapi.com.br/blob/808ff623-b490-414a-8b82-abeadeb87b0d/download"
                alt="Produto em destaque"
                className="w-full h-[540px] object-cover rounded-[32px] transition-transform duration-500 hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-[32px]" />
            </div>

            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-5 py-4 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] flex items-center gap-4 border border-[#e8e4df]">
              <div className="w-14 h-14 bg-[#fef3ec] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <i className="fas fa-bolt text-[#c8502a] text-xl" />
              </div>
              <div>
                <strong className="text-sm block text-[#1a1714] font-semibold">
                  Entrega instantânea
                </strong>
                <span className="text-xs text-[#6b6560]">Receba em minutos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
