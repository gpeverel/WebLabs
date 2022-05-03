let mongoose = require("mongoose"),
    ToDoSchema,
    ObjectId = mongoose.Schema.Types.ObjectId;
ToDoSchema = mongoose.Schema(
    { description: String, tags: [ String ],
        owner : { type: ObjectId, ref: "users" } });
let toDo = mongoose.model("toDos", ToDoSchema);
module.exports = toDo