import './styles.css';
import { addBtnSelected, projects, tasks } from './Navbar.js';
import { ToDo } from './ToDo.js';
import { ProjList } from './Lists.js';
import { addDays } from 'date-fns';

// set initial stuffs to avoid errors
function initialLoad() {
    tasks[0].setAttribute("class", "selected");
    projects[0].setAttribute("class", "selected");
    tasks[0].click();
    projects[0].click();
}

addBtnSelected(tasks);
addBtnSelected(projects);
initialLoad();

// for demo purposes
ProjList.addToDo(new ToDo("Buy Birthday Card", "Pick up a funny card for friend’s birthday party this weekend.", "", false));
ProjList.addToDo(new ToDo("Check the description", "Calculate how many days between today and the due date of this task", addDays(new Date(), 67), false));
ProjList.addToDo(new ToDo("WATCH ONE PIECE", "The best anime/manga series of all time.", new Date(), true));
ProjList.addToDo(new ToDo("Do homework", "No more lazy lazy", addDays(new Date(), 3), true));
initialLoad();