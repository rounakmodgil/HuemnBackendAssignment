const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const branchShema= new Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    staffs: [{ type: Schema.Types.ObjectId, ref: 'Staff'   }],
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    subjects:[{ type: Schema.Types.ObjectId, ref: 'Subject'}],

},{timestamps:true})

const Branch=mongoose.model('Branch', branchShema);

module.exports = Branch;