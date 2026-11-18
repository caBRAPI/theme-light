export function SupportCta() {
  return (
    <section id="suporte" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#1a1714] rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, #c8502a 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a09a94] mb-3 relative z-10">
            Atendimento
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 relative z-10"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Precisa de ajuda?
          </h2>
          <p className="text-[#a09a94] mb-8 max-w-lg mx-auto relative z-10">
            Fale com nosso suporte em segundos — estamos sempre disponíveis.
          </p>
          <a
            href="#suporte"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#5865F2] text-white font-semibold rounded-xl hover:bg-[#4752C4] transition-all relative z-10 shadow-lg"
          >
            <i className="fab fa-discord text-lg" /> Abrir suporte no Discord
          </a>
        </div>
      </div>
    </section>
  );
}
