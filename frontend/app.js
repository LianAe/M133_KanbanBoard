'use script'

document.loadListToDo = async () => {
    const response = await fetch("/api/tasks/1");
    console.log(response);
    return await response.json();
}

document.loadListInProgress = async () => {
    const response = await fetch("/api/tasks/2");
    console.log(response);
    return await response.json();
}

document.loadListDone = async () => {
    const response = await fetch("/api/tasks/3");
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