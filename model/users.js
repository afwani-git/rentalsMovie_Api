const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi  = require('joi');

const userSchema  = new mongoose.Schema({
	_id:String,
	name:{
		type:String,
		minlength:5,
		required:true,
		trim:true,
		maxlength:255
	},
	email:{
		type:String,
		required:true,
		trim:true,
		minlength:5,
		maxlength:255,
		unique:true
	},
	password:{
		type:String,
		required:true,
		trim:true,
		minlength:5,
		maxlength:1024,
	},
	isAdmin:{
		type:Boolean,
		default:false
	}
})


userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('privateJwtToken'));
  return token;
}

const userModel = mongoose.model('users',userSchema);

function validateLoginUser(user) {
  const schema = {
    email:Joi.string().email().required().min(5).max(255).required(),
    password:Joi.string().required().min(5).max(1024)
  };

  return Joi.validate(user, schema);
}

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(255).required(),
    email:Joi.string().email().required().min(5).max(255).required(),
    password:Joi.string().required().min(5).max(1024)
  };

  return Joi.validate(user, schema);
}


module.exports.users = {
	validateUser,
	validateLoginUser,
	userModel,
	userSchema
}
