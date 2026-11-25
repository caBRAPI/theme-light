import { useState } from "react";

export interface StoreProduct {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  image?: string | null;
  stock?: number | null;
}

interface ProductCardProps {
  product: StoreProduct;
  inCartQty?: number;
  onBuy: (productId: string) => void;
}

export function ProductCard({
  product,
  inCartQty = 0,
  onBuy,
}: ProductCardProps) {
  const [added, setAdded] = useState(false);

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.price);
  const hasStockLimit =
    typeof product.stock === "number" && product.stock >= 0;
  const outOfStock =
    hasStockLimit && (product.stock! === 0 || inCartQty >= product.stock!);
  const imageSrc =
    product.image ||
    `https://placehold.co/600x420/F0EDE8/9CA3AF?text=${encodeURIComponent(product.name)}`;

  function handleClick() {
    if (outOfStock) return;
    onBuy(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <article className="product-card group bg-white rounded-3xl border border-[#e8e4df] overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div
        className="relative overflow-hidden bg-[#f8f7f4]"
        style={{ aspectRatio: "4/3", width: "100%" }}
      >
        <img
          src={imageSrc}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1714]/10 to-transparent pointer-events-none" />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="font-bold text-[#1a1714] text-lg mb-1 line-clamp-2 leading-tight">
            {product.name}
          </h3>
          <p className="text-sm text-[#6b6560] mb-4 line-clamp-2 leading-relaxed">
            {product.description || "Asset digital exclusivo."}
          </p>
        </div>

        <div className="mt-auto">
          <div className="mb-4">
            <span className="text-[10px] text-[#6b6560] font-bold uppercase tracking-widest">
              Valor
            </span>
            <div className="text-2xl text-[#c8502a] font-black leading-none">
              {formattedPrice}
            </div>
          </div>

          <button
            type="button"
            disabled={outOfStock}
            onClick={handleClick}
            className={`w-full py-3.5 text-white font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1a1714] cursor-pointer active:scale-95 ${
              added
                ? "bg-[#2d7a4f] scale-[1.02]"
                : "bg-[#1a1714] hover:bg-[#c8502a]"
            }`}
          >
            <i
              className={`fas ${
                added ? "fa-check" : "fa-shopping-bag"
              } text-sm`}
            />
            <span>
              {outOfStock ? "ESGOTADO" : added ? "ADICIONADO" : "ADICIONAR"}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
