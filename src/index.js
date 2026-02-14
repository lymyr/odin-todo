import './styles.css';
import { addBtnSelected, projects, tasks } from './Navbar.js';
import { openPopup, appendTaskDeets } from './TasksBar.js';

// set initial stuffs to avoid errors
function initialLoad() {
    tasks[0].setAttribute("class", "selected");
    projects[0].setAttribute("class", "selected");
    tasks[0].click();
    projects[0].click();
}

appendTaskDeets();
openPopup()
addBtnSelected(tasks);
addBtnSelected(projects);
initialLoad();