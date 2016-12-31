var myApp = angular.module('app', []);
myApp.controller('mean', function($scope, $http) {
    
    $scope.users = [];
    $scope.user = {};
    var getUsers = function() {
        $http.get('/getContacts').success(function(res) {
            $scope.users = res;
        });
    };

    getUsers();
    
    $scope.addUser = function(){
            $scope.user._id = "";
        $http.post('/addContact', $scope.user).success(function(res){
            getUsers();
            $scope.user.name = "";
            $scope.user.lastName = "";
            $scope.user.phone = "";
            
        });
    }
    
    $scope.deleteUser = function(id){
        
        $http.get('/deleteUser/'+id).success(function(res){
            getUsers();
        });
    }
    
    $scope.edite = function(id){
        var find;
        for(i = 0; i < $scope.users.length; i++){
            if($scope.users[i]._id == id){
                $scope.user.name = $scope.users[i].name;
                $scope.user.lastName = $scope.users[i].lastName;
                $scope.user.phone = $scope.users[i].phone;
                $scope.user._id = $scope.users[i]._id;
                break;
            }
        }
    }
    
    $scope.update = function(){
        $http.post('/update',$scope.user).success(function(res){
            getUsers();
            $scope.user = {};
        });
    }
});