import { defaultLibrary } from "./classes";
import { displayCollection, createCollectionMenu } from "./display";
import { garbagePrep } from "./delete";

// Delete buttons

function handleDeleteGroup(event) {
    if (confirm("Are you sure you want to delete this group?")) {
        const collectionInd = parseInt(event.target.getAttribute("collectionind"));
        const groupInd = parseInt(event.target.getAttribute("groupind"));
        const collection = defaultLibrary.collectionArray.find(collection => collection.index === collectionInd);
        let group = collection.groupArray.find(group => group.index === groupInd);
        collection.deleteGroup(group);
        group = null;

        let deleteGroupButton = event.target;
        deleteGroupButton.removeEventListener("click", handleDeleteGroup)
        // garbagePrep(groupCard);
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

export { handleDeleteCollection, handleDeleteGroup }

