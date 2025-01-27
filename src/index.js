import "./styles.css"
import { defaultLibrary } from "./classes.js"
import { createGroupForm, createCollectionForm } from "./forms.js";
import { displayCollection } from "./display.js"



createCollectionForm()
createGroupForm()

const newCollectionButton = document.getElementById("newCollectionButton")
const newGroupButton = document.getElementById("newGroupButton")
newCollectionButton.addEventListener("click", () => {
    const newCollectionForm = document.getElementById("collectionDialog")
    newCollectionForm.showModal()
})
newGroupButton.addEventListener("click", () => {
    const newGroupForm = document.getElementById("groupDialog")
    newGroupForm.showModal()
})

const firstCollection = defaultLibrary.collectionArray[0]
displayCollection(firstCollection)
console.log(firstCollection)
