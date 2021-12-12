'use script'

document.loadListToDo = async () => {
    return await LoadTaskListWithState(1);
}

document.loadListInProgress = async () => {
    return await LoadTaskListWithState(2);
}

document.loadListDone = async () => {
    return await LoadTaskListWithState(3);
}

async function LoadTaskListWithState(state){
    const response = await fetch('/api/tasks/%i', state);
    console.log(response);
    return await response.json();
}

export async function deleteTask(id){
    await fetch("/api/task/" + id,{
        method: "DELETE"
    });
}

export async function taskStatusUp(id){
    await fetch("/api/task/" + id + "/up",{
        method: "PUT"
    });
}

export async function taskStatusDown(id){
    await fetch("/api/task/" + id + "/down",{
        method: "PUT"
    });
}