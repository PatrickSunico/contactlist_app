var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$http', function($scope, $http){
  console.log('From the controller');

  //$http service to abbreviate our HTTP Verbs i.e GET, PUT ,DELETE and so on
  var refresh = function() { //Add refresh function to immidiately refresh the page once we add a new contact
    $http.get('/contacts').success(function(response){ // get request from the server
      console.log('I got the data I requested');
      $scope.contacts = response; //response callback from the server through the $scope so we can interpolate it through the view
      $scope.contact = '';

    }).error(function(err,status){ //err handling
        console.log(err);
    });
  };

  refresh(); //call refresh to call the get route

  //Post Request
  $scope.addContact = function() {
    console.log($scope.contact); //from terminal in browser
    $http.post('/contacts', $scope.contact).success(function(response) {
      console.log('New Data Entered');
      refresh(); //Auto refresh onced ng-click event is done
    }); //http post request from angular to node, Where $scope.contact are the values inside of the text fields

  };

  //objId id of the contact we want to delete from the view.
  $scope.delete = function(objId) {
    console.log(objId);
    $http.delete('/contacts/' + objId).success(function() {
      refresh(); //once delete refresh the view
    });
  };

  $scope.edit = function(objId) {
    $http.get('/contacts/' + objId).success(function(response) {
      $scope.contact = response; // set response to the the contact ng-model
    });
  };

  //$scope.contact._id url of the contact in the box
  //$scope.contact = ng-model of each input in the form
  $scope.update = function() {
      $http.put('/contacts/' + $scope.contact._id, $scope.contact).success(function(response){
        refresh();
      });
  };

  $scope.clear = function() {
    $scope.contact = "";
  };
  
}]);
