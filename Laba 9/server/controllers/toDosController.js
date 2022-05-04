const user = require("../models/user")
const toDos = require("../models/toDos")


class toDosController {
    async getAll(req, res, next) {
        const {username} = req.query
        console.log(username)
        user.find({username}, function(err, data){
            if(err){
                res.json(500,"Пользователь не найден")
            }else {
                console.log(data)
                toDos.find({owner: data[0]._id}, function (err, data) {
                    console.log(data)
                    if (!err) {
                        res.json(data)
                    } else {
                        res.status(500).json("ERROR")
                    }
                })
            }
        })

    }
    async add(req, res, next) {
        const {tags, description, username} = req.body
        user.find({username}, function(err, data){
            if(err){
                res.status(500).json("Пользователь не найден")
            }else {
                let newToDo = new toDos({
                    description, tags, owner:data[0]._id
                })
                newToDo.save(function(err,result){
                    if(!err){
                        res.json(newToDo)
                    }else{
                        res.status(500).json("ERROR")
                    }
                })
            }
        })

    }
    async delete(req, res, next) {
        const {username, id} = req.body
        console.log(username)
        user.find({username}, function(err, data){
            if(!data){
                res.status(500).json("Пользователь не найден")
            }else {
                toDos.findByIdAndDelete(id, function (err, data) {
                    if (!err) {
                        res.json(data)
                    } else {
                        res.status(500).json("ERROR")
                    }
                })
            }
        })
    }
    async update(req, res, next) {
        const {username, id, tags, description} = req.body
        user.find({username}, function(err, data){
            if(err){
                res.status(500).json("Ошибка")
            }else {
                toDos.updateOne({_id:id}, {description, tags}, function(err, data){
                  if(err){
                      res.status(500).json("Ошибка")
                  } else{
                      res.json(data)
                  }
                })
            }
        })
    }

}

module.exports = new toDosController()