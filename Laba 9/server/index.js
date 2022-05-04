require('./models/user')
require('./models/toDos')
const express = require('express')
const fileUpload = require('express-fileupload')

const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const userController = require('./controllers/userController')
const toDosController = require('./controllers/toDosController')
let PORT = 5300
let toDos
app.use(cors({
    origin: '*'
}))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
app.use(fileUpload({}))
app.get('/user', userController.getAll);
app.post('/user', userController.add);
app.delete('/user', userController.delete);

app.get('/toDos', toDosController.getAll)
app.post('/toDos', toDosController.add)
app.delete('/toDos', toDosController.delete)
app.post('/toDos/update', toDosController.update)
async function main() {
    mongoose.connect('mongodb+srv://Kenny:Yfhbvfy123@booksdb.8cazt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(() => {
        console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSsss")

    }).catch(err => console.log( err ));

    app.listen(PORT)
}
main();
