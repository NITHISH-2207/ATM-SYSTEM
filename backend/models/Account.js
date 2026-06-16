const mongoose = require('mongoose');
const accountSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    accountNumber: {
        type:String,
        required:true,
        unique:true ,  
    },
    pin: {
        type:String,
        required:true
    },
    balance: {
        type:Number,
        required:true,
        default:0
    }
});
module.exports = mongoose.model('Account', accountSchema);