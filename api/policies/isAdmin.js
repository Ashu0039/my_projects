/*	Policy to check whether req was sent by an admin or not	*/

module.exports = function (req, res, next) {
	if(req.token) {
		Users.findOne({id: req.token.id}, function (err, user) {
			if(err){
				return next(err);
			}
			if(!user){
				return next('Couldn\'t find user..');
			}
			else{
				if(user.admin){
					return next();
				}
				else{
					return res.json(403, {err: 'User is not admin'});	
				}
			}
		});
	}
	/*
	if(req.isAdmin){
		return next();
	}
	else{
		return res.json(403, {err: 'User is not admin.'})
	}*/
}