import { ToDo, ToDoList } from "./ToDo.js";

const popup = document.querySelector(".popout-deets");
const body = document.querySelector("body");
const close = document.querySelector(".close");

function openPopup() {
    body.setAttribute("style", "grid-template-columns: 240px 1fr 1fr");
    popup.setAttribute("style", "display: block");
}
function closePopup() {
    body.setAttribute("style", "");
    popup.setAttribute("style", "");
}

function appendTaskDeets() {
    const form = document.createElement("form");
    form.setAttribute("class", "task-deets");
    
    getFormInpGrps().forEach((inpGrp) => {
        form.appendChild(inpGrp)
    })

    popup.appendChild(form);
    form.appendChild(getFormBtnGroup());
}

function getFormInpGrps() {
    const inputs = [
        {input: "input", id: "title", placeholder: "Do homework"}, 
        {input: "textarea", id: "description", placeholder: "Science module 3, exercises 5 and 6"}, 
        {input: "input", id: "due-date", type:"date"},
    ];

    const inputList = []
    inputs.forEach(inp => {
        const label = document.createElement("label");
        const input = document.createElement(inp.input);
        label.textContent = inp.id.charAt(0).toLocaleUpperCase() + inp.id.slice(1, inp.id.length)
        label.setAttribute("for", inp.id);
        input.setAttribute("id", inp.id);
        input.setAttribute("name", inp.id);

        if ("type" in inp) {
            input.setAttribute("type", inp.type)
        }
        if ("placeholder" in inp) {
            input.setAttribute("placeholder", inp.placeholder)
        }

        const inputGroup = document.createElement("div");
        inputGroup.setAttribute("class", "label-input");

        inputGroup.append(label, input);
        inputList.push(inputGroup);
    });

    return inputList
}

function getFormBtnGroup() {
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";

    const subBtn = document.createElement("button");
    subBtn.textContent = "Submit";
    subBtn.addEventListener("click", (e) => {
        e.preventDefault();

        submitFormDetails();
    });

    const btnGroup = document.createElement("div");
    btnGroup.setAttribute("class", "btn-group");
    btnGroup.append(delBtn, subBtn);

    return btnGroup
}

function submitFormDetails() {
    const form = popup.querySelector("form");
    const todo = new ToDo(
        form.title.value,
        form.description.value, 
        form['due-date'].value,
    );
    console.log(todo);
}

close.addEventListener("click", () => {
    closePopup();
});



export {openPopup, closePopup, appendTaskDeets}