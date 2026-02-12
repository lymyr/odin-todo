import './styles.css';
import { ToDo } from "./ToDo.js";
import { navbar, addBtnSelected, projects, tasks } from './Navbar.js';
import { closePopup, openPopup, appendTaskDeets } from './TasksBar.js';
import { taskList } from './Tasks.js';

// set initial stuffs to avoid errors
function initialLoad() {
    tasks[0].setAttribute("class", "selected");
    projects[0].setAttribute("class", "selected");
    tasks[0].click();
    projects[0].click();
}

appendTaskDeets();
function appendProjDeets() {

}
openPopup()
addBtnSelected(tasks);
addBtnSelected(projects);
initialLoad();