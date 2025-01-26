import { groupList, toDoGroup, toDoTask } from "./classes";

function createNewGroupList(name) {
    return new groupList(name)
}

function createNewGroup(groupTitle, subTitle) {
    return new toDoGroup(groupTitle, subTitle)
}

function createNewTask(taskTitle, desctiption, priority) {
    return new toDoTask(taskTitle, desctiption, priority)
}

function createNewCollection(name) {
    const collection = createNewGroupList(name);
    const group = createNewGroup("General", "My general tasks")
    const task = createNewTask("Task #1", "My first task", "high")
    task.addChecklistItem("My first checklist item");
    task.addChecklistItem("My second checklist item");
    task.addNotes("Don't forget!")
    group.addTask(task)
    collection.addgroup(group)
    return collection
}

export { createNewCollection, createNewGroup, createNewTask }