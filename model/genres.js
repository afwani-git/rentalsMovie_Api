const Joi = require('joi');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const genresSchema = new mongoose.Schema({  
  _id:mongoose.Schema.ObjectId,
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Genre = mongoose.model('Genre',genresSchema );

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

module.exports.genres = {
	validateGenre,
	Genre,
	ObjectId,
  genresSchema
}