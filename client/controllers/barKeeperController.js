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
    $scope.createdSuccessFlag = false;
    
    $scope.deleteSuccessFlag = false;
    
    $scope.deleteDrinkCount = 0;
    
    $scope.createDrinkCount = 0;
    
    $scope.deletedDrink = "";
   
    $scope.createdDrink = "";


    //Function to sort drinks into base spirit cat
    function sortBaseSpirit(data) {
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
        $scope.createSuccessFlag = false;
        $scope.deletedDrink = "";
        barKeeperFacotry.create($scope.formData)
            .success(function(data) {
                    $scope.deleteDrinkCount = $scope.drinks.length; 
                    $scope.formData = {}; 
                    sortBaseSpirit(data); 
                    console.log($scope.drinks.length);
            })
    }
    //DELETE====================================================================
    $scope.deleteDrink = function(id, name) {
        $scope.deleteSuccessFlag = false;
        $scope.deletedDrink = name.toString();
        barKeeperFacotry.delete(id)
            .success(function(data) {
                $scope.deleteDrinkCount = $scope.drinks.length;
                sortBaseSpirit(data)
                if($scope.deleteDrinkCount > $scope.drinks.length){
                     $scope.deleteSuccessFlag = true;
                }
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