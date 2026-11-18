import { useState, type FormEvent } from "react";
import type { StoreProduct } from "./ProductCard";

export interface CartItem {
  product: StoreProduct;
  qty: number;
}

export interface CheckoutFormData {
  name: string;
  nickname: string;
  email: string;
  phone: string;
  cpf: string;
  note: string;
  coupon: string;
  paymentMethod: "PIX" | "CARD";
}

interface FeeRule {
  percent: number;
  fixed: number;
}

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  appliedCoupon?: { code: string; discount: number } | null;
  fees?: { pix?: FeeRule; card?: FeeRule };
  onClose: () => void;
  onUpdateQty: (productId: string, delta: number) => void;
  onRemove: (productId: string) => void;
  onApplyCoupon: (code: string) => Promise<{ ok: boolean; message: string }>;
  onSubmitCheckout: (
    data: CheckoutFormData,
  ) => Promise<{
    ok: boolean;
    message: string;
    paymentUrl?: string;
  }>;
}

export function CartDrawer({
  open,
  items,
  appliedCoupon,
  fees,
  onClose,
  onUpdateQty,
  onRemove,
  onApplyCoupon,
  onSubmitCheckout,
}: CartDrawerProps) {
  const [step, setStep] = useState<"cart" | "details" | "payment">("cart");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [note, setNote] = useState("");
  const [coupon, setCoupon] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"PIX" | "CARD">("PIX");
  const [couponStatus, setCouponStatus] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);
  const [statusMsg, setStatusMsg] = useState<{
    ok: boolean;
    message: string;
    paymentUrl?: string;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0,
  );
  const discountAmount = appliedCoupon
    ? subtotal * (appliedCoupon.discount / 100)
    : 0;
  const afterDiscount = Math.max(0, subtotal - discountAmount);
  const activeFee = paymentMethod === "CARD" ? fees?.card : fees?.pix;
  const feePercent = Number(activeFee?.percent || 0);
  const feeFixed = Number(activeFee?.fixed || 0);
  const feeAmount = afterDiscount * (feePercent / 100) + feeFixed;
  const total = afterDiscount + feeAmount;
  const formatBrl = (val: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(val);

  async function handleCouponClick() {
    if (!coupon.trim()) {
      setCouponStatus({ ok: false, message: "Digite um cupom para aplicar." });
      return;
    }
    const res = await onApplyCoupon(coupon.trim());
    setCouponStatus(res);
  }

  function handleClose() {
    setStep("cart");
    setStatusMsg(null);
    onClose();
  }

  function handleGoToDetails() {
    setStatusMsg(null);
    if (items.length === 0) return;
    setStep("details");
  }

  function handleGoToPayment() {
    setStatusMsg(null);
    if (name.trim().length < 3) {
      setStatusMsg({
        ok: false,
        message: "Informe um nome válido (mínimo 3 caracteres).",
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatusMsg({ ok: false, message: "Informe um e-mail válido." });
      return;
    }
    setStep("payment");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatusMsg(null);
    if (items.length === 0) {
      setStatusMsg({ ok: false, message: "Seu carrinho está vazio." });
      return;
    }
    if (name.trim().length < 3) {
      setStatusMsg({
        ok: false,
        message: "Informe um nome válido (mínimo 3 caracteres).",
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatusMsg({ ok: false, message: "Informe um e-mail válido." });
      return;
    }

    setSubmitting(true);
    try {
      const res = await onSubmitCheckout({
        name: name.trim(),
        nickname: nickname.trim(),
        email: email.trim(),
        phone: phone.replace(/\D/g, ""),
        cpf: cpf.replace(/\D/g, ""),
        note: note.trim(),
        coupon: coupon.trim(),
        paymentMethod,
      });
      setStatusMsg(res);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Carrinho e pagamento"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      className="fixed inset-0 z-[300] bg-[#1a1714]/70 backdrop-blur-sm flex items-end md:items-center justify-center p-0"
    >
      <div className="bg-white w-full max-w-[860px] rounded-t-3xl md:rounded-3xl h-[92vh] md:h-auto md:max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="checkout-panel-content flex-1 overflow-y-auto px-4 py-5 md:p-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e8e4df]">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#1a1714]">
                <i className="fas fa-bag-shopping mr-2" />
                {step === "cart"
                  ? "Carrinho"
                  : step === "details"
                    ? "Seus dados"
                    : "Forma de pagamento"}
              </h2>
              <p className="text-[#6b6560] text-xs md:text-sm mt-0.5">
                {step === "cart"
                  ? "Revise os itens do seu pedido"
                  : step === "details"
                    ? "Preencha seus dados para entrega"
                    : "Escolha PIX ou cartão para finalizar"}
              </p>
            </div>
            <button
              type="button"
              aria-label="Fechar carrinho"
              onClick={handleClose}
              className="w-10 h-10 rounded-xl border border-[#e8e4df] flex items-center justify-center hover:bg-[#f8f7f4] transition-colors cursor-pointer"
            >
              <i className="fas fa-xmark" />
            </button>
          </div>

          {/* Etapa 1: Carrinho */}
          {step === "cart" && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#6b6560] mb-3">
                <i className="fas fa-receipt mr-2" /> Resumo do pedido
              </p>
              {items.length === 0 ? (
                <p className="text-center py-6 text-[#6b6560] text-sm">
                  Carrinho vazio
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {items.map(({ product, qty }) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between gap-3 p-2.5 bg-[#f8f7f4] rounded-xl"
                    >
                      <img
                        src={
                          product.image ||
                          "https://placehold.co/64x64/F0EDE8/9CA3AF"
                        }
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover shrink-0 border border-[#e8e4df]"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-xs text-[#1a1714] truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-[#6b6560]">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(product.price)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={qty <= 1}
                          onClick={() => onUpdateQty(product.id, -1)}
                          className="w-7 h-7 rounded-lg bg-white border border-[#e8e4df] text-[#1a1714] hover:bg-[#f0ede8] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                          <i className="fas fa-minus text-xs" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold">
                          {qty}
                        </span>
                        <button
                          type="button"
                          disabled={
                            product.stock !== null &&
                            product.stock !== undefined &&
                            qty >= product.stock
                          }
                          onClick={() => onUpdateQty(product.id, 1)}
                          className="w-7 h-7 rounded-lg bg-white border border-[#e8e4df] text-[#1a1714] hover:bg-[#f0ede8] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                          <i className="fas fa-plus text-xs" />
                        </button>
                      </div>
                      <button
                        type="button"
                        aria-label="Remover item"
                        onClick={() => onRemove(product.id)}
                        className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                      >
                        <i className="fas fa-trash text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-3 mt-3 border-t border-[#e8e4df] space-y-2">
                <div className="flex justify-between items-center text-xs text-[#6b6560]">
                  <span className="inline-flex items-center gap-1.5">
                    <i className="fas fa-receipt w-3.5 text-center" />
                    Subtotal
                  </span>
                  <span>{formatBrl(subtotal)}</span>
                </div>
                <div
                  className={`flex justify-between items-center text-xs ${
                    appliedCoupon
                      ? "text-green-700 font-medium"
                      : "text-[#6b6560]"
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <i className="fas fa-ticket w-3.5 text-center" />
                    Cupom
                  </span>
                  <span>
                    {appliedCoupon
                      ? `-${formatBrl(discountAmount)}`
                      : formatBrl(0)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-[#6b6560]">
                  <span className="inline-flex items-center gap-1.5">
                    <i className="fas fa-percent w-3.5 text-center" />
                    Taxas
                  </span>
                  <span>
                    {feeAmount > 0 ? `+${formatBrl(feeAmount)}` : formatBrl(0)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-[#e8e4df]">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
                    <i className="fas fa-wallet w-3.5 text-center text-[#c8502a]" />
                    Total
                  </span>
                  <strong className="text-xl md:text-2xl font-bold text-[#c8502a]">
                    {formatBrl(total)}
                  </strong>
                </div>
              </div>

              <button
                type="button"
                disabled={items.length === 0}
                onClick={handleGoToDetails}
                className="mt-6 w-full py-3.5 bg-[#1a1714] text-white text-sm md:text-base font-semibold rounded-xl hover:bg-[#c8502a] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer"
              >
                Continuar pagamento
                <i className="fas fa-arrow-right ml-2" />
              </button>
            </div>
          )}

          {/* Etapa 2 e 3: Dados + Pagamento */}
          {step !== "cart" && (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-3.5"
            >
              {step === "details" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="checkout-name"
                        className="text-sm font-semibold"
                      >
                        <i className="fas fa-user mr-2 text-[#6b6560]" />
                        Nome completo
                      </label>
                      <input
                        id="checkout-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Seu nome completo"
                        className="px-4 py-3 border border-[#e8e4df] rounded-xl focus:ring-2 focus:ring-[#c8502a] focus:border-transparent outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="checkout-nickname"
                        className="text-sm font-semibold"
                      >
                        <i className="fas fa-at mr-2 text-[#6b6560]" />
                        Nickname{" "}
                        <span className="text-[#a09a94] font-normal">
                          (opcional)
                        </span>
                      </label>
                      <input
                        id="checkout-nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="Seu apelido"
                        maxLength={32}
                        className="px-4 py-3 border border-[#e8e4df] rounded-xl focus:ring-2 focus:ring-[#c8502a] focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="checkout-email"
                      className="text-sm font-semibold"
                    >
                      <i className="fas fa-envelope mr-2 text-[#6b6560]" />
                      E-mail
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="voce@email.com"
                      className="px-4 py-3 border border-[#e8e4df] rounded-xl focus:ring-2 focus:ring-[#c8502a] focus:border-transparent outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="checkout-phone"
                        className="text-sm font-semibold"
                      >
                        <i className="fas fa-phone mr-2 text-[#6b6560]" />
                        Telefone{" "}
                        <span className="text-[#a09a94] font-normal">
                          (opcional)
                        </span>
                      </label>
                      <input
                        id="checkout-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(00) 00000-0000"
                        className="px-4 py-3 border border-[#e8e4df] rounded-xl focus:ring-2 focus:ring-[#c8502a] focus:border-transparent outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="checkout-cpf"
                        className="text-sm font-semibold"
                      >
                        <i className="fas fa-id-card mr-2 text-[#6b6560]" />
                        CPF{" "}
                        <span className="text-[#a09a94] font-normal">
                          (opcional)
                        </span>
                      </label>
                      <input
                        id="checkout-cpf"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        placeholder="000.000.000-00"
                        className="px-4 py-3 border border-[#e8e4df] rounded-xl focus:ring-2 focus:ring-[#c8502a] focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="checkout-note"
                      className="text-sm font-semibold"
                    >
                      <i className="fas fa-comment mr-2 text-[#6b6560]" />
                      Observação{" "}
                      <span className="text-[#a09a94] font-normal">
                        (opcional)
                      </span>
                    </label>
                    <textarea
                      id="checkout-note"
                      rows={2}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Algo a informar?"
                      className="px-4 py-3 border border-[#e8e4df] rounded-xl focus:ring-2 focus:ring-[#c8502a] focus:border-transparent outline-none resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="checkout-coupon"
                      className="text-sm font-semibold"
                    >
                      <i className="fas fa-ticket mr-2 text-[#6b6560]" />
                      Cupom{" "}
                      <span className="text-[#a09a94] font-normal">
                        (opcional)
                      </span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="checkout-coupon"
                        value={coupon}
                        onChange={(e) => {
                          setCoupon(e.target.value);
                          setCouponStatus(null);
                        }}
                        placeholder="Ex: BEMVINDO10"
                        className="flex-1 px-4 py-3 border border-[#e8e4df] rounded-xl focus:ring-2 focus:ring-[#c8502a] focus:border-transparent outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleCouponClick}
                        className="px-4 py-3 bg-white border border-[#e8e4df] text-[#1a1714] font-semibold rounded-xl hover:border-[#c8502a] hover:text-[#c8502a] transition-all whitespace-nowrap cursor-pointer"
                      >
                        <i className="fas fa-ticket mr-2" /> Aplicar
                      </button>
                    </div>
                    {couponStatus && (
                      <p
                        className={`text-xs font-medium ${
                          couponStatus.ok ? "text-green-700" : "text-red-600"
                        }`}
                      >
                        {couponStatus.message}
                      </p>
                    )}
                  </div>

                  {statusMsg && (
                    <div className="p-3 rounded-xl text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                      <p className="font-semibold">{statusMsg.message}</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setStatusMsg(null);
                        setStep("cart");
                      }}
                      className="px-5 py-3.5 border border-[#e8e4df] text-[#6b6560] font-semibold rounded-xl hover:border-[#1a1714] hover:text-[#1a1714] transition-colors cursor-pointer"
                    >
                      Voltar
                    </button>
                    <button
                      type="button"
                      onClick={handleGoToPayment}
                      className="flex-1 py-3.5 bg-[#1a1714] text-white text-sm md:text-base font-semibold rounded-xl hover:bg-[#c8502a] transition-all shadow-sm cursor-pointer"
                    >
                      Continuar para pagamento
                      <i className="fas fa-arrow-right ml-2" />
                    </button>
                  </div>
                </>
              )}

              {step === "payment" && (
                <>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-semibold">
                      <i className="fas fa-credit-card mr-2 text-[#6b6560]" />
                      Pagamento
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("PIX")}
                        className={`p-3 border-2 rounded-xl text-center transition-all cursor-pointer ${
                          paymentMethod === "PIX"
                            ? "border-[#c8502a] bg-[#fef3ec]"
                            : "border-[#e8e4df] hover:border-[#c8502a]"
                        }`}
                      >
                        <i className="fas fa-bolt text-xl text-[#c8502a]" />
                        <p className="font-semibold text-xs mt-1">PIX</p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("CARD")}
                        className={`p-3 border-2 rounded-xl text-center transition-all cursor-pointer ${
                          paymentMethod === "CARD"
                            ? "border-[#c8502a] bg-[#fef3ec]"
                            : "border-[#e8e4df] hover:border-[#c8502a]"
                        }`}
                      >
                        <i className="fas fa-credit-card text-xl text-[#6b6560]" />
                        <p className="font-semibold text-xs mt-1">Cartão</p>
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-[#f8f7f4] rounded-xl space-y-2 border border-[#e8e4df]">
                    <div className="flex justify-between items-center text-xs text-[#6b6560]">
                      <span className="inline-flex items-center gap-1.5">
                        <i className="fas fa-receipt w-3.5 text-center" />
                        Subtotal
                      </span>
                      <span>{formatBrl(subtotal)}</span>
                    </div>
                    <div
                      className={`flex justify-between items-center text-xs ${
                        appliedCoupon
                          ? "text-green-700 font-medium"
                          : "text-[#6b6560]"
                      }`}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <i className="fas fa-ticket w-3.5 text-center" />
                        Cupom
                      </span>
                      <span>
                        {appliedCoupon
                          ? `-${formatBrl(discountAmount)}`
                          : formatBrl(0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-[#6b6560]">
                      <span className="inline-flex items-center gap-1.5">
                        <i className="fas fa-percent w-3.5 text-center" />
                        Taxas
                      </span>
                      <span>
                        {feeAmount > 0
                          ? `+${formatBrl(feeAmount)}`
                          : formatBrl(0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-[#e8e4df]">
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
                        <i className="fas fa-wallet w-3.5 text-center text-[#c8502a]" />
                        Total
                      </span>
                      <strong className="text-xl font-bold text-[#c8502a]">
                        {formatBrl(total)}
                      </strong>
                    </div>
                  </div>

                  {statusMsg && (
                    <div
                      className={`p-4 rounded-xl text-xs font-medium ${
                        statusMsg.ok
                          ? "bg-green-50 text-green-800 border border-green-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      <p className="font-semibold">{statusMsg.message}</p>
                      {statusMsg.paymentUrl && (
                        <a
                          href={statusMsg.paymentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 block w-full py-3 bg-[#1a1714] text-white font-bold rounded-xl text-center hover:bg-[#c8502a] transition-colors uppercase tracking-wider text-[11px]"
                        >
                          Finalizar Pagamento
                        </a>
                      )}
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setStatusMsg(null);
                        setStep("details");
                      }}
                      className="px-5 py-3.5 border border-[#e8e4df] text-[#6b6560] font-semibold rounded-xl hover:border-[#1a1714] hover:text-[#1a1714] transition-colors cursor-pointer"
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 py-3.5 bg-[#1a1714] text-white text-sm md:text-base font-semibold rounded-xl hover:bg-[#c8502a] disabled:opacity-50 transition-all shadow-sm cursor-pointer"
                    >
                      <i
                        className={`fas ${
                          paymentMethod === "CARD"
                            ? "fa-credit-card"
                            : "fa-bolt"
                        } mr-2`}
                      />
                      {submitting
                        ? "Processando..."
                        : paymentMethod === "CARD"
                          ? "Pagar com Cartão"
                          : "Pagar com PIX"}
                    </button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
