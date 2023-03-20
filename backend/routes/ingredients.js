const routerModule = require('express').Router();
let ingredient = require('../models/ingredient.model');

routerModule.route('/ingredients_list').get((req, res) => { 
    ingredient.find() //moongoose method which gets required ingredients from mongoDB 
        .then(ingredients => res.json(ingredients))
        //if there's an error
        .catch(err => res.status(400).json('Error: ' + err));
});

//add extra functionalities when needed 


module.exports = routerModule;