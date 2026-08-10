import { brl, type Transaction } from "@/lib/finance";

export function TransactionList({
  transacoes,
  onRemove,
}: {
  transacoes: Transaction[];
  onRemove: (id: string) => void;
}) {
  if (transacoes.length === 0) {
    return (
      <p className="rounded-3xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        Nada registrado ainda. Comece adicionando sua mesada.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card">
      {transacoes.map((t) => (
        <li key={t.id} className="flex items-center gap-3 p-4">
          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-2xl text-sm font-bold ${
              t.tipo === "entrada"
                ? "bg-success/15 text-success"
                : "bg-destructive/15 text-destructive"
            }`}
            aria-hidden
          >
            {t.tipo === "entrada" ? "+" : "−"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{t.descricao}</p>
            <p className="text-xs text-muted-foreground">
              {t.categoria} ·{" "}
              {new Date(`${t.data}T12:00:00`).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "short",
              })}
            </p>
          </div>
          <span
            className={`font-semibold ${t.tipo === "entrada" ? "text-success" : "text-foreground"}`}
          >
            {t.tipo === "entrada" ? "+" : "−"}
            {brl(t.valor)}
          </span>
          <button
            onClick={() => onRemove(t.id)}
            aria-label={`Remover ${t.descricao}`}
            className="ml-1 text-xs text-muted-foreground hover:text-destructive"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
