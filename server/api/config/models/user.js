 
const mongoose = require('mongoose'),
Schema = mongoose.Schema;

// define as tabelas
const User = mongoose.model('user',new Schema ({

    name:{
        type:String,
        unique:true,
        nullable:false
    },
    password:String,
    mail:String

}, { collection:'user' }));

module.exports = User;