import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-financas.jpg";
import ebookCover from "@/assets/ebook-cover.jpg";
import { brl, useFinance } from "@/lib/finance";
import { Button } from "@/components/ui/button";
import { TransactionForm } from "@/components/finance/TransactionForm";
import { TransactionList } from "@/components/finance/TransactionList";
import { SpendingBreakdown } from "@/components/finance/SpendingBreakdown";
import { Goals } from "@/components/finance/Goals";
import { FinanceQuiz } from "@/components/quiz/FinanceQuiz";
import { PLUS_TOOLS, PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grana Teen — quiz de perfil financeiro e controle de gastos" },
      {
        name: "description",
        content:
          "Descubra seu perfil financeiro em 6 perguntas, use a ferramenta gratuita para registrar mesada e gastos e escolha como continuar aprendendo.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Grana Teen — Seu dinheiro evoluindo" },
      {
        property: "og:description",
        content: "Quiz rápido, ferramenta gratuita de controle de gastos e materiais para ir além.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  { href: "#topo", label: "Início" },
  { href: "#quiz", label: "Quiz" },
  { href: "#ferramenta", label: "Ferramenta" },
  { href: "#plus", label: "Plus" },
  { href: "#ebook", label: "E-book" },
];

const PLUS_BENEFICIOS = [
  "Ferramentas extras de organização financeira",
  "Metas financeiras",
  "Desafios de economia",
  "Planejadores",
  "Recursos extras para acompanhar sua evolução",
];

const GUIA_BENEFICIOS = [
  "Estratégias para controlar gastos",
  "Como evitar compras por impulso",
  "Como começar a guardar dinheiro",
  "Como criar metas financeiras",
  "Desafios práticos para colocar em ação",
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

function CheckList({ itens, tom = "success" }: { itens: string[]; tom?: "success" | "primary" }) {
  return (
    <ul className="grid gap-2.5">
      {itens.map((i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm">
          <span
            className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
              tom === "success" ? "bg-success/15 text-success" : "bg-primary/15 text-primary"
            }`}
          >
            ✓
          </span>
          <span className="text-muted-foreground">{i}</span>
        </li>
      ))}
    </ul>
  );
}

/** Botão de produto: usa o checkout quando existir, senão fica preparado para receber o link. */
function ProductButton({
  produto,
  children,
  variant = "default",
}: {
  produto: (typeof PRODUCTS)[keyof typeof PRODUCTS];
  children: React.ReactNode;
  variant?: "default" | "secondary";
}) {
  if (!produto.checkoutUrl) {
    return (
      <Button size="lg" variant={variant} className="h-12 w-full text-base sm:w-auto" disabled>
        {children}
      </Button>
    );
  }
  return (
    <a
      href={produto.checkoutUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full sm:w-auto"
    >
      <Button size="lg" variant={variant} className="h-12 w-full text-base sm:w-auto">
        {children}
      </Button>
    </a>
  );
}

function Index() {
  const [emailPlus, setEmailPlus] = useState("");
  const [plusAtivo, setPlusAtivo] = useState(false);
  const [verificandoPlus, setVerificandoPlus] = useState(false);
  const [mensagemPlus, setMensagemPlus] = useState("");

  const verificarPlus = async () => {
    setVerificandoPlus(true);
    setMensagemPlus("");

    try {
      const response = await fetch("/verificar-plus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailPlus }),
      });

      const data = await response.json();

      if (data.active) {
        setPlusAtivo(true);
        setMensagemPlus("Acesso Plus confirmado! 🎉");
      } else {
        setPlusAtivo(false);
        setMensagemPlus("Não encontramos um acesso Plus para esse e-mail.");
      }
    } catch {
      setMensagemPlus("Não foi possível verificar agora. Tente novamente.");
    } finally {
      setVerificandoPlus(false);
    }
  };

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
    <main className="min-h-screen scroll-smooth">
      {/* Navegação */}
      <div id="topo" className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
          <span className="font-display shrink-0 text-base font-extrabold tracking-tight">
            Grana Teen
          </span>
          <div className="-mx-1 flex min-w-0 flex-1 gap-1 overflow-x-auto px-1 text-sm">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="shrink-0 rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </div>
        </nav>
      </div>

      {/* 1. Hero */}
      <header className="surface-glow border-b border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-14 pt-10 md:grid-cols-2 md:pb-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Seu dinheiro. Suas metas. Seu controle.
            </p>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] sm:text-4xl md:text-5xl">
              💰 Descubra como anda sua relação com o dinheiro
            </h1>
            <p className="mt-5 max-w-md text-base text-muted-foreground md:text-lg">
              Faça um quiz rápido, descubra seu perfil financeiro e veja por onde começar a organizar
              melhor sua grana.
            </p>
            <div className="mt-8">
              <a href="#quiz" className="block sm:inline-block">
                <Button size="lg" className="h-13 w-full text-base sm:w-auto">
                  DESCOBRIR MEU PERFIL →
                </Button>
              </a>
              <p className="mt-5 text-sm text-muted-foreground">
                Ou comece diretamente pela ferramenta gratuita.
              </p>
              <a href="#ferramenta" className="mt-2 block sm:inline-block">
                <Button size="lg" variant="secondary" className="h-12 w-full text-base sm:w-auto">
                  Começar gratuitamente
                </Button>
              </a>
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

      {/* 2. Quiz */}
      <section id="quiz" className="mx-auto max-w-3xl scroll-mt-20 px-5 py-14">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Quiz de perfil financeiro</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            6 perguntas rápidas. Sem cadastro, sem e-mail, sem dado nenhum.
          </p>
        </div>
        <FinanceQuiz />
      </section>

      {/* 3. Ferramenta gratuita */}
      <section id="ferramenta" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">🆓 Ferramenta gratuita</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Registre entradas e gastos, veja seu saldo e entenda para onde seu dinheiro está indo.
              Sem cadastro.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 text-sm font-semibold text-success">
            100% gratuito
          </span>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
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

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,380px)_1fr]">
          <div className="rounded-3xl border border-border bg-card p-6">
            <h3 className="text-xl font-bold">Registrar movimento</h3>
            <p className="mb-5 mt-1 text-sm text-muted-foreground">
              Leva 10 segundos e muda tudo no fim do mês.
            </p>
            <TransactionForm onAdd={addTransacao} />
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6">
              <h3 className="mb-5 text-xl font-bold">Para onde vai seu dinheiro</h3>
              <SpendingBreakdown dados={porCategoria} total={saidas} />
            </div>
            <div>
              <h3 className="mb-3 text-xl font-bold">Últimos movimentos</h3>
              <TransactionList transacoes={transacoes} onRemove={removeTransacao} />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="mb-1 text-xl font-bold">Suas metas</h3>
          <p className="mb-5 text-sm text-muted-foreground">
            Versão básica das metas, liberada para todo mundo.
          </p>
          <Goals metas={metas} onAdd={addMeta} onGuardar={guardar} onRemove={removeMeta} />
        </div>
      </section>

      {/* Dicas */}
      <section className="mx-auto max-w-6xl px-5 py-10">
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

      {/* 4. Grana Teen Plus */}
      <section id="plus" className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-6xl scroll-mt-20 px-5 py-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            🧰 Quer mais ferramentas?
          </p>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">Grana Teen Plus</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
            Mais ferramentas para organizar sua grana de forma prática.
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,360px)]">
  <div className="grid gap-4 sm:grid-cols-2">
    <article className="rounded-3xl border border-border bg-card p-5">
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-muted text-lg">
          📊
        </span>
        <div className="min-w-0">
          <h3 className="text-base font-semibold">Controle de gastos</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Organize seus gastos e veja para onde seu dinheiro está indo.
          </p>
        </div>
      </div>
    </article>

    <article className="rounded-3xl border border-border bg-card p-5">
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-muted text-lg">
          🎯
        </span>
        <div className="min-w-0">
          <h3 className="text-base font-semibold">Metas financeiras</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Defina objetivos e acompanhe seu progresso para alcançá-los.
          </p>
        </div>
      </div>
    </article>

    <article className="rounded-3xl border border-border bg-card p-5">
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-muted text-lg">
          💰
        </span>
        <div className="min-w-0">
          <h3 className="text-base font-semibold">Desafios para economizar</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Transforme o hábito de economizar em pequenos desafios práticos.
          </p>
        </div>
      </div>
    </article>

    <article className="rounded-3xl border border-border bg-card p-5">
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-muted text-lg">
          🧠
        </span>
        <div className="min-w-0">
          <h3 className="text-base font-semibold">Dicas personalizadas</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Encontre estratégias simples para cuidar melhor do seu dinheiro.
          </p>
        </div>
      </div>
    </article>
  </div>

            <div className="h-fit rounded-4xl border border-primary/30 bg-card p-6">
              <p className="text-3xl font-extrabold">{PRODUCTS.plus.preco}</p>
              <p className="mt-1 text-sm text-muted-foreground">Acesso ao Grana Teen Plus</p>
              <div className="mt-5">
                <CheckList itens={PLUS_BENEFICIOS} tom="primary" />
              </div>
              <div className="mt-6">
                <ProductButton produto={PRODUCTS.plus}>QUERO O GRANA TEEN PLUS →</ProductButton>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
  A ferramenta básica continua gratuita para todo mundo.
</p>

<div className="mt-6 border-t border-border pt-5">
  <p className="text-sm font-semibold">Já comprou o Grana Teen Plus?</p>
  <p className="mt-1 text-xs text-muted-foreground">
    Digite o e-mail usado na compra para liberar seu acesso.
  </p>

  <div className="mt-4 flex flex-col gap-3">
    <input
      type="email"
      value={emailPlus}
      onChange={(e) => setEmailPlus(e.target.value)}
      placeholder="seuemail@exemplo.com"
      className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition focus:border-primary"
    />

    <Button
      type="button"
      onClick={verificarPlus}
      disabled={verificandoPlus || !emailPlus.trim()}
      className="h-11 w-full"
    >
      {verificandoPlus ? "VERIFICANDO..." : "VERIFICAR MEU ACESSO"}
    </Button>
  </div>

  {mensagemPlus && (
    <p
      className={`mt-3 text-sm font-medium ${
        plusAtivo ? "text-success" : "text-destructive"
      }`}
    >
      {mensagemPlus}
    </p>
  )}
</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. E-book */}
      <section id="ebook" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-14">
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          📚 Prefere aprender antes de colocar em prática?
        </p>
        <h2 className="mt-3 text-2xl font-bold md:text-3xl">Conheça o Guia Grana Teen.</h2>

        <div className="mt-8 grid items-center gap-8 rounded-4xl border border-border bg-card p-6 md:grid-cols-[minmax(0,240px)_1fr] md:p-10">
          <img
            src={ebookCover}
            alt="Capa do guia Educação Financeira, por Luckas Barreto"
            width={600}
            height={800}
            loading="lazy"
            className="w-full rounded-2xl border border-border"
          />
          <div>
            <p className="text-sm text-muted-foreground md:text-base">
              Um guia prático para aprender a controlar gastos, evitar compras por impulso, começar a
              guardar dinheiro e criar metas financeiras.
            </p>
            <div className="mt-5">
              <CheckList itens={GUIA_BENEFICIOS} />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <span className="text-2xl font-extrabold">{PRODUCTS.guia.preco}</span>
              <ProductButton produto={PRODUCTS.guia}>CONHECER O E-BOOK →</ProductButton>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Comparação */}
      <section className="mx-auto max-w-6xl px-5 pb-14">
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">Qual caminho combina mais com você?</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col rounded-3xl border border-primary/30 bg-card p-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🧰</span>
              <div className="min-w-0">
                <h3 className="text-lg font-bold">Grana Teen Plus</h3>
                <p className="text-sm text-muted-foreground">
                  Para quem prefere ferramentas práticas.
                </p>
              </div>
            </div>
            <p className="mt-4 text-2xl font-extrabold">{PRODUCTS.plus.preco}</p>
            <div className="mt-5 flex-1">
              <CheckList
                itens={["Mais ferramentas", "Metas", "Desafios", "Planejamento", "Organização prática"]}
                tom="primary"
              />
            </div>
            <div className="mt-6">
              <ProductButton produto={PRODUCTS.plus}>QUERO AS FERRAMENTAS →</ProductButton>
            </div>
          </div>

          <div className="flex flex-col rounded-3xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📚</span>
              <div className="min-w-0">
                <h3 className="text-lg font-bold">Guia Grana Teen</h3>
                <p className="text-sm text-muted-foreground">
                  Para quem prefere aprender estratégias.
                </p>
              </div>
            </div>
            <p className="mt-4 text-2xl font-extrabold">{PRODUCTS.guia.preco}</p>
            <div className="mt-5 flex-1">
              <CheckList
                itens={[
                  "Conteúdo educativo",
                  "Estratégias práticas",
                  "Controle de gastos",
                  "Compras por impulso",
                  "Metas e desafios",
                ]}
              />
            </div>
            <div className="mt-6">
              <ProductButton produto={PRODUCTS.guia} variant="secondary">
                QUERO O GUIA →
              </ProductButton>
            </div>
          </div>
        </div>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          Você também pode começar gratuitamente pela ferramenta básica.
        </p>
      </section>

      {/* 7. CTA final */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Comece do seu jeito. 💚</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
            Descubra seu perfil, use a ferramenta gratuita e escolha se quer continuar com mais
            ferramentas ou aprender através do nosso guia.
          </p>
          <div className="mt-8 grid gap-3 sm:flex sm:justify-center">
            <a href="#quiz">
              <Button size="lg" className="h-12 w-full text-base sm:w-auto">
                FAZER O QUIZ →
              </Button>
            </a>
            <a href="#ferramenta">
              <Button size="lg" variant="secondary" className="h-12 w-full text-base sm:w-auto">
                COMEÇAR GRATUITAMENTE →
              </Button>
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
