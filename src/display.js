// Display functions

import { defaultLibrary, toDoGroup, toDoTask} from "./classes.js"
import { createTaskForm } from "./forms.js";

function displayCollection(collection) {
    const groupDisplay = document.querySelector(".groupDisplay");
    groupDisplay.innerHTML = "";
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
    const button = document.createElement("button");
    button.innerText = "Add new ask";
    button.addEventListener("click", (e) => {
        createTaskForm(e);
    });
    title.textContent = group.groupTitle
    subTitle.textContent = group.subTitle
    groupCard.setAttribute("class", "groupCard");
    groupCard.append(title, subTitle, button)
    tasksList.forEach(task => {
        groupCard.append(createTaskCard(task))
    })
    return groupCard
}

function createTaskCard(task) {
    const taskCard = document.createElement("div");
    const taskCheck = document.createElement("input")
    const taskTitle = document.createElement("h3");
    const description = document.createElement("h4");
    const dueDate = document.createElement("h4");
    const priority = document.createElement("h4");
    const notes = document.createElement("h5");
    const checkDiv = document.createElement("div");
    const checkTitle = document.createElement("h4")
    const checkList = task.checklist
    const deleteButton = document.createElement("button")
    Object.assign(taskCheck, {
        type: "checkbox",
        name: "taskCheck",
        id: "taskCheck",
    })
    taskCheck.addEventListener("click", () => {
        if (taskCheck.checked) {
            taskCard.classList.add("crossed")
            return
        }
        taskCard.classList.remove("crossed");
    });
    taskTitle.innerText = task.taskTitle;
    description.innerText = task.description;
    dueDate.innerText = "Due: " + task.dueDate
    priority.innerText = "Priority: " + task.priority
    notes.innerText = task.notes
    checkTitle.innerText = "Checklist"
    checkDiv.append(checkTitle)
    checkDiv.setAttribute("class", "checkDiv")
    taskCard.append(taskCheck, taskTitle, description, dueDate, priority, notes, checkDiv)
    taskCard.setAttribute("class", "taskCard")
    if (checkList) {
        checkList.forEach(item => {
            checkDiv.append(createCheckItem(item))
        })
    }
    deleteButton.setAttribute("class", "deleteButton");
    deleteButton.addEventListener("click", (e) => {

    })
    return taskCard
}

function createCheckItem(item) {
    const pair = document.createElement("div")
    const box = document.createElement("input")
    const boxLab = document.createElement("label")
    boxLab.innerText = item
    boxLab.setAttribute("for", "box")
    Object.assign(box, {
        type: "checkbox",
        name: "box",
        id: "box",
    })
    box.addEventListener("click", () => {
        if (box.checked) {
            boxLab.classList.add("crossed")
            return
        }
        boxLab.classList.remove("crossed");
    });
    pair.append(box, boxLab)
    return pair
}

function newTaskFromForm(e) {
    const taskTitle = document.querySelector("#taskTitle").value
    const description = document.querySelector("#description").value
    const dueDate = document.querySelector("#dueDate").value
    const priority= document.querySelector("#priority").value
    const notes = document.querySelector("#notes").value
    const checkList = document.querySelectorAll('input[name="newCheckInput"]')
    const task = new toDoTask(taskTitle, description, priority)
    task.setDate(dueDate);
    task.addNotes(notes);
    checkList.forEach(input => {
        task.addChecklistItem(input.value)
    })
    //search collection for group index
    //add task to group tasklist
    const groupCard = e.target.closest(".groupCard")
    groupCard.append(createTaskCard(task))
}

function newGroupFromForm() {
    const groupTitle = document.querySelector("#groupTitle").value
    const subTitle = document.querySelector("#subTitle").value
    const selectColl = document.querySelector("#selectColl")
    const collectionChoice = selectColl.options[selectColl.selectedIndex]
    const ind = collectionChoice.getAttribute("index")
    const collection  = defaultLibrary.collectionArray[ind]
    const group = new toDoGroup(groupTitle, subTitle)
    collection.addGroup(group)
    displayCollection(collection)
}

export { newGroupFromForm, newTaskFromForm, displayCollection }