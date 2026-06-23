const VALID_STATUSES = ['To Do', 'In Progress', 'Completed'];
const VALID_PRIORITIES = ['High', 'Medium', 'Low'];

class AdminTool{
    tasks = [];
    createTask(title, priority){
        return{title: title, priority: priority, status: 'To Do', createdDate: new Date()};
    }
    addTask(title, priority){
        if(!VALID_PRIORITIES.includes(priority)){
            console.log(`invalid prioity: ${priority}. Must be one of: ${VALID_PRIORITIES.join(', ')}`);
            return;
        }
        this.tasks.push(this.createTask(title, priority));
    }
    listAllTasks(){
        return this.tasks;
    }
    listIncompleteTasks(){
        let inCompleteTasks = [];
        for(let t of this.tasks){
            if(t.status !== 'Completed'){
                inCompleteTasks.push(t);
            }
        }
        return inCompleteTasks;
    }
    countTasksByStatus(){
        let amountIncomplete = this.listIncompleteTasks().length;
        let amountCompleted = this.tasks.length - amountIncomplete;
        return { incomplete: amountIncomplete, completed: amountCompleted };
    }
    changeStatus(title, newStatus){
        if(!VALID_STATUSES.includes(newStatus)){
            alert(`invalide status: ${newStatus}. must be one of: ${VALID_STATUSES.join(', ')}`);
            return;
        }
        for(let t of this.tasks){
            if(t.title === title){
                t.status = newStatus;
            }
        }
    }
    removeTask(title){
        this.tasks = this.tasks.filter(t => t.title !== title);
    }
    completeTask(title){
        this.changeStatus(title, 'Completed');
    }

}


let tool = new AdminTool();
tool.addTask('Fix bug', 'High');
tool.addTask('Write docs', 'Low');
tool.addTask('Deploy feature', 'today');
console.log('All tasks:', tool.listAllTasks());
tool.completeTask('Fix bug');
console.log('Incomplete:', tool.listIncompleteTasks());
console.log('Counts:', tool.countTasksByStatus());
tool.removeTask('Write docs');
console.log('After remove:', tool.listAllTasks());