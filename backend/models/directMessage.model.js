const mongooseModule = require('mongoose');
const blueprint = mongooseModule.Schema;

const directMessageBP = new blueprint({
  _id:  mongooseModule.Schema.Types.ObjectId,
  fromID: String,
  toID: String,
  directMessage: {    
    username: String,
    entryDate: String,
    message: String,
  },
});


const social = mongooseModule.model('directMessage', directMessageBP);

//exporting new blueprint
module.exports = social;