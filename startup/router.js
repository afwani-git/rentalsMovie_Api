const express = require('express');
// router
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies  = require('../routes/movies');
const reantals = require('../routes/rentals')
const user = require('../routes/user');
const auth = require('../routes/auth.js');

module.exports = (app) => {
	app.use(express.json());
	app.use('/api/genres', genres);
	app.use('/api/customers', customers);
	app.use('/api/movies',movies);
	app.use('/api/rentals',reantals);
	app.use('/api/user',user);
	app.use('/api/auth',auth);
}

