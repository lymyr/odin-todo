import { ToDoList, ProjList } from "./Lists.js";

class ToDo {
    constructor(title, description, dueDate, priority=false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.complete = false;
        this.id = crypto.randomUUID();
    }
};
// const newList = new ToDoList();
// newList.add(new ToDo("1", "Random desc", new Date("2021-01-01"), "Urgent"));
// newList.add(new ToDo("3", "Random desc", new Date("2023-01-01"), "Urgent"));
// newList.add(new ToDo("2", "Random desc", new Date("2022-01-01"), "Urgent"));

export {ToDo, ToDoList, ProjList}