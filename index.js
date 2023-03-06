// const express = require('express');
// const app = express();
// const port = 3000;
// const path = require('path');
// const mongoose = require('mongoose');
// const task = require('./models/taskmodel');
// const methodOverride = require('method-override')

// // Mongoose Connection

// mongoose.connect('mongodb://127.0.0.1:27017/todo', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log("MONGO CONNECTION OPEN!!!")
//     })
//     .catch(err => {
//         console.log("OH NO MONGO CONNECTION ERROR!!!!")
//         console.log(err)
//     })

// // Middlewares

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'));

// // Route for displaying all tasks

// app.get('/tasks', async (req, res) => {
//     const ftask = await task.find()
//     res.render('tasks/index', {tasks:ftask})
// })

// // Route for displaying particular task

// app.get('/tasks',async(req,res)=>{
//     const tasks = await task.find()
//     res.render('tasks/show',{tasks})
// })

// // Route for displaying a task by id
// app.get('/tasks/:id', async (req, res) => {
//     const { id } = req.params;
//     const newtask = await task.findById(id)
//     res.render('tasks/show', { task:newtask })
// })

// // Route for adding new task in todo app

// app.get('/tasks/add', (req, res) => {
//     res.render('tasks/add')
// })

// app.post('/tasks', async (req, res) => {
//     const newtask = new task(req.body);
//     await newtask.save();
//     res.redirect(`/tasks/${newtask._id}`)
// })

// // Route for updating exsisting task

// app.get('/tasks/:id/edit', async (req, res) => {
//     const {id} = req.params;
//     const foundtask = await task.findById(id);
//     res.render('tasks/edit', {task:foundtask})
// })

// app.put('/tasks/:id', async (req, res) => {
//     const {id} = req.params;
//     const newtask = await task.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
//     res.redirect(`/tasks/${task._id}`);
// })

// // Route for deleting an exsisting task

// app.delete('/tasks/:id', async (req, res) => {
//     const { id } = req.params;
//     const deletedtask = await task.findByIdAndDelete(id);
//     res.redirect('/tasks');
// })

// // Listening the server on port 3000

// app.listen(port,()=>{
//     console.log(`Server started on port : ${port}`);
// })

const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const mongoose = require("mongoose");
const task = require("./models/taskmodel");
const methodOverride = require("method-override");

// Mongoose Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

// Middlewares
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ limit: '10mb', extended: false }))
app.use(methodOverride("_method"));

// Route for displaying all tasks
app.get("/tasks", async (req, res) => {
  const ftask = await task.find();
  res.render("tasks/index", { tasks: ftask });
});

// Route for displaying a task by id
app.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const newtask = await task.findById(id);
  res.render("tasks/show", { task: newtask });
});

// Route for adding new task in todo app
// app.get("/tasks/add", (req, res) => {
//   res.render("tasks/add");
// });

// app.post("/tasks", async (req, res) => {
//     console.log(req.body); // add this line to see the request body
//     const newtask = new task(req.body);
//     await newtask.save();
//     res.redirect(`/tasks/${newtask._id}`);
//   });

// // Route for adding new task in todo app
// app.get("/tasks/add", (req, res) => {
//   res.render("tasks/add");
// });

// app.post("/tasks", async (req, res) => {
//   try {
//     const newtask = new task(req.body);
//     await newtask.save();
//     res.redirect(`/tasks/${newtask._id}`);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error adding a new task");
//   }
// });

// Route for adding new task in todo app
// app.get("/tasks/add", (req, res) => {
//     res.render("tasks/add");
//   });
  
//   app.post("/tasks", async (req, res) => {
//     const newtask = new task({
//       name: req.body.name
//     });
//     try {
//       await newtask.save();
//       res.redirect("/tasks");
//     } catch (error) {
//       console.log(error);
//       res.render("tasks/add", { errorMessage: "Error adding task" });
//     }
//   });
  

// Route for updating exsisting task
app.get("/tasks/:id/edit", async (req, res) => {
  const { id } = req.params;
  const foundtask = await task.findById(id);
  res.render("tasks/edit", { task: foundtask });
});

app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const newtask = await task.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/tasks/${newtask._id}`);
});

// Route for deleting an exsisting task
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const deletedtask = await task.findByIdAndDelete(id);
  res.redirect("/tasks");
});

// Listening the server on port 3000
app.listen(port, () => {
  console.log(`Server started on port : ${port}`);
});
