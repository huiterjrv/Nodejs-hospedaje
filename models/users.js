const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    rool:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    }
});

module.exports = mongoose.model('Users', usersSchema);