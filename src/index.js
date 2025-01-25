import "./styles.css"
import logMessage from "./logger.js"
import { createNewCollection, createNewGroup, createNewTask } from "./functions.js"
import { displayGroupList } from "./ui.js"

displayGroupList(createNewCollection("My Todo Collection"))
