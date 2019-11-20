const  jwt = require('jsonwebtoken');
const config = require('config');
	 
module.exports = function(req,res,next){
	const token = req.header('x-auth-token');

	if(!token) return res.status('401').send({err:"Access denied ,no token !!"});

	try{
		const decode = jwt.verify(token,config.get('privateJwtToken'));
		req.user = decode;
		next();
	}catch(err){
		res.status(401).send({err:"token invalid !!"});
	}
}