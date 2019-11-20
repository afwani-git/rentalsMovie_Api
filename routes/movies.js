const express = require('express');
const router = express.Router();

const { validateMovies,moviesModel,ObjectId } = require('../model/movie').movies;
const { Genre }  = require('../model/genres.js').genres;

// middleware
const admin = require('../middleware/admin.js');
const auth = require('../middleware/auth.js');


//get
router.get('/', async (req, res) => {
  const movies = await moviesModel.find().sort('name');
  res.send(movies);
});

//add movies
router.post('/',[admin,auth], async (req, res) => {
  try {
    const { error } = validateMovies(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    // check 
    const genres = await Genre.find({name:req.body.NameGenres});
    if(!genres) return res.status(404).send({err:"genres not found"});

    let genre = new moviesModel({
      _id:new ObjectId,
      title:req.body.title,
      genres:{
        _id:genres[0]._id,
        name:genres[0].name
      },
      numberInStock:req.body.numberInStock,
      dailyRentalRate:req.body.dailyRentalRate
    });

    genre = await genre.save();
    
    res.send(genre);  
  } catch(e) {
    // statements
    console.log(e);
  }
  
});

// update movies
router.put('/:id',[admin,auth], async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  // check genres
  const genres = await Genre.find({name:req.body.idGenres})
  if(!genres) return res.status(404).send({err:"genres not found"});

  const movies = await moviesModel.findByIdAndUpdate(req.params.id,
  { 
    title: req.body.title,
    genres:{
      _id:genres[0]._id,
      name:genres[0].name
    },
    numberInStock:req.body.numberInStock,
    dailyRentalRate:req.body.dailyRentalRate
  }, {
    new: true
  });

  if (!movies) return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(movies);
});

// delete movies
router.delete('/:id',[admin,auth], async (req, res) => {
  const movies = await moviesModel.findByIdAndRemove(req.params.id);

  if (!movies) return res.status(404).send('The genre with the given ID was not found.');

  res.send(movies);
});

router.get('/:id', async (req, res) => {
  const movies = await moviesModel.findById(req.params.id);

  if (!movies) return res.status(404).send('The genre with the given ID was not found.');

  res.send(movies);
});


module.exports = router;