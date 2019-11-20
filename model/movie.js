const Joi = require('joi');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const model = mongoose.model.bind(mongoose);
const { genresSchema } = require("./genres.js").genres;


const moviesModel = model('Movies',new Schema({
	_id:mongoose.Schema.ObjectId,
	title:{
		type:String,
		minlength:3,
		maxlength:255,
		trim:true,
		required:true
	},
	genres:{
		type:genresSchema,
		required:true
	},
	numberInStock:{
		type:Number,
		required:true,
		min:0,
		max:255
	},
	dailyRentalRate:{
		type:Number,
		required:true,
		min:0,
		max:255
	}
}));

//validate
function validateMovies(customers) {
  const schema = {
    title: Joi.string().min(0).max(255).required(),
    NameGenres: Joi.string().required(),
    numberInStock:Joi.number().min(0).max(255).required(),
    dailyRentalRate:Joi.number().min(0).max(255).required()
  };

  return Joi.validate(customers, schema);
}

exports.movies = {
	ObjectId,
	validateMovies,
	moviesModel
}