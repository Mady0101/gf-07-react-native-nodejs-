const mongoose = require('mongoose');



const DeviceSchema = mongoose.Schema({
    number : {
        type : Number,
        required : true
    },
    name : String
})

const UserSchema = mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: "Role"}],
    devices :[DeviceSchema]
})


module.exports = mongoose.model('User', UserSchema);