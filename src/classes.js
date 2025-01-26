import {createTaskForm} from "./forms.js";

class collection {
    constructor(name) {
        this.name = name;
        this.groupArray = [];
    }

    addgroup(group) {
        this.groupArray.push(group)
    }
}

class toDoGroup {
    groupTitle;
    subTitle;
    tasksList;
    constructor(groupTitle, subTitle) {
      this.groupTitle = groupTitle;
      this.subTitle = subTitle;
      this.tasksList = [];
    }

    createAddButton() {
        const button = document.createElement("button");
        button.innerText = "Add new ask";
        button.addEventListener("click", (e) => {
            createTaskForm(e);
        });
        return button;
    }

    addTask(task) {
        this.tasksList.push(task)
    }
  }

class toDoTask {
    taskTitle;
    description;
    dueDate;
    priority;
    notes;
    checklist;
    status;
    constructor(taskTitle, desctiption, priority) {
        this.taskTitle = taskTitle;
        this.description = desctiption;
        this.dueDate = "";
        this.priority = priority;
        this.notes = "";
        this.checklist = [];
        this.status = "N"
    }

    setDate(date) {
        this.dueDate = date
    }

    addNotes(note) {
        this.notes = note
    }

    addChecklistItem(item) {
        this.checklist.push(item)
    }

    switchStatus() {
        if (this.status === "N") {
            this.status = "Y"
            return
        }
        this.status = "N"
    }

    switchPriority(choice) {
        this.priority = choice
    }
}

function createDefaultCollection(name) {
    const collection1 = new collection(name);
    const group = new toDoGroup("General", "My general tasks")
    const task = new toDoTask("Task #1", "My first task", "high")
    task.addChecklistItem("My first checklist item");
    task.addChecklistItem("My second checklist item");
    task.addNotes("Don't forget!")
    group.addTask(task)
    collection1.addgroup(group)
    return collection1
}

export { collection, toDoGroup, toDoTask, createDefaultCollection }