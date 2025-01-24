import "./styles.css"
import logMessage from "./logger.js"
import { toDoGroup, toDoTask } from "./classes.js"

const defaultGroup = new toDoGroup

const task1 = new toDoTask
const task2 = new toDoTask("Task #2", "My second task", "medium")
const task3 = new toDoTask("Task #3", "My third task", "low")

task1.addChecklistItem("My first checklist item")
task1.addNotes("Don't forget!")
defaultGroup.addTask(task1)
defaultGroup.addTask(task2)
defaultGroup.addTask(task3)

logMessage(defaultGroup)