import logMessage from "./logger";

class toDoGroup {
    groupTitle;
    subTitle;
    tasksList;
    constructor(groupTitle = "General", subTitle = "My general tasks") {
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
    constructor(taskTitle = "Task #1", desctiption = "My first task", priority = "high") {
        this.taskTitle = taskTitle;
        this.description = desctiption;
        this.dueDate = "";
        this.priority = priority;
        this.notes = "";
        this.checklist = [];
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

    getChecklist() {
        logMessage(this.checklist)
    }
}


  export { toDoGroup, toDoTask }