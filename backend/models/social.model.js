const mongooseModule = require('mongoose');
const blueprint = mongooseModule.Schema;

const socialBP = new blueprint({
  _id:  mongooseModule.Schema.Types.ObjectId,
  userID: String,
  socialPost: {
    username: String,
    entryDate: String,
    postMessage: String,
    imageLink: String,
    location: String,
    replies: [],
  },
});


const social = mongooseModule.model('social', socialBP);

//exporting new blueprint
module.exports = social;