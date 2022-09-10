const express=require('express')
const router=express.Router()
const{
    getContacts,getContact,createContact,deleteContact,updateContact
}=require('../Controllers/contactController')
//get all Contacts
router.get('/',getContacts)
//get a Contact
router.get('/:id',getContact)
//create Contact
router.post('/',createContact)
//delete Contact
router.delete('/:id',deleteContact)
//update Contact 
router.patch('/:id',updateContact)

module.exports=router;