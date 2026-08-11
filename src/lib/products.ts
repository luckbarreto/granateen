/**
 * Configuração central dos produtos pagos.
 *
 * Preparado para a futura integração de checkout (Kiwify).
 * Quando o link de checkout existir, basta preencher `checkoutUrl`.
 * Nenhum pagamento é validado ou processado nesta etapa.
 */
export type Product = {
  id: "plus" | "guia";
  emoji: string;
  nome: string;
  preco: string;
  checkoutUrl: string | null;
};

export const PRODUCTS: Record<Product["id"], Product> = {
  plus: {
    id: "plus",
    emoji: "🧰",
    nome: "Grana Teen Plus",
    preco: "R$ 8,50",
    // TODO: preencher com o link de checkout da Kiwify quando disponível.
    checkoutUrl:     "https://pay.kiwify.com.br/1M5hyRO",
  },
  guia: {
    id: "guia",
    emoji: "📚",
    nome: "Guia Grana Teen",
    preco: "R$ 19,90",
    checkoutUrl: "https://pay.kiwify.com.br/G2lk0oU",
  },
};

/** Ferramentas que farão parte do Grana Teen Plus (ainda bloqueadas). */
export const PLUS_TOOLS = [
  {
    titulo: "Metas financeiras",
    texto: "Defina quanto quer guardar e acompanhe seu progresso.",
  },
  {
    titulo: "Desafio de economia",
    texto: "Desafios práticos para criar o hábito de guardar dinheiro.",
  },
  {
    titulo: "Planejador financeiro",
    texto: "Organize seu dinheiro e planeje seus próximos passos.",
  },
  {
    titulo: "Outras ferramentas",
    texto: "Recursos extras para deixar sua organização ainda mais completa.",
  },
];
