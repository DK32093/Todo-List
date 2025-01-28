import { createCollectionMenu } from "./display.js"

class library {
    constructor(name) {
        this.name = name;
        this.collectionArray = []
    }

    addCollection(collection) {
        this.collectionArray.push(collection)
    }
}

class collection {
    static index = 0;
    constructor(name) {
        this.name = name;
        this.groupArray = [];
        this.index = collection.index++;
    }

    addGroup(group) {
        this.groupArray.push(group);
        group.collectionID = this.index;
    }

}

class toDoGroup {
    static index = 0;
    constructor(groupTitle, subTitle) {
      this.groupTitle = groupTitle;
      this.subTitle = subTitle;
      this.tasksList = [];
      this.index = toDoGroup.index++;
    }

    addTask(task) {
        this.tasksList.push(task)
        task.groupID = this.index
    }

    deleteTask(task) {
        this.tasksList.splice(task.index, 1)
    }
  }

class toDoTask {
    static index = 0;
    constructor(taskTitle, desctiption, priority) {
        this.taskTitle = taskTitle;
        this.description = desctiption;
        this.dueDate = "";
        this.priority = priority;
        this.notes = "";
        this.checklist = [];
        this.status = "N"
        this.index = toDoTask.index++;
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

// Defaults

function createDefaultCollection(name) {
    const collection1 = new collection(name);
    const group = new toDoGroup("General", "My general tasks")
    const task = new toDoTask("Task #1", "My first task", "high")
    task.addChecklistItem("My first checklist item");
    task.addChecklistItem("My second checklist item");
    task.addNotes("Don't forget!")
    group.addTask(task)
    collection1.addGroup(group)
    return collection1
}

const defaultLibrary = new library("Default_Library")
defaultLibrary.addCollection(createDefaultCollection("My Todo Collection"))
createCollectionMenu(defaultLibrary.collectionArray)

export { library, collection, toDoGroup, toDoTask, defaultLibrary }