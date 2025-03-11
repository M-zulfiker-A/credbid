import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { parseHTML } from "linkedom";
import { NodeHtmlMarkdown } from "node-html-markdown";

const aiSummaryRouter = new Hono<{ Bindings: CloudflareEnv }>().post(
  "/",
  zValidator("json", z.object({ url: z.string() })),
  async (c) => {
    const { url } = c.req.valid("json");
    const browserRenderUrl = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/browser-rendering/content`;
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url,
      }),
    };
    try {
      const data = await fetch(browserRenderUrl, options);
      const productPageRes = await data.json<{
        success: boolean;
        result: string;
      }>();
      const { document } = parseHTML(productPageRes.result);
      const markdown = NodeHtmlMarkdown.translate(document.body.innerHTML);
      return c.json({ markdown }, 200);
    } catch (e: unknown) {
      const message = (e as Error).message;
      return c.json({ error: message }, 500);
    }
  }
);

export default aiSummaryRouter;
