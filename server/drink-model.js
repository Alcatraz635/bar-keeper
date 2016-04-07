var mongoose = require('mongoose');

var drinkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        min: 1,
        max: 200
    },
    ingredientOneName: {
        type: String,
        required: true,
        min: 1,
        max: 200
    },
    ingredientOneAmount: {
        type: String,
        required: true,
        min: 1,
        max: 200
    },
    ingredientTwoName: {
        type: String,
        min: 1,
        max: 200
    },
    ingredientTwoAmount: {
        type: String,
        min: 1,
        max: 200
    },
    ingredientThreeName: {
        type: String,
        min: 1,
        max: 200
    },
    ingredientThreeAmount: {
        type: String,
        min: 1,
        max: 200
    },
    ingredientFourName: {
        type: String,
        min: 1,
        max: 200
    },
    ingredientFourAmount: {
        type: String,
        min: 1,
        max: 200
    },
    ingredientFiveName: {
        type: String,
        min: 1,
        max: 200
    },
    ingredientFiveAmount: {
        type: String,
        min: 1,
        max: 200
    },
    garnish: {
        type: String,
        lowercase: true,
        min: 1,
        max: 200
    },
    glass: {
        type: String,
        lowercase: true,
        min: 1,
        max: 200
    },
    notes: {
        type: String,
        min: 1,
        max: 200
    },
    baseSpirit: {
        type: String,
        min: 1,
        max: 200
    },
});
module.exports = mongoose.model('Drink', drinkSchema);