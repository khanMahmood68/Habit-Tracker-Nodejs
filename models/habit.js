const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    userRef:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    dates:[{
        date:String,
        complete:String
    }],
    favorite:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true,
});

const Habit = mongoose.model('Habit',habitSchema);

module.exports = Habit;