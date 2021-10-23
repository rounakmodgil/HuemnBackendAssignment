const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const bookSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    available:{
        type:Number,
        required:true
    },
    availability:{
        type:Boolean,
        required:true
    },
    history:[{type:Schema.Types.ObjectId, ref:'History' }],
    subject:{ type: Schema.Types.ObjectId, ref: 'Subject',  required:true },
    branch: { type: Schema.Types.ObjectId, ref: 'Branch',  required:true },
   
},{timestamps:true})

const Book=mongoose.model('Book', bookSchema);

module.exports = Book;