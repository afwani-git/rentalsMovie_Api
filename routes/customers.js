const router = require('express').Router();
const { ModelCustomers,validateCustomers,ObjectId } = require('../model/customers.js').customers;

// middleware
const admin = require('../middleware/admin.js');
const auth = require('../middleware/auth.js');

router.get('/', async (req, res) => {
  const customers = await ModelCustomers.find().sort('name');
  res.send(customers);
});

router.post('/',[auth,admin], async (req, res) => {
	try{
		const { error } = validateCustomers(req.body); 
		if (error) return res.status(400).send(error.details[0].message);

		let genre = new ModelCustomers({
			_id:new ObjectId(),
			name: req.body.name,
			isGold:req.body.isGold,
			phone:req.body.phone
		});

		genre = await genre.save();

		res.send(genre);
	}catch(err){
		console.log(err);
	}
});


module.exports = router;