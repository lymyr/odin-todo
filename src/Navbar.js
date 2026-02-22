import { removeClass } from "./helpers.js";
import { ProjList } from "./Lists.js";
import { renderTasks } from "./Tasks.js";
import { closePopup } from "./TasksBar.js";

const navbar = document.querySelector("#sidebar-section-container");
const tasks = navbar.querySelectorAll("section:nth-child(1) button");
const addProjBtn = document.querySelector("#add-proj-btn");
let projects = getProjects();
const editProjBtn = document.querySelector(".project-header-edit button");
editProjects(editProjBtn);

function newProj() {
    const projs = ProjList.get().map(list => {return list.title});
    let projLength = projs.length + 1;
    while (projs.indexOf(`Project ${projLength}`) != -1) projLength += 1;
    return prompt("Enter new project title", `Project ${projLength}`);
}

addProjBtn.addEventListener("click", () => {
    let newProjTitle = newProj();
    newProjTitle = newProjTitle.charAt(0).toUpperCase() + newProjTitle.slice(1);

    editProjBtn.textContent = "Edit";
    if (newProjTitle != null && newProjTitle != "") {
        ProjList.add(newProjTitle);
        removeRenderedProjs();
        projects = getProjects();
        addBtnSelected(projects);
        addClosePopup(projects);
    
        projects.forEach(proj => {
            if (proj.textContent == newProjTitle) proj.click();
        });
    }
});

function editProjects(elem) {
    elem.addEventListener("click", () => {
        if (elem.textContent == "Edit") {
            removeRenderedProjs();
            renderProjAsInp();
            elem.textContent = "Save";
        }
        else {
            elem.textContent = "Edit";
            const newProjTitles = [];
            getRenderedProjects().forEach((proj) => newProjTitles.push(proj.querySelector("input").value));
            ProjList.renameProjs(newProjTitles);
            removeRenderedProjs();
            projects = getProjects();
            addBtnSelected(projects);
            addClosePopup(projects);
            projects[0].click();
        }
    });
}

function renderProjAsInp() {
    ProjList.get().forEach((proj) => {
        const inputButton = document.createElement("div");
        inputButton.setAttribute("class", "proj-input-button");
        const defaultProj = document.createElement("input");
        const delBtn = document.createElement("button");
        addDeleteProject(delBtn, proj);
        defaultProj.value = proj.title;
        delBtn.textContent = "🗑️";
        inputButton.appendChild(defaultProj);
        inputButton.appendChild(delBtn);
        document.querySelector("#project-list").
        insertBefore(inputButton, addProjBtn);
    });
}

function addDeleteProject(elem, proj) {
    elem.addEventListener("click", () => {
        ProjList.del(proj);
        removeRenderedProjs();
        renderProjAsInp();
    });
}
function getRenderedProjects() {
    return document.querySelectorAll("#project-list > *:not(:last-child)")
}

function getProjects() {
    ProjList.get().forEach((proj) => {
        const defaultProj = document.createElement("button");
        defaultProj.textContent = proj.title;
        document.querySelector("#project-list").
        insertBefore(defaultProj, addProjBtn);
    });

    return getRenderedProjects();
}

function addBtnSelected(btnList) {
    btnList.forEach(btn => {
        btn.addEventListener("click", () => {
            removeClass(btnList, "selected");
            btn.setAttribute("class", "selected");
            const selectedTask = document.querySelector("section:first-child div > button.selected");
            const selectedProj = document.querySelector("#project-list > .selected");

            const projHeader = document.querySelector(".proj-header");
            projHeader.textContent = selectedProj.textContent;

            const taskHeader = document.querySelector(".task-header");
            taskHeader.textContent = selectedTask.textContent;

            renderTasks();
        });
    });
};

function addClosePopup(btnList) {
    btnList.forEach(btn => {
        btn.addEventListener("click", closePopup);
    });
}

function removeRenderedProjs() {
    const projectsList = document.querySelector("#project-list");
    getRenderedProjects().forEach((proj) => {
        projectsList.removeChild(proj);
    });
}

export {navbar, addBtnSelected, projects, tasks }