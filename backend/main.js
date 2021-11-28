'use strict';
import { AddTask, Task, kanbanTasks, state } from './data.js';
import { Application, Router } from "https://deno.land/x/oak@v9.0.0/mod.ts";

const app = new Application();
const router = new Router();

router.get("/task", context => {
    context.response.body = kanbanTasks;
}).get("/task/:id", context => {
    const index = kanbanTasks.findIndex(x => x.id == context.params.id);
    if (index >= 0 && index < kanbanTasks.length){
        context.response.body = kanbanTasks[index]
    } else {
        context.response.status = 404
        context.response.body = `ID ${context.params.id} not found`
    }  
}).post("/task", async context => {
    const value = await context.request.body({ type: "json" }).value;
    kanbanTasks.push(new Task(value.Task.content, value.Task.state))
    context.response.status = 201;
    context.response.body = value;
}).put("/task/:id/up", context =>{
    const index = kanbanTasks.findIndex(x => x.id == context.params.id)
    if (index >= 0 && index < kanbanTasks.length){
      if(kanbanTasks[index].state < 3 && kanbanTasks[index].state >= 1){
        kanbanTasks[index].state++;
        context.response.status = 202;
      }
      else{
        context.response.status = 400;
        context.response.body = `status could not be updated`
      }
  } else {
      context.response.status = 404
      context.response.body = `ID ${context.params.id} not found`
  } 
}).put("/task/:id/down", context =>{
  const index = kanbanTasks.findIndex(x => x.id == context.params.id)
  if (index >= 0 && index < kanbanTasks.length){
    if(kanbanTasks[index].state > 1 && kanbanTasks[index].state <= 3){
      kanbanTasks[index].state--;
      context.response.status = 202;
    }
    else{
      context.response.status = 400;
      context.response.body = `status could not be updated`
    }
} else {
    context.response.status = 404
    context.response.body = `ID ${context.params.id} not found`
} 
})
.delete("/task/:id", context => {
  try {
    kanbanTasks = kanbanTasks.filter(x => x.id != context.params.id)
  } catch (error) {
    context.response.body = error.message;
  }
    
});

app.use(router.routes());
app.listen({ port: 8000 });
