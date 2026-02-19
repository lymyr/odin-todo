import { format } from "date-fns";
import { renderTasks } from "./Tasks.js";
import { ToDo } from "./ToDo.js";
import { ProjList } from "./Lists.js";

const popup = document.querySelector(".popout-deets");
const body = document.querySelector("body");
const close = document.querySelector(".close");

const subBtn = document.querySelector(".btn-group button:last-child");
subBtn.textContent = "Submit";
subBtn.addEventListener("click", (e) => {
    e.preventDefault();
    submitFormDetails();
    clearFormDetails();
    renderTasks();
    closePopup();
});

function openPopup() {
    body.setAttribute("style", "grid-template-columns: 240px minmax(300px, 2fr) 1fr");
    const bruh = popup.querySelector("#due-date");
    bruh.setAttribute("min", format(new Date(), "yyyy-LL-dd"));
    popup.setAttribute("style", "display: block");
}
function closePopup() {
    body.setAttribute("style", "grid-template-columns: 240px 1fr");
    popup.setAttribute("style", "");
    clearFormDetails();
}

function submitFormDetails() {
    const form = popup.querySelector("form");
    if (form.id != "") {
        ProjList.updateTask(
            form.title.value,
            form.description.value, 
            form['due-date'].value,
            form.priority.checked,
            form.id,
        )
    } 
    else {
        const todo = new ToDo(
            form.title.value,
            form.description.value, 
            form['due-date'].value,
            form.priority.checked,
        );
        ProjList.addToDo(todo);
    }
}

function clearFormDetails() {
    const form = popup.querySelector("form");
    form.title.value = null;
    form.description.value = null;
    form['due-date'].value = null;
    form.priority.checked = false;
    form.id = "";
}

close.addEventListener("click", () => {
    closePopup();
});



export { openPopup, closePopup, clearFormDetails }