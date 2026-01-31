import './styles.css';
import { ToDo } from "./ToDo.js";


const tasks = document.querySelectorAll("section:first-child div > button");
const projects = getProjects();
const taskList = document.querySelector('.task-list');
const body = document.querySelector("body");
const popup = document.querySelector(".popout-deets");
const close = document.querySelector(".close");

function getProjects() {
    let projs = document.querySelectorAll("#project-list > *:not(:last-child)");
    if (projs.length == 0) {
        const defaultProj = document.createElement("button");
        defaultProj.textContent = "Default Project";
        document.querySelector("#project-list").
        insertBefore(defaultProj, document.querySelector("#add-proj-btn"));
        let newproj = document.querySelectorAll("#project-list > *:not(:last-child)")
        return newproj;
    }
    else return projs
}

// set initial stuffs to avoid errors
function initialLoad() {
    tasks[0].setAttribute("class", "selected");
    projects[0].setAttribute("class", "selected");
    tasks[0].click();
    projects[0].click();

    const newTaskBtn = document.createElement("button");
    newTaskBtn.textContent = "+ Add a New Task";
    newTaskBtn.addEventListener("click", () => {
        openPopup();
    });
    close.addEventListener("click", () => {
        closePopup();
    });

    taskList.appendChild(newTaskBtn);
}

function openPopup() {
    body.setAttribute("style", "grid-template-columns: 240px 1fr 1fr");
    popup.setAttribute("style", "display: block");
}
function closePopup() {
    body.setAttribute("style", "");
    popup.setAttribute("style", "");
}

function addBtnSelected(btnList) {
    btnList.forEach(btn => {
        btn.addEventListener("click", () => {
            removeClass(btnList, "selected");
            btn.setAttribute("class", "selected");
            const selectedTask = document.querySelector("section:first-child div > button.selected");
            const selectedProj = document.querySelector("#project-list > .selected:not(:last-child)");

            
            const headerContainer = document.querySelector(".header-container");

            const projHeader = document.createElement("header");
            projHeader.textContent = selectedProj.textContent;
            projHeader.setAttribute('class', 'proj-header');

            const taskHeader = document.createElement("header");
            taskHeader.textContent = selectedTask.textContent;
            taskHeader.setAttribute('class', 'task-header');
            
            headerContainer.innerHTML = "";
            headerContainer.appendChild(projHeader);
            headerContainer.appendChild(taskHeader);
        })
    })
};

function removeClass(elements, className) {
    elements.forEach(element => {
        element.classList.remove(className)
    });
};

// task form
function appendTaskDeets() {
    const form = document.createElement("form");
    form.setAttribute("class", "task-deets");
    const inputs = [
        {input: "input", id: "title"}, 
        {input: "textarea", id: "description"}, 
        {input: "input", id: "due-date"}
    ];

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    const subBtn = document.createElement("button");
    subBtn.textContent = "Submit";
    const btnGroup = document.createElement("div");
    btnGroup.setAttribute("class", "btn-group");
    btnGroup.append(delBtn, subBtn);

    inputs.forEach(inp => {
        const label = document.createElement("label");
        const input = document.createElement(inp.input);
        label.setAttribute("for", inp.id);
        input.setAttribute("id", inp.id);

        const inputGroup = document.createElement("div");
        inputGroup.setAttribute("class", "label-input");

        inputGroup.append(label, input);
        form.appendChild(inputGroup);
    });
    form.appendChild(btnGroup);

    popup.appendChild(form);
}

appendTaskDeets();
// project form
function appendProjDeets() {

}

addBtnSelected(tasks);
addBtnSelected(projects);
initialLoad();
openPopup();