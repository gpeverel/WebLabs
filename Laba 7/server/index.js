const express = require('express')
const app = express();
let PORT = 5300
app.use(express.json());

let State =
[ { "description" : "Купить продукты", "tags" : [ "шопинг", "рутина" ] },
{ "description" : "Сделать несколько новых задач", "tags" : [ "писательство", "работа" ] },
{ "description" : "Подготовиться к лекции в понедельник", "tags" : [ "работа", "преподавание" ] },
{ "description" : "Ответить на электронные письма", "tags" : [ "работа" ] },
 { "description" : "Вывести Грейси на прогулку в парк", "tags" : [ "рутина", "питомцы" ]},
{ "description" : "Закончить писать книгу", "tags" : [ "писательство", "работа" ] } ]

app.get('/toDos', function(req,res){
    res.json(State)
})
app.post('/toDos', function(res, req){
    State.push(req.body)
    res.json("SUCCESS")
})
app.listen(PORT)
