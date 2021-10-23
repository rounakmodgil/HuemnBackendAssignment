const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const studentSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    attendance: [{ type: Schema.Types.ObjectId, ref: 'Attendance'}],
    branch: { type: Schema.Types.ObjectId, ref: 'Branch',  required:true },
   
},{timestamps:true})

const Student=mongoose.model('Student', studentSchema);

module.exports = Student;