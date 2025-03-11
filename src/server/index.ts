import { Hono } from "hono";
import postRouter from "./routers/postRouter";
import aiSummaryRouter from "./routers/ai-summary";

const app = new Hono()
  .basePath("/api")
  .route("/posts", postRouter)
  .route("/ai-summary", aiSummaryRouter);

export default app;

export type AppType = typeof app;
