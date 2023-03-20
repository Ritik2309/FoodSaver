const routerModule = require('express').Router();
const directMessage = require('../models/directMessage.model');
const mongooseModule = require('mongoose');
const social = require('../models/social.model');


routerModule.route('/load_DMs').post(async(req, res) => {
    const userID = req.body.ID;
    let result = new Array();
    await directMessage.find({toID: userID}).select(['-toID']).select(['-fromID']) //
        .then(allDMs =>{
            allDMs.forEach(res=>{
                result.push(res)
                console.log(result)
            })
            res.json(result)})
            
        
        .catch(err => res.status(400).json('Error: ' + err));
});


routerModule.route('/send_DM').post(async(req, res) => {
    const fromID = req.body.ID
    const postID = req.body.postID
    const username = req.body.username
    let toID = ""
    const entryDate = req.body.entryDate
    const message = req.body.message
    const _id = new mongooseModule.Types.ObjectId();
    await social.findById(postID)
        .then(res => {toID = res.userID});
    
    
    const newDirectMessage = new directMessage({
        _id: _id,
        fromID: fromID,
        toID: toID,
        directMessage: {
        username : username,
        entryDate: entryDate,
        message: message
        }
    });
    await newDirectMessage.save()
        .then(() => res.json('DM sent!'))
        .catch(err => res.status(400).json('Could not send DM!' + err));
  
});
routerModule.route('/reply_DM').post(async(req, res) => {
    const fromID = req.body.fromID
    const DMid = req.body.DMid
    let toID_ = ""
    const message= req.body.message
    const username= req.body.username
    const entryDate= req.body.entryDate
    const _id = new mongooseModule.Types.ObjectId();

    await directMessage.findById(DMid)
        .then(result => {toID_ = result.fromID})
    const newDirectMessage = new directMessage({
        _id: _id,
        fromID: fromID,
        toID: toID_,
        directMessage: {
        username : username,
        entryDate: entryDate,
        message: message
        }
    });
    await newDirectMessage.save()
        .then(() => res.json('DM Reply sent!'))
        .catch(err => res.status(400).json('Could not send DM!' + err));
   
});




module.exports = routerModule;
