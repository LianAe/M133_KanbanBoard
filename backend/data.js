'use strict';
import {v4} from "https://deno.land/std@0.77.0/uuid/mod.ts";

export class Task{

    constructor(content, state){
        this.id = v4.generate();
        this.content = content;
        this.state = state;
    }
}

export const state = {
    toDo: 1,
    inProgress: 2,
    done: 3,
}

export function AddTask(text, taskState){
    kanbanTasks.push(new Task(text, taskState));
    return kanbanTasks;
}

export let kanbanTasks = [];

kanbanTasks.push(new Task("Task 1", state.toDo))
kanbanTasks.push(new Task("Task 2", state.inProgress))