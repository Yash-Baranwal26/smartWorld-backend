const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
    },
    // email:{
    //     type:String,
    // },
    description:{
        type:String
    }
})

const usersList = mongoose.model("usersSchema",usersSchema)

module.exports = usersList;