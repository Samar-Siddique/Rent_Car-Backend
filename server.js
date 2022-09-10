const express=require('express')
const mongoose=require('mongoose')
const carRouter=require('./Routes/car')
const contactRouter=require('./Routes/contact')
const userRouter=require('./Routes/user')
const cors= require('cors')
const app=express();

require('dotenv').config()
app.use(cors())
app.use(express.json());

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next();
})

app.use('/api/cars',carRouter)

app.use('/api/user',userRouter)


mongoose
.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('Listening on port',process.env.PORT)
    }); 
})
.catch((error)=>{
console.log(error);
})