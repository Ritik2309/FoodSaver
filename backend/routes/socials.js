const routerModule = require('express').Router();
const social = require('../models/social.model');
const mongooseModule = require('mongoose');


routerModule.route('/load_posts').post((req, res) => {
  const userID = req.body.ID
  social.find({'userID': userID}).sort({"created_at": 1}) //moongoose method which gets list of all __site__s from mongoDB 
        .then(yourPosts =>{
          social.find({'userID': { $ne: userID }}).select(['-userID']).sort({"created_at": -1})
            .then(otherPosts=>{
            const results = yourPosts.concat(otherPosts)
            res.json(results)
          })
          
        })
        //if there's an error
        .catch(err => res.status(400).json('Error: ' + err))});



routerModule.route('/remove_post').post((req, res) => { 
    const postToRemove = req.body.ID; 

    social.findByIdAndDelete(postToRemove)
                .then(() => res.json('Post removed!'))
                .catch(err => res.status(400).json('Error: ' + err));
});

routerModule.route('/add_post').post(async(req, res) => {
    const userID = req.body.userID
    const username = req.body.username;
    const newEntryDate = req.body.newEntryDate;
    const newMessage = req.body.newMessage;
    const location = req.body.location;
    const imageLink = req.body.imageLink;
    const _id = new mongooseModule.Types.ObjectId();
    
             
    const newSocial = new social({
      _id: _id,
      userID: userID,
      socialPost: {
        username : username,
        entryDate: newEntryDate,
        postMessage: newMessage,
        imageLink: imageLink,
        location: location,
        replies: [],
      }
        
    });
    

    await newSocial.save()
        .then(() => res.json('Post added!'))
        .catch(err => res.status(400).json('Could not post message!' + err));


});

routerModule.route('/add_reply').post(async(req, res) => {
  
  const _id = req.body.postID
  const reply ={
   username: req.body.reply.username,
   entryDate: req.body.reply.entryDate,
   replyMessage: req.body.reply.replyMessage,
}
  social.findById(_id)
    .then(currentPost => {
      currentPost.socialPost.replies.push(reply);
    currentPost.save()
      .then(() => res.json('Reply added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  })
});



module.exports = routerModule;
