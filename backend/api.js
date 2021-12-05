"use strict";
import { Router } from "https://deno.land/x/oak@v6.3.1/mod.ts";
import { v4 } from "https://deno.land/std@0.77.0/uuid/mod.ts";

class Task {

  constructor(content, state) {
    this.id = v4.generate();
    this.content = content;
    this.state = state;
  }
}

const state = {
  toDo: 1,
  inProgress: 2,
  done: 3,
}

let kanbanTasks = [];

kanbanTasks.push(new Task("Task 1", state.toDo))
kanbanTasks.push(new Task("Task 2", state.inProgress))

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
    try {
      let formContent = await context.request.body({ type: 'form' }).value;
      let contentValue = formContent.get("content");
      let statusValue = formContent.get("state");
      console.log(contentValue + statusValue)
      kanbanTasks.push(new Task(contentValue, statusValue));
      context.response.redirect("/");
    } catch (error) {
      context.response.body = error.message
    }


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
      console.log(context.params.id)
      kanbanTasks = kanbanTasks.filter((x) => x.id != context.params.id);
    } catch (error) {
      console.log(error.message)
      context.response.body = error.message;
    }
  });

export const apiRoutes = router.routes();
