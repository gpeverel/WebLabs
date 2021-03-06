const toDos = require("../models/toDos")
const user = require("../models/user")

class userController {
    async getAll(req, res, next) {
            user.find({}, function(err, data){
                if(!err){
                    res.setHeader('Content-Type', 'application/json');
                    res.json(data)
                }else{
                    res.json(500, "Error")
                }
            })
    }
    async add(req, res, next) {
        let username = req.body.username
        console.log("addUsers")
        if(username){
            let newUser = new user({
                username
            })
            newUser.save(function(err,data){
                if(!err){
                    res.json("Success")
                }else{
                    res.json(500, err)
                }
            })
        }else{
            res.json(500, "null parametr")
        }
    }
    async delete(req, res, next) {
        let id = req.query.id
        if(id){
            user.findByIdAndDelete(id, function(err, data){
                console.log(data)
                if(!err && data.length !== 0){
                    toDos.deleteMany({owner:id}, function(err, data){
                        if(!err){
                            res.json("Success")
                        }else{
                            res.json(500 ,"Error")
                        }
                    })
                }else{
                    res.json(500 ,"NoFind")
                }
            })
        }else{
            res.json(500, "null parametr")
        }
    }

}

module.exports = new userController()