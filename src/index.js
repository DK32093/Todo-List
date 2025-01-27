import "./styles.css"
import { defaultLibrary } from "./classes.js"
import { createGroupForm } from "./forms.js";
import { displayCollection } from "./display.js"



const display = document.getElementById("displayArea")
const newGroupButton = document.getElementById("newGroupButton")
const newGroupForm = createGroupForm()
display.append(newGroupForm)
newGroupButton.addEventListener("click", () => {
    newGroupForm.showModal()
})

const firstCollection = defaultLibrary.collectionArray[0]
displayCollection(firstCollection)
console.log(firstCollection)
