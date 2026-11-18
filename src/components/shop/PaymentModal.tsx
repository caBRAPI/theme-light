interface PaymentModalProps {
  open: boolean;
  paymentUrl: string;
  paymentMethod: "PIX" | "CARD";
  onClose: () => void;
}

export function PaymentModal({
  open,
  paymentUrl,
  paymentMethod,
  onClose,
}: PaymentModalProps) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Finalizar pagamento"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[400] bg-[#1a1714]/80 backdrop-blur-sm flex items-end md:items-center justify-center p-0"
    >
      <div className="bg-white w-full max-w-sm rounded-t-3xl md:rounded-[2.5rem] p-8 text-center shadow-2xl border border-[#e8e4df]">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#1a1714] rounded-full mb-6 shadow-lg">
          <i
            className={`fas ${
              paymentMethod === "CARD" ? "fa-credit-card" : "fa-bolt"
            } text-2xl text-white`}
          />
        </div>

        <h3 className="text-2xl font-black text-[#1a1714] tracking-tight mb-2">
          {paymentMethod === "CARD" ? "Pagamento com Cartão" : "Pagamento PIX"}
        </h3>
        <p className="text-[#6b6560] text-sm mb-8 leading-relaxed max-w-[240px] mx-auto">
          Clique abaixo para abrir o portal seguro e concluir seu pagamento.
        </p>

        <a
          href={paymentUrl || "#"}
          target={paymentUrl ? "_blank" : undefined}
          rel={paymentUrl ? "noopener noreferrer" : undefined}
          aria-disabled={!paymentUrl}
          className={`block w-full py-4 bg-[#1a1714] text-white font-black rounded-2xl text-center mb-4 transition-all shadow-xl shadow-black/20 uppercase tracking-[0.15em] text-[11px] ${
            paymentUrl
              ? "hover:bg-[#c8502a] active:scale-[0.97]"
              : "opacity-50 pointer-events-none"
          }`}
        >
          FINALIZAR PAGAMENTO
        </a>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 border-2 border-[#e8e4df] text-[#6b6560] font-semibold rounded-xl hover:border-[#1a1714] hover:text-[#1a1714] transition-all cursor-pointer"
        >
          Concluir
        </button>
      </div>
    </div>
  );
}
