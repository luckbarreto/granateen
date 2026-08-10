import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-financas.jpg";
import ebookCover from "@/assets/ebook-cover.jpg.asset.json";
import { brl, useFinance } from "@/lib/finance";
import { Button } from "@/components/ui/button";
import { TransactionForm } from "@/components/finance/TransactionForm";
import { TransactionList } from "@/components/finance/TransactionList";
import { SpendingBreakdown } from "@/components/finance/SpendingBreakdown";
import { Goals } from "@/components/finance/Goals";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grana Teen — controle financeiro para adolescentes" },
      {
        name: "description",
        content:
          "Anote mesada e gastos, veja para onde vai seu dinheiro e junte grana para suas metas. Simples, rápido e feito para adolescentes.",
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
      <header className="surface-glow border-b border-border">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
          <span className="font-display text-lg font-extrabold tracking-tight">Grana Teen</span>
          <a href="#registrar">
            <Button size="sm">Registrar gasto</Button>
          </a>
        </nav>

        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-6 md:grid-cols-2 md:pb-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Seu dinheiro, suas regras
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] md:text-6xl">
              Controle a <span className="text-brand">sua grana</span> sem depender de ninguém
            </h1>
            <p className="mt-5 max-w-md text-base text-muted-foreground md:text-lg">
              Anote a mesada, veja para onde o dinheiro está indo e junte para aquele objetivo que
              você quer de verdade.
            </p>
            <div className="mt-8 flex items-center gap-6">
              <a href="#registrar">
                <Button size="lg">Começar agora</Button>
              </a>
              <span className="text-sm text-muted-foreground">Sem cadastro. Salvo no aparelho.</span>
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

      <section className="mx-auto max-w-6xl px-5 py-14">
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

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid items-center gap-8 rounded-3xl border border-border bg-card p-6 md:grid-cols-[minmax(0,260px)_1fr] md:p-10">
          <img
            src={ebookCover.url}
            alt="Capa do ebook Dinheiro no Controle"
            width={600}
            height={800}
            loading="lazy"
            className="w-full rounded-2xl border border-border"
          />
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Ebook
            </p>
            <h2 className="mt-3 text-2xl font-bold md:text-3xl">Dinheiro no Controle</h2>
            <p className="mt-3 max-w-lg text-muted-foreground">
              O guia completo para você dominar sua grana de vez: organizar a mesada, cortar gastos
              invisíveis e transformar suas metas em realidade.
            </p>
            <a
              href="https://pay.kiwify.com.br/G2lk0oU"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block"
            >
              <Button size="lg">Quero o ebook</Button>
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
