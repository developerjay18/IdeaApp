// creating schema for users using mongoose

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minLength:10,
        lowerCase:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        required:true,
        default:"CUSTOMER",
        enum:["CUSTOMER","ADMIN"],
    }
},{timestamps:true})


// defining collection name and exporting

module.exports= mongoose.model("User",userSchema)