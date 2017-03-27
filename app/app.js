(function () {

    'use strict';

    var app = angular.module('app');

    app.controller("PrincipalController", ['$scope', '$http', PrincipalController]);

    document.querySelector("#search").focus();

    function PrincipalController($scope, $http) {
        $scope.directories = [];

        $http.get("getDir.php")
            .then(function (response) {
                console.log(response);
                $scope.directories = [];
                $scope.directories = response.data;
            })
            .catch(function (err) {
                console.error("Erro: " + err);
            });
    }

})();
