import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { parseHTML } from "linkedom";
import { NodeHtmlMarkdown } from "node-html-markdown";
import { getRequestContext } from "@cloudflare/next-on-pages";

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
        rejectResourceTypes: ["image"],
        rejectRequestPattern: ["/^.*\\.(css)"],
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
      const ai = getRequestContext().env.AI;
      const aiResponse = await ai.run("@cf/meta/llama-3.1-8b-instruct", {
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant , who analyses the given content of a product page and determines the best way to buy that product with the minimum cost. the following is the content of the page" +
              markdown,
          },
        ],
        stream: true,
      });
      return c.json(aiResponse, 200);
    } catch (e: unknown) {
      const message = (e as Error).message;
      return c.json({ error: message }, 500);
    }
  }
);

export default aiSummaryRouter;
