'use strict';
class Task{

    constructor(content, state){
        this.id = kanbanTasks.length;
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
kanbanTasks.push(new Task("Test", state.toDo));