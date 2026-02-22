import { ListHelper, ListSorter } from "./helpers.js";
import { ToDo } from "./ToDo.js";
import { addDays } from "date-fns";

class ToDoList {
    constructor() {
        this.list = [];
        this.id = crypto.randomUUID();
    }
}

const ProjList = (() => {
    let list;
    if (localStorage.ProjectList) {
        list = ListHelper.parse(localStorage.ProjectList)
    } 
    else {
        list = [
            {
                title: "Default Project",
                tasks: ListHelper.addFuncToDoList(new ToDoList()),
            }
        ];

        // demo purposes
        list[0].tasks.add(new ToDo("Buy Birthday Card", "Pick up a funny card for friend’s birthday party this weekend.", "", false));
        list[0].tasks.add(new ToDo("Check the description", "Calculate how many days between today and the due date of this task", addDays(new Date(), 67), false));
        list[0].tasks.add(new ToDo("WATCH ONE PIECE", "The best anime/manga series of all time.", new Date(), true));
        list[0].tasks.add(new ToDo("Do homework", "No more lazy lazy", addDays(new Date(), 3), true));
    }

    const add = (projTitle) => {
        projTitle = projTitle.charAt(0).toUpperCase() + projTitle.slice(1);
        let create = validateTitle(projTitle);
        if (create) {
            list.push({
                title: projTitle, 
                tasks: ListHelper.addFuncToDoList(new ToDoList())
            });
            ListSorter.projTitle(list);
            ListHelper.store(list);
        }
    }

    const del = (proj) => {
        if (list.length > 1) {
            list.splice(list.indexOf(proj), 1);
            ListHelper.store(list);
        }
        else alert("Delete Failed: Must have at least one project");
    }
    
    const get = () => {
        return list
    }

    const getCurrentIndex = () => {
        const selectedProj = document.querySelector(".proj-header");
        const listProj = ProjList.get();
        for (let i = 0; i < listProj.length; i++) {
            if (listProj[i].title == selectedProj.textContent) return i
        }
    }

    const addToDo = (todo) => {
        list[getCurrentIndex()].tasks.add(todo);
        ListHelper.store(list);
    }

    const getTasks = () => {
        console.log(list)
        return list[getCurrentIndex()].tasks.get();
    }

    const getCurrentTasks = () => {
        return list[getCurrentIndex()].tasks.getToday();
    }

    const getUrgentTasks = () => {
        return list[getCurrentIndex()].tasks.getUrgent();
    }

    const deleteTask = (todo) => {
        list[getCurrentIndex()].tasks.del(todo);
        ListHelper.store(list);
    }

    const updateTask = (title, desc, due, prio, id) => {
        list[getCurrentIndex()].tasks.update(title, desc, due, prio, id);
        ListHelper.store(list);
    }

    const renameProjs = (inputArr) => {
        let create = validateTitle(inputArr, true);
        if (create) {
            list.map((proj, index) => {
                proj.title = inputArr[index];
            });
            ListHelper.store(list);
        }
    }

    // placeholder for validation if ever
    function validateTitle(title, rename=false) {
        let create = true;
        if (rename) {
            const inputArr = title;
            inputArr.forEach((inp, index) => {
                if (inp == "") {
                    create = false;
                    alert("Title can't be empty");
                } 
                else {
                    for (let i = index + 1; i < inputArr.length; i++) {
                        if (inp == inputArr[i]) {
                            create = false;
                            alert(`"${inputArr[i]}" already exists`);
                        }
                    }
                }
            });
        }
        else if (title == "" || title == null) {
            create = false;
            alert("Title can't be empty");
        } else {
            list.forEach((proj) => {
                if (proj.title == title) {
                    alert(`"${title}" already exists`);
                    create = false;
                }
            });
        }
        
        return create
    }

    return { add, del, get, addToDo,
        getTasks, getCurrentTasks, getUrgentTasks,
        deleteTask, updateTask, renameProjs }
})();

export {ProjList, ToDoList}