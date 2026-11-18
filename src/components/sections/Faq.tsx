const FAQS = [
  {
    icon: "fa-shopping-cart",
    question: "Como funciona a compra?",
    answer:
      "Você escolhe o produto, finaliza o pagamento via PIX e recebe automaticamente as instruções ou acesso no seu e-mail logo após a confirmação.",
  },
  {
    icon: "fa-shield-halved",
    question: "É seguro comprar aqui?",
    answer:
      "Sim. Utilizamos sistemas seguros de pagamento e validação para proteger todas as transações. Seus dados são criptografados.",
  },
  {
    icon: "fa-clock",
    question: "Quanto tempo demora para receber?",
    answer:
      "A maioria das entregas é instantânea ou feita em poucos minutos após a confirmação do pagamento. Produtos físicos têm prazo estimado no momento da compra.",
  },
  {
    icon: "fa-headset",
    question: "Como funciona o suporte?",
    answer:
      "Oferecemos suporte via Discord e e-mail. Nossa equipe responde rapidamente durante todo o dia para resolver qualquer dúvida ou problema.",
  },
  {
    icon: "fa-rotate-left",
    question: "Posso pedir reembolso?",
    answer:
      "Sim, em casos de problema no produto ou não entrega. Entre em contato com nosso suporte e avaliaremos seu caso o mais rápido possível.",
  },
];

export function Faq() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#c8502a] text-sm font-semibold uppercase tracking-wider mb-2">
            <i className="fas fa-circle-question mr-2" /> Dúvidas
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Perguntas frequentes
          </h2>
          <p className="text-[#6b6560]">
            As respostas que você precisa antes de comprar
          </p>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq) => (
            <details key={faq.question} className="group bg-[#f8f7f4] rounded-2xl p-5">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="font-semibold">
                  <i className={`fas ${faq.icon} mr-3 text-[#6b6560]`} />
                  {faq.question}
                </span>
                <i className="fas fa-chevron-down text-[#6b6560] group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-4 text-[#6b6560] text-sm leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
