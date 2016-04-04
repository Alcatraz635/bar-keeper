var Drink = require('./drink-model');

module.exports = function(app) {
    //API
    app.route('/api/drinks')
        // get all drinks
        .get(function(req, res) {
            // use mongoose to get all drinks in the database
            Drink.find(function(err, drinks) {
                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err)
                    res.send(err)
                res.json(drinks); // return all drinks in JSON format
            });
        })
        // create drink and send back all drinks after creation
        .post(function(req, res) {
            // create a drink, information comes from AJAX request from Angular
            Drink.create({
                name: req.body.name,
                done: false
            }, function(err, drink) {
                if (err)
                    res.send(err);
                // get and return all the drinks after you create another
                drink.find(function(err, drinks) {
                    if (err)
                        res.send(err)
                    res.json(drinks);
                });
            });
        });

    app.route('/api/drinks/:drink_id')
        // delete a drink
        .delete(function(req, res) {
            drink.remove({
                _id: req.params.drink_id
            }, function(err, drink) {
                if (err)
                    res.send(err);
                // get and return all the drinks after you create another
                drink.find(function(err, drinks) {
                    if (err)
                        res.send(err)
                    res.json(drinks);
                });
            });
        });
}