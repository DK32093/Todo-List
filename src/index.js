import "./styles.css"
import logMessage from "./logger.js"
import { createNewGroup, createNewTask } from "./functions.js"

const groupList = []

const defaultGroup = createNewGroup("General", "My general tasks")
defaultGroup.addTask(createNewTask("Task #1", "My first task", "high"))
defaultGroup.addTask(createNewTask("Task #2", "My second task", "medium"))
defaultGroup.addTask(createNewTask("Task #3", "My third task", "low"))
defaultGroup.tasksList[0].addChecklistItem("My first checklist item")
defaultGroup.tasksList[0].addNotes("Don't forget!")
defaultGroup.tasksList[0].switchStatus()

groupList.push(defaultGroup)
logMessage(groupList)