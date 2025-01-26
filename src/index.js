import "./styles.css"
import { createDefaultCollection } from "./classes.js"
import { createGroupForm } from "./forms.js";
import { displayCollection } from "./display.js"

const display = document.getElementById("displayArea")
const newGroupButton = document.getElementById("newGroupButton")
const newGroupForm = createGroupForm()
display.append(newGroupForm)
newGroupButton.addEventListener("click", () => {
    newGroupForm.showModal()
})

displayCollection(createDefaultCollection("My Todo Collection"))
