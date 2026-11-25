import { caBRAPI } from "@cabrapi/sdk";

/**
 * Cria a instância pública do SDK da caBRAPI.
 * Use este cliente para buscar produtos, categorias, cupons e criar pagamentos.
 */
export function createStoreSdk() {
  return new caBRAPI({ type: "public" });
}

/**
 * Lê o ID da loja definido na meta tag <meta name="loja-id" content="..." /> do index.html.
 * Retorna string vazia caso ainda esteja com o placeholder {{store_id}}.
 */
export function getStoreId(): string {
  if (typeof document === "undefined") return "";
  const raw =
    document.querySelector('meta[name="loja-id"]')?.getAttribute("content") ?? "";
  const id = raw.trim();
  if (!id || /^\{\{.*\}\}$/.test(id) || id === "STORE_ID") return "";
  return id;
}
