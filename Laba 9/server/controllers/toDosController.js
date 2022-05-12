const user = require("../models/user")
const toDos = require("../models/toDos")


class toDosController {
    async getAll(req, res, next) {
        const {username} = req.query
        console.log(username)
        const findedUser = await user.findOne({username})
        if (findedUser) {

                toDos.find({owner: findedUser._id}, function (err, data) {
                    console.log(data)
                    if (!err) {
                        res.json(data)
                    } else {
                        res.status(500).json("ERROR")
                    }
                })
        }
        else {
            res.json([])
        }
    }
    async add(req, res, next) {
        const {tags, description, username} = req.body
        const findedUser = user.findOne({username})
        if (findedUser) {
                let newToDo = new toDos({
                    description, tags, owner:findedUser._id
                })
                newToDo.save(function(err,result){
                    if(!err){
                        res.json(newToDo)
                    }else{
                        res.status(500).json("ERROR")
                    }
                })
        }
        else {
            res.json([])
        }
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