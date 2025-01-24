import "./styles.css"
import logMessage from "./logger.js"
import { createNewGroup, createNewTask } from "./functions.js"

const defaultGroup = createNewGroup("General", "My general tasks")
defaultGroup.addTask(createNewTask("Task #1", "My first task", "high"))
defaultGroup.addTask(createNewTask("Task #2", "My second task", "medium"))
defaultGroup.addTask(createNewTask("Task #3", "My third task", "low"))
defaultGroup.tasksList[0].addChecklistItem("My first checklist item")
defaultGroup.tasksList[0].addNotes("Don't forget!")

// const defaultGroup = new toDoGroup("General", "My general tasks")

// const task1 = new toDoTask("Task #1", "My first task", "high")
// const task2 = new toDoTask("Task #2", "My second task", "medium")
// const task3 = new toDoTask("Task #3", "My third task", "low")

// task1.addChecklistItem("My first checklist item")
// task1.addNotes("Don't forget!")
// defaultGroup.addTask(task1)
// defaultGroup.addTask(task2)
// defaultGroup.addTask(task3)

logMessage(defaultGroup)