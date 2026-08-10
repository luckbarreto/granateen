import { useState } from "react";
import { brl, type Goal } from "@/lib/finance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export function Goals({
  metas,
  onAdd,
  onGuardar,
  onRemove,
}: {
  metas: Goal[];
  onAdd: (titulo: string, alvo: number) => void;
  onGuardar: (id: string, valor: number) => void;
  onRemove: (id: string) => void;
}) {
  const [titulo, setTitulo] = useState("");
  const [alvo, setAlvo] = useState("");

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {metas.map((m) => {
          const pct = Math.min(100, Math.round((m.guardado / m.alvo) * 100));
          const falta = Math.max(0, m.alvo - m.guardado);
          return (
            <div key={m.id} className="rounded-3xl border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{m.titulo}</h3>
                  <p className="text-sm text-muted-foreground">
                    {brl(m.guardado)} de {brl(m.alvo)}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(m.id)}
                  className="text-xs text-muted-foreground hover:text-destructive"
                >
                  remover
                </button>
              </div>

              <Progress value={pct} className="mt-4" />

              <p className="mt-2 text-xs text-muted-foreground">
                {falta === 0 ? "Meta batida! 🎉" : `Faltam ${brl(falta)} (${pct}%)`}
              </p>

              <div className="mt-4 flex gap-2">
                {[10, 25, 50].map((v) => (
                  <Button key={v} variant="secondary" size="sm" onClick={() => onGuardar(m.id, v)}>
                    +{brl(v)}
                  </Button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const a = Number(alvo.replace(",", "."));
          if (!titulo.trim() || !a || a <= 0) return;
          onAdd(titulo.trim(), a);
          setTitulo("");
          setAlvo("");
        }}
        className="flex flex-col gap-2 rounded-3xl border border-border bg-card p-5 sm:flex-row"
      >
        <Input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Nova meta (ex.: viagem com a turma)"
        />
        <Input
          value={alvo}
          onChange={(e) => setAlvo(e.target.value)}
          inputMode="decimal"
          placeholder="Valor alvo"
          className="sm:max-w-40"
        />
        <Button type="submit">Criar meta</Button>
      </form>
    </div>
  );
}
