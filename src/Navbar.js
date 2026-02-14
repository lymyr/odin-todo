import { removeClass } from "./helpers.js";
import { ProjList } from "./Lists.js";
import { renderTasks } from "./Tasks.js";

const navbar = document.querySelector("#sidebar-section-container");
const tasks = navbar.querySelectorAll("section:nth-child(1) button");
const addProj = document.querySelector("#add-proj-btn");
let projects = getProjects();

function printTxt(nodeL) {
    console.log("Printing node list:")
    nodeL.forEach(n => console.log(n.textContent));
}

function getProjects() {
    ProjList.get().forEach((proj) => {
        const defaultProj = document.createElement("button");
        defaultProj.textContent = proj.title;
        document.querySelector("#project-list").
        insertBefore(defaultProj, addProj);
    });
    const newproj = document.querySelectorAll("#project-list > *:not(:last-child)")
    // printTxt(newproj);
    return newproj;
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
        })
    })
};

addProj.addEventListener("click", () => {
    const newProjTitle = prompt("Enter new project title", `Default Project ${ProjList.get().length + 1}`);
    if (newProjTitle != null && newProjTitle != "") {
        ProjList.add(newProjTitle);
        console.log(ProjList.get());
        removeRenderedProjs();
        projects = getProjects();
        addBtnSelected(projects);

        projects.forEach(proj => {
            if (proj.textContent == newProjTitle) proj.click();
        });
    }
});

function removeRenderedProjs() {
    const projectsList = document.querySelector("#project-list");
    projects.forEach((proj) => {
        projectsList.removeChild(proj);
    });
}

export {navbar, addBtnSelected, projects, tasks }