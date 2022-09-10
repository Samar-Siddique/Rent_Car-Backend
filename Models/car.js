const mongoose=require('mongoose')
const Schema = mongoose.Schema
const carSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    brandModel:{
        type:String,
        required:true
    },
    priceHalfDay:{
        type:String,
        required:true
    },
    pricePerDay:{
        type:String,
        required:true
    },
    pricePerWeek:{
        type:String,
        required:true
    },
    pricePerMonth:{
        type:String,
        required:true
    },
},
    {timestamps:true}
);
module.exports= mongoose.model('Car', carSchema);