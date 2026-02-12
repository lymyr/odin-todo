import { openPopup } from "./TasksBar.js";

const taskList = document.querySelector('.task-list');
const newTaskBtn = taskList.querySelector("button");

newTaskBtn.addEventListener("click", () => {
    openPopup();
});

export { taskList }