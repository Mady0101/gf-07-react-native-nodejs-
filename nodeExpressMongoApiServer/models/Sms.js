const mongoose = require('mongoose');


const SmsSchema = mongoose.Schema({
    number : {
        type: String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    icon : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Sm', SmsSchema);