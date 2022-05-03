let books = require('../models/books')
const user = require("../models/user")
const toDos = require("../models/toDos")


class userController {
    async getAll(req, res, next) {
        const {username} = req.query
        user.find({username}, function(err, data){
            if(err){
                res.status(500).json("Пользователь не найден")
            }else {
                toDos.find({owner: data._id}, function (err, data) {
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
                    description, tags, owner:data._id
                })
                newToDo.save(function(err,result){
                    if(!err){
                        res.json("SUCCESS")
                    }else{
                        res.status(500).json("ERROR")
                    }
                })
            }
        })

    }
    async delete(req, res, next) {
        const {username, id} = req.query
        user.find({username}, function(err, data){
            if(err){
                res.status(500).json("Пользователь не найден")
            }else {
                toDos.destroy({_id: id}, function (err, data) {
                    if (!err) {
                        res.json(data)
                    } else {
                        res.status(500).json("ERROR")
                    }
                })
            }
        })
    }

}

module.exports = new userController()