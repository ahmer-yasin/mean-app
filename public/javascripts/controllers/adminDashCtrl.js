/**
 * Created by Jahanzaib on 11/5/2014.
 */
angular.module('managementApp')
    .controller('adminDashCtrl',function($scope,$http,$location){
        $http.post('admin/dashboard').
            success(function(data){
                console.log('admin dash ctrl');
                console.log(data);
                $scope.allStudent=data;
            }).
            error(function(eror){
            });


        $scope.editStudent=function(index){
            $scope.indx=index;
            $http.post('admin/editStudent',{'index':index}).
                success(function(data){
                    $scope.editingStudent=data;
                    console.log($scope.editingStudent)
                }).
                error(function(eror){
                });
        };

        $scope.saveEditedStudent=function(){
            $http.post('admin/saveEditStudent',$scope.editingStudent).
                success(function(data){
                    console.log(data);
                    $scope.allStudent=data;
                //    $scope.$digest();
                    console.log($scope.allStudent);
                }).
                error(function(eror){
                });
        };

        $scope.deleteEditedStudent=function(){
            $http.post('admin/deleteEditStudent',{'index':$scope.indx}).
                success(function(data){
                    $scope.allStudent=data;
                    console.log('deleted');
                }).
                error(function(eror){
                });
        };

        $scope.comentTask=function(cmnt){
            if(cmnt.length < 1){
                $scope.cmnt='';
                $scope.saveEditedStudent();
            }else{
                $scope.editingStudent.studentTask.comments.push('Admin: '+cmnt);
                $scope.cmnt='';
                $scope.saveEditedStudent();
            }
        };

        $scope.logOutAdmin = function(){
            $http.get('admin/logout').
                success(function(){
                    $location.path('#')
                }).
                error(function(){})
        }
    });


