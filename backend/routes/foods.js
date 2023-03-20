const routerModule = require('express').Router();
const {User} = require('../models/users.model');
const mongooseModule = require('mongoose');

routerModule.route('/load_foods').post((req, res) => {   
    const userID = req.body.ID;
    User.findById(userID)
    .then(userData => res.json(userData.foodItems))
    .catch(err => res.status(400).json('Error: ' + err));
});

routerModule.route('/remove_food').post((req, res) => { 
    const foodToRemove = req.body.food; 

    const userID = req.body.ID;
    User.findById(userID)
        .then(currentUser => {
            //shallow equality comparison of objects
            function shallowEqualityTest(object1) {
                const keys1 = Object.keys(object1);
                const keys2 = Object.keys(foodToRemove);
              
                if (keys1.length !== keys2.length) {
                  return false;
                }
              
                for (let key of keys1) {
                  if (object1[key] !== foodToRemove[key]) {
                    return false;
                  }
                }
              
                return true;
              }

            const index = currentUser.foodItems.findIndex(shallowEqualityTest); 
            
            currentUser.foodItems.splice(index, 1);
            
            currentUser.save()
                .then(() => res.json('Food removed!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

routerModule.route('/add_food').post((req, res) => {
    const newIngredientName = req.body.ingredientName; //request data from body
    const newExpiryDate = req.body.expiryDate; 
    const newFoodType = req.body.foodType; 

    const newFood = {
        ingredientName : newIngredientName,
        expiryDate: newExpiryDate,
        foodType: newFoodType, 
    };

    const userID = req.body.ID;
    User.findById(userID)
        .then(currentUser => {
            currentUser.foodItems.push(newFood);
            
            currentUser.save()
                .then(() => res.json('Food added!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    });



module.exports = routerModule;