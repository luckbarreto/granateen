import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

export const Route = createFileRoute("/verificar-plus")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { email } = await request.json();

          if (!email || typeof email !== "string") {
            return new Response(
              JSON.stringify({ active: false, error: "E-mail inválido." }),
              {
                status: 400,
                headers: { "Content-Type": "application/json" },
              },
            );
          }

          const supabaseUrl = process.env.SUPABASE_URL;
          const supabaseKey = process.env.SUPABASE_SECRET_KEY;

          if (!supabaseUrl || !supabaseKey) {
            console.error("Variáveis do Supabase não configuradas.");
            return new Response(
              JSON.stringify({ active: false, error: "Servidor não configurado." }),
              {
                status: 500,
                headers: { "Content-Type": "application/json" },
              },
            );
          }

          const supabase = createClient(supabaseUrl, supabaseKey);

          const { data, error } = await supabase
            .from("plus_acess")
            .select("active")
            .eq("email", email.trim().toLowerCase())
            .maybeSingle();

          if (error) {
            console.error("Erro ao verificar acesso Plus:", error);

            return new Response(
              JSON.stringify({ active: false, error: "Erro ao verificar acesso." }),
              {
                status: 500,
                headers: { "Content-Type": "application/json" },
              },
            );
          }

          return new Response(
            JSON.stringify({
              active: data?.active === true,
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        } catch (error) {
          console.error("Erro na rota verificar-plus:", error);

          return new Response(
            JSON.stringify({
              active: false,
              error: "Requisição inválida.",
            }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            },
          );
        }
      },
    },
  },
});
