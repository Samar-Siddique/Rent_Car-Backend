const mongoose=require('mongoose')
const car=require("../Models/car");
//get all Cars
const getCars=async(req,res)=>{
    const allCars=await car.find({}).sort({createdAt:-1});
    res.status(200).json(allCars)
}
//get a single Car
const getCar=async(req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No Such Car'})
    }
    const getCar=await car.findById(id);
    if(!getCar){
        return res.status(404).json({error:'No Record Found'});
    }
    res.status(200).json(getCar);
}
//create a Car
const createCar=async(req,res)=>{
    const{title,imageUrl,brandModel,priceHalfDay,pricePerDay,pricePerWeek,pricePerMonth}=req.body;
    try{
        const Car=await car.create({title,imageUrl,brandModel,priceHalfDay,pricePerDay,pricePerWeek,pricePerMonth});
        res.status(200).json(Car);
    }
    catch(error){
        res.status(400).json({error});
    }
}
//Delete a car
const deleteCar=async(req,res)=>{
    const{id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "NO Such Car"})
    }
    const Car=await car.findOneAndDelete({_id:id});
    if(!Car){
        return res.status(404).json({error: "NO Such Car"})
    }
    res.status(200).json(Car);
}

//Update Car
const updateCar= async(req,res)=>{
    const{id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No Such Car"})
    }
    const Car= await car.findByIdAndUpdate({_id:id},{
      ...req.body
    })
    if(!Car){
        return res.status(404).json({error:"No Such Car"})
    }
    res.status(200).json(Car)
}


module.exports={
    getCars,
    getCar,
    createCar,
    deleteCar,
    updateCar
}