//Loading blueprint module
const mongooseModule = require('mongoose');
const blueprint = mongooseModule.Schema;

//creating a blueprint
const ingredientBP = new blueprint({
    _id: mongooseModule.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    expirayInDays: {
        type: Number,
        required: true,
    },
    tags: [{
        Dairy: {type: Boolean, required: true},
        Drinks: {type: Boolean, required: true},
        Fruits: {type: Boolean, required: true},
        Grains: {type: Boolean, required: true},
        Proteins: {type: Boolean, required: true},
        Vegetables: {type: Boolean, required: true},
        other: {type: Boolean, required: true},
    }],
});

const ingredient = mongooseModule.model('ingredients', ingredientBP);

//exporting new blueprint
module.exports = ingredient;
