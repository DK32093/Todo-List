import "./styles.css"
import { defaultLibrary } from "./classes.js"
import { createGroupForm, createCollectionForm } from "./forms.js";
import { displayCollection, checkForActiveForms } from "./display.js"

createCollectionForm();
createGroupForm();

const newCollectionButton = document.getElementById("newCollectionButton")
const newGroupButton = document.getElementById("newGroupButton")

newCollectionButton.addEventListener("click", () => {
    if (checkForActiveForms()) {return};
    const newCollectionDialog = document.getElementById("collectionDialog");
    const newCollectionForm = document.getElementById("newCollectionForm");
    newCollectionForm.reset();
    newCollectionDialog.showModal();
});

newGroupButton.addEventListener("click", () => {
    if (checkForActiveForms()) {return};
    if (defaultLibrary.collectionArray.length < 1) {
        alert("Please create a new collection to store your groups!")
        return
    };
    const newGroupDialog = document.getElementById("groupDialog");
    const newGroupForm = document.getElementById("newGroupForm");
    newGroupForm.reset();
    newGroupDialog.showModal();
});

const firstCollection = defaultLibrary.collectionArray[0];
displayCollection(firstCollection);
console.log(firstCollection);
console.log(defaultLibrary)
