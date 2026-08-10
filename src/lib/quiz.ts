export type QuizOption = { letra: "A" | "B" | "C" | "D"; texto: string };

export type QuizQuestion = {
  id: string;
  pergunta: string;
  opcoes: QuizOption[];
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    pergunta: "Quando você recebe dinheiro, o que geralmente acontece?",
    opcoes: [
      { letra: "A", texto: "Já sei exatamente quanto vou gastar." },
      { letra: "B", texto: "Guardo uma parte e gasto o resto." },
      { letra: "C", texto: "Vou gastando e vejo o que sobra." },
      { letra: "D", texto: "Quando percebo, já acabou. 😭" },
    ],
  },
  {
    id: "q2",
    pergunta: "Você costuma saber quanto gastou durante o mês?",
    opcoes: [
      { letra: "A", texto: "Sim, acompanho praticamente tudo." },
      { letra: "B", texto: "Mais ou menos." },
      { letra: "C", texto: "Só lembro dos gastos maiores." },
      { letra: "D", texto: "Nem faço ideia. 😂" },
    ],
  },
  {
    id: "q3",
    pergunta: "Quando você vê algo que quer comprar, o que costuma fazer?",
    opcoes: [
      { letra: "A", texto: "Penso se realmente preciso antes de comprar." },
      { letra: "B", texto: "Espero um pouco antes de decidir." },
      { letra: "C", texto: "Às vezes compro por impulso." },
      { letra: "D", texto: "Se tenho dinheiro, geralmente compro." },
    ],
  },
  {
    id: "q4",
    pergunta: "Você costuma guardar dinheiro?",
    opcoes: [
      { letra: "A", texto: "Sim, faço isso com frequência." },
      { letra: "B", texto: "Às vezes consigo." },
      { letra: "C", texto: "Só guardo quando sobra." },
      { letra: "D", texto: "Quase nunca consigo." },
    ],
  },
  {
    id: "q5",
    pergunta: "Você tem alguma meta financeira?",
    opcoes: [
      { letra: "A", texto: "Sim, e sei quanto preciso guardar." },
      { letra: "B", texto: "Tenho uma ideia do que quero." },
      { letra: "C", texto: "Quero guardar, mas nunca começo." },
      { letra: "D", texto: "Ainda não tenho uma meta." },
    ],
  },
  {
    id: "q6",
    pergunta: "Qual dessas frases mais parece com você?",
    opcoes: [
      { letra: "A", texto: "Quero fazer meu dinheiro render melhor." },
      { letra: "B", texto: "Quero aprender a guardar mais." },
      { letra: "C", texto: "Preciso parar de gastar por impulso." },
      { letra: "D", texto: "Preciso começar a controlar minha grana." },
    ],
  },
];

export type ProfileId = "planejador" | "guardador" | "impulsivo" | "misterioso";

export type Profile = {
  id: ProfileId;
  emoji: string;
  nome: string;
  descricao: string;
  recomendacoes: string[];
  cor: string;
};

export const PROFILES: Record<ProfileId, Profile> = {
  planejador: {
    id: "planejador",
    emoji: "🟢",
    nome: "O Planejador",
    descricao:
      "Você já tem uma boa noção de como cuidar do seu dinheiro. Seu próximo desafio é transformar essa organização em metas cada vez melhores.",
    recomendacoes: ["Criar metas específicas.", "Manter consistência.", "Acompanhar seus resultados."],
    cor: "text-success",
  },
  guardador: {
    id: "guardador",
    emoji: "🔵",
    nome: "O Guardador em Potencial",
    descricao:
      "Você sabe que quer economizar, mas ainda tem dificuldade em manter o hábito. Com mais organização, pode evoluir bastante.",
    recomendacoes: [
      "Criar metas pequenas.",
      "Separar dinheiro assim que receber.",
      "Acompanhar o progresso.",
    ],
    cor: "text-primary",
  },
  impulsivo: {
    id: "impulsivo",
    emoji: "🟠",
    nome: "O Gastador Impulsivo",
    descricao:
      "Você gosta de aproveitar seu dinheiro, mas algumas compras podem estar atrapalhando suas metas.",
    recomendacoes: [
      "Evitar compras por impulso.",
      "Fazer uma pausa antes de comprar.",
      "Identificar gastos desnecessários.",
    ],
    cor: "text-foreground",
  },
  misterioso: {
    id: "misterioso",
    emoji: "🔴",
    nome: "O Dinheiro Misterioso",
    descricao:
      "Seu dinheiro parece desaparecer misteriosamente? 😂 O primeiro passo para mudar isso é descobrir exatamente para onde ele está indo.",
    recomendacoes: [
      "Registrar os gastos.",
      "Identificar os maiores gastos.",
      "Criar uma primeira meta.",
    ],
    cor: "text-destructive",
  },
};

const PESO: Record<QuizOption["letra"], number> = { A: 0, B: 1, C: 2, D: 3 };

export function calcularPerfil(respostas: QuizOption["letra"][]): Profile {
  const media = respostas.reduce((s, r) => s + PESO[r], 0) / respostas.length;
  if (media < 0.75) return PROFILES.planejador;
  if (media < 1.5) return PROFILES.guardador;
  if (media < 2.25) return PROFILES.impulsivo;
  return PROFILES.misterioso;
}
