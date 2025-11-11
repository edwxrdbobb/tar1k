import { defineConfig, loadEnv, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import type { IncomingMessage, ServerResponse } from "http";
import {
  parseInviteNov21Payload,
  sendInviteNov21Emails,
} from "./api/invite-nov21";
import { parseContactPayload, sendContactEmails } from "./api/contact";
import {
  handleNewsletterSubscription,
  parseNewsletterPayload,
} from "./api/newsletter";

const apiRoutes = [
  {
    path: "/api/invite-nov21",
    parse: parseInviteNov21Payload,
    handler: sendInviteNov21Emails,
    successMessage: "RSVP submitted! Check your inbox for confirmation.",
  },
  {
    path: "/api/contact",
    parse: parseContactPayload,
    handler: sendContactEmails,
    successMessage: "Message delivered. Check your inbox for confirmation.",
  },
  {
    path: "/api/newsletter",
    parse: parseNewsletterPayload,
    handler: handleNewsletterSubscription,
    successMessage: "Subscribed! Check your email for confirmation.",
  },
];

const readRawBody = (req: IncomingMessage): Promise<string> =>
  new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });

const sendJson = (res: ServerResponse, status: number, payload: unknown) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
};

const inviteNov21DevPlugin = () => ({
  name: "invite-nov21-dev-api",
  configureServer(server: ViteDevServer) {
    server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
      const route = apiRoutes.find((r) => req.url?.startsWith(r.path));
      if (!route) {
        next();
        return;
      }

      if (req.method !== "POST") {
        sendJson(res, 405, { error: "Method Not Allowed" });
        return;
      }

      try {
        const body = await readRawBody(req);
        const payload = route.parse(body);
        await route.handler(payload);
        sendJson(res, 200, { success: true, message: route.successMessage });
      } catch (error: any) {
        const isBadRequest = /Missing required fields|Invalid JSON payload|Invalid payload format|Email is required/.test(
          error?.message ?? "",
        );
        const status = isBadRequest ? 400 : 500;
        sendJson(res, status, {
          error: isBadRequest ? error.message : "Failed to process request",
          details: isBadRequest ? undefined : error?.message ?? "Unknown error",
        });
      }
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  process.env.RESEND_API_KEY ??= env.RESEND_API_KEY;
  process.env.RESEND_FROM_EMAIL ??= env.RESEND_FROM_EMAIL;
  process.env.CONTACT_TO_EMAIL ??= env.CONTACT_TO_EMAIL;

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), inviteNov21DevPlugin()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
