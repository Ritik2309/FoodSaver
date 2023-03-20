//Loading blueprint module
const mongooseModule = require('mongoose');
const blueprint = mongooseModule.Schema;

//creating a blueprint
const recipeBP = new blueprint({
    _id: mongooseModule.Schema.Types.ObjectId,

    title: {
        type: String,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    },
    servings: {
        type: String,
        required: true,
    },
    ingredients: {
        type: Array,
        required: true,
    },
    instructions: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    nutrients: {
        calories: {type: String, required: true},
        carbohydrateContent: {type: String, required: true},
        fatContent: {type: String, required: true},
        fiberContent: {type: String, required: true},
        proteinContent: {type: String, required: true},
        saturatedFatContent: {type: String, required: true},
        sugarContent: {type: String, required: true},
    },
    veg: {
        type: Boolean
    },
});

const recipe = mongooseModule.model('recipes', recipeBP);

//exporting new blueprint
module.exports = recipe;
