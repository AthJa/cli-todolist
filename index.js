const fs = require("fs");
const path = require("path");

const tasksFilePath = path.join(__dirname, "tasks.json");

let id = 0;

//knknkjnkjn
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};

const command = process.argv.slice(2);
if (command[0] === "add") {
  addTask(command.slice(1).join(" "));
}
else if (command[0] === "update") {
  updateTask(parseInt(command[1]), command.slice(2).join(" "));
}
else if (command[0] === "delete") {
  deleteTask(parseInt(command[1]));
}
else if (command[0] === "mark-in-progress") {
  markTask(parseInt(command[1]),"in-progress");
}
else if (command[0] === "mark-done") {
  markTask(parseInt(command[1]),"done");
}
else if (command[0] === "list") {
  if(!command[1]){
    listTask(null);
  }
  else {
    listTask(command[1]);
  }
}
else {
  console.log(`${colors.red}Invalid Command.`);
  console.log(`Try using:add,update,delete,mark,list${colors.reset}`);
}


function writeTask(newTasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify(newTasks, null, 2));
}

function readTask() {
  let newTasks = []
  if (fs.existsSync(tasksFilePath)) {
    newTasks = JSON.parse(fs.readFileSync(tasksFilePath));
  }
  return newTasks;
}

function addTask(description) {
  let tasks = readTask();
  id=0;
  lastTask=tasks.slice(-1)[0];
  if(lastTask!==undefined){
    id=lastTask.id+1;
  }
  today=new Date();
  now=today.toLocaleString()
  let newTask = {
    id: id,
    description: description,
    status: "todo",
    createdAt: now,
    updatedAt: now
  };
  newTasks=[...tasks,newTask];
  writeTask(newTasks);
  console.log(`${colors.green}task added successfully${colors.reset}`);
}

function updateTask(id, description) {
  let tasks = readTask();
  changed = false;
  today=new Date();
  now=today.toLocaleString()
  newTasks = tasks.map((task) => {
    if (task.id === id) {
      changed = true;
      return {
        ...task,
        description: description,
        updatedAt:now
      }
    }
    return task;
  })

  if (!changed) {
    console.log(`${colors.red}No task with this id${colors.reset}`)
  }
  else {
    writeTask(newTasks);
    console.log(`${colors.green}updated successfully${colors.reset}`)
  }
}

function deleteTask(id){
  tasks=readTask();
  newTasks=tasks.filter((task)=>task.id!==id);
  writeTask(newTasks);
}

function markTask(id,status){
  let tasks = readTask();
  changed = false;
  newTasks = tasks.map((task) => {
    if (task.id === id) {
      changed = true;
      return {
        ...task,
        status: status
      }
    }
    return task;
  })
  
  if (!changed) {
    console.log(`${colors.red}No task with this id${colors.reset}`);
  }
  else {
    writeTask(newTasks);
    console.log(`${colors.green}marked as ${status}${colors.reset}`);
  }
  
}

function listTask(status){
  tasks=readTask();
  displayTasks=tasks;
  if(status){
    displayTasks=tasks.filter(t=>t.status===status);
    if(displayTasks.length===0){
      console.log(`${colors.red}No tasks found${colors.reset}`);
      return;
    }
  }
  // console.log(displayTasks)
  displayTasks.forEach((t)=>{
    console.log(`id:${t.id} status:${t.status} \n${t.description} \ncreated:${t.createdAt} \nupdated:${t.updatedAt}\n`);
  })
  return;
  
}