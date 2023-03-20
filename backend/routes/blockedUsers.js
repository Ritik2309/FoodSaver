const routerModule = require('express').Router();
const blockedUsers = require('../models/blockedUsers.model');
const directMessage = require('../models/directMessage.model');
const mongooseModule = require('mongoose');
const { User } = require('../models/users.model');
const { isEmpty, result } = require('lodash');


routerModule.route('/load_blockedusers').post(async(req, res) => {
  const userID = req.body.ID
  await blockedUsers.find({'userID': userID}).select(['-userID']).select(['-_id']).select(['-blockedUsers.blockedUserID']).then(
      result =>{res.json(result)})
});


routerModule.route('/unblockUser').post((req, res) => { 
    const userID = req.body.ID
    const blockedUserObjectID = req.body.blockedUserObjectID;
    blockedUsers.updateOne({'userID':userID }, {"$pull":{"blockedUsers":{"_id": blockedUserObjectID}}})
        .then(() => res.json('User blocked!'))
        .catch(err => res.status(400).json('Could not block user!' + err));
    
});
routerModule.route('/block_user').post(async(req, res) => {

    const userID = req.body.ID;
    let username = "";
    let blockedUserID = "";
    const DMid = req.body.DMid;
    const _id = new mongooseModule.Types.ObjectId();
    await directMessage.findById(DMid).select('fromID')
        .then(result=>{
             console.log(result)
             User.findById(result.fromID).then(Userres=>{username=Userres.name, blockedUserID=Userres._id})
        })
    let blockedListExists = await blockedUsers.find({'userID':userID })
    console.log(blockedListExists)
    if (!isEmpty(blockedListExists)){
        blockedUserObject={
            username:username, 
            blockedUserID: blockedUserID},
        blockedUsers.updateOne({'userID':userID }, {"$push":{"blockedUsers":blockedUserObject}})
            .then(() => res.json('User blocked!'))
            .catch(err => res.status(400).json('Could not block user!' + err));

    }  else{
        const newBlockedUser = new blockedUsers({
            _id: _id,
            userID: userID,
            blockedUsers: [{
              username: username,
              blockedUserID: blockedUserID,
          }]
        })
          
        await newBlockedUser.save()
            .then(() => res.json('User blocked !'))
            .catch(err => res.status(400).json('Could not block user!' + err));

    }      
    
});



module.exports = routerModule;
