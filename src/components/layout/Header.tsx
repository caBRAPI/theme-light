import { useState } from "react";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export function Header({ cartCount, onOpenCart }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-[200] bg-[#f8f7f4]/95 backdrop-blur-md border-b border-[#e8e4df] shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-[68px]">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-[#1a1714] rounded-xl flex items-center justify-center text-white shadow-md">
              <i className="fas fa-store-alt text-lg" />
            </div>
            <span className="text-lg font-medium tracking-tight text-[#1a1714]">
              Loja <strong className="font-bold text-[#c8502a]">Virtual</strong>
            </span>
          </a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-2 list-none m-0 p-0">
            <li>
              <a
                href="#hero"
                className="group relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-[#6b6560] hover:bg-white hover:text-[#1a1714] transition-all duration-300"
              >
                <i className="fas fa-house text-xs" />
                Início
                <span className="absolute left-4 bottom-1 w-0 h-[2px] bg-[#c8502a] rounded-full transition-all duration-300 group-hover:w-[55%]" />
              </a>
            </li>
            <li>
              <a
                href="#shop"
                className="group relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-[#6b6560] hover:bg-white hover:text-[#1a1714] transition-all duration-300"
              >
                <i className="fas fa-store text-xs" />
                Loja
                <span className="absolute left-4 bottom-1 w-0 h-[2px] bg-[#c8502a] rounded-full transition-all duration-300 group-hover:w-[45%]" />
              </a>
            </li>
            <li>
              <a
                href="#suporte"
                className="group relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-[#6b6560] hover:bg-white hover:text-[#1a1714] transition-all duration-300"
              >
                <i className="fab fa-discord text-xs" />
                Discord
                <span className="absolute left-4 bottom-1 w-0 h-[2px] bg-[#c8502a] rounded-full transition-all duration-300 group-hover:w-[65%]" />
              </a>
            </li>
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              id="cart-toggle"
              aria-label="Abrir carrinho"
              onClick={onOpenCart}
              className="group relative w-11 h-11 rounded-xl border border-[#e8e4df] bg-white flex items-center justify-center text-[#1a1714] shadow-sm hover:bg-[#1a1714] hover:border-[#1a1714] transition-all duration-300 cursor-pointer"
            >
              <i className="fas fa-bag-shopping text-lg transition-colors duration-300 group-hover:text-white" />
              <span
                id="cart-count"
                className="absolute -top-1 -right-1 min-w-5 h-5 px-1.5 bg-[#c8502a] text-white text-[0.65rem] rounded-full flex items-center justify-center font-bold border-2 border-white"
              >
                {cartCount}
              </span>
            </button>

            <button
              type="button"
              aria-label="Abrir menu"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden w-11 h-11 rounded-xl border border-[#e8e4df] bg-white flex items-center justify-center cursor-pointer text-[#1a1714] hover:bg-[#f0ede8] transition-all duration-300"
            >
              <i className={`fas ${mobileOpen ? "fa-xmark" : "fa-bars"} text-lg`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#e8e4df] py-4 flex flex-col gap-2">
            <a
              href="#hero"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#6b6560] hover:bg-white hover:text-[#1a1714] transition-all"
            >
              <i className="fas fa-house w-4 text-center" />
              Início
            </a>
            <a
              href="#shop"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#6b6560] hover:bg-white hover:text-[#1a1714] transition-all"
            >
              <i className="fas fa-store w-4 text-center" />
              Loja
            </a>
            <a
              href="#suporte"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#6b6560] hover:bg-white hover:text-[#1a1714] transition-all"
            >
              <i className="fab fa-discord w-4 text-center" />
              Discord
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
