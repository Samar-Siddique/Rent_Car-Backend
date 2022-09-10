const mongoose=require('mongoose')
const contact=require("../Models/contact")
//get all Contacts
const getContacts=async(req,res)=>{
    const allContact=await contact.find({}).sort({createdAt:-1});
    res.status(200).json(allContact)
}
//get a single Contacts
const getContact=async(req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No Such Contact'})
    }
    const getContact=await contact.findById(id);
    if(!getContact){
        return res.status(404).json({error:'No Record Found'});
    }
    res.status(200).json(getContact);
}
//create a Contact
const createContact=async(req,res)=>{
    const{name,phone_no,email,vehicle,message}=req.body;
    try{
        const Contact=await contact.create({name,phone_no,email,vehicle,message});
        res.status(200).json(Contact);
    }
    catch(error){
        res.status(400).json({error});
    }
}
//Delete a Contact
const deleteContact=async(req,res)=>{
    const{id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "NO Such Contact"})
    }
    const Contact=await contact.findOneAndDelete({_id:id});
    if(! Contact){
        return res.status(404).json({error: "NO Such Contact"})
    }
    res.status(200).json(Contact);
}

//Update  Contact
const updateContact= async(req,res)=>{
    const{id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No Such  Contact"})
    }
    const  Contact= await contact.findByIdAndUpdate({_id:id},{
      ...req.body
    })
    if(! Contact){
        return res.status(404).json({error:"No Such  Contact"})
    }
    res.status(200).json(Contact)
}


module.exports ={
    getContacts,
    getContact,
    createContact,
    deleteContact,
    updateContact
}