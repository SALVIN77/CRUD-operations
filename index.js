const express = require("express");
const morgan = require("morgan");

const app = new express();
app.use(morgan('dev'));

app.use(express.json());

//in memory storage for task
let tasks = [];
//route to get all tasks
app.get('/',(req,res)=>{
    res.json(tasks);
})

//route to create new task
app.post('/tasks',(req,res)=>{
    tasks.push(req.body);
    res.send({message:"Task added",tasks})
})

//route to get a task
app.get('/tasks/:id',(req,res)=>{
    const id = req.params.id;
    const task = tasks.find(task=>task.id===id);
    if(!tasks){
        res.send("Task ot found")
    }else{
        res.json(task)
    }
})

app.put('/tasks/:id',(req,res)=>{
    const id = req.params.id;
    const updatedTask = req.body;
    const index = tasks.findIndex((task)=>task.id===id);
    if(index===-1){
        res.send("Task not found")
    }else{
        tasks.splice(index,1,updatedTask);
        res.json(tasks)
}
})

app.delete('/tasks/:id',(req,res)=>{
    const id = req.params.id;
    const deletetask = req.body;
    const index = tasks.findIndex((task)=>task.id===id);
    if(index===-1){
        res.send("Task not found")
    }else{
        tasks.splice(index,1);
        res.json(tasks)
}
})

app.listen(3005,(req,res)=>{
    console.log("port is up")
})
