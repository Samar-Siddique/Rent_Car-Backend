const express =require('express')
const router= express.Router()
const{
   register,login, getusers
}=require('../Controllers/userController')




router.post('/login',login)

router.get('/',getusers)

router.post('/',register)


module.exports =router;