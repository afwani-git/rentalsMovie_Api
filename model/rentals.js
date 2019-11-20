const mongoose = require('mongoose');
const Joi  = require('joi');


const reantalsSchema = new mongoose.Schema({
	customer:{
		type: new mongoose.Schema({
			name:{
				type:String,
				trim:true,
				maxlength:3,
				minlength:266
			},
			isGold:{
				type:Boolean,
				default:false,
			},
			phone:{
				type:String,
				required:true,
				minlength:3,
				maxlength:255
			}
		}),
	required:true
	},
	movie:{
		type:new mongoose.Schema({
			title:{
				type:String,
				trim:true,
				required:true,
				minlength:0,
				maxlength:255
			},
			dailyRentalRate:{
				type:Number,
				min:0,
				max:255,
				required:true
			}
		}),
		required:true
	},
	dateOut:{
		type:Date,
		required:true,
		default:Date.now()
	},
	dateReturned:{
		type:Date
	},
	rentalFee:{
		type:Number,
		min:0,
		max:255
	}
});


const rentalsModel = mongoose.model('Rentals',reantalsSchema);


function validateRentals(genre) {
  const schema = {
    customerId: Joi.string().required(),
    movieId:Joi.string().required()
  };

  return Joi.validate(genre, schema);
}

module.exports.rentals = {
	rentalsModel,
	validateRentals
}
