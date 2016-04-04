
angular.module('drinks',[])

	.controller('archive', function($scope, $http) {
        $scope.formData = {};

        // GET =====================================================================
        // when landing on the page, get all Drinks and show them
        // use the service to get all the Drinks
        $http.get('/api/drinks')
            .success(function(data) {
            	$scope.drinks = data;
                $scope.whiskey = [];
                for(drink in data){
                	switch((data[drink].baseSpirit).toString()){
                		case "Whiskey":
                			$scope.whiskey.push(data[drink])
                			break;
                		default:
                			console.log("No base spirit? This must be a virgin cocktail");
                	}

                }
                //console.log(data);
            });
        });

        
