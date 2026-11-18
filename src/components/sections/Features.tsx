const FEATURES = [
  {
    icon: "fa-bolt",
    title: "Entrega rápida",
    description:
      "Receba seu produto em minutos ou de forma totalmente automática após o pagamento.",
  },
  {
    icon: "fa-lock",
    title: "Pagamento seguro",
    description:
      "Transações protegidas com criptografia e validação em tempo real.",
  },
  {
    icon: "fa-headset",
    title: "Suporte ativo",
    description:
      "Atendimento ágil via Discord ou chat para qualquer dúvida ou problema.",
  },
  {
    icon: "fa-tag",
    title: "Melhor preço",
    description:
      "Produtos acessíveis com promoções constantes para economizar sempre.",
  },
];

export function Features() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#c8502a] text-sm font-semibold uppercase tracking-wider mb-2">
            <i className="fas fa-shield-halved mr-2" /> Diferenciais
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Por que comprar aqui?
          </h2>
          <p className="text-[#6b6560]">
            Segurança, rapidez e confiança em cada pedido
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((item) => (
            <div
              key={item.title}
              className="bg-[#f8f7f4] p-6 rounded-2xl hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-[#fef3ec] rounded-2xl flex items-center justify-center mb-4">
                <i className={`fas ${item.icon} text-[#c8502a] text-2xl`} />
              </div>
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-[#6b6560]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
