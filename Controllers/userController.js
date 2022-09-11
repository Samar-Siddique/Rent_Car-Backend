const mongoose =require('mongoose');

const { User, validate, validateauth } = require("../models/user");
const bcrypt = require("bcrypt");

const getusers =async (req,res)=>{
  const user=await User.find({}).sort({createdAt:-1});
res.status(200).json(user);
}

const register =async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error1" });
	}
}

const login=async (req, res) => {
	try {
			const{email, password} = req.body
			const user = await User.findOne({ "email": email });
			
			if(user){
				const validPassword = await bcrypt.compare(password, user.password);
				if (!validPassword)
					return res.status(401).send({ message: "Invalid Password" });
				else{
					return res.status(200).json(user);
				}
			}
			else{
				return res.status(400).json("Not valid email.")
			}
		
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error2" });
	}
}

module.exports={
  register,login,getusers

}