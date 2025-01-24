import { toDoGroup, toDoTask } from "./classes";

function createNewGroup(groupTitle, subTitle) {
    return new toDoGroup(groupTitle, subTitle)
}

function createNewTask(taskTitle, desctiption, priority) {
    return new toDoTask(taskTitle, desctiption, priority)
}



export { createNewGroup, createNewTask}