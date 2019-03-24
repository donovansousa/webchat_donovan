
const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const Messages = mongoose.model('message',new Schema({
 
    message:String,
    to:String,
    time:Date

},{collection:'message'}));