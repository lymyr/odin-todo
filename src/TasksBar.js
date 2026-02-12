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

close.addEventListener("click", () => {
    closePopup();
});

export {openPopup, closePopup, appendTaskDeets}