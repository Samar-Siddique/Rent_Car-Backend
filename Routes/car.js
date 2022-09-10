const express=require('express')
const router=express.Router()
const{
    getCars,getCar,createCar,deleteCar,updateCar
}=require('../Controllers/carController')
//get all Cars
router.get('/',getCars)
//get a Car
router.get('/:id',getCar)
//create Car
router.post('/',createCar)
//delete Car
router.delete('/:id',deleteCar)
//update Car
router.patch('/:id',updateCar)

module.exports=router;