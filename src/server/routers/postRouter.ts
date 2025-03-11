import { Hono } from "hono";
import { env, getRuntimeKey } from "hono/adapter";
import { getRequestContext } from "@cloudflare/next-on-pages";

const postRouter = new Hono<{ Bindings: CloudflareEnv }>().get(
  "/",
  async (c) => {
    const { MY_VARIABLE } = env(c);
    const runtime = getRuntimeKey();
    return c.json({
      process: process.env.MY_VARIABLE,
      cloudflare: MY_VARIABLE,
      vercel: getRequestContext().env.MY_VARIABLE,
      api: process.env.NEXT_PUBLIC_API_URL,
      runtime,
    });
  }
);

export default postRouter;
