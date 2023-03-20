const {User, validate} = require('../models/users.model');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();


router.post('/getUserData', async (req, res) => {
    var decoded = JWT.decode(req.body.token);
    const returnedUser = await User.findById({ _id: decoded._id });
     
    res.send(JSON.stringify(returnedUser));
});

router.post('/add', async(req,res)=>{
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password', 'calorieLimit']));
    const salt  = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();    
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

router.route('/delete_user_data').post((req, res) => { 
    const userID = req.body.ID;
  
    User.findById(userID)
          .then(currentUser => {
              currentUser.foodItems = new Array();
              currentUser.diet = new Array();
              currentUser.save()
                .then(() => res.json('User data deleted!'))
                .catch(err => res.status(400).json('Error: ' + err));
            })
          .catch(err => res.status(400).json('Error: ' + err));
}); 

router.route('/change_limit').post((req, res) => { 
    const userID = req.body.ID;
    const newLimit = req.body.limit;
  
    User.findById(userID)
          .then(currentUser => {
              currentUser.calorieLimit = newLimit;              
              currentUser.save()
                .then(() => res.json('User data deleted!'))
                .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/delete_user').post((req, res) => { 
    const userID = req.body.ID; //the token wil be stored on users end so will be handled by front end react section.
    
    User.findByIdAndDelete(decoded._id, function(err){})
    .then(console.log())
    .catch(err => res.status(400).json('Error: ' + err));
});
  

module.exports = router;