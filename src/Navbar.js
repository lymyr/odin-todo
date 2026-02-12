import { removeClass } from "./helpers.js";

const navbar = document.querySelector("#sidebar-section-container");
const tasks = navbar.querySelectorAll("section:nth-child(1) button");
const projects = getProjects();

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

// function addProject() {
//     const btn = navbar.
// }

export {navbar, addBtnSelected, projects, tasks}