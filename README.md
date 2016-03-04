*************************
It was great working and developing the project. I learnt very interesting things in past few days.
Thank you for the opportunity.
*************************

*************************
Please Run npm install to install the node_modules
*************************

I would like to mention few points:
1) I have set mongoDB configured in connections.js with name "fizzApp". Please update it accordingly, and mention if any username or password is required.

2) The policies.js is configured such that only an admin can create a new User.
So for the create can't be used as such because there is not admin.

This can be solved as followes:

Step 1) Go to Users.js and set defaultsTo property to true in the admin attribute of User model.
Step 2) Go to policies.js in config folder and set the following properties as such

module.exports.policies = {

'*': true,

  'UsersController': {
    'create': true,
    'destroy': ['isAuthorized', 'isAtleastManager'],
    'index': ['isAuthorized', 'isAdmin'],
    '*': ['isAuthorized', 'isAtleastManager']
  },

  'AuthController': {
    '*': true
  }
};

Step 3) Now run the server and send a POST request to server with email, password and confirmPassword.

eg. localhost:1337/users/create?email=admin@example.com&password=12345&confirmPassword=12345

This will create a user with admin attribute to true.

******
Imp::::
PLEASE SAVE THE TOKEN SENT BACK BY THE USER, IT WILL BE USED IN FURTHER QUERIES BY THIS USER
*******

Step 4)
Now revert back all the changes.
---> Set defaultsTo property to false in admin attribute of Users model in Users.js
---> Revert the policies.js to original state

module.exports.policies = {

  '*': ['isAuthorized', 'isAdmin'],

  'UsersController': {
    'create': ['isAuthorized', 'isAdmin'],
    'destroy': ['isAuthorized', 'isAtleastManager'],
    'index': ['isAuthorized', 'isAdmin'],
    '*': ['isAuthorized', 'isAtleastManager']
  },

  'AuthController': {
    '*': true
  } 
};

*** I know this is silly, but I couldn't find other way, maybe by setting Admin Variables in Env could have solved the problem but anyways.

3) Token based authentication system.
In order to implement token based authentication, I have used a service jwToken.js and policy isAuthorized.js to generate and check for tokens respectively.

Once a user is created, its token is returned, please save it for future queries. This token needs to saved automatically in client side. 

** Sorry, I didn't implement this in client side.
** For queries using POSTman you need to supply token in the Authorization header for each query.

The format for token is: Token*space**Token*. Please refer isAuthorized.js for further clarification.
eg. For a token is Token vs9890sdv80s9v0svs0vs

So for every GET/POST query you need to supply Authorization header and the token in format mentioned as value.


4) An admin can only create new managers or employees.

To create a manager, 

--> Send POST request containing manager=true along with email, password, and confirmPassword.
	e.g. localhost:1337/users/create?email=m@m.com&password=1234&confirmPassword=1234&manager=true

To create an employee,

--> Send POST request with only email, password and confirmPassword,.
	e.g. localhost:1337/users/create?email=e@e.com&password=1234&confirmPassword=1234

****
NOTE: SAVE TOKEN OF EACH USER CREATED; WHETHER MANAGER/ADMIN/EMPLOYEE
		TOKEN IS REQUIRED TO POST QUERIES AND GET REQUEST.

5) Some policies I have mentioned on my own.
** An Admin's info can't be updated neither seen by anyone.
** Admin can see the list of users including Admins too.
** Manager can see/edit another Manager's info.
** A Manager can see only one record at time.
