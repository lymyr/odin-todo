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

export { ToDo }