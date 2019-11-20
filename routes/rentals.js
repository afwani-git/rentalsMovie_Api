const mongoose = require('mongoose');

const { validateRentals,rentalsModel } = require('../model/rentals.js').rentals;

const { moviesModel } = require('../model/movie.js').movies;
const { ModelCustomers } = require('../model/customers.js').customers;
const router = require('express').Router();
const Fawn = require('fawn'); 
Fawn.init(mongoose);

// middleware
const admin = require('../middleware/admin.js');
const auth = require('../middleware/auth.js');

router.get('/',[admin,auth], async (req, res) => {
	try {
	  const rentals = await rentalsModel.find().sort('-dateOut');
	  res.send(rentals);
	} catch(e) {
		console.log(e);
	}
});

router.post('/',auth,async (req, res) => {
	const customer = await ModelCustomers.findOne({_id:req.body.customerId});
	if(!customer) return res.status(400).send("Invalid Customer ID");

	const movie = await moviesModel.findOne({_id:req.body.movieId});
	if(!movie) return res.status(400).send("Invalid Movie ID");

	let rental = new rentalsModel({
		customer:{
			_id:customer._id,
			name:customer.name,
			phone:customer.phone
		},
		movie:{
			_id:movie._id,
			title:movie.title,
			dailyRentalRate:movie.dailyRentalRate
		},	

	});

	new Fawn.Task()
	.save('rentals',rental)
	.update('movies',{_id:movie._id},{
		$inc: { numberInStock: -1 }
	})
	.run();
	
	res.send(rental);

});

module.exports =  router;