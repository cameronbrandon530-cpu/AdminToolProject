const VALID_STATUSES = ['To Do', 'In Progress', 'Completed'];
const VALID_PRIORITIES = ['High', 'Medium', 'Low'];

class AdminTool{
    tasks = [];
    taskCounter = 0;
    createTask(title, priority){
        return {taskId: this.generateTaskId(), title: title, priority: priority, status: 'To Do', createdDate: new Date()};
        }
    
    generateTaskId(){
        this.taskCounter++;
        let taskId = "TA" + this.taskCounter.toString().padStart(3, '0');
        return taskId;       
    }
        
    addTask(title, priority){
        if(!VALID_PRIORITIES.includes(priority)){
            console.log(`invalid prioity: ${priority}. Must be one of: ${VALID_PRIORITIES.join(', ')}`);
            return;
        } else if (this.duplicateTitleCheck(title)){
            console.log("Title cannot be duplicate");
            return;
        } else {
        this.tasks.push(this.createTask(title, priority));    
        }
    }    
    listAllTasks(){
        console.log("Number of Tasks: " + this.taskCounter);
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
    changeStatus(taskId, newStatus){
        if(!VALID_STATUSES.includes(newStatus)){
            console.log(`invalid status: ${newStatus}. must be one of: ${VALID_STATUSES.join(', ')}`);
            return;
        }
        for(let t of this.tasks){
            if(t.title === title){
                t.status = newStatus;
            }
        }
    }
    removeTask(taskId){
        this.tasks = this.tasks.filter(t => t.taskId !== taskId);
    }

    duplicateTitleCheck(newTitle){
        for(let t of this.tasks){
            if(t.title === newTitle){
                return true;
            }
        }
        return false;
    }
}


let tool = new AdminTool();
tool.addTask('Fix bug', 'High');
console.log(tool.listAllTasks());