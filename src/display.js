// Display functions

import { collection, defaultLibrary, toDoGroup, toDoTask} from "./classes.js"
import { createTaskForm, createCheckInput } from "./forms.js";
import { garbagePrep } from "./delete.js";
import { handleDeleteCollection, handleDeleteGroup, handleDeleteTask, handleEditTask, 
         displayCollectionFromMenu, handleAddNewTask, toggleCrossedClass, toggleTaskExpand,
         addChecklistInput, preventDefaultOnClick } from "./listeners.js";
import collectionSVG from "./assets/Collection.svg"
import deleteSVG from "./assets/delete.svg"
import expandSVG from "./assets/expand.svg"
import editSVG from "./assets/edit.svg"

// Collections

// revesit - the delete button still shows as a detached node
function displayCollection(collection) {
    const collectionContainer = document.querySelector("#collectionContainer");
    const groupDisplay = document.querySelector(".groupDisplay");
    const collectionHeader = document.querySelector("#collectionHeader");
    const collectionTitle = document.createElement("h1");
    const deleteCollectionButton = document.createElement("button");
    const collectionArray = defaultLibrary.collectionArray;
    const collectionInd = collection.index;
    const groups = collection.groupArray;
    collectionTitle.innerText = collection.name;
    collectionTitle.setAttribute("id", "collectionTitle")
    deleteCollectionButton.addEventListener("click", handleDeleteCollection)
    deleteCollectionButton.innerText = "Delete Collection"
    deleteCollectionButton.setAttribute("collectionind", collection.index)
    collectionHeader.innerText = "";
    collectionHeader.append(collectionTitle);
    groupDisplay.innerText = "";
    groupDisplay.append(deleteCollectionButton)
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
    const currentMenuItems = Array.from(collectionMenu.children)
    currentMenuItems.forEach(i => {
        i.removeEventListener("click", displayCollectionFromMenu)
    })
    collectionMenu.innerHTML = "";
    collectionArray.forEach(c => {
        const newItem = document.createElement("div");
        const title = document.createElement("div")
        const svg = document.createElement("img");
        newItem.setAttribute("class", "collectionMenuItem");
        newItem.setAttribute("collectionind", c.index)
        title.innerHTML = c.name;
        svg.setAttribute("src", collectionSVG)
        newItem.append(svg, title)
        collectionMenu.append(newItem);
        newItem.addEventListener("click", displayCollectionFromMenu)
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
    addTaskButton.innerText = "Add New Task";
    addTaskButton.setAttribute("collectionind", collectionInd)
    addTaskButton.setAttribute("groupind", groupInd)
    addTaskButton.addEventListener("click", handleAddNewTask);
    title.textContent = group.groupTitle
    subTitle.textContent = group.subTitle
    groupCard.setAttribute("class", "groupCard");
    groupCard.append(title, subTitle, addTaskButton, groupDeleteButton)
    tasksList.forEach(task => {
        groupCard.append(createTaskCard(task, groupInd, collectionInd))
    })
    groupDeleteButton.setAttribute("class", "groupDeleteButton");
    groupDeleteButton.setAttribute("collectionind", collectionInd)
    groupDeleteButton.setAttribute("groupind", groupInd)
    groupDeleteButton.innerText = "Delete Group"
    groupDeleteButton.addEventListener("click", handleDeleteGroup)
    return groupCard
}

function newGroupFromForm() {
    const groupTitle = document.querySelector("#groupTitle").value
    const subTitle = document.querySelector("#subTitle").value
    const selectColl = document.querySelector("#selectColl")
    const collectionChoice = selectColl.options[selectColl.selectedIndex]
    const ind = parseInt(collectionChoice.getAttribute("index"))
    const collection = defaultLibrary.collectionArray.find(collection => collection.index === ind);
    const group = new toDoGroup(groupTitle, subTitle)
    collection.addGroup(group)
    displayCollection(collection)
}
 
// Tasks

function createTaskCard(task, groupInd, collectionInd) {
    const taskCard = document.createElement("div");
    // basic view elements
    const basicView = document.createElement("div");
    const taskCheck = document.createElement("input")
    const taskTitle = document.createElement("h4");
    const dueDate = document.createElement("h5");
    // detailed view elements
    const taskDetails = document.createElement("div")
    const notesDiv = document.createElement("div")
    const priority = document.createElement("h5");
    const notesTitle = document.createElement("h4")
    const notes = document.createElement("h5");
    const checkDiv = document.createElement("div");
    const checkTitleDiv = document.createElement("div");
    const checkTitle = document.createElement("h4")
    const addCheck = document.createElement("button")
    const listDiv = document.createElement("div");
    const checkList = task.checklist
    // basic view params
    taskTitle.innerText = task.taskTitle;
    dueDate.innerText = "Due:\n" + task.dueDate
    if (task.priority === "High") {
        basicView.style.border = "solid 3px red"
        notesDiv.style.border = "solid 3px red"
        checkDiv.style.border = "solid 3px red"
    } else if (task.priority === "Medium") {
        basicView.style.border = "solid 3px blue"
        notesDiv.style.border = "solid 3px blue"
        checkDiv.style.border = "solid 3px blue"
    } else {
        basicView.style.border = "solid 3px green"
        notesDiv.style.border = "solid 3px green"
        checkDiv.style.border = "solid 3px green"
    }
    Object.assign(taskCheck, {
        type: "checkbox",
        name: "taskCheck",
        id: "taskCheck",
    })
    //taskCheck.addEventListener("click", toggleCrossedClass); Update with logic to add completed task to a "completed" collection
    // detailed view params
    taskDetails.style.visibility = "hidden"
    taskDetails.style.height = "0px"
    priority.innerText = "Priority: " + task.priority
    notesTitle.innerText = "Notes"
    notes.innerText = task.notes
    checkTitle.innerText = "Checklist"
    addCheck.innerText = "Add Item"
    addCheck.setAttribute("collectionind", collectionInd)
    addCheck.setAttribute("groupind", groupInd)
    addCheck.setAttribute("taskid", task.index)
    addCheck.addEventListener("click", addChecklistInput)
    // Classes
    taskCard.setAttribute("class", "taskCard")
    basicView.setAttribute("class", "basicView")
    taskTitle.setAttribute("class", "taskTitle")
    dueDate.setAttribute("class", "dueDate")
    taskDetails.setAttribute("class", "taskDetails")
    priority.setAttribute("class", "priority")
    notesDiv.setAttribute("class", "notesDiv")
    notes.setAttribute("class", "taskNotes")
    checkDiv.setAttribute("class", "checkDiv")
    listDiv.setAttribute("class", "listDiv")
    // Append elements
    const taskCardButtons = createTaskCardButtons(task, basicView, groupInd, collectionInd)
    basicView.append(taskCheck, taskTitle, dueDate, taskCardButtons)
    notesDiv.append(priority, notesTitle, notes)
    checkTitleDiv.append(checkTitle, addCheck)
    if (checkList) {
        checkList.forEach(item => {
            listDiv.append(createCheckItem(item))
        })
    };
    checkDiv.append(checkTitleDiv, listDiv)
    taskDetails.append(notesDiv, checkDiv)
    taskCard.append(basicView, taskDetails)
   
    return taskCard
}

function createTaskCardButtons(task, basicView, groupInd, collectionInd) {
    // Button elements
    const taskButtonsDiv = document.createElement("div");
    const expandButton = document.createElement("img");
    const editButton = document.createElement("img");
    const deleteButton = document.createElement("img");

    // SVGs
    expandButton.setAttribute("src", expandSVG)
    editButton.setAttribute("src", editSVG)
    deleteButton.setAttribute("src", deleteSVG)

    // Attributes
    const buttonList = [deleteButton, editButton]
    buttonList.forEach(button => {
        button.setAttribute("collectionind", collectionInd)
        button.setAttribute("groupind", groupInd)
        button.setAttribute("taskid", task.index)
    })
    
    // classes
    expandButton.setAttribute("class", "expandButton");
    taskButtonsDiv.setAttribute("class", "taskButtonDiv");
    deleteButton.setAttribute("class", "deleteButton");
    
    // listeners
    const expanders = [basicView, expandButton]
    expanders.forEach(item => {
        item.addEventListener("click", toggleTaskExpand);
    })
    editButton.addEventListener("click", handleEditTask)
    deleteButton.addEventListener("click", handleDeleteTask)

    taskButtonsDiv.append(expandButton, editButton, deleteButton);
    return taskButtonsDiv;
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
    box.addEventListener("click", toggleCrossedClass)
    boxLab.addEventListener("click", preventDefaultOnClick)
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

// Check

function checkForActiveForms() {
    const editCheck = document.getElementsByClassName("submitEdits");
    const formCheck = document.querySelector(".taskFormDiv");
    const checklistCheck = document.querySelector(".newCheckSubmit")
    if (formCheck || checklistCheck || editCheck.length > 0) {
        alert("Please finish editing the current task");
        return true
    }
    return false
}

export { newCollectionFromForm, 
         newGroupFromForm, 
         newTaskFromForm, 
         displayCollection, 
         createCollectionMenu, 
         checkForActiveForms,
         createCheckItem }