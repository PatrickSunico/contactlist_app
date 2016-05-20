var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$http', function($scope, $http){
  console.log('From the controller');

  //$http service to abbreviate our HTTP Verbs i.e GET, PUT ,DELETE and so on
  var refresh = function() {
    $http.get('/contacts').success(function(response){ // get request from the server
      console.log("I got the data I requested");
      $scope.contacts = response; //response callback from the server through the $scope so we can interpolate it through the view
      $scope.contact = "";

    }).error(function(err,status){ //err handling
        console.log(err);
    });
  }


  //Post Request
  $scope.addContact = function() {
    console.log($scope.contact); //from terminal in browser
    $http.post('/contacts', $scope.contact).success(function(response) {
      console.log('New Data Entered');

    }); //http post request from angular to node, Where $scope.contact are the values inside of the text fields

  };

}]);
