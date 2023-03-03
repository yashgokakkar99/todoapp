const mongoose = require('mongoose');
const task = require('./models/taskmodel');

mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

const list = [
    {
        name: 'Fairy Eggplant',
        
    },
    {
        name: 'Organic Goddess Melon',
        
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        
    },
    {
        name: 'Organic Celery',
        
    },
    {
        name: 'Chocolate Whole Milk',
    
    },
]

task.insertMany(list)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })