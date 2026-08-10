import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-financas.jpg";
import ebookCover from "@/assets/ebook-cover.jpg.asset.json";
import { brl, useFinance } from "@/lib/finance";
import { Button } from "@/components/ui/button";
import { TransactionForm } from "@/components/finance/TransactionForm";
import { TransactionList } from "@/components/finance/TransactionList";
import { SpendingBreakdown } from "@/components/finance/SpendingBreakdown";
import { Goals } from "@/components/finance/Goals";

const KIWIFY = "https://pay.kiwify.com.br/G2lk0oU";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grana Teen — controle financeiro para adolescentes" },
      {
        name: "description",
        content:
          "Anote mesada e gastos, veja para onde vai seu dinheiro e junte grana para suas metas. Ferramenta gratuita, feito para adolescentes.",
      },
      { property: "og:title", content: "Grana Teen — seu dinheiro sob controle" },
      {
        property: "og:description",
        content: "Mesada, gastos e metas de economia em um só lugar, feito para adolescentes.",
      },
    ],
  }),
  component: Index,
});

const RECURSOS_FREE = [
  { icone: "📥", titulo: "Registrar entradas", texto: "Anote mesada, bicos e presentinhos." },
  { icone: "📤", titulo: "Registrar gastos", texto: "Veja cada real que sai na hora." },
  { icone: "📊", titulo: "Acompanhar o saldo", texto: "Saiba sempre quanto sobrou." },
  { icone: "🎯", titulo: "Criar metas", texto: "Junte grana para o que você quer." },
  { icone: "🧭", titulo: "Entender para onde vai", texto: "Gastos separados por categoria." },
];

const GUIA_BENEFICIOS = [
  "Estratégias simples para controlar gastos",
  "Como evitar compras por impulso",
  "Como começar a guardar dinheiro",
  "Como definir metas financeiras",
  "Pequenos desafios para colocar o aprendizado em prática",
];

const DICAS = [
  {
    titulo: "Regra 50/30/20",
    texto: "Metade para o essencial, 30% para o que te dá prazer e 20% guardado. Todo mês.",
  },
  {
    titulo: "Espere 48 horas",
    texto: "Deu vontade de comprar algo caro? Anote e espere dois dias. Metade da vontade some.",
  },
  {
    titulo: "Pague você primeiro",
    texto: "Assim que a mesada cair, mande uma parte direto para a meta antes de gastar.",
  },
];

