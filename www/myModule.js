angular.module("myModule", [])
    .factory('myService', function($http) {
        return {
            list: function($scope) {
                $http.get('/api/users').then(function mySuccess(res) {
                        $scope.users = res.data;
                    },
                    function myError(res) {
                        console.log("ERROR");
                    });
            },
            add: function($scope) {
                 $http({
                    method: 'POST',
                    url: '/api/users',
                    data: {
                        "name": $scope.c_name,
                        "title": $scope.c_title,
                        "sex": $scope.c_sex,
                        "age": $scope.c_age
                    }
                }).then(function mySuccess(res) {
                    console.log("sucess to create a new user");
                }, function myError(res) {
                    console.log("failed to create a new user");
                });
            },
            get: function(userId, $scope) {
                $http.get('/api/user/' + userId).then(function mySuccess(res) {
                    $scope.user = res.data;
                    $scope.u_name = $scope.user.name;
                    $scope.u_title = $scope.user.title;
                    $scope.u_sex = $scope.user.sex;
                    $scope.u_age = $scope.user.age;
                }, function myError(res) {
                    console.log("my service : getId error");
                });
            },
            update: function(updateId, $scope) {
                var data = {
                    "name": $scope.u_name,
                    "title": $scope.u_title,
                    "sex": $scope.u_sex,
                    "age": $scope.u_age
                };
                $http.put('/api/user/' + updateId, data).then(function mySuccess(res) {
                    console.log("sucessed to update a new user");
                }, function myError(res) {
                    console.log("failed to update a new user");
                });
            },
            delete: function(userId) {
                $http.delete('/api/user/' + userId).then(function mySuccess(res) {
                    console.log("sucessed to delte a new user");
                }, function myError(res) {
                    console.log("failed to delete a new user");
                });
            }
        }
    });
