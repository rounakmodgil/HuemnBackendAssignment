const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const historySchema= new Schema({
    giventime:{
        type:Date,
        required:true
    },
    recievedtime:{
        type:Date,
    },
    student: { type: Schema.Types.ObjectId, ref: 'Student',},
    branch: { type: Schema.Types.ObjectId, ref: 'Branch',  required:true }

},{timestamps:true});

const History=mongoose.model('History', historySchema);

module.exports = History;