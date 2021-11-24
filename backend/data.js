'use strict';
class Task{

    constructor(content, state){
        this.id = kanbanTasks.length;
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
let kanbanTasks = [];