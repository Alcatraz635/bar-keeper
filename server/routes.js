var Drink = require('./drink-model');

function getDrinks(res) {
    Drink.find(function(err, drinks) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            console.log(err);
            res.send(err);
        }
        // return all todos in JSON format
        res.json(drinks);
    });
};

module.exports = function(app) {
    //API
    app.route('/api/drinks')
        // get all drinks
        .get(function(req, res) {
            // use mongoose to get all drinks in the database
            getDrinks(res);
        })
        // create drink and send back all drinks after creation
        .post(function(req, res) {
            // create a drink, information comes from AJAX request from Angular
            console.log(req.body);
            Drink.create({
                name: req.body.name,
                baseSpirit: req.body.baseSpirit,
                garnish: req.body.garnish,
                glass: req.body.glass,
                ingredientFiveAmount: req.body.ingredientFiveAmount,
                ingredientFiveName: req.body.ingredientFivename,
                ingredientFourAmount: req.body.ingredientFourAmount,
                ingredientFourName: req.body.ingredientFourName,
                ingredientOneAmount: req.body.ingredientOneAmount,
                ingredientOneName: req.body.ingredientOneName,
                ingredientThreeAmount: req.body.ingredientThreeAmount,
                ingredientThreeName: req.body.ingredientThreeName,
                ingredientTwoAmount: req.body.ingredientTwoAmount,
                ingredientTwoName: req.body.ingredientTwoName,
                notes: req.body.notes,
                done: false
            }, function(err, drink) {
                getDrinks(res);
            })
        });

    app.route('/api/drinks/:drink_id')
        // delete a drink
        .delete(function(req, res) {
                console.log(req.params)
                Drink.remove({
                        _id: req.params.drink_id
                    }, 
                        function(err, drink) {
                            getDrinks(res);
                });
        });
}
