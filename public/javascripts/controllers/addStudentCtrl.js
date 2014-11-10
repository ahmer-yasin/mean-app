/**
 * Created by Jahanzaib on 11/5/2014.
 */
angular.module('managementApp')
    .controller('addStudentCtrl',function($scope,$http,$location){
            $scope.addStudent= function(newStudent){
                newStudent.subjects=[
                    $scope.subject1,
                    $scope.subject2,
                    $scope.subject3,
                    $scope.subject4,
                    $scope.subject5
                ];
               newStudent.studentTask={
                   task:"",
                   comments:[],
                   taskDone:false,
                   taskRating:0
               };

                $http.post('admin/addStudent',newStudent).
                    success(function(data){
                        if(data){
                         $location.path('/adminDashboard')
                        }else{
                            $scope.invalidForm=true;
                        }
                    }).
                    error(function(eror){
                    })
            }
    });
