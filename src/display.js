// Display functions

import { collection, defaultLibrary, toDoGroup, toDoTask} from "./classes.js"
import { createTaskForm } from "./forms.js";
import collectionSVG from "./assets/Collection.svg"

function displayCollection(collection) {
    const groupDisplay = document.querySelector(".groupDisplay");
    const collectionHeader = document.querySelector("#collectionHeader")
    const collectionTitle = document.createElement("h1");
    const deleteCollectionButton = document.createElement("button")
    const collectionArray = defaultLibrary.collectionArray
    const collectionInd = collection.index
    const groups = collection.groupArray;
    collectionTitle.innerText = collection.name
    deleteCollectionButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this collection?")) {
            collectionArray.splice(collectionArray.findIndex(c => c.index === collectionInd), 1) // remove from array
            collection = null // allow garbage collection
            createCollectionMenu(collectionArray); // remove from menu
            if (collectionArray.length > 0) {
                    displayCollection(collectionArray[0])
                    return
            }
            groupDisplay.innerHTML = "";
            deleteCollectionButton.remove();
            collectionTitle.innerText = "Create a new collection to get started!"
            }
    })
    deleteCollectionButton.innerText = "Delete Collection"
    collectionHeader.innerHTML = "";
    collectionHeader.append(collectionTitle, deleteCollectionButton);
    groupDisplay.innerHTML = "";
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
        group = null;
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
        tasksList.splice(tasksList.findIndex(t => t.index === task.index), 1);
        task = null;
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
}

function newCollectionFromForm() {
    const collectionInput = document.querySelector("#collectionName")
    const collectionName = collectionInput.value
    const newCollection = new collection(collectionName);
    defaultLibrary.addCollection(newCollection);
    createCollectionMenu(defaultLibrary.collectionArray)
    displayCollection(newCollection)
}

function createCollectionMenu(collectionArray) {
    const collectionMenu = document.querySelector("#collectionMenu");
    collectionMenu.innerHTML = "";
    collectionArray.forEach(c => {
        const newItem = document.createElement("div");
        const title = document.createElement("div")
        const svg = document.createElement("img");
        newItem.setAttribute("class", "collectionMenuItem");
        title.innerHTML = c.name;
        svg.setAttribute("src", collectionSVG)
        newItem.append(svg, title)
        collectionMenu.append(newItem);
        newItem.addEventListener("click", () => {
            displayCollection(c)
        })
    })
}

// function removeCollectionMenuItem(collectionInd) {
//     const collectionMenu = document.querySelector("#collectionMenu");
//     const collectionList = collectionMenu.children;
//     console.log(collectionList)
//     Array.from(collectionList).forEach(collection => {
//         console.log(collection)
//         if (collection.collectionind === collectionInd) {
//             collectionMenu.remove(collection)
//         }
//     })
// }

export { newCollectionFromForm, newGroupFromForm, newTaskFromForm, displayCollection, createCollectionMenu }