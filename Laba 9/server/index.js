require("./db")
require('./models/user')
const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const userController = require('./controllers/userController')
let PORT = 5300
let toDos
app.use(cors({
    origin: '*'
}))
app.use(express.json());
app.get('/user', userController.getAll);
app.post('/user', userController.add);
app.delete('/user', userController.delete);

app.get('/toDos', function(req,res){
    toDos.find({}, function(err,data){
        if(!err){
            res.json(data)
        }else{
            res.status(500).json("ERROR")
        }
    })
})
app.post('/toDos', function(req,res){
    const {tags, description} = req.body
    let newToDo = new toDos({
        description, tags
    })
    newToDo.save(function(err,result){
        if(!err){
            res.json("SUCCESS")
        }else{
            res.status(500).json("ERROR")
        }
    })
})
async function main() {
    mongoose.connect('mongodb+srv://Kenny:Yfhbvfy123@booksdb.8cazt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(() => {
        console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSsss")
        let toDosSchema = mongoose.Schema({
            description:String,
            tags:[String],
        })
        toDos = mongoose.model("toDos", toDosSchema)
    }).catch(err => console.log( err ));

    app.listen(PORT)
}
main();
