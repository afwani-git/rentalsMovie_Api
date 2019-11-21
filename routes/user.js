const bcrypt = require('bcrypt');
const { validateUser,userModel  }  = require('../model/users.js').users;
const router = require('express').Router();
const mongoose = require('mongoose');
const _ = require('lodash');

// middleware
const admin = require('../middleware/admin.js');
const auth = require('../middleware/auth.js');


router.get('/me',auth,async (req,res) => {
	try{
		const { _id,name,email } = await userModel.findOne({_id:req.user._id});
		res.status(200).send({_id,name,email});
	}catch(err){	
		res.status(500).send({err:err});
	}
})

// get
router.get('/',[auth,admin],async (req,res) => {
	try{
		const users = await userModel.find().sort('name');
		res.status(200).send(users);
	}catch(err){
		res.status(500).send({err:err});
	}
})

//save 
router.post('/', async (req,res) => {
	const { error } = validateUser(req.body);
	if(error) return res.status(400).send(error.details[0].message);

	const email = await userModel.findOne({email:req.body.email});
	if(email) return res.status(400).send("eamil  sudah ada !");

	const salt = await bcrypt.genSalt(10);
	const hashesPassword = await bcrypt.hash(req.body.password,salt);

	const newUser = new userModel({
		_id:new mongoose.Types.ObjectId(),
		name:req.body.name,
		email:req.body.email,
		password:hashesPassword
	}) 

	await newUser.save();
	const token = newUser.generateAuthToken();
	res.header('x-auth-token',token);
	res.status(200).send(_.pick(newUser,['_id','name','email']));
});

module.exports = router;