/**
 * Created by HACKER'S on 11/4/2014.
 */
angular.module('managementApp')
    .controller('studentDashCtrl',function($scope,$http,$location){
        $scope.login=false;
        console.log("hello");

        $http.post('student/dashboard').
                    success(function(data){
                        if(typeof data == 'object'){
                            $scope.student=data;
                            $scope.login=true;
                        }else{
                            $scope.login=false;
                            $location.path('studentLogin');
                        }
                }).
                    error(function(eror){
                        $location.path('studentLogin');
                    });

        $scope.addComments=function(comment){
            if(comment.length < 1){
                return false;
            }else{
            $scope.student.studentTask.comments.push($scope.student.firstName+': '+comment);
            $http.post('student/addComent',$scope.student).
                success(function(data){
                    $scope.student=data;
                    $scope.comment='';
                }).
                error(function(eror){
                });
            }
        };

        $scope.logOutStudent=function(){
            $scope.student='';
            $scope.login=false;
            $http.post('student/logout').
                success(function(data){

                }).
                error(function(eror){
                });
            $location.path('#');
        };

    })

