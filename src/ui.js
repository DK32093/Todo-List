import { toDoTask} from "./classes.js"

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
    const checkDiv = document.createElement("div");
    const checkTitle = document.createElement("h4")
    const checkList = task.checklist
    taskTitle.innerText = task.taskTitle;
    description.innerText = task.description;
    dueDate.innerText = "Due: " + task.dueDate
    priority.innerText = "Priotirty: " + task.priority
    notes.innerText = task.notes
    checkTitle.innerText = "Checklist"
    checkDiv.append(checkTitle)
    checkDiv.setAttribute("class", "checkDiv")
    taskCard.append(taskTitle, description, dueDate, priority, notes, checkDiv)
    taskCard.setAttribute("class", "taskCard")
    if (checkList) {
        checkList.forEach(item => {
            checkDiv.append(createCheckItem(item))
        })
    }
    return taskCard
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

function createTaskForm(e) {
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
        newTaskFromForm(e)
        taskFormDiv.remove()
    });

    newTaskForm.append(taskTitleLab, taskTitle, 
                       descriptionLab, description,
                       dueDateLab, dueDate,
                       priorityLab, priority,
                       notesLab, notes, 
                       newCheckButton, taskSubmitButton)

    taskFormDiv.append(newTaskForm)
    const groupCard = e.target.closest(".groupCard")
    groupCard.append(taskFormDiv)
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
    const groupCard = e.target.closest(".groupCard")
    groupCard.append(createTaskCard(task))
    console.log("run")
}

export { createTaskForm, displayGroupList }