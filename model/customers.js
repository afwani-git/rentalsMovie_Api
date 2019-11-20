const Joi = require('joi');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const model = mongoose.model.bind(mongoose);


const ModelCustomers = model('Customers',new Schema({
	_id:{
		type:String
	},
	isGold:{
		type:Boolean,
		default:false
	},
	name:{
		type:String,
		trim:true,
		minlength:5,
		maxlength:50
	},
	phone:{
		type:String,
		trim:true,
		minlength:5,
		maxlength:50
	}
}));


// validation
function validateCustomers(customers) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    phone:Joi.string().min(5).max(50).required(),
    isGold:Joi.boolean()
  };

  return Joi.validate(customers, schema);
}

exports.customers = {
	validateCustomers,
	ModelCustomers,
	ObjectId
}