import { compareAsc, format } from "date-fns";

class ToDoList {
    constructor() {
        this.list = [];
        this.id = crypto.randomUUID();
    }
    
    add(todo) { 
        if (this.validateToDo(todo)) {
            this.list.push(todo);
            this.sortPrio();
        };
     }
    del(todo) { this.list.splice(this.list.indexOf(todo), 1); }
    get() {
        this.sortDueDate()
        return this.list;
    }

    getToday() {
        const currentTasks = [];
        const currentDate = new Date();
        this.list.forEach(task => {
            if (task.dueDate != "") {
                if (format(task.dueDate, "yyyy-LL-dd") == format(currentDate, "yyyy-LL-dd")) currentTasks.push(task);
            }
        });
        return currentTasks;
    }

    getUrgent() {
        const urgentTasks = [];
        this.list.forEach(task => {
            if (task.priority) urgentTasks.push(task);
        });
        return urgentTasks;
    }

    update(title, desc, due, prio, todoID) {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].id == todoID && this.validateTitle(title)) {
                this.list[i].title = title;
                this.list[i].description = desc;
                this.list[i].dueDate = due;
                this.list[i].priority = prio;
                this.sortPrio();
                break;
            }
        }
    }

    sortPrio() {
        this.list.sort((a) => a.priority != "Urgent");
    }

    sortDueDate() {
        this.list.sort((a, b) => {
            if (a.dueDate == b.dueDate) return 0;
            else if (a.dueDate == "") return 1;
            else if (b.dueDate == "") return -1;
            else return compareAsc(a.dueDate, b.dueDate);
        });
    }
    
    sortUrgent() {
        this.list.sort((a, b) => {
            if (a.priority == b.priority) this.sortDueDateAsc();
            else if (a.priority == true) return true;
            else false
        });
        this.sortPrio();
    }

    // placeholder for validation if ever
    validateToDo(todo) {
        let create = true;
        create = this.validateTitle(todo.title);
        return create;
    }
    validateTitle(title) {
        if (title == "" || title == null) {
            alert("Task title can't be empty");
            return false
        }
        else return true
    }
}

const ProjList = (() => {
    const list = [
        {
            title: "Default Project",
            tasks: new ToDoList(),
        }
    ];

    const add = (projTitle) => {
        let create = validateTitle(projTitle);
        if (create) {
            list.push({
                title: projTitle, 
                tasks: new ToDoList()
            });
        }
    }

    const del = (proj) => {
        if (list.length > 1) list.splice(list.indexOf(proj), 1);
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
    }

    const getTasks = () => {
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
    }

    const updateTask = (title, desc, due, prio, id) => {
        list[getCurrentIndex()].tasks.update(title, desc, due, prio, id);
    }

    const renameProjs = (inputArr) => {
        let create = validateTitle(inputArr, true);
        if (create) {
            list.map((proj, index) => {
                proj.title = inputArr[index];
            });
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