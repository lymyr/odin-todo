import { openPopup } from "./TasksBar.js";
import { ProjList } from "./Lists.js";
import { format } from "date-fns";

const taskList = document.querySelector('.task-list');
const newTaskBtn = taskList.querySelector("button");
const tbody = document.querySelector("tbody");

newTaskBtn.addEventListener("click", () => {
    openPopup();
    renderTasks();
});

function loadTasks() {
    const listProj = ProjList.getTasks();
    if (listProj.length > 0) {
        listProj.forEach(task => {
            const taskRow = document.createElement("tr")
        
            const taskTitle = document.createElement("td");
            taskTitle.textContent = task.title;
            
            const taskDate = document.createElement("td");
            taskDate.textContent = format(task.dueDate, "iiii, LLLL d, y");

            const checkContainer = document.createElement("td");
            const check = document.createElement("input");
            checkContainer.appendChild(check);
            check.setAttribute("type", "checkbox");
            
            taskRow.appendChild(taskTitle);
            taskRow.appendChild(taskDate);
            taskRow.appendChild(checkContainer);
            tbody.appendChild(taskRow);
        });
    } else {
        const taskRow = document.createElement("tr")
        const taskTitle = document.createElement("td");
        taskTitle.textContent = "Empty Task";
        taskTitle.setAttribute("colspan", 3);
        taskTitle.setAttribute("style", "text-align: center")
        
        taskRow.appendChild(taskTitle);
        tbody.appendChild(taskRow);
    }
}

function removeRenderedTasks() {
    tbody.innerHTML = "";
}

function renderTasks() {
    removeRenderedTasks();
    loadTasks();
}

export { taskList, renderTasks }