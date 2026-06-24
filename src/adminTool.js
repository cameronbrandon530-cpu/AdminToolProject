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
        } else { 
        for(let t of this.tasks){
            if(t.taskId === taskId){
                t.status = newStatus;
                }
            }
        }
    }

    removeTask(taskId){
        this.tasks = this.tasks.filter(t => t.taskId !== taskId);
    }

    filterTasksByStatus(status){
        let tasksByStatus = this.tasks.filter(task => task.status === status);
        if(tasksByStatus.length === 0){
            console.log(`No Tasks in status ${status} can be found`);
        } else {    
        return tasksByStatus;
        }
    }

    filterTasksByPriority(priority){
        let tasksByPriority = this.tasks.filter(t => t.priority === priority);
        if(tasksByPriority.length === 0){
            console.log(`No ${priority} priority tasks can be found`);
        } else {
        return tasksByPriority;
        }
    }

    searchByPartialTitle(input){
        let matches = this.tasks.filter(t => t.title.toLowerCase().includes(input.toLowerCase()));
        if(matches.length === 0){
            console.log(`No task containing ${input} can be found.`);
        } else {
            console.log(matches.length + " matche/s found");
            return matches;
        }
    }

    sortByPriority(){
        let sortedTasks = [...this.tasks].sort((a, b) => VALID_PRIORITIES.indexOf(a.priority) - VALID_PRIORITIES.indexOf(b.priority));
        return sortedTasks;
    }

}


let tool = new AdminTool();
tool.addTask('Fix bug', 'High');
tool.addTask('new task', 'Low');
console.log(tool.sortByPriority());

