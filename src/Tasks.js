import { openPopup, clearFormDetails, closePopup } from "./TasksBar.js";
import { ProjList } from "./Lists.js";
import { format } from "date-fns";

const taskList = document.querySelector('.task-list');
const newTaskBtn = taskList.querySelector("button");
const tbody = document.querySelector("tbody");

newTaskBtn.addEventListener("click", () => {
    openPopup();
    clearFormDetails();
    document.querySelector("form")[0].focus();
});

function loadTasks(getType) {
    let listProj = undefined;
    if (getType == "Today") listProj = ProjList.getCurrentTasks();
    else if (getType == "Urgent") listProj = ProjList.getUrgentTasks();
    else listProj = ProjList.getTasks();
    if (listProj.length > 0) {
        listProj.forEach(task => {
            const taskRow = document.createElement("tr")
            addViewTask(taskRow, task);

            const taskTitle = document.createElement("td");
            taskTitle.textContent = task.title;
            
            const taskDate = document.createElement("td");
            if (task.dueDate == "") taskDate.textContent = "N/A";
            else taskDate.textContent = format(task.dueDate, "iiii, LLLL d, y");
            taskDate.setAttribute("style", "text-align: center");
            
            const checkContainer = document.createElement("td");
            const check = document.createElement("input");
            checkContainer.appendChild(check);
            check.setAttribute("type", "checkbox");
            addCheckboxInteraction(check, task);
            
            taskRow.appendChild(taskTitle);
            taskRow.appendChild(taskDate);
            taskRow.appendChild(checkContainer);

            if (task.priority) taskRow.setAttribute("class", "urgent");
            tbody.appendChild(taskRow);
        });
    } else {
        const taskRow = document.createElement("tr")
        const taskTitle = document.createElement("td");
        taskTitle.textContent = "Empty";
        taskTitle.setAttribute("colspan", 3);
        taskTitle.setAttribute("style", "text-align: center; font-size: 0.9rem; letter-spacing:1px")
        
        taskRow.appendChild(taskTitle);
        tbody.appendChild(taskRow);
    }
}

function removeRenderedTasks() {
    tbody.innerHTML = "";
}

function renderTasks() {
    removeRenderedTasks();
    loadTasks(document.querySelector("section:nth-child(1) .selected").textContent);
}

function addCheckboxInteraction(inp, task) {
    inp.addEventListener("click", (e) => {
        ProjList.deleteTask(task);
        renderTasks();
        e.stopPropagation()
        closePopup();
    });

    inp.addEventListener("mouseover", () => {
        inp.checked = true;
    });
    inp.addEventListener("mouseout", () => {
        inp.checked = false;
    });
}

function addViewTask(elem, task) {
    elem.addEventListener("click", () => {
        const form = document.querySelector("form");
        form.title.value = task.title;
        form.description.value = task.description;

        if (task.dueDate == "") form['due-date'].value = null;
        else form['due-date'].value = format(task.dueDate, "yyyy-LL-dd");

        form.priority.checked = task.priority;
        form.id = task.id;

        openPopup();
    });
}

export { taskList, renderTasks }