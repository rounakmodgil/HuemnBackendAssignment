const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const attendanceSchema= new Schema({

    intime:{
        type:Date,
        required:true
    },
    outtime:{
        type:Date,
    },
    student: { type: Schema.Types.ObjectId, ref: 'Student',},
    staff:{ type: Schema.Types.ObjectId, ref: 'Staff'},
    branch: { type: Schema.Types.ObjectId, ref: 'Branch',  required:true }

},{timestamps:true})

const Attendance=mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;