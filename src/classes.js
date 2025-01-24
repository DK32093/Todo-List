import logMessage from "./logger";

class groupList {
    constructor(groupArray) {
        this.groupArray = []
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

    addTask(task) {
        this.tasksList.push(task)
    }

    getTasks() {
        logMessage(this.tasksList)
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

export { groupList, toDoGroup, toDoTask }