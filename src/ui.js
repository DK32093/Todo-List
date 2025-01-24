//import { createNewGroup, createNewTask } from "./functions.js"

function displayGroupList(collection) {
    const groupDisplay = document.querySelector(".groupDisplay");
    const groups = collection.groupArray;
    groups.forEach(group => {
        const groupCard = document.createElement('div');
        groupCard.setAttribute("class", "groupCard");
        groupDisplay.append(groupCard)
        const title = document.createElement("h1");
        const subTitle = document.createElement("h2");
        title.textContent = group.groupTitle
        subTitle.textContent = group.subTitle
        groupCard.append(title, subTitle)
        const tasksList = group.tasksList
        tasksList.forEach(task => {
            const taskCard = document.createElement("h3");
            taskCard.innerText = task.innerText
            groupCard.append(taskCard)
        })
        groupDisplay.append(groupCard)
    });
}

export { displayGroupList }