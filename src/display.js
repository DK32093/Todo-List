// Display functions

import { collection, defaultLibrary, toDoGroup, toDoTask} from "./classes.js"
import { createTaskForm } from "./forms.js";

function displayCollection(collection) {
    const groupDisplay = document.querySelector(".groupDisplay");
    groupDisplay.innerHTML = "";
    const collectionTitle = document.querySelector("#collectionTitle");
    collectionTitle.innerText = collection.name
    const collectionInd = collection.index
    const groups = collection.groupArray;
    groups.forEach(group => {
        groupDisplay.append(createGroupCard(group, collectionInd))
    });
}

function createGroupCard(group, collectionInd) {
    const groupInd = group.index;
    const groupCard = document.createElement('div');
    const title = document.createElement("h1");
    const subTitle = document.createElement("h2");
    const tasksList = group.tasksList
    const addTaskButton = document.createElement("button");
    const groupDeleteButton = document.createElement("button")
    addTaskButton.innerText = "Add new ask";
    addTaskButton.addEventListener("click", (e) => {
        const formCheck = document.querySelector(".taskFormDiv");
        if (formCheck) {
            formCheck.scrollIntoView();
            alert("Please submit the current task before creating a new one");
            return
        }
        createTaskForm(e, groupInd, collectionInd);
    });
    title.textContent = group.groupTitle
    subTitle.textContent = group.subTitle
    groupCard.setAttribute("class", "groupCard");
    groupCard.append(title, subTitle, addTaskButton, groupDeleteButton)
    tasksList.forEach(task => {
        groupCard.append(createTaskCard(task, collectionInd))
    })
    groupDeleteButton.setAttribute("class", "groupDeleteButton");
    groupDeleteButton.innerText = "delete group"
    groupDeleteButton.addEventListener("click", () => {
        const collection = defaultLibrary.collectionArray.find(collection => collection.index === collectionInd);
        const groupList = collection.groupArray
        groupList.splice(groupList.findIndex(g => g.index === groupInd), 1)
        displayCollection(collection)
    })
    return groupCard
}

function createTaskCard(task, collectionInd) {
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
    taskCard.append(taskCheck, taskTitle, description, dueDate, priority, notes, checkDiv, deleteButton)
    taskCard.setAttribute("class", "taskCard")
    if (checkList) {
        checkList.forEach(item => {
            checkDiv.append(createCheckItem(item))
        })
    }
    deleteButton.setAttribute("class", "deleteButton");
    deleteButton.innerText = "delete task"
    deleteButton.addEventListener("click", () => {
        const collection = defaultLibrary.collectionArray.find(collection => collection.index === collectionInd);
        const group = collection.groupArray.find(group => group.index === task.groupID)
        const tasksList = group.tasksList
        tasksList.splice(tasksList.findIndex(t => t.index === task.index), 1)
        displayCollection(collection)
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

function newTaskFromForm(groupInd, collectionInd) {
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
    const collection = defaultLibrary.collectionArray.find(collection => collection.index === collectionInd);
    const group = collection.groupArray.find(group => group.index === groupInd)
    group.addTask(task);
    displayCollection(collection)
}

function newGroupFromForm() {
    const groupTitle = document.querySelector("#groupTitle").value
    const subTitle = document.querySelector("#subTitle").value
    const selectColl = document.querySelector("#selectColl")
    const collectionChoice = selectColl.options[selectColl.selectedIndex]
    const ind = parseInt(collectionChoice.getAttribute("index"))
    const collection  = defaultLibrary.collectionArray.find(collection => collection.index === ind);
    const group = new toDoGroup(groupTitle, subTitle)
    collection.addGroup(group)
    displayCollection(collection)
    console.log(collection)
}

function newCollectionFromForm() {
    const collectionInput = document.querySelector("#collectionName")
    const collectionName = collectionInput.value
    const newCollection = new collection(collectionName);
    const collectionMenu = document.querySelector("#collectionMenu");
    collectionMenu.append(createCollectionMenuItem(newCollection))
    defaultLibrary.addCollection(newCollection)
    displayCollection(newCollection)
}

function createCollectionMenuItem(collection) {
    const newItem = document.createElement("div");
    newItem.setAttribute("class", "collectionMenuItem")
    newItem.innerHTML = collection.name
    newItem.addEventListener("click", () => {
        displayCollection(collection)
    })
    return newItem
}

export { newCollectionFromForm, newGroupFromForm, newTaskFromForm, displayCollection, createCollectionMenuItem }