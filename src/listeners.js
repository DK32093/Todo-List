import { defaultLibrary, toDoTask, checklistItem } from "./classes";
import { displayCollection, createCollectionMenu, checkForActiveForms, createCheckItem } from "./display";
import { garbagePrep } from "./delete";
import { createTaskForm, createCheckInput } from "./forms";

function handleCompleteTask(event) {
    event.stopPropagation();
    if (checkForActiveForms()) {return};
    const collectionInd = parseInt(event.target.getAttribute("collectionind"));
    const groupInd = parseInt(event.target.getAttribute("groupind"));
    const taskId = parseInt(event.target.getAttribute("taskid"));
    const collection = defaultLibrary.collectionArray.find(collection => collection.index === collectionInd);
    const group = collection.groupArray.find(group => group.index === groupInd)
    const task = group.tasksList.find(task => task.index === taskId)
    const completedCollection = defaultLibrary.collectionArray.find(collection => collection.index === 1);
    const completedGroup = completedCollection.groupArray.find(group => group.index === 1)
    const taskClone = structuredClone(task)
    completedGroup.addTask(taskClone)
    group.deleteTask(task);
    displayCollection(collection)
    console.log(defaultLibrary)
}

// Delete buttons

function handleDeleteTask(event) {
    // Stop propogation once moved to prevent double alert message
    event.stopPropagation();
    if (checkForActiveForms()) {return};
    if (confirm("Are you sure you want to delete this task?")) {
        const collectionInd = parseInt(event.target.getAttribute("collectionind"));
        const groupInd = parseInt(event.target.getAttribute("groupind"));
        const taskId = parseInt(event.target.getAttribute("taskid"));
        const collection = defaultLibrary.collectionArray.find(collection => collection.index === collectionInd);
        const group = collection.groupArray.find(group => group.index === groupInd)
        const task = group.tasksList.find(task => task.index === taskId)
        group.deleteTask(task);
        displayCollection(collection)
    }
}

function handleDeleteGroup(event) {
    if (confirm("Are you sure you want to delete this group?")) {
        const collectionInd = parseInt(event.target.getAttribute("collectionind"));
        const groupInd = parseInt(event.target.getAttribute("groupind"));
        const groupCard  = event.target.closest(".groupCard")
        const collection = defaultLibrary.collectionArray.find(collection => collection.index === collectionInd);
        let group = collection.groupArray.find(group => group.index === groupInd);
        collection.deleteGroup(group);
        //garbagePrep(groupCard);
        let deleteGroupButton = event.target;
        deleteGroupButton.removeEventListener("click", handleDeleteGroup)
        deleteGroupButton.remove()
        deleteGroupButton = null
        
        displayCollection(collection);
    }
}

function handleDeleteCollection(event) {
    if (confirm("Are you sure you want to delete this collection?")) {
        // Remove the collection and update the menu
        const collectionInd = parseInt(event.target.getAttribute("collectionind"));
        const collectionArray = defaultLibrary.collectionArray
        let collection = collectionArray.find(collection => collection.index === collectionInd);
        defaultLibrary.deleteCollection(collection)
        collection = null;
        createCollectionMenu(collectionArray);// Update menu

        // Clean up the button for GC
        let deleteCollectionButton = event.target;
        deleteCollectionButton.removeEventListener("click", handleDeleteCollection);
        deleteCollectionButton.remove();
        deleteCollectionButton = null;

        if (collectionArray.length > 0) {
            displayCollection(collectionArray[0]);
            return;
        }
        
        const groupDisplay = document.querySelector(".groupDisplay");
        const collectionTitle = document.querySelector("#collectionTitle");
        //Array.from(groupDisplay.children).forEach(child => garbagePrep(child));
        groupDisplay.innerText = ""; // Clear content
        collectionTitle.innerText = "Create a new collection to get started!";
    }
};

// Display buttons

function displayCollectionFromMenu(event) {
    const collectionArray = defaultLibrary.collectionArray;
    const collectionInd = parseInt(event.currentTarget.getAttribute("collectionind"));
    const collection = collectionArray.find(collection => collection.index === collectionInd);
    displayCollection(collection);
}

function handleAddNewTask(event) {
    if (checkForActiveForms()) {return};
    const collectionInd = parseInt(event.currentTarget.getAttribute("collectionind"));
    const groupInd = parseInt(event.currentTarget.getAttribute("groupind"));
    createTaskForm(event, groupInd, collectionInd)
}

function toggleCrossedClass(event) {
    if (checkForActiveForms()) {
        event.target.checked = false;
        return
    };
    //get task location from button attributes
    const taskCard = event.target.closest(".taskCard");
    const addCheck = taskCard.querySelector(".addCheck")
    const collectionInd = parseInt(addCheck.getAttribute("collectionind"));
    const groupInd = parseInt(addCheck.getAttribute("groupind"));
    const taskId = parseInt(addCheck.getAttribute("taskid"));
    const checkID = parseInt(event.target.getAttribute("checkid"))
    // Use IDs to get objects
    const collection = defaultLibrary.collectionArray.find(collection => collection.index === collectionInd);
    const group = collection.groupArray.find(group => group.index === groupInd)
    const task = group.tasksList.find(task => task.index === taskId)
    const checklistItem = task.checklist.find(item => item.index === checkID)
    // Cross out text and change object checked attribute
    const box = event.target
    const boxLab = box.nextElementSibling
    if (box.checked) {
        boxLab.classList.add("crossed")
        checklistItem.checked = true;
        console.log(collection)
        return
    }
    boxLab.classList.remove("crossed");
    checklistItem.checked = false;
    console.log(collection)
}

// Task card buttons

function toggleTaskExpand(event) {
    event.stopPropagation(); // Allow button OR card to trigger the event
    if (checkForActiveForms()) {return};
    const editCheck = document.getElementsByClassName("submitEdits"); // Update to include check for checklist editing
    const taskCard = event.target.closest(".taskCard");
    const taskDetails  = taskCard.querySelector(".taskDetails");
    const expandButton  = taskCard.querySelector(".expandButton");
    const notesDiv  = taskCard.querySelector(".notesDiv");
    const checkDiv  = taskCard.querySelector(".checkDiv");
    if (editCheck.length < 1) { //Prevent expanding events while editing
        if (taskDetails.style.visibility === "hidden") {
            expandButton.style.transform = "rotate(180deg)"
            taskDetails.style.visibility = "visible";
            taskDetails.style.height =  checkDiv.clientHeight + "px";
            taskDetails.style.margin = "0.5rem";
            return
        }
        expandButton.style.transform = "rotate(360deg)"
        taskDetails.style.visibility ="hidden";
        taskDetails.style.height = "0px"
        taskDetails.style.margin = "0rem"
    }
}

function addChecklistInput(event) {
    const taskCard = event.target.closest(".taskCard");
    const taskDetails = taskCard.querySelector(".taskDetails");
    const checkDiv = taskCard.querySelector(".checkDiv");
    taskDetails.style.height =  "auto";
    const subCheck = document.getElementsByClassName("newCheckSubmit")
    if (subCheck.length < 1) {
        // Get task location
        const collectionInd = parseInt(event.target.getAttribute("collectionind"));
        const groupInd = parseInt(event.target.getAttribute("groupind"));
        const taskId = parseInt(event.target.getAttribute("taskid"));
        const collection = defaultLibrary.collectionArray.find(collection => collection.index === collectionInd);
        const group = collection.groupArray.find(group => group.index === groupInd)
        const task = group.tasksList.find(task => task.index === taskId)

        const newCheckSubmit = document.createElement("button");
        newCheckSubmit.setAttribute("class", "newCheckSubmit")
        newCheckSubmit.setAttribute("collectionind", collectionInd)
        newCheckSubmit.setAttribute("groupind", groupInd)
        newCheckSubmit.setAttribute("taskid", taskId)
        newCheckSubmit.innerText = "Update Checklist";
        checkDiv.append(createCheckInput())
        checkDiv.append(newCheckSubmit)
        newCheckSubmit.addEventListener("click", submitUpdatedChecklist)
    } else {
        checkDiv.insertBefore(createCheckInput(), checkDiv.lastElementChild)
    }
}

function submitUpdatedChecklist(event) {
    // Get task location
    const collectionInd = parseInt(event.target.getAttribute("collectionind"));
    const groupInd = parseInt(event.target.getAttribute("groupind"));
    const taskId = parseInt(event.target.getAttribute("taskid"));
    const collection = defaultLibrary.collectionArray.find(collection => collection.index === collectionInd);
    const group = collection.groupArray.find(group => group.index === groupInd)
    const task = group.tasksList.find(task => task.index === taskId)

    const taskCard = event.target.closest(".taskCard");
    const listDiv = taskCard.querySelector(".listDiv");
    const newCheckSubmit = taskCard.querySelector(".newCheckSubmit");
    const newChecklistItems = document.querySelectorAll('input[name="newCheckInput"]');
    newChecklistItems.forEach(input => {
        if (input.value.length > 0) {
            task.addChecklistItem(new checklistItem(input.value, false)) // Update the task object
        }
        input.remove();
    })
    listDiv.innerHTML = "";
    const updatedCheckList = task.checklist
    updatedCheckList.forEach(item => {
        if (item) {listDiv.append(createCheckItem(item, groupInd))} // update the display
    })
    newCheckSubmit.remove()
}

function handleEditTask(event) { 
    event.stopPropagation();
    if (checkForActiveForms()) {return};

    const editButton = event.target
    const taskCard = event.target.closest(".taskCard");
    const basicView = taskCard.querySelector(".basicView");
    const dueDate = taskCard.querySelector(".dueDate");
    const taskDetails = taskCard.querySelector(".taskDetails");
    const notesDiv = taskCard.querySelector(".notesDiv");
    const notes = taskCard.querySelector(".taskNotes");
    const taskTitle = taskCard.querySelector(".taskTitle");
    const priority = taskCard.querySelector(".priority");
    const checkDiv = taskCard.querySelector(".checkDiv");
    const addCheck = taskCard.querySelector(".addCheck");
    // Get task location
    const collectionInd = parseInt(event.target.getAttribute("collectionind"));
    const groupInd = parseInt(event.target.getAttribute("groupind"));
    const taskId = parseInt(event.target.getAttribute("taskid"));
    const collection = defaultLibrary.collectionArray.find(collection => collection.index === collectionInd);
    const group = collection.groupArray.find(group => group.index === groupInd)
    let task = group.tasksList.find(task => task.index === taskId)

    // Disable edit task and add-checklist-item buttons
    editButton.disabled = true;
    editButton.style.opacity = '0.5';
    addCheck.disabled = true;
    addCheck.style.opacity = '0.5';

    // Stop expand event from firing when editing
    basicView.removeEventListener("click", toggleTaskExpand)

    // Edit due date
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

    // Edit priority
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
    low.value = "Low" // Value assignments required to set default selection
    medium.innerText = "Medium"
    medium.value = "Medium"
    high.innerText = "High"
    high.value = "High"
    editPriority.append(low, medium, high)
    editPriority.value = task.priority
    priority.innerText = "";
    priority.append(priorityLab, editPriority)

    // Make title, notes, and checklist items editable
    const editable = [];
    editable.push(taskTitle, notes, editDueDate) //added date to apply stopPropagation listener
    const checks = Array.from(checkDiv.getElementsByTagName("label"))
    checks.forEach(item => {
        const box = item.previousElementSibling
        box.disabled = true
        if (box.checked == false) {
            editable.push(item)
        }
    })
    editable.forEach(item => {
        item.contentEditable = true;
        item.style.borderBottom = "solid white 1px";
        item.addEventListener("keydown", preventEnterKey)
        item.addEventListener("click", stopPropagationOnClick)
    })

    // Submit button - Apply edits 
    const submitEdits = document.createElement("button")
    submitEdits.setAttribute("collectionind", collectionInd)
    submitEdits.setAttribute("groupind", groupInd)
    submitEdits.setAttribute("taskid", taskId)
    submitEdits.classList.add("submitEdits")
    submitEdits.innerText = "Finished Editing Task"
    submitEdits.addEventListener("click", submitTaskEdits)
    notesDiv.append(submitEdits)

    // expand task card
    taskDetails.style.visibility = "visible";
    taskDetails.style.height =  "auto"
    taskDetails.style.margin = "0.5rem";
};

function submitTaskEdits(event) { 
    // Get task location
    const collectionInd = parseInt(event.target.getAttribute("collectionind"));
    const groupInd = parseInt(event.target.getAttribute("groupind"));
    const taskId = parseInt(event.target.getAttribute("taskid"));
    const collection = defaultLibrary.collectionArray.find(collection => collection.index === collectionInd);
    const group = collection.groupArray.find(group => group.index === groupInd)
    let task = group.tasksList.find(task => task.index === taskId)
    const checklist = task.checklist
    // Get edited values
    const taskCard = event.target.closest(".taskCard");
    const notes = taskCard.querySelector(".taskNotes");
    const checkDiv = taskCard.querySelector(".checkDiv");
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
    //update checklist text with edited text
    checklist.forEach((obj, index) => {
        obj.text = editedChecklist[index].innerText;
      });
    editedTask.checklist = checklist
    // replace task
    const tasksList = group.tasksList
    tasksList.splice(tasksList.findIndex(t => t.index === task.index), 1, editedTask);
    task = null;
    displayCollection(collection)
};

function preventEnterKey(event) {
    if(event.key === "Enter") {
        event.preventDefault();
    }
};

function preventDefaultOnClick(event) {
    event.preventDefault();
};

function stopPropagationOnClick(event) {
    event.stopPropagation();
};

export { handleCompleteTask,
         handleDeleteCollection, // not exported: submitTaskEdits, preventEnterKey, stopPropogationOnClick, submitUpdatedChecklist
         handleDeleteGroup,
         handleDeleteTask,
         handleEditTask, 
         displayCollectionFromMenu,
         handleAddNewTask,
         toggleCrossedClass,
         toggleTaskExpand,
         addChecklistInput,
         preventDefaultOnClick }

