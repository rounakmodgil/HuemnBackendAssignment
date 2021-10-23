const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const staffSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    role:{
        designation:String,
        access:Number,
    },
    attendance: [{ type: Schema.Types.ObjectId, ref: 'Attendance'}],
    branch: { type: Schema.Types.ObjectId, ref: 'Branch',  required:true },
   
},{timestamps:true})

const Staff=mongoose.model('Staff', staffSchema);

module.exports = Staff;