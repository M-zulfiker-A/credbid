import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { parseHTML } from "linkedom";
import { NodeHtmlMarkdown } from "node-html-markdown";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { GoogleGenerativeAI } from "@google/generative-ai";

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
      const API_KEY = getRequestContext().env.GEMINI_API_KEY;
      console.log(API_KEY);
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt =
        "You are a helpful assistant , who analyses the given content of a product page and determines the best way to buy that product with the minimum cost, mention the effective price for each method.You should strictly respond in markdown format wiht proper numberings, headings etc. the following is the content of the page" +
        markdown;

      const result = await model.generateContent(prompt);

      console.log(result.response);

      return c.text(result.response.text(), 200);
    } catch (e: unknown) {
      const message = (e as Error).message;
      return c.json({ error: message }, 500);
    }
  }
);

export default aiSummaryRouter;
