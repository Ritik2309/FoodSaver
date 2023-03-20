const routerModule = require('express').Router();
const {User} = require('../models/users.model');


routerModule.route('/load_shopping').post((req, res) => {   
    const userID = req.body.ID;
    User.findById(userID)
    .then(userData => res.json(userData.planningShopping))
    .catch(err => res.status(400).json('Error: ' + err));
});
routerModule.route('/clear_List').post((req, res) => {   
    const userID = req.body.ID;
    User.findById(userID)
    .then(userData => res.json(userData.planningShopping))
    .catch(err => res.status(400).json('Error: ' + err));
});

routerModule.route('/remove_item').post((req, res) => { 
    const itemToRemove = req.body.itemToRemove; 
    
    const userID = req.body.ID;
    
      User.findById(userID)
        .then(currentUser => {
          
            currentUser.planningShopping.forEach(element => {
                console.log("element: ",element)
                    if (element === itemToRemove){
                        currentUser.planningShopping.pull(itemToRemove)
                        currentUser.save()
                                .then(() => res.json('item removed!'))
                                .catch(err => res.status(400).json('Error: ' + err));
                          
                    }
                   
            });
        })
});


routerModule.route('/add_item').post(async (req, res) => {
    const itemName = req.body.name; //requesting data from body loaded to const
    
    const userID = req.body.ID;
    await User.findById(userID)
        .then(currentUser => {
            currentUser.planningShopping.push(itemName);
            
            currentUser.save()
                .then(() => res.json('Item added!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    });



module.exports = routerModule;