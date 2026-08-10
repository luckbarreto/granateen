import { useCallback, useEffect, useState } from "react";

export type TxType = "entrada" | "saida";

export type Transaction = {
  id: string;
  descricao: string;
  valor: number;
  tipo: TxType;
  categoria: string;
  data: string;
};

export type Goal = {
  id: string;
  titulo: string;
  alvo: number;
  guardado: number;
};

export const CATEGORIAS = [
  "Mesada",
  "Bico",
  "Lanche",
  "Rolê",
  "Games",
  "Transporte",
  "Roupas",
  "Escola",
  "Outros",
] as const;

const TX_KEY = "grana:transacoes";
const GOAL_KEY = "grana:metas";

const TX_SEED: Transaction[] = [
  { id: "t1", descricao: "Mesada de agosto", valor: 250, tipo: "entrada", categoria: "Mesada", data: "2026-08-01" },
  { id: "t2", descricao: "Passeio com cachorro da vizinha", valor: 60, tipo: "entrada", categoria: "Bico", data: "2026-08-03" },
  { id: "t3", descricao: "Lanche na cantina", valor: 18, tipo: "saida", categoria: "Lanche", data: "2026-08-04" },
  { id: "t4", descricao: "Cinema com a galera", valor: 45, tipo: "saida", categoria: "Rolê", data: "2026-08-06" },
  { id: "t5", descricao: "Skin no game", valor: 30, tipo: "saida", categoria: "Games", data: "2026-08-08" },
];

const GOAL_SEED: Goal[] = [
  { id: "g1", titulo: "Tênis novo", alvo: 450, guardado: 180 },
  { id: "g2", titulo: "Fone bluetooth", alvo: 300, guardado: 240 },
];

function load<T>(key: string, seed: T): T {
  if (typeof window === "undefined") return seed;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : seed;
  } catch {
    return seed;
  }
}

export function brl(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function useFinance() {
  const [hydrated, setHydrated] = useState(false);
  const [transacoes, setTransacoes] = useState<Transaction[]>(TX_SEED);
  const [metas, setMetas] = useState<Goal[]>(GOAL_SEED);

  useEffect(() => {
    setTransacoes(load(TX_KEY, TX_SEED));
    setMetas(load(GOAL_KEY, GOAL_SEED));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(TX_KEY, JSON.stringify(transacoes));
  }, [transacoes, hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(GOAL_KEY, JSON.stringify(metas));
  }, [metas, hydrated]);

  const addTransacao = useCallback((t: Omit<Transaction, "id">) => {
    setTransacoes((prev) => [{ ...t, id: crypto.randomUUID() }, ...prev]);
  }, []);

  const removeTransacao = useCallback((id: string) => {
    setTransacoes((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addMeta = useCallback((titulo: string, alvo: number) => {
    setMetas((prev) => [...prev, { id: crypto.randomUUID(), titulo, alvo, guardado: 0 }]);
  }, []);

  const guardar = useCallback((id: string, valor: number) => {
    setMetas((prev) =>
      prev.map((m) => (m.id === id ? { ...m, guardado: Math.max(0, m.guardado + valor) } : m)),
    );
  }, []);

  const removeMeta = useCallback((id: string) => {
    setMetas((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const entradas = transacoes.filter((t) => t.tipo === "entrada").reduce((s, t) => s + t.valor, 0);
  const saidas = transacoes.filter((t) => t.tipo === "saida").reduce((s, t) => s + t.valor, 0);
  const saldo = entradas - saidas;

  const porCategoria = Object.entries(
    transacoes
      .filter((t) => t.tipo === "saida")
      .reduce<Record<string, number>>((acc, t) => {
        acc[t.categoria] = (acc[t.categoria] ?? 0) + t.valor;
        return acc;
      }, {}),
  )
    .map(([categoria, total]) => ({ categoria, total }))
    .sort((a, b) => b.total - a.total);

  return {
    transacoes,
    metas,
    entradas,
    saidas,
    saldo,
    porCategoria,
    addTransacao,
    removeTransacao,
    addMeta,
    guardar,
    removeMeta,
  };
}
