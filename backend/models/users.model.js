const mongoose = require('mongoose');
const Joi = require("@hapi/joi");
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1024
    },
  
    calorieLimit: {
      type: Number,
      required: true,

    },
  
    foodItems: [],
    diet: [],
    planningShopping: [],
    planningMeals: [],
    directMessages: [],
    isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, name: this.name, email: this.email }, config.get('JWTSecret'));
    return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
      name: Joi.string().min(1).max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(1).max(255).required()
    });
    const validation = schema.validate(user);
    return validation
    
}
  
exports.User = User;
exports.validate = validateUser;