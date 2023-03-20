const routerModule = require('express').Router()
const mongooseModule = require('mongoose');
const {User} = require('../models/users.model');

routerModule.route('/load_today').post((req, res) => {  
    var todaysMeals = new Array();

    const comparisonDate = req.body.comparisonDate;
    console.log('comparisonDate:',comparisonDate);
    const userID = req.body.ID;
    console.log('userID:',userID);
    User.findById(userID)
    .then(currentUser => {
        
        currentUser.diet.forEach(function (food){
            if (food.dateEaten === comparisonDate){
                todaysMeals.push(food);
            } 
        });
        res.json(todaysMeals)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

routerModule.route('/add_meal').post((req, res) => { 
    const newMeal = {
        name: req.body.name,
        timeEaten: req.body.timeEaten,
        nutrients: req.body.nutrients,
        dateEaten: req.body.dateEaten,
    };

    const userID = req.body.ID;
    User.findById(userID)
    .then(currentUser => {
        currentUser.diet.push(newMeal);
    currentUser.save()
        .then(() => res.json('Meal added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    //if there's an error
    .catch(err => res.status(400).json('Error: ' + err));
});

routerModule.route('/remove_meal').post((req, res) => { 
    const mealToRemove = req.body.meal; 

    const userID = req.body.ID;
    User.findById(userID)
        .then(currentUser => {
            // shallow equality comparison of objects
            function shallowEqualityTest(object1) {
                const keys1 = Object.keys(object1);
                const keys2 = Object.keys(mealToRemove);
              
                if (keys1.length !== keys2.length) {
                  return false;
                }
              
                for (let key of keys1) {
                  if (object1[key] !== mealToRemove[key]) {
                    return false;
                  }
                }
              
                return true;
              }

            const index = currentUser.diet.findIndex(shallowEqualityTest);
            
            currentUser.diet.splice(index, 1);
            
            currentUser.save()
                .then(() => res.json('meal removed!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    });

module.exports = routerModule;