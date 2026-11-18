import { useEffect, useMemo, useState } from "react";
import {
  CartDrawer,
  type CartItem,
  type CheckoutFormData,
} from "./components/shop/CartDrawer";
import { PaymentModal } from "./components/shop/PaymentModal";
import { ProductCard, type StoreProduct } from "./components/shop/ProductCard";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { Faq } from "./components/sections/Faq";
import { Features } from "./components/sections/Features";
import { Hero } from "./components/sections/Hero";
import { Stats } from "./components/sections/Stats";
import { SupportCta } from "./components/sections/SupportCta";
import { createStoreSdk, getStoreId } from "./lib/sdk";

export default function App() {
  // Instância pública do SDK da caBRAPI
  const sdk = useMemo(() => createStoreSdk(), []);
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("cabrapi_theme_light_cart");
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [fees, setFees] = useState<{
    pix?: { percent: number; fixed: number };
    card?: { percent: number; fixed: number };
  }>({});
  const [paymentModal, setPaymentModal] = useState<{
    open: boolean;
    url: string;
    method: "PIX" | "CARD";
  }>({ open: false, url: "", method: "PIX" });

  // Carrega os produtos da loja automaticamente usando o ID da meta tag <meta name="loja-id">
  useEffect(() => {
    const storeId = getStoreId();
    if (!storeId) {
      setLoading(false);
      return;
    }

    sdk.products
      .get(storeId, { page: 1, limit: 12 })
      .then((res) => {
        if (Array.isArray(res?.products)) {
          setProducts(res.products);
        }
      })
      .catch(() => {
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });

    fetch(`https://api.cabrapi.com.br/v1/stores/${storeId}/fees`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.fees) {
          setFees({
            pix: data.fees.pix
              ? {
                  percent: Number(data.fees.pix.percent || 0),
                  fixed: Number(data.fees.pix.fixed || 0),
                }
              : undefined,
            card: data.fees.card
              ? {
                  percent: Number(data.fees.card.percent || 0),
                  fixed: Number(data.fees.card.fixed || 0),
                }
              : undefined,
          });
        }
      })
      .catch(() => {});
  }, [sdk]);

  // Salva o carrinho no localStorage para não perder ao dar F5
  useEffect(() => {
    try {
      localStorage.setItem("cabrapi_theme_light_cart", JSON.stringify(cartItems));
    } catch {
      // Ignora erro de quota/privacidade do navegador
    }
  }, [cartItems]);

  // Ação ao clicar em "ADICIONAR" no card de produto
  function handleBuy(productId: string) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.product.id === productId ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  }

  function handleUpdateQty(productId: string, delta: number) {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.product.id !== productId) return item;
        const nextQty = Math.max(1, item.qty + delta);
        const maxStock = item.product.stock;
        const clampedQty =
          maxStock !== null && maxStock !== undefined
            ? Math.min(nextQty, Math.max(1, maxStock))
            : nextQty;
        return { ...item, qty: clampedQty };
      }),
    );
  }

  function handleRemoveItem(productId: string) {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  }

  async function handleApplyCoupon(code: string) {
    const storeId = getStoreId();
    if (!storeId) {
      return { ok: false, message: "Configure o ID da loja no index.html." };
    }
    try {
      const res = await sdk.coupons.getByCode(storeId, code);
      if (res?.status && res?.coupon?.code) {
        const discount = Number(res.coupon.discount || 0);
        setAppliedCoupon({ code: String(res.coupon.code), discount });
        return {
          ok: true,
          message: `Cupom aplicado: ${String(res.coupon.code).toUpperCase()} (-${discount}%)`,
        };
      }
      setAppliedCoupon(null);
      return { ok: false, message: "Cupom inválido ou expirado." };
    } catch {
      return { ok: false, message: "Cupom inválido ou indisponível." };
    }
  }

  async function handleSubmitCheckout(data: CheckoutFormData) {
    const storeId = getStoreId();
    if (!storeId) {
      return { ok: false, message: "Configure o ID da loja no index.html." };
    }
    try {
      const res = await sdk.payments.post(storeId, {
        name: data.name,
        email: data.email,
        cpf: data.cpf || undefined,
        gateway:
          data.paymentMethod === "CARD"
            ? "MERCADOPAGO_ORDER_CARD"
            : "MERCADOPAGO_ORDER_PIX",
        coupon: data.coupon || undefined,
        items: cartItems.map((item) => ({
          productId: item.product.id,
          quantity: item.qty,
        })),
      });
      if (!res?.status) {
        return {
          ok: false,
          message: "Não foi possível criar o pagamento.",
        };
      }
      const payment = res?.data?.payment as
        | { url?: string; checkout_url?: string; init_point?: string }
        | undefined;
      const paymentUrl =
        payment?.checkout_url || payment?.url || payment?.init_point || "";

      setCartItems([]);
      setCartOpen(false);
      setPaymentModal({
        open: true,
        url: paymentUrl,
        method: data.paymentMethod,
      });
      return {
        ok: true,
        message: "Pagamento criado com sucesso!",
        paymentUrl,
      };
    } catch {
      return { ok: false, message: "Erro ao processar pagamento." };
    }
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="bg-[#f8f7f4] text-[#1a1714] min-h-screen flex flex-col">
      {/* Barra de navegação superior */}
      <Header cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />

      {/* Seção principal de destaque (Hero) */}
      <Hero />

      {/* Diferenciais da loja (4 cards) */}
      <Features />

      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="border-t border-[#e8e4df]" />
      </div>

      {/* Catálogo de produtos carregado via @cabrapi/sdk */}
      <section id="shop" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-[#c8502a] text-sm font-semibold uppercase tracking-wider mb-2">
                <i className="fas fa-store mr-2" /> Catálogo
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Nossos produtos
              </h2>
            </div>
          </div>

          <div id="products-list">
            {loading ? (
              <div className="text-center py-16 text-[#6b6560]">
                <i className="fas fa-spinner fa-spin text-3xl mb-4 block" />
                <p>Carregando produtos…</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16 text-[#6b6560]">
                <i className="fas fa-box-open text-4xl mb-3 block opacity-40" />
                <p>Nenhum produto encontrado. Verifique o ID da loja no index.html.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => {
                  const inCartQty =
                    cartItems.find((item) => item.product.id === product.id)
                      ?.qty ?? 0;
                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                      inCartQty={inCartQty}
                      onBuy={handleBuy}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="border-t border-[#e8e4df]" />
      </div>

      {/* Números e estatísticas */}
      <Stats />

      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="border-t border-[#e8e4df]" />
      </div>

      {/* Chamada para suporte no Discord */}
      <SupportCta />

      {/* Perguntas frequentes */}
      <Faq />

      {/* Rodapé */}
      <Footer />

      {/* Modal/Drawer do Carrinho */}
      <CartDrawer
        open={cartOpen}
        items={cartItems}
        appliedCoupon={appliedCoupon}
        fees={fees}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemoveItem}
        onApplyCoupon={handleApplyCoupon}
        onSubmitCheckout={handleSubmitCheckout}
      />

      {/* Modal de Pagamento */}
      <PaymentModal
        open={paymentModal.open}
        paymentUrl={paymentModal.url}
        paymentMethod={paymentModal.method}
        onClose={() => setPaymentModal((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
}
