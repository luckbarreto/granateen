import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  QUIZ_QUESTIONS,
  calcularPerfil,
  type Profile,
  type QuizOption,
} from "@/lib/quiz";

export function FinanceQuiz() {
  const [respostas, setRespostas] = useState<QuizOption["letra"][]>([]);
  const [perfil, setPerfil] = useState<Profile | null>(null);

  const indice = respostas.length;
  const questao = QUIZ_QUESTIONS[indice];
  const progresso = (indice / QUIZ_QUESTIONS.length) * 100;

  const responder = (letra: QuizOption["letra"]) => {
    const proximas = [...respostas, letra];
    setRespostas(proximas);
    if (proximas.length === QUIZ_QUESTIONS.length) setPerfil(calcularPerfil(proximas));
  };

  const reiniciar = () => {
    setRespostas([]);
    setPerfil(null);
  };

  if (perfil) {
    return (
      <div className="animate-in fade-in duration-300">
        <div className="rounded-4xl border border-border bg-card p-6 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Seu perfil financeiro
          </p>
          <h3 className={`mt-3 text-3xl font-extrabold md:text-4xl ${perfil.cor}`}>
            {perfil.emoji} {perfil.nome}
          </h3>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">{perfil.descricao}</p>

          <h4 className="mt-8 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Por onde começar
          </h4>
          <ul className="mt-3 grid gap-2.5">
            {perfil.recomendacoes.map((r) => (
              <li key={r} className="flex items-start gap-2.5 text-sm">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                  ✓
                </span>
                <span className="text-muted-foreground">{r}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-3xl border border-border bg-muted/40 p-5">
            <p className="font-semibold">Agora você sabe qual é o seu perfil. 💰</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Mas descobrir é só o começo. O próximo passo é colocar isso em prática.
            </p>
            <h4 className="mt-5 text-lg font-bold">Comece gratuitamente</h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Use a ferramenta básica do Grana Teen para registrar entradas e gastos, acompanhar seu
              saldo e começar a entender melhor para onde seu dinheiro está indo.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a href="#ferramenta">
                <Button size="lg" className="h-12 text-base">
                  COMEÇAR GRATUITAMENTE →
                </Button>
              </a>
              <span className="text-sm text-muted-foreground">Sem cadastro.</span>
            </div>
          </div>

          <button
            onClick={reiniciar}
            className="mt-6 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            Refazer o quiz
          </button>
        </div>
      </div>
    );
  }

  if (!questao) return null;

  return (
    <div className="rounded-4xl border border-border bg-card p-6 md:p-10">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-muted-foreground">
          Pergunta {indice + 1} de {QUIZ_QUESTIONS.length}
        </p>
        <span className="text-xs text-muted-foreground">Sem cadastro</span>
      </div>
      <Progress value={progresso} className="mt-3" />

      <h3 key={questao.id} className="mt-7 animate-in fade-in text-xl font-bold duration-300 md:text-2xl">
        {questao.pergunta}
      </h3>

      <div className="mt-5 grid gap-3">
        {questao.opcoes.map((o) => (
          <button
            key={o.letra}
            onClick={() => responder(o.letra)}
            className="flex items-center gap-3 rounded-2xl border border-border bg-background p-4 text-left text-base transition-colors hover:border-primary hover:bg-muted/60 active:scale-[0.99]"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-muted text-sm font-bold">
              {o.letra}
            </span>
            <span className="min-w-0">{o.texto}</span>
          </button>
        ))}
      </div>

      {indice > 0 && (
        <button
          onClick={() => setRespostas((p) => p.slice(0, -1))}
          className="mt-5 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          Voltar
        </button>
      )}
    </div>
  );
}
