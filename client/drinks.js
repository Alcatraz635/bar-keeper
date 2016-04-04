angular.module('drinks', [])


.factory('drinksFactory', ['$http',
    function($http) {
        return {
            get: function() {
                return $http.get('/api/drinks');
            },
            post: function() {
                return $http.get('/api/drinks');
            },
            delete: function() {
                return $http.get('/api/drinks/:drink_id');
            },
        }
    }
])

.controller('archive', ['$scope', '$http', 'drinksFactory', function($scope, $http, drinksFactory) {

    $scope.formData = {};

    // GET =====================================================================
    // when landing on the page, get all Drinks and show them
    // use the service to get all the Drinks
    drinksFactory.get()
        .success(function(data) {
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
        })
        .error(function(data){
            console.log(data);
        });
}]);