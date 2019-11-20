const mongoose = require('mongoose');
const express = require('express');
const app = express();
const config = require('config')
// router
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies  = require('./routes/movies');
const reantals = require('./routes/rentals')
const user = require('./routes/user');
const auth = require('./routes/auth.js');

if(!config.get('privateJwtToken')){
	console.log("private jwt toke not found !! ");
	process.exit(1);
}
	

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));


app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies',movies);
app.use('/api/rentals',reantals);
app.use('/api/user',user);
app.use('/api/auth',auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));