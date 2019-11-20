const router = require('express').Router();
const { validateLoginUser,userModel,userSchema } = require('../model/users.js').users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post("/", async (req,res) => {
	const { error } = validateLoginUser(req.body);
	if(error) return res.status(400).send({err:error.details[0].message});

	const user = await userModel.findOne({email:req.body.email});
	if(!user) return res.status(400).send("email not exitis");

	const validPass = await bcrypt.compare(req.body.password,user.password);
	if(!validPass) return res.status(400).send("password incorrect");
	const token = user.generateAuthToken()
	res.header("x-auth-token",token);
	res.status(200).send({authSuccess:true});
});

module.exports = router;