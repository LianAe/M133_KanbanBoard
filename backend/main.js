import * as data from "./data.js";
import { Application, Router } from "https://deno.land/x/oak@v9.0.0/mod.ts";
const app = new Application();
const router = new Router();
router.get("/foo", (context) => {
  context.response.body = "bar";
}).get("/eins", (context) => {
  context.response.body = "zwei";
}).get("/allTasks", (context) => {
    context.response.body = data.kanbanTasks;
});
app.use(router.routes());
app.listen({ port: 8000 });
