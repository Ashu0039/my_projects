/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: function (req, res) {
    if (req.body.password !== req.body.confirmPassword) {
      return res.json(401, {err: 'Password doesn\'t match!'});
    }
    Users.create(req.body).exec(function (err, user) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      // If user created successfuly we return user and token as response
      if (user) {
        // NOTE: payload is { id: user.id}
        res.json(200, {user: user, token: jwToken.issue({id: user.id})});
      }
    });
  },

  index: function (req, res, next) {
  	Users.find(function foundUsers(err, users){
	 	if(err)	return res.json(404, {err: err});

	 	return res.json(200, {users: users});
	 });
  	
  },

  show: function(req, res, next){
  	Users.findOne({id: req.param('id')}, function (err, user) {
       if(err){
       	res.json(500, {err: err});
       	return;
       }
       if(!user){
       	res.json(404, {err: 'User with id:'+ req.param('id') +' not found.'});
       	return;
       }

       if(user.admin){
       	res.json(403, {err: 'Admin info cannot be seen.'});
       }

       res.json(200, {user: user});
       return;
    });
  },

  update: function(req, res, next){
  	Users.findOne({id: req.param('id')}, function (err, user) {
       if(err){
       	res.json(500, {err: err});
       	return;
       }
       if(!user){
       	res.json(404, {err: 'User with id:'+ req.param('id') +' not found.'});
       	return;
       }

       if(user.admin){
       	res.json(403, {err: 'Admin info cannot be updated.'});
       	return;	
       }
    });

  	Users.update(req.param('id'), req.params.all(), function (err) {
  		if(err)	return res.json(400, {err: err});

  		res.json(200, 'User with id: ' + req.param('id') + ' updated successfully.');
  		return 
  	});
  }
};

