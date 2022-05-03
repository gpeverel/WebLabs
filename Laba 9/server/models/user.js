const mongoose = require("mongoose");
let userSchema = mongoose.Schema({
    username:String,
    id:String
})
let user = mongoose.model("users", userSchema)
user.find({}, function(err, data){
    if(!err){
        if(data.length === 0){
            let newUser = new user({
                username:"testUser"
            })
            newUser.save(function(err, result){
                if(err){
                    console.log(err)
                }
            })
        }
    }
})
module.exports = user