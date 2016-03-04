/*	Policy to check whether req was sent by a manager or not	*/

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
				if(user.manager || user.admin){
					return next();
				}
				else{
					return res.json(403, {err: 'User is neither a manager nor an admin.'});	
				}
			}
		});
	}

	/*if(req.isAdmin || req.isManager){
		return next();
	}
	else{
		return res.json(403, {err: 'User is neither a manager nor an admin.'});
	}*/
}