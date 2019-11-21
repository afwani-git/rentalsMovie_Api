require('express-async-errors');//Cathcing Error Nice Bro ea <============
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const config = require('config')

require("./startup/router.js")(app);


if(!config.get('privateJwtToken')){
	console.log("private jwt toke not found !! ");
	process.exit(1);
}
	

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));