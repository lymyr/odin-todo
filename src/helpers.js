import { compareAsc, format } from "date-fns";

function removeClass(elements, className) {
    elements.forEach(element => {
        element.classList.remove(className)
    });
};

class ListSorter {
    static priority(list) {
        list.sort((a) => a.priority != true);
    }
    static dueDate(list) {
        list.sort((a, b) => {
            if (a.dueDate == b.dueDate) return 0;
            else if (a.dueDate == "") return 1;
            else if (b.dueDate == "") return -1;
            else return compareAsc(a.dueDate, b.dueDate);
        });
    }

    static urgent(list) {
        list.sort((a, b) => {
            if (a.priority == b.priority) return 0;
            else if (a.priority == true) return 1;
            else -1
        });
    }

    static projTitle(list) {
        list.sort((a, b) => {
            if (a.title > b.title) return 1
            else -1
        });
    }
}

class ListHelper {
    static addFuncToDoList(ToDoList) {
        ToDoList.add = function(todo) { 
            if (!ListHelper.isTitleEmpty(todo.title)) ToDoList.list.push(todo);
        }
        ToDoList.del = function(todo) { ToDoList.list.splice(ToDoList.list.indexOf(todo), 1); }
        ToDoList.get = function() {
            ListSorter.dueDate(ToDoList.list);
            return ToDoList.list;
        }
        ToDoList.getToday = function() {
            const currentTasks = [];
            const currentDate = new Date();
            ToDoList.list.forEach(task => {
                if (task.dueDate != "") {
                    if (format(task.dueDate, "yyyy-LL-dd") == format(currentDate, "yyyy-LL-dd")) currentTasks.push(task);
                }
            });
            return currentTasks;
        }
        ToDoList.getUrgent = function() {
            const urgentTasks = [];
            ToDoList.list.forEach(task => {
                if (task.priority) urgentTasks.push(task);
            });
            return urgentTasks;
        }
        ToDoList.update = function(title, desc, due, prio, todoID) {
            for (let i = 0; i < ToDoList.list.length; i++) {
                if (ToDoList.list[i].id == todoID && !ListHelper.isTitleEmpty(title)) {
                    ToDoList.list[i].title = title;
                    ToDoList.list[i].description = desc;
                    ToDoList.list[i].dueDate = due;
                    ToDoList.list[i].priority = prio;
                    break;
                }
            }
        }
        return ToDoList
    }

    static parse(ProjectList) {
        ProjectList = JSON.parse(ProjectList);
        ProjectList.forEach(proj => {
            ListHelper.addFuncToDoList(proj.tasks);
            proj.tasks.list.forEach(task => {
                if (task.dueDate != "") task.dueDate = new Date(task.dueDate);
            });
        });
        return ProjectList;
    }
    static store(ProjectList) {
        ProjectList.forEach(proj => {
            proj.tasks.list.forEach(task => {
                if (task.dueDate != "") task.dueDate = format(task.dueDate, "yyyy-LL-dd");
            });
        });
        localStorage.ProjectList = JSON.stringify(ProjectList);
    }

    static isTitleEmpty(title) {
        if (title == "") {
            alert("Title can't be empty");
            return true;
        }
        else return false
    }

    // placeholder for validation if ever
    static validateProjectTitle(title, projList, rename=false) {
        let create = true;
        if (rename) {
            const inputArr = title; // readability purposes when input is an array of titles
            inputArr.forEach((inp, index) => {
                if (ListHelper.isTitleEmpty(inp)) { create = false; }
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
        else if (ListHelper.isTitleEmpty(title)) { create = false; } 
        else {
            projList.forEach((proj) => {
                if (proj.title == title) {
                    alert(`"${title}" already exists`);
                    create = false;
                }
            });
        }
        return create
    }
}

export { ListHelper, ListSorter, removeClass }