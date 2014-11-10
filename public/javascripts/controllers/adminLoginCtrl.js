/**
 * Created by HACKER'S on 11/4/2014.
 */
angular.module('managementApp')
    .controller('adminLoginCtrl',function($scope,$http,$location){
        $scope.invalidAdmin=false;
        $scope.adminLoginFunc = function(adminLogin){
            $http.post('admin/login',adminLogin).
                success(function(data){
                    if(data=='true'){
                    $location.path('/addStudent');
                    }else{
                        $scope.invalidAdmin=true;
                    }
                }).
                error(function(eror){
                    alert('eror to send request')
                });
        }


    });
