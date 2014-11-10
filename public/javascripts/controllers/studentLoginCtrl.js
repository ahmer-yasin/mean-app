/**
 * Created by Jahanzaib on 11/5/2014.
 */
angular.module('managementApp')
    .controller('studentLoginCtrl',function($scope,$http,$location){
        $scope.login=false;
        $scope.studentLogin=function(studentLog){
            $http.post('student/login',studentLog).
                success(function(data){
                    if(typeof data == 'object'){
                        $scope.login=true;
                        $scope.student=data;
                        $location.path('studentDashboard');
                    }else{
                        alert('student not found')
                    }
                }).
                error(function(eror){
                    alert('error');
                })
        };

    });
