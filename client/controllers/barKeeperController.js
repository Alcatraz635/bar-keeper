angular.module('barKeeper', [])
//Factory for http calls to the node API
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
//Main controller for bar keeper application
.controller('barKeeperController', ['$scope', '$http', 'barKeeperFacotry',
    function($scope, $http, barKeeperFacotry) {
        //Data from form to create new drink
        $scope.formData = {};
        //Flag to indicate new drink was created successfully
        $scope.createdSuccessFlag = false;
        //Flag to indicate new drink was deleted successfully
        $scope.deleteSuccessFlag = false;

        //Current number of drinks for delete drink function
        $scope.deleteDrinkCount = 0;

        //Current number of drinks for create drink function
        $scope.createDrinkCount = 0;

        //Name of last deleted drink
        $scope.deletedDrink = "";

        //Name of last created drink
        $scope.createdDrink = "";
        //Function to sort drinks into base spirit arrays
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
            $scope.createdDrink = $scope.formData.name;
            barKeeperFacotry.create($scope.formData)
                .success(function(data) {
                    $scope.createdDrink = $scope.formData.name;
                    //console.log($scope.createdDrink);
                    $scope.createDrinkCount = $scope.drinks.length;
                    sortBaseSpirit(data);
                    if ($scope.createDrinkCount < $scope.drinks.length) {
                        $scope.createSuccessFlag = true;
                        $scope.formData = {};
                    }
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
                    if ($scope.deleteDrinkCount > $scope.drinks.length) {
                        $scope.deleteSuccessFlag = true;
                    }
                });
        }
        // GET =====================================================================
        //When landing on the page, get all Drinks and show them
        barKeeperFacotry.get()
            .success(function(data) {
                sortBaseSpirit(data);
            })
    }
]);