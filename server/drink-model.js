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
        lowercase: true,
        min: 1,
        max: 200
    },
    ingredientOneAmount: {
        type: String,
        required: true,
        lowercase: true,
        min: 1,
        max: 200
    },
    ingredientTwoName: {
        type: String,
        lowercase: true,
        min: 1,
        max: 200
    },
    ingredientTwoAmount: {
        type: String,
        lowercase: true,
        min: 1,
        max: 200
    },
    ingredientThreeName: {
        type: String,
        lowercase: true,
        min: 1,
        max: 200
    },
    ingredientThreeAmount: {
        type: String,
        lowercase: true,
        min: 1,
        max: 200
    },
    ingredientFourname: {
        type: String,
        lowercase: true,
        min: 1,
        max: 200
    },
    ingredientFourAmount: {
        type: String,
        lowercase: true,
        min: 1,
        max: 200
    },
    ingredientFiveName: {
        type: String,
        lowercase: true,
        min: 1,
        max: 200
    },
    ingredientFiveAmount: {
        type: String,
        lowercase: true,
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
        lowercase: true,
        min: 1,
        max: 200
    },
    baseSpirit: {
        type: String,
        lowercase: true,
        min: 1,
        max: 200
    },
});
module.exports = mongoose.model('Drink', drinkSchema);