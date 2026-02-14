import { compareAsc, compareDesc } from "date-fns";

class ToDoList {
    constructor() {
        this.list = [];
        this.id = crypto.randomUUID();
    }
    
    add(todo) { this.list.push(todo); }
    del(todo) { this.list.splice(list.indexOf(todo), 1); }
    get(sort=1) {
        if (sort) {this.sortDueDateAsc(); console.log("asc was used")}
        else {this.sortDueDateDesc(); console.log("desc was used")}
        return this.list;
    }

    sortPrio() {
        this.list.sort((a) => a.priority != "Urgent");
    }

    sortDueDateAsc() {
        this.sortPrio();
        this.list.sort((a, b) => {
            // console.log(`comparing ${a.dueDate} and ${b.dueDate}`);
            return compareAsc(a.dueDate, b.dueDate)
        });
    }
    sortDueDateDesc() {
        this.sortPrio();
        this.list.sort((a, b) => {
            // console.log(`comparing ${a.dueDate} and ${b.dueDate}`);
            return compareDesc(a.dueDate, b.dueDate)
        });
    }
}

const ProjList = (() => {
    const list = [
        {
            title: "Default Project",
            tasks: new ToDoList(),
        }
    ];

    const sortAsc = () => {
        list.sort()
    };

    const sortDesc = () => {
        list.sort((a, b) => a < b)
    };

    const add = (projTitle) => {
        let create = true;
        list.forEach((proj) => {
            if (proj.title == projTitle) {
                alert(`"${projTitle}" already exists`);
                create = false;
            }
        });
        if (create) {
            list.push({
                title: projTitle, 
                tasks: new ToDoList()
            });
        }
    }

    const del = (title) => {
        list.splice(list.indexOf(title), 1);
    }
    
    const get = () => {
        return list
    }

    const getCurrentIndex = () => {
        const selectedProj = document.querySelector("#project-list > .selected");
        const listProj = ProjList.get();
        for (let i = 0; i < listProj.length; i++) {
            if (listProj[i].title == selectedProj.textContent) return i
        }
    }

    const addToDo = (todo) => {
        list[getCurrentIndex()].tasks.add(todo);
    }

    const getTasks = () => {
        return list[getCurrentIndex()].tasks.get()
    }

    return { sortAsc, sortDesc, add, del, get, addToDo, getTasks }
})();

export {ProjList, ToDoList}