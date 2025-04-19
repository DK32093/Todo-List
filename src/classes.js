import { createCollectionMenu } from "./display.js"

class library {
    constructor(name) {
        this.name = name;
        this.collectionArray = []
    }

    addCollection(collection) {
        this.collectionArray.push(collection)
    }

    deleteCollection(collection) {
        this.collectionArray.splice(this.collectionArray.findIndex(c => c.index === collection.index), 1);
        collection = null; 
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

    deleteGroup(group) {
        this.groupArray.splice(this.groupArray.findIndex(g => g.index === group.index), 1);
        group = null;
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
        this.tasksList.splice(this.tasksList.findIndex(t => t.index === task.index), 1)
        task = null;
    }
  }

class toDoTask {
    static index = 0;
    constructor(taskTitle, priority) {
        this.taskTitle = taskTitle;
        this.dueDate = "None";
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

class checklistItem {
    static index = 0;
    constructor(text, checked) {
        this.text = text;
        this.checked = checked
        this.index = checklistItem.index++;
    }
}

// Defaults

function createDefaultCollection(name) {
    const collection1 = new collection(name);
    const group = new toDoGroup("General", "My general tasks")
    const task = new toDoTask("Task #1", "High")
    const task2 = new toDoTask("Task #2", "Medium")
    const task3 = new toDoTask("Task #3", "Low")
    task.addChecklistItem(new checklistItem("My first checklist item", true));
    task.addChecklistItem(new checklistItem("My second checklist item", false));
    task.addNotes("Don't forget!")
    group.addTask(task)
    group.addTask(task2)
    group.addTask(task3)
    collection1.addGroup(group)
    return collection1
}

function createCompletedCollection(name) {
    const collection2 = new collection(name)
    const group = new toDoGroup("All Tasks", "Click the checkbox to undo")
    collection2.addGroup(group)
    return collection2
}

const defaultLibrary = new library("Default_Library")
defaultLibrary.addCollection(createDefaultCollection("My Todo Collection"))
defaultLibrary.addCollection(createCompletedCollection("Completed ToDos"))
createCollectionMenu(defaultLibrary.collectionArray)

export { library, collection, toDoGroup, toDoTask, checklistItem, defaultLibrary }