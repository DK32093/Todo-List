// Forms for creating new collections, groups, tasks, 
// and checklist items

import { defaultLibrary } from "./classes.js"
import { newCollectionFromForm, newGroupFromForm, newTaskFromForm } from "./display.js"

function createCollectionForm() {
    const dialog = document.createElement("dialog")
    dialog.setAttribute("id", "collectionDialog")
    const newCollectionForm = document.createElement("form")
    newCollectionForm.setAttribute("method", "dialog")
    const display = document.getElementById("displayArea")

    const collectionName = document.createElement("input");
    const collectionNameLab = document.createElement("label");
    collectionNameLab.setAttribute("for", "collectionName")
    collectionNameLab.innerText = "Collection title: "
    Object.assign(collectionName, {
        type: "text",
        id: "collectionName",
        name: "collectionName",
        placeholder: "My collection"
    })

    const collectionSubmitButton = document.createElement("button")
    collectionSubmitButton.innerText = "Submit collection"
    Object.assign(collectionSubmitButton, {
        type: "submit"
    })
    collectionSubmitButton.addEventListener("click", (e) => {
        newCollectionFromForm();
        createGroupForm(); // reset group form to update collections list
    });

    newCollectionForm.append(collectionNameLab, collectionName,
                             collectionSubmitButton)

    dialog.append(newCollectionForm)
    display.append(dialog)
}

function createGroupForm() { 
    const dialogCheck = document.querySelector("#groupDialog")
    if (dialogCheck) {
        dialogCheck.remove()
    }
    const dialog = document.createElement("dialog")
    dialog.setAttribute("id", "groupDialog")
    const newGroupForm = document.createElement("form")
    newGroupForm.setAttribute("method", "dialog")
    const display = document.getElementById("displayArea")

    const groupTitle = document.createElement("input");
    const groupTitleLab = document.createElement("label");
    groupTitleLab.setAttribute("for", "groupTitle")
    groupTitleLab.innerText = "Group title: "
    Object.assign(groupTitle, {
        type: "text",
        id: "groupTitle",
        name: "groupTitle",
        placeholder: "My group"
    })

    const subTitle = document.createElement("input");
    const subTitleLab = document.createElement("label");
    subTitleLab.setAttribute("for", "subTitle")
    subTitleLab.innerText = "Group notes: "
    Object.assign(subTitle, {
        type: "text",
        id: "subTitle",
        name: "subTitle",
        placeholder: "About this group"
    })

    const selectColl = document.createElement("select");
    const selectCollLab = document.createElement("label");
    selectCollLab.setAttribute("for", "selectColl")
    selectCollLab.innerText = "Choose collection: "
    Object.assign(selectColl, {
        name: "selectColl",
        id: "selectColl",
    })
    const collections = defaultLibrary.collectionArray
    collections.forEach(collection => {
        const op = document.createElement("option");
        op.innerText = collection.name;
        op.setAttribute("index", collection.index)
        selectColl.append(op);
    })

    const groupSubmitButton = document.createElement("button")
    groupSubmitButton.innerText = "Submit group"
    Object.assign(groupSubmitButton, {
        class: "groupSubmitButton",
        type: "submit"
    })
    groupSubmitButton.addEventListener("click", () => {
        newGroupFromForm();
        createGroupForm(); // reset form
    });

    newGroupForm.append(groupTitleLab, groupTitle,
                        subTitleLab, subTitle,
                        selectCollLab, selectColl,
                        groupSubmitButton)

    dialog.append(newGroupForm)
    display.append(dialog)
}

function createTaskForm(e, groupInd, collectionInd) {
    const taskFormDiv = document.createElement("div")
    taskFormDiv.setAttribute("class", "taskFormDiv")
    const newTaskForm = document.createElement("form");
    newTaskForm.setAttribute("class", "newTaskForm")
    
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
    priorityLab.setAttribute("for", "priority")
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

    const newCheckButton = document.createElement("button")
    newCheckButton.innerText = "Add checklist item"
    Object.assign(newCheckButton, {
        class: "newCheckButton",
        type: "button"
    })
    newCheckButton.addEventListener("click", (e) => {
        const closestTaskForm  = e.target.closest(".newTaskForm")
        closestTaskForm.insertBefore(createCheckInput(), closestTaskForm.lastElementChild)
    });

    const taskSubmitButton = document.createElement("button")
    taskSubmitButton.innerText = "Submit task"
    Object.assign(taskSubmitButton, {
        class: "taskSubmitButton",
        type: "submit"
    })
    taskSubmitButton.addEventListener("click", (e) => {
        e.preventDefault(); //prevent page from refreshing
        newTaskFromForm(groupInd, collectionInd)
        taskFormDiv.remove()
    });

    newTaskForm.append(taskTitleLab, taskTitle, 
                       dueDateLab, dueDate,
                       priorityLab, priority,
                       notesLab, notes, 
                       newCheckButton, taskSubmitButton);

    taskFormDiv.append(newTaskForm);

    const groupCard = e.target.closest(".groupCard");
    groupCard.append(taskFormDiv);
    taskFormDiv.scrollIntoView();
}

function createCheckInput() {
    const newCheckInput = document.createElement("input");
    Object.assign(newCheckInput, {
        type: "text",
        name: "newCheckInput",
        placeholder: "New checklist item"
    })
    return newCheckInput
}

export { createTaskForm, createGroupForm, createCollectionForm }