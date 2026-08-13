import { useState } from "react";
import { brl } from "@/lib/finance";
import { Button } from "@/components/ui/button";

type Challenge = {
  id: string;
  titulo: string;
  descricao: string;
  meta: number;
};

const DESAFIOS: Challenge[] = [
  {
    id: "sem-lanche",
    titulo: "7 dias sem gastar com lanche",
    descricao: "Tente levar algo de casa durante uma semana e veja quanto consegue economizar.",
    meta: 7,
  },
  {
    id: "guardar-20",
    titulo: "Desafio dos R$ 20",
    descricao: "Guarde R$ 20 por semana durante 4 semanas.",
    meta: 4,
  },
  {
    id: "compra-48h",
    titulo: "48 horas sem compras por impulso",
    descricao: "Antes de comprar algo que não estava planejado, espere 48 horas.",
    meta: 7,
  },
];

const STORAGE_KEY = "grana:plus:desafios";

function carregarProgresso(): Record<string, number> {
  if (typeof window === "undefined") return {};

  try {
    const salvo = window.localStorage.getItem(STORAGE_KEY);
    return salvo ? JSON.parse(salvo) : {};
  } catch {
    return {};
  }
}

export function PlusTools({
  saldo,
  entradas,
  saidas,
}: {
  saldo: number;
  entradas: number;
  saidas: number;
}) {
  const [progresso, setProgresso] =
    useState<Record<string, number>>(carregarProgresso);

  const [planejamento, setPlanejamento] = useState({
    guardar: "",
    limite: "",
  });

  const atualizarDesafio = (id: string, meta: number) => {
    setProgresso((atual) => {
      const novoValor = Math.min((atual[id] ?? 0) + 1, meta);
      const novoProgresso = { ...atual, [id]: novoValor };

      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(novoProgresso),
        );
      }

      return novoProgresso;
    });
  };

  const valorGuardar = Number(planejamento.guardar) || 0;
  const limiteGastos = Number(planejamento.limite) || 0;
  const restante = limiteGastos - saidas;

  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          🧰 Área exclusiva
        </p>

        <h2 className="mt-3 text-2xl font-bold md:text-3xl">
          Grana Teen Plus
        </h2>

        <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
          Ferramentas extras para você organizar seu dinheiro, criar desafios
          e acompanhar sua evolução.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Resumo financeiro */}
        <div className="rounded-3xl border border-primary/30 bg-card p-6">
          <h3 className="text-xl font-bold">📊 Seu resumo financeiro</h3>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-muted p-4">
              <p className="text-xs text-muted-foreground">Saldo</p>
              <p className="mt-1 text-lg font-bold">{brl(saldo)}</p>
            </div>

            <div className="rounded-2xl bg-muted p-4">
              <p className="text-xs text-muted-foreground">Entradas</p>
              <p className="mt-1 text-lg font-bold text-success">
                {brl(entradas)}
              </p>
            </div>

            <div className="rounded-2xl bg-muted p-4">
              <p className="text-xs text-muted-foreground">Gastos</p>
              <p className="mt-1 text-lg font-bold text-destructive">
                {brl(saidas)}
              </p>
            </div>
          </div>
        </div>

        {/* Planejador */}
        <div className="rounded-3xl border border-border bg-card p-6">
          <h3 className="text-xl font-bold">📋 Planejador financeiro</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Defina quanto quer guardar e qual limite deseja gastar.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium">
              Quanto quero guardar
              <input
                type="number"
                min="0"
                step="0.01"
                value={planejamento.guardar}
                onChange={(e) =>
                  setPlanejamento((atual) => ({
                    ...atual,
                    guardar: e.target.value,
                  }))
                }
                placeholder="R$ 0,00"
                className="h-11 rounded-xl border border-border bg-background px-3 outline-none focus:border-primary"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium">
              Limite de gastos
              <input
                type="number"
                min="0"
                step="0.01"
                value={planejamento.limite}
                onChange={(e) =>
                  setPlanejamento((atual) => ({
                    ...atual,
                    limite: e.target.value,
                  }))
                }
                placeholder="R$ 0,00"
                className="h-11 rounded-xl border border-border bg-background px-3 outline-none focus:border-primary"
              />
            </label>
          </div>

          {(valorGuardar > 0 || limiteGastos > 0) && (
            <div className="mt-5 rounded-2xl bg-muted p-4">
              {valorGuardar > 0 && (
                <p className="text-sm">
                  🎯 Sua meta de economia:{" "}
                  <strong>{brl(valorGuardar)}</strong>
                </p>
              )}

              {limiteGastos > 0 && (
                <p className="mt-2 text-sm">
                  💳 Restante do limite:{" "}
                  <strong
                    className={
                      restante < 0 ? "text-destructive" : "text-success"
                    }
                  >
                    {brl(restante)}
                  </strong>
                </p>
              )}
            </div>
          )}
        </div>

        {/* Desafios */}
        <div className="md:col-span-2">
          <div className="mb-4">
            <h3 className="text-xl font-bold">💰 Desafios de economia</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Escolha um desafio e acompanhe seu progresso.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {DESAFIOS.map((desafio) => {
              const atual = progresso[desafio.id] ?? 0;
              const concluido = atual >= desafio.meta;
              const porcentagem = Math.round(
                (atual / desafio.meta) * 100,
              );

              return (
                <article
                  key={desafio.id}
                  className="rounded-3xl border border-border bg-card p-5"
                >
                  <h4 className="font-semibold">{desafio.titulo}</h4>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {desafio.descricao}
                  </p>

                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span>Progresso</span>
                      <span>
                        {atual}/{desafio.meta}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${porcentagem}%` }}
                      />
                    </div>
                  </div>

                  <Button
                    type="button"
                    className="mt-5 w-full"
                    variant={concluido ? "secondary" : "default"}
                    disabled={concluido}
                    onClick={() =>
                      atualizarDesafio(desafio.id, desafio.meta)
                    }
                  >
                    {concluido
                      ? "DESAFIO CONCLUÍDO ✓"
                      : "MARCAR +1 DIA"}
                  </Button>
                </article>
              );
            })}
          </div>
        </div>

        {/* Dica */}
        <div className="md:col-span-2">
          <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6">
            <h3 className="font-bold">💡 Dica do Plus</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Uma boa organização financeira começa com pequenas decisões.
              Defina uma meta realista, acompanhe seus gastos e tente melhorar
              um pouco a cada semana.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
