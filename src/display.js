// Display functions

import { collection, defaultLibrary, toDoGroup, toDoTask} from "./classes.js"
import { createTaskForm } from "./forms.js";
import collectionSVG from "./assets/Collection.svg"
import deleteSVG from "./assets/delete.svg"
import expandSVG from "./assets/expand.svg"
import editSVG from "./assets/edit.svg"

// Collections

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
            collection = null; // allow garbage collection
            createCollectionMenu(collectionArray); // update menu
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

// Groups

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
        if (confirm("Are you sure you want to delete this group?")) {
            const collection = defaultLibrary.collectionArray.find(collection => collection.index === collectionInd);
            const groupList = collection.groupArray
            groupList.splice(groupList.findIndex(g => g.index === groupInd), 1)
            group = null;
            displayCollection(collection)
        }
    })
    return groupCard
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

// Tasks

function createTaskCard(task, collectionInd) {
    const taskCard = document.createElement("div");
    // basic view elements
    const basicView = document.createElement("div");
    const taskCheck = document.createElement("input")
    const taskTitle = document.createElement("h4");
    const dueDate = document.createElement("h5");
    const priority = document.createElement("h5");
    const taskButtonsDiv = document.createElement("div");
    const expandButton = document.createElement("img");
    const editButton = document.createElement("img");
    const deleteButton = document.createElement("img");
    // detailed view elements
    const taskDetails = document.createElement("div")
    const notesDiv = document.createElement("div")
    const notesTitle = document.createElement("h4")
    const notes = document.createElement("h5");
    const checkDiv = document.createElement("div");
    const checkTitle = document.createElement("h4")
    const checkList = task.checklist
    // basic view params
    taskTitle.innerText = task.taskTitle;
    dueDate.innerText = "Due:\n" + task.dueDate
    
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
    expandButton.setAttribute("src", expandSVG)
    editButton.setAttribute("src", editSVG)
    deleteButton.setAttribute("src", deleteSVG)
    taskDetails.style.visibility = "hidden"
    taskDetails.style.height = "0px"
    expandButton.addEventListener("click", () => {
        if (taskDetails.style.visibility ==="hidden") {
            taskDetails.style.visibility = "visible";
            taskDetails.style.height =  notesDiv.clientHeight + "px";
            taskDetails.style.margin = "0.5rem"
            return
        }
        taskDetails.style.visibility ="hidden";
        taskDetails.style.height = "0px"
        taskDetails.style.margin = "0rem"
    });
    deleteButton.addEventListener("click", () => {
        const collection = defaultLibrary.collectionArray.find(collection => collection.index === collectionInd);
        const group = collection.groupArray.find(group => group.index === task.groupID)
        const tasksList = group.tasksList
        tasksList.splice(tasksList.findIndex(t => t.index === task.index), 1);
        task = null;
        displayCollection(collection)
    })
    // detailed view params
    priority.innerText = "Priority: " + task.priority
    notesTitle.innerText = "Notes"
    notes.innerText = task.notes
    checkTitle.innerText = "Checklist"
    // Classes
    taskCard.setAttribute("class", "taskCard")
    basicView.setAttribute("class", "basicView")
    taskTitle.setAttribute("class", "taskTitle")
    dueDate.setAttribute("class", "dueDate")
    taskButtonsDiv.setAttribute("class", "taskButtonDiv")
    deleteButton.setAttribute("class", "deleteButton");
    taskDetails.setAttribute("class", "taskDetails")
    notesDiv.setAttribute("class", "notesDiv")
    checkDiv.setAttribute("class", "checkDiv")
    // Append elements
    taskButtonsDiv.append(expandButton, editButton, deleteButton)
    basicView.append(taskCheck, taskTitle, dueDate, taskButtonsDiv)
    notesDiv.append(priority, notesTitle, notes)
    checkDiv.append(checkTitle)
    if (checkList) {
        checkList.forEach(item => {
            checkDiv.append(createCheckItem(item))
        })
    };
    taskDetails.append(notesDiv, checkDiv)
    taskCard.append(basicView, taskDetails)
   
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
    const dueDate = document.querySelector("#dueDate").value
    const priority= document.querySelector("#priority").value
    const notes = document.querySelector("#notes").value
    const checkList = document.querySelectorAll('input[name="newCheckInput"]')
    const task = new toDoTask(taskTitle, priority)
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

export { newCollectionFromForm, newGroupFromForm, newTaskFromForm, displayCollection, createCollectionMenu }