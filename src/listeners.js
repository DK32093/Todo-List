import { defaultLibrary } from "./classes";
import { displayCollection, createCollectionMenu, checkForActiveForms } from "./display";
import { garbagePrep } from "./delete";
import { createTaskForm } from "./forms";

// Delete buttons

function handleDeleteGroup(event) {
    if (confirm("Are you sure you want to delete this group?")) {
        const collectionInd = parseInt(event.target.getAttribute("collectionind"));
        const groupInd = parseInt(event.target.getAttribute("groupind"));
        const groupCard  = event.target.closest(".groupCard")
        const collection = defaultLibrary.collectionArray.find(collection => collection.index === collectionInd);
        let group = collection.groupArray.find(group => group.index === groupInd);
        collection.deleteGroup(group);
        //garbagePrep(groupCard);
        let deleteGroupButton = event.target;
        deleteGroupButton.removeEventListener("click", handleDeleteGroup)
        deleteGroupButton.remove()
        deleteGroupButton = null
        
        displayCollection(collection);
    }
}

function handleDeleteCollection(event) {
    if (confirm("Are you sure you want to delete this collection?")) {
        // Remove the collection and update the menu
        const collectionInd = parseInt(event.target.getAttribute("collectionind"));
        const collectionArray = defaultLibrary.collectionArray
        let collection = collectionArray.find(collection => collection.index === collectionInd);
        defaultLibrary.deleteCollection(collection)
        collection = null;
        createCollectionMenu(collectionArray);// Update menu

        // Clean up the button for GC
        let deleteCollectionButton = event.target;
        deleteCollectionButton.removeEventListener("click", handleDeleteCollection);
        deleteCollectionButton.remove();
        deleteCollectionButton = null;

        if (collectionArray.length > 0) {
            displayCollection(collectionArray[0]);
            return;
        }
        
        const groupDisplay = document.querySelector(".groupDisplay");
        const collectionTitle = document.querySelector("#collectionTitle");
        //Array.from(groupDisplay.children).forEach(child => garbagePrep(child));
        groupDisplay.innerText = ""; // Clear content
        collectionTitle.innerText = "Create a new collection to get started!";
    }
};

// Display buttons

function displayCollectionFromMenu(event) {
    const collectionArray = defaultLibrary.collectionArray;
    const collectionInd = parseInt(event.currentTarget.getAttribute("collectionind"));
    const collection = collectionArray.find(collection => collection.index === collectionInd);
    displayCollection(collection);
}

function handleAddNewTask(event) {
    if (checkForActiveForms()) {return};
    const collectionInd = parseInt(event.currentTarget.getAttribute("collectionind"));
    const groupInd = parseInt(event.currentTarget.getAttribute("groupind"));
    createTaskForm(event, groupInd, collectionInd)
}

function toggleCrossedClass(event) {
    const taskCheck = event.target
    const taskCard = event.target.closest(".taskCard")
    if (taskCheck.checked) {
        taskCard.classList.add("crossed")
        return
    }
    taskCard.classList.remove("crossed");
}


export { handleDeleteCollection, 
         handleDeleteGroup, 
         displayCollectionFromMenu,
         handleAddNewTask,
         toggleCrossedClass }

