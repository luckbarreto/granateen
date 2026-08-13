import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

export const Route = createFileRoute("/kiwify-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json();

        console.log("Kiwify webhook recebido:", body);

        const email =
          body?.Customer?.email ??
          body?.customer?.email ??
          body?.customer_email ??
          body?.email ??
          null;

        console.log("E-mail encontrado:", email);

        if (!email) {
          console.log("Nenhum e-mail encontrado no webhook.");
          return new Response(
            JSON.stringify({
              received: true,
              saved: false,
              reason: "email_not_found",
            }),
            {
              status: 200,
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
        }

        const supabase = createClient(
          process.env.SUPABASE_URL!,
          process.env.SUPABASE_SECRET_KEY!,
        );

        const { error } = await supabase.from("plus_acess").upsert(
          {
            email: email.toLowerCase().trim(),
            active: true,
          },
          {
            onConflict: "email",
          },
        );

        if (error) {
          console.error("Erro ao salvar acesso Plus:", error);

          return new Response(
            JSON.stringify({
              received: true,
              saved: false,
              error: error.message,
            }),
            {
              status: 500,
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
        }

        console.log("Acesso Plus salvo para:", email);

        return new Response(
          JSON.stringify({
            received: true,
            saved: true,
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      },
    },
  },
});