function Index() {
  const {
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
  } = useFinance();

  return (
    <main className="min-h-screen">
      {/* 1. Apresentação principal */}
      <header className="surface-glow border-b border-border">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
          <span className="font-display text-lg font-extrabold tracking-tight">Grana Teen</span>
          <a href="#registrar">
            <Button size="sm">Começar grátis</Button>
          </a>
        </nav>

        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-6 md:grid-cols-2 md:pb-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Seu dinheiro. Suas metas. Seu controle. 💰
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] md:text-6xl">
              Controle a <span className="text-brand">sua grana</span> sem depender de ninguém
            </h1>
            <p className="mt-5 max-w-md text-base text-muted-foreground md:text-lg">
              Uma ferramenta simples para você entender seus gastos, organizar seu dinheiro e começar
              a construir suas metas financeiras.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#registrar">
                <Button size="lg">Começar gratuitamente</Button>
              </a>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 text-sm font-semibold text-success">
                🆓 100% gratuito
              </span>
            </div>
          </div>

          <img
            src={heroImg}
            alt="Cofrinho de vidro e moedas sobre um celular com gráficos financeiros"
            width={1200}
            height={900}
            className="rounded-4xl border border-border shadow-[var(--shadow-glow)]"
          />
        </div>
      </header>

      {/* 2. Destaque da ferramenta gratuita */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Organize sua grana de verdade</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Tudo isso já está liberado pra você usar — sem cadastro, sem pagar nada.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 text-sm font-semibold text-success">
            🆓 100% gratuito
          </span>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RECURSOS_FREE.map((r) => (
            <article
              key={r.titulo}
              className="rounded-3xl border border-border bg-card p-5"
            >
              <div className="flex size-11 items-center justify-center rounded-2xl bg-muted text-xl">
                {r.icone}
              </div>
              <h3 className="mt-4 text-base font-semibold">{r.titulo}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{r.texto}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Ferramenta — saldo + registro + gastos */}
      <section className="mx-auto max-w-6xl px-5 pb-14">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">Saldo atual</p>
            <p className="mt-2 text-3xl font-extrabold">{brl(saldo)}</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">Entrou</p>
            <p className="mt-2 text-3xl font-extrabold text-success">{brl(entradas)}</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">Saiu</p>
            <p className="mt-2 text-3xl font-extrabold text-destructive">{brl(saidas)}</p>
          </div>
        </div>
      </section>

      <section id="registrar" className="mx-auto max-w-6xl px-5 pb-14">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,380px)_1fr]">
          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-xl font-bold">Registrar movimento</h2>
            <p className="mb-5 mt-1 text-sm text-muted-foreground">
              Leva 10 segundos e muda tudo no fim do mês.
            </p>
            <TransactionForm onAdd={addTransacao} />
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6">
              <h2 className="mb-5 text-xl font-bold">Para onde vai seu dinheiro</h2>
              <SpendingBreakdown dados={porCategoria} total={saidas} />
            </div>
            <div>
              <h2 className="mb-3 text-xl font-bold">Últimos movimentos</h2>
              <TransactionList transacoes={transacoes} onRemove={removeTransacao} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-14">
        <h2 className="mb-5 text-2xl font-bold">Suas metas</h2>
        <Goals metas={metas} onAdd={addMeta} onGuardar={guardar} onRemove={removeMeta} />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <h2 className="mb-5 text-2xl font-bold">Aprenda na prática</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {DICAS.map((d) => (
            <article key={d.titulo} className="rounded-3xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold">{d.titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d.texto}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Nova seção para o e-book */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-5 py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Material complementar
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-bold md:text-3xl">
            Quer ir além? 📚
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
            O Grana Teen também tem um guia prático para quem quer aprender a controlar melhor os
            gastos, evitar compras por impulso e começar a guardar dinheiro mesmo ganhando pouco.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm font-medium text-foreground">
            A ferramenta ajuda você a colocar em prática. O guia ajuda você a entender como fazer.
          </p>
        </div>
      </section>

      {/* 4. Apresentação do e-book */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid items-center gap-8 rounded-4xl border border-border bg-card p-6 md:grid-cols-[minmax(0,260px)_1fr] md:p-10">
          <img
            src={ebookCover.url}
            alt="Capa do ebook Educação Financeira, por Luckas Barreto"
            width={600}
            height={800}
            loading="lazy"
            className="w-full rounded-2xl border border-border"
          />
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
              📚 Guia Grana Teen
            </span>
            <h2 className="mt-3 text-2xl font-bold md:text-3xl">
              Aprenda a cuidar melhor do seu dinheiro, mesmo começando com pouco.
            </h2>
            <ul className="mt-5 grid gap-2.5">
              {GUIA_BENEFICIOS.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                    ✓
                  </span>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <span className="text-2xl font-extrabold">R$ 19,90</span>
              <a href={KIWIFY} target="_blank" rel="noopener noreferrer" className="inline-block">
                <Button size="lg">Conhecer o e-book</Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Comparação visual */}
      <section className="mx-auto max-w-6xl px-5 pb-14">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-success/30 bg-success/5 p-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🆓</span>
              <div>
                <h3 className="text-lg font-bold">Ferramenta Grana Teen</h3>
                <p className="text-sm text-muted-foreground">Para colocar em prática</p>
              </div>
            </div>
            <ul className="mt-5 space-y-2.5 text-sm">
              {[
                "Controle de gastos",
                "Organização do dinheiro",
                "Metas",
                "Acompanhamento do saldo",
              ].map((i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                    ✓
                  </span>
                  <span className="text-muted-foreground">{i}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 inline-flex rounded-full bg-success/15 px-3 py-1.5 text-sm font-semibold text-success">
              Gratuito
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📚</span>
              <div>
                <h3 className="text-lg font-bold">Guia Grana Teen</h3>
                <p className="text-sm text-muted-foreground">Para aprender estratégias</p>
              </div>
            </div>
            <ul className="mt-5 space-y-2.5 text-sm">
              {[
                "Conteúdo educativo",
                "Estratégias práticas",
                "Desafios",
                "Organização financeira",
              ].map((i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                    ✓
                  </span>
                  <span className="text-muted-foreground">{i}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 inline-flex rounded-full bg-muted px-3 py-1.5 text-sm font-semibold">
              R$ 19,90
            </p>
          </div>
        </div>
      </section>

      {/* 6. CTA final */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Comece a cuidar melhor da sua grana hoje. 💚</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
            Use a ferramenta gratuitamente e, se quiser se aprofundar, conheça o Guia Grana Teen.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="#registrar">
              <Button size="lg">Começar gratuitamente</Button>
            </a>
            <a href={KIWIFY} target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button size="lg" variant="secondary">Conhecer o e-book</Button>
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-8 text-sm text-muted-foreground">
          Grana Teen — seus dados ficam salvos apenas neste aparelho.
        </div>
      </footer>
    </main>
  );
}
