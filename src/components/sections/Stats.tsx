const STATS = [
  { icon: "fa-shopping-cart", value: "+1.200", label: "Vendas realizadas" },
  { icon: "fa-users", value: "+500", label: "Clientes ativos" },
  { icon: "fa-star", value: "99%", label: "Satisfação" },
  { icon: "fa-headset", value: "24h", label: "Suporte ativo" },
];

export function Stats() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#c8502a] text-sm font-semibold uppercase tracking-wider mb-2">
            <i className="fas fa-chart-line mr-2" /> Resultados
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Transparência em números
          </h2>
          <p className="text-[#6b6560]">
            Dados reais de quem já comprou com a gente
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-white p-6 rounded-2xl border border-[#e8e4df] text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-[#f8f7f4] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className={`fas ${stat.icon} text-[#1a1714] text-2xl`} />
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-sm text-[#6b6560] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
