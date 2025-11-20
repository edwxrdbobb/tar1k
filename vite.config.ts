import { defineConfig, loadEnv, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import type { IncomingMessage, ServerResponse } from "http";
import {
  parseInviteNov21Payload,
  processInviteNov21,
} from "./api/invite-nov21";
import {
  parseInviteGeneralPayload,
  processInviteGeneral,
  getInviteGeneralStatus,
} from "./api/invite-general";
import {
  parseContactPayload,
  processContactSubmission,
} from "./api/contact";
import {
  parseNewsletterPayload,
  processNewsletterSubscription,
} from "./api/newsletter";

type ApiRoute = {
  path: string;
  method: "GET" | "POST";
  parse?: (body: string) => any;
  handler: (payload?: unknown) => Promise<any>;
  successMessage?: string;
};

const apiRoutes: ApiRoute[] = [
  {
    path: "/api/invite-nov21",
    method: "POST",
    parse: parseInviteNov21Payload,
    handler: processInviteNov21,
    successMessage: "RSVP submitted! Check your inbox for confirmation.",
  },
  {
    path: "/api/invite-general",
    method: "POST",
    parse: parseInviteGeneralPayload,
    handler: processInviteGeneral,
    successMessage: "Signup submitted! Check your inbox for confirmation.",
  },
  {
    path: "/api/invite-general/status",
    method: "GET",
    handler: getInviteGeneralStatus,
  },
  {
    path: "/api/contact",
    method: "POST",
    parse: parseContactPayload,
    handler: processContactSubmission,
    successMessage: "Message delivered. Check your inbox for confirmation.",
  },
  {
    path: "/api/newsletter",
    method: "POST",
    parse: parseNewsletterPayload,
    handler: processNewsletterSubscription,
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

      if (req.method !== route.method) {
        sendJson(res, 405, { error: "Method Not Allowed" });
        return;
      }

      try {
        let payload: unknown;
        if (route.method !== "GET") {
          const body = await readRawBody(req);
          payload = route.parse ? route.parse(body) : body;
        }
        const result = await route.handler(payload);
        const responsePayload =
          result ??
          (route.method === "GET"
            ? { success: true }
            : { success: true, message: route.successMessage });
        sendJson(res, 200, responsePayload);
      } catch (error: any) {
        const statusFromError =
          typeof error?.statusCode === "number" ? error.statusCode : undefined;
        const isBadRequest = /Missing required fields|Invalid JSON payload|Invalid payload format|Email is required|Signup limit reached/.test(
          error?.message ?? "",
        );
        const status = statusFromError ?? (isBadRequest ? 400 : 500);
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
  process.env.SUPABASE_URL ??= env.SUPABASE_URL;
  process.env.SUPABASE_SERVICE_ROLE_KEY ??= env.SUPABASE_SERVICE_ROLE_KEY;
  process.env.SUPABASE_ANON_KEY ??= env.SUPABASE_ANON_KEY;
  process.env.ENABLE_SUPABASE ??= env.ENABLE_SUPABASE;

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
