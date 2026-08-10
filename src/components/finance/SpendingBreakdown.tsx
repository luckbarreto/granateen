import { brl } from "@/lib/finance";

export function SpendingBreakdown({
  dados,
  total,
}: {
  dados: { categoria: string; total: number }[];
  total: number;
}) {
  if (dados.length === 0) {
    return <p className="text-sm text-muted-foreground">Sem gastos registrados ainda.</p>;
  }

  return (
    <ul className="space-y-4">
      {dados.map((d) => {
        const pct = total ? Math.round((d.total / total) * 100) : 0;
        return (
          <li key={d.categoria}>
            <div className="mb-1.5 flex items-baseline justify-between text-sm">
              <span className="font-medium">{d.categoria}</span>
              <span className="text-muted-foreground">
                {brl(d.total)} · {pct}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${Math.max(4, pct)}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
