import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/kiwify-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json();

        console.log("Kiwify webhook recebido:", body);

        return new Response(
          JSON.stringify({ received: true }),
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
