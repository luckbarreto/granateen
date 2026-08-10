import { useState } from "react";
import { brl, CATEGORIAS, type TxType, type Transaction } from "@/lib/finance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function TransactionForm({
  onAdd,
}: {
  onAdd: (t: Omit<Transaction, "id">) => void;
}) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState<TxType>("saida");
  const [categoria, setCategoria] = useState<string>("Lanche");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = Number(valor.replace(",", "."));
    if (!descricao.trim() || !v || v <= 0) return;
    onAdd({
      descricao: descricao.trim(),
      valor: v,
      tipo,
      categoria,
      data: new Date().toISOString().slice(0, 10),
    });
    setDescricao("");
    setValor("");
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-2 gap-2 rounded-2xl bg-muted p-1">
        {(["entrada", "saida"] as TxType[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTipo(t)}
            className={`rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
              tipo === t
                ? t === "entrada"
                  ? "bg-success text-success-foreground"
                  : "bg-destructive text-destructive-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "entrada" ? "Entrou" : "Saiu"}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="descricao">Descrição</Label>
        <Input
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Ex.: lanche na cantina"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="valor">Valor (R$)</Label>
        <Input
          id="valor"
          inputMode="decimal"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="0,00"
        />
      </div>

      <div className="space-y-2">
        <Label>Categoria</Label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIAS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategoria(c)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                categoria === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg">
        Registrar {valor ? brl(Number(valor.replace(",", ".")) || 0) : ""}
      </Button>
    </form>
  );
}
