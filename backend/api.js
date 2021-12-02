"use strict";
import { kanbanTasks, Task } from "./data.js";
import { Router } from "https://deno.land/x/oak@v6.3.1/mod.ts";

const router = new Router();

router.get("/api/task", (context) => {
  context.response.body = kanbanTasks;
}).get("/api/tasks/:state", (context) => {
    context.response.body = kanbanTasks.filter(el => el.state == context.params.state);
})
  .get("/api/id", (context) => context.response.body = v4.generate())
  .get("/api/task/:id", (context) => {
    const index = kanbanTasks.findIndex((x) => x.id == context.params.id);
    if (index >= 0 && index < kanbanTasks.length) {
      context.response.body = kanbanTasks[index];
    } else {
      context.response.status = 404;
      context.response.body = `ID ${context.params.id} not found`;
    }
  }).post("/api/task", async (context) => {
    const value = await context.request.body({ type: "json" }).value;
    kanbanTasks.push(new Task(value.Task.content, value.Task.state));
    context.response.status = 201;
    context.response.body = value;
  }).put("/api/task/:id/up", (context) => {
    const index = kanbanTasks.findIndex((x) => x.id == context.params.id);
    if (index >= 0 && index < kanbanTasks.length) {
      if (kanbanTasks[index].state < 3 && kanbanTasks[index].state >= 1) {
        kanbanTasks[index].state++;
        context.response.status = 202;
      } else {
        context.response.status = 400;
        context.response.body = `status could not be updated`;
      }
    } else {
      context.response.status = 404;
      context.response.body = `ID ${context.params.id} not found`;
    }
  }).put("/api/task/:id/down", (context) => {
    const index = kanbanTasks.findIndex((x) => x.id == context.params.id);
    if (index >= 0 && index < kanbanTasks.length) {
      if (kanbanTasks[index].state > 1 && kanbanTasks[index].state <= 3) {
        kanbanTasks[index].state--;
        context.response.status = 202;
      } else {
        context.response.status = 400;
        context.response.body = `status could not be updated`;
      }
    } else {
      context.response.status = 404;
      context.response.body = `ID ${context.params.id} not found`;
    }
  })
  .delete("/api/task/:id", (context) => {
    try {
      // deno-lint-ignore no-import-assign
      kanbanTasks = kanbanTasks.filter((x) => x.id != context.params.id);
    } catch (error) {
      context.response.body = error.message;
    }
  });

export const apiRoutes = router.routes();
