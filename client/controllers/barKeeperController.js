angular.module('barKeeper', [])


.factory('barKeeperFacotry', ['$http',
    function($http) {
        return {
            get: function() {
                return $http.get('/api/drinks');
            },
            create: function(drinkData) {
                return $http.post('/api/drinks', drinkData);
            },
            delete: function(id) {
                return $http.delete('/api/drinks/' + id);
            }
        }
    }
])

.controller('barKeeperController', ['$scope', '$http', 'barKeeperFacotry', function($scope, $http, barKeeperFacotry) {

    //Data from form to create new drink
    $scope.formData = {};
 
    function sortBaseSpirit(data){
                $scope.drinks = data;
                $scope.whiskey = [];
                $scope.gin = [];
                $scope.tequila = [];
                $scope.vodka = [];
                $scope.rum = [];
                $scope.brandy = [];
                for (drink in data) {
                    switch ((data[drink].baseSpirit).toString()) {
                        case "Whiskey":
                            $scope.whiskey.push(data[drink])
                            break;
                        case "Gin":
                            $scope.gin.push(data[drink])
                            break;
                        case "Tequila":
                            $scope.tequila.push(data[drink])
                            break;
                        case "Vodka":
                            $scope.vodka.push(data[drink])
                            break;
                        case "Rum":
                            $scope.rum.push(data[drink])
                            break;
                        case "Brandy":
                            $scope.brandy.push(data[drink])
                            break;
                        default:
                            console.log("No base spirit? This must be a virgin cocktail");
                    }

                } 
    }
    //CREATE==========================================================================
    // Validate data from the form and send to Node API
    $scope.createDrink = function() {
        barKeeperFacotry.create($scope.formData)
            .success(function(data) {
                $scope.formData = {};
                sortBaseSpirit(data);
            })
    }
    //DELETE====================================================================
    $scope.deleteDrink = function(id){
        console.log(id);
        barKeeperFacotry.delete(id)
            .success(function(data){
                sortBaseSpirit(data);
            });
    }
    // GET =====================================================================
    // when landing on the page, get all Drinks and show them
    // use the service to get all the Drinks
    barKeeperFacotry.get()
        .success(function(data) {
            sortBaseSpirit(data);
        })


}]);
