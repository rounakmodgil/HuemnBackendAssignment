const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const subjectSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    books:[{ type: Schema.Types.ObjectId, ref: 'Book' }],
    branch: { type: Schema.Types.ObjectId, ref: 'Branch',  required:true },
   
},{timestamps:true})

const Subject=mongoose.model('Subject', subjectSchema);

module.exports = Subject;