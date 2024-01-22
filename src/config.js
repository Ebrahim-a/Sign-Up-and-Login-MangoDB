const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/")

//check if connect data or not
connect.then(()=>{
    console.log("connected");
})

.catch(()=>{
    console.log("failed");
})

//create a schema
const  Schema= new mongoose.Schema({
Username:{
    type: String,
    required: true
},
email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
    type: String,
    required: true
}
})

//collection part
const collection = new mongoose.model("",Schema )

module.exports=collection;