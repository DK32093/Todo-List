//import { createNewGroup, createNewTask } from "./functions.js"

// Display functions

function displayGroupList(collection) {
    const groupDisplay = document.querySelector(".groupDisplay");
    const groups = collection.groupArray;
    groups.forEach(group => {
        groupDisplay.append(createGroupCard(group))
    });
}

function createGroupCard(group) {
    const groupCard = document.createElement('div');
    const title = document.createElement("h1");
    const subTitle = document.createElement("h2");
    const tasksList = group.tasksList
    title.textContent = group.groupTitle
    subTitle.textContent = group.subTitle
    groupCard.setAttribute("class", "groupCard");
    groupCard.append(title, subTitle, group.createAddButton())
    tasksList.forEach(task => {
        groupCard.append(createTaskCard(task))
    })
    return groupCard
}

function createTaskCard(task) {
    const taskCard = document.createElement("div");
    const taskTitle = document.createElement("h3");
    const description = document.createElement("h4");
    const dueDate = document.createElement("h4");
    const priority = document.createElement("h4");
    const notes = document.createElement("h5");
    taskTitle.innerText = task.taskTitle;
    description.innerText = task.description;
    dueDate.innerText = "Due: " + task.dueDate
    priority.innerText = "Priotirty: " + task.priority
    notes.innerText = task.notes
    taskCard.append(taskTitle, description, dueDate, priority, notes)
    taskCard.setAttribute("class", "taskCard")
    return taskCard
}

function createTaskForm(e) {
    const taskFormDiv = document.createElement("div")
    taskFormDiv.setAttribute("class", "taskFormDiv")
    const newTaskForm = document.createElement("form");
    
    const taskTitle = document.createElement("input");
    const taskTitleLab = document.createElement("label");
    taskTitleLab.setAttribute("for", "taskTitle")
    taskTitleLab.innerText = "Task title: "
    Object.assign(taskTitle, {
        type: "text",
        id: "taskTitle",
        name: "taskTitle",
        placeholder: "My task"
    })
    
    const description = document.createElement("input");
    const descriptionLab = document.createElement("label");
    descriptionLab.setAttribute("for", "description")
    descriptionLab.innerText = "Description: "
    Object.assign(description, {
        type: "text",
        id: "description",
        name: "description",
        placeholder: "A breif description"
    })

    const dueDate = document.createElement("input");
    const dueDateLab = document.createElement("label");
    dueDateLab.setAttribute("for", "dueDate")
    dueDateLab.innerText = "Due date: "
    Object.assign(dueDate, {
        type: "date",
        id: "dueDate",
        name: "dueDate",
    })

    const priority = document.createElement("select");
    const priorityLab = document.createElement("label");
    priorityLab.setAttribute("for", "priorityLab")
    priorityLab.innerText = "Priority: "
    Object.assign(priority, {
        name: "priority",
        id: "priority",
    })
    const low = document.createElement("option");
    const medium = document.createElement("option");
    const high = document.createElement("option");
    low.innerText = "Low"
    medium.innerText = "Medium"
    high.innerText = "High"
    priority.append(low, medium, high)

    const notes = document.createElement("textarea");
    const notesLab = document.createElement("label");
    notesLab.setAttribute("for", "notes")
    notesLab.innerText = "Notes: "
    Object.assign(notes, {
        id: "notes",
        name: "notes"
    })

    newTaskForm.append(taskTitleLab, taskTitle, 
                       descriptionLab, description,
                       dueDateLab, dueDate,
                       priorityLab, priority,
                       notesLab, notes)

    taskFormDiv.append(newTaskForm)
    const group = e.target.closest(".groupCard")
    group.append(taskFormDiv)
}

export { createTaskForm, displayGroupList }