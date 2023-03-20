const mongooseModule = require('mongoose');
const blueprint = mongooseModule.Schema;

const blockedUsersBP = new blueprint({
  _id:  mongooseModule.Schema.Types.ObjectId,
  userID: String,
  blockedUsers: [{
    username: String,
    blockedUserID: String,
}]
});


const blockedUsers = mongooseModule.model('blockedusers', blockedUsersBP);

//exporting new blueprint
module.exports = blockedUsers;