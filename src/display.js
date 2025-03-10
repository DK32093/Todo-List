// Display functions

import { collection, defaultLibrary, toDoGroup, toDoTask} from "./classes.js"
import { createTaskForm, createCheckInput } from "./forms.js";
import { garbagePrep } from "./delete.js";
import collectionSVG from "./assets/Collection.svg"
import deleteSVG from "./assets/delete.svg"
import expandSVG from "./assets/expand.svg"
import editSVG from "./assets/edit.svg"

// Collections

function bindHandler(handler, ...args) {
    return function (event) {
        handler(event, ...args);
    };
}

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

    function handleDeleteClick(event, collection, collectionArray, groupDisplay) {
        if (confirm("Are you sure you want to delete this collection?")) {
            event.currentTarget.removeEventListener("click", boundHandleDeleteClick); // Remove listener
            defaultLibrary.deleteCollection(collection)
            collection = null;
            createCollectionMenu(collectionArray); // Update menu
    
            if (collectionArray.length > 0) {
                displayCollection(collectionArray[0]);
                return;
            }
            
            //Array.from(groupDisplay.children).forEach(child => garbagePrep(child));
            groupDisplay.innerText = ""; // Clear content
            collectionTitle.innerText = "Create a new collection to get started!";
        }
    };

    const boundHandleDeleteClick = bindHandler(handleDeleteClick, collection, collectionArray, groupDisplay);
    deleteCollectionButton.addEventListener("click", boundHandleDeleteClick)
    deleteCollectionButton.innerText = "Delete Collection"
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
    addTaskButton.innerText = "Add New Task";
    addTaskButton.addEventListener("click", (e) => {
        if (checkForActiveForms()) {return};
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
    groupDeleteButton.innerText = "Delete Group"
    groupDeleteButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this group?")) {
            const collection = defaultLibrary.collectionArray.find(collection => collection.index === collectionInd);
            collection.deleteGroup(group);
            group = null;
            //garbagePrep(groupCard);
            displayCollection(collection);
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
    const collection = defaultLibrary.collectionArray.find(collection => collection.index === ind);
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
    taskCheck.addEventListener("click", () => {
        if (taskCheck.checked) {
            taskCard.classList.add("crossed")
            return
        }
        taskCard.classList.remove("crossed");
    });
   
    // detailed view params
    taskDetails.style.visibility = "hidden"
    taskDetails.style.height = "0px"
    priority.innerText = "Priority: " + task.priority
    notesTitle.innerText = "Notes"
    notes.innerText = task.notes
    checkTitle.innerText = "Checklist"
    addCheck.innerText = "Add Item"
    addCheck.addEventListener("click", () => {
        taskDetails.style.height =  "auto";
        const subCheck = document.getElementsByClassName("newCheckSubmit")
        if (subCheck.length < 1) {
            const newCheckSubmit = document.createElement("button");
            newCheckSubmit.setAttribute("class", "newCheckSubmit")
            newCheckSubmit.innerText = "Update Checklist";
            checkDiv.append(createCheckInput())
            checkDiv.append(newCheckSubmit)
            newCheckSubmit.addEventListener("click", () => {
                const newChecklistItems = document.querySelectorAll('input[name="newCheckInput"]');
                newChecklistItems.forEach(input => {
                    task.addChecklistItem(input.value)
                    input.remove();
                })
                listDiv.innerHTML = "";
                const updatedCheckList = task.checklist
                updatedCheckList.forEach(item => {
                    listDiv.append(createCheckItem(item))
                })
                
                newCheckSubmit.remove()
                console.log(task)
            })
        } else {
            checkDiv.insertBefore(createCheckInput(), checkDiv.lastElementChild)
        }
        //submit
        //task.addChecklistItem(value)
    })
    // Classes
    taskCard.setAttribute("class", "taskCard")
    basicView.setAttribute("class", "basicView")
    taskTitle.setAttribute("class", "taskTitle")
    dueDate.setAttribute("class", "dueDate")
    taskDetails.setAttribute("class", "taskDetails")
    notesDiv.setAttribute("class", "notesDiv")
    checkDiv.setAttribute("class", "checkDiv")
    // Append elements
    const taskCardButtons = createTaskCardButtons(task, taskCard, basicView, 
                                                  taskTitle, dueDate, taskDetails, 
                                                  notesDiv, priority, notes, checkDiv, 
                                                  collectionInd)
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

function createTaskCardButtons(task, taskCard, basicView, taskTitle, 
                               dueDate, taskDetails, notesDiv, priority, 
                               notes, checkDiv, collectionInd) {
    const taskButtonsDiv = document.createElement("div");
    const expandButton = document.createElement("img");
    const editButton = document.createElement("img");
    const deleteButton = document.createElement("img");

    expandButton.setAttribute("src", expandSVG)
    editButton.setAttribute("src", editSVG)
    deleteButton.setAttribute("src", deleteSVG)
    
    const expanders = [basicView, expandButton]
    expanders.forEach(item => {
        item.addEventListener("click", (e) => {
            e.stopPropagation(); // Allow button OR card to trigger the event
            const editCheck = document.getElementsByClassName("submitEdits");
            if (editCheck.length < 1) { //Prevent expanding events while editing
                if (taskDetails.style.visibility === "hidden") {
                    expandButton.style.transform = "rotate(180deg)"
                    taskDetails.style.visibility = "visible";
                    taskDetails.style.height =  notesDiv.clientHeight + "px";
                    taskDetails.style.margin = "0.5rem";
                    return
                }
                expandButton.style.transform = "rotate(360deg)"
                taskDetails.style.visibility ="hidden";
                taskDetails.style.height = "0px"
                taskDetails.style.margin = "0rem"
            }
        });
    })
   
    editButton.addEventListener("click", (e) => {
        e.stopPropagation();
        if (checkForActiveForms()) {return};
        editButton.style.pointerEvents = 'none';
        editButton.style.opacity = '0.5';
        const editable = [];
        editable.push(taskTitle, notes)
        const checks = Array.from(checkDiv.getElementsByTagName("label"))
        checks.forEach(item => {
            editable.push(item)
        })
        editable.forEach(item => {
            item.contentEditable = true;
            item.style.borderBottom = "solid white 1px";
            item.addEventListener("keydown", (e) => {
                if(e.key === "Enter") {
                    e.preventDefault();
                }
            })
        })

        const editDueDate = document.createElement("input");
        const dueDateLab = document.createElement("label");
        dueDateLab.setAttribute("for", "editDueDate")
        dueDateLab.innerText = "Due:"
        Object.assign(editDueDate, {
            type: "date",
            id: "editDueDate", 
            name: "editDueDate",
            value: task.dueDate
        })
        dueDate.innerText = "";
        dueDate.append(dueDateLab, editDueDate)

        const editPriority = document.createElement("select");
        const priorityLab = document.createElement("label");
        priorityLab.setAttribute("for", "editPriority")
        priorityLab.innerText = "Priority: "
        Object.assign(editPriority, {
            name: "editPriority",
            id: "editPriority"
        })
        const low = document.createElement("option");
        const medium = document.createElement("option");
        const high = document.createElement("option");
        low.innerText = "Low"
        low.value = "Low" // Value assignments required to set defeult selection
        medium.innerText = "Medium"
        medium.value = "Medium"
        high.innerText = "High"
        high.value = "High"
        editPriority.append(low, medium, high)
        editPriority.value = task.priority
        priority.innerText = "";
        priority.append(priorityLab, editPriority)

        const submitEdits = document.createElement("button")
        submitEdits.classList.add("submitEdits")
        submitEdits.innerText = "Finished Editing Task"
        submitEdits.addEventListener("click", () => {
           const editedTitle = taskCard.getElementsByClassName("taskTitle")[0].innerText
           const editedDueDate = taskCard.querySelector("#editDueDate").value
           const editedPriority= taskCard.querySelector("#editPriority").value
           const editedNotes = notes.innerText
           const editedChecklist = Array.from(checkDiv.getElementsByTagName("label"))
           const editedTask = new toDoTask(editedTitle, editedPriority)
           editedTask.groupID = task.groupID;
           editedTask.setDate(editedDueDate);
           if (editedTask.dueDate.length < 1) {editedTask.dueDate = "None"}
           editedTask.addNotes(editedNotes);
           editedChecklist.forEach(input => {
              editedTask.addChecklistItem(input.innerText)
           })
           // replace task
           const collection = defaultLibrary.collectionArray.find(collection => collection.index === collectionInd);
           const group = collection.groupArray.find(group => group.index === task.groupID)
           const tasksList = group.tasksList
           tasksList.splice(tasksList.findIndex(t => t.index === task.index), 1, editedTask);
           task = null;
           displayCollection(collection)
        })
        notesDiv.append(submitEdits)

        // expand task card
        taskDetails.style.visibility = "visible";
        taskDetails.style.height =  "auto"
        taskDetails.style.margin = "0.5rem";
    })

    deleteButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this task?")) {
            const collection = defaultLibrary.collectionArray.find(collection => collection.index === collectionInd);
            const group = collection.groupArray.find(group => group.index === task.groupID)
            group.deleteTask(task);
            task = null;
            displayCollection(collection)
        }
    })

    taskButtonsDiv.setAttribute("class", "taskButtonDiv");
    deleteButton.setAttribute("class", "deleteButton");
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
    box.addEventListener("click", () => {
        if (box.checked) {
            boxLab.classList.add("crossed")
            return
        }
        boxLab.classList.remove("crossed");
    });
    boxLab.addEventListener("click", (e) => {
        e.preventDefault(); // Stops box from being checked when label is clicked
    })
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
    if (formCheck || editCheck.length > 0) {
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
         checkForActiveForms }