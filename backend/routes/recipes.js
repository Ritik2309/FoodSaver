const routerModule = require('express').Router();
let recipe = require('../models/recipe.model');

routerModule.route('/recipes_list').get((req, res) => { //if user goes to URL/__site__s/
    recipe.find() //moongoose method which gets list of all __site__s from mongoDB 
        .then(recipes => res.json(recipes))
        .catch(err => res.status(400).json('Error: ' + err));
}); 

module.exports = routerModule;