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
    const list = [];

    const sortAsc = () => {
        list.sort()
    };

    const sortDesc = () => {
        list.sort((a, b) => a < b)
    };

    const add = (title) => {
        if (!list.includes(title)) list.push(title);
        else console.log(`"${title}" already exists`);
    }

    const del = (title) => {
        list.splice(list.indexOf(title), 1);
    }
    
    const get = () => {
        return list
    }
    return { sortAsc, sortDesc, add, del, get }
})();

export {ProjList, ToDoList}