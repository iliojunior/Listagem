(function () {

    'use strict';

    var app = angular.module('app');

    app.controller("PrincipalController", ['$scope', '$http', PrincipalController]);

    app.controller("CreateController", ['$scope', '$http', CreateController]);


    function PrincipalController($scope, $http) {
        document.querySelector("#search").focus();

        $scope.indexSelected = 0;
        $scope.directories = [];
        $scope.dirFiltered = [];


        $http.get("getDir.php")
            .then(function (response) {
                console.log(response);
                $scope.directories = [];
                $scope.directories = response.data;
            })
            .catch(function (err) {
                console.error("Erro: " + err);
            });

        function checkKey(event) {

            var keyCode = event.keyCode;

            switch (keyCode) {
                case 40:
                    if ($scope.indexSelected < $scope.dirFiltered.length)
                        setSelected($scope.indexSelected + 1);
                    break;

                case 38:
                    if ($scope.indexSelected > 0)
                        setSelected($scope.indexSelected - 1);
                    break;

                case 13:
                    var i = ($scope.indexSelected - 1);

                    var item = $scope.dirFiltered[$scope.indexSelected - 1];
                    console.debug(item);
                    if (i < $scope.dirFiltered.length && i >= 0)
                        window.location.href = $scope.dirFiltered[$scope.indexSelected - 1].link;
                    break;
            }

        }

        function isSelected(index) {
            return (index === ($scope.indexSelected - 1));
        }

        function setSelected(position) {
            $scope.indexSelected = position;
        }

        $scope.checkKey = checkKey;
        $scope.isSelected = isSelected;

    }

    function CreateController($scope, $http) {
        $scope.subpastas = [];
        $scope.nova_pasta = "";
        $scope.nova_subpasta = "";

        function adicionar_subpasta($nova_subpasta) {
            if ($scope.nova_pasta === undefined || $scope.nova_pasta === "") {
                alert("Informe o nome da pasta!");
                document.querySelector("#nova_pasta").focus();
            } else {
                $scope.subpastas.push($nova_subpasta);
                $scope.nova_subpasta = "";
            }
        }

        function criar_nova_pasta() {

            $http.post("createDir.php",
                {
                    nome_pasta: $scope.nova_pasta,
                    sub_pastas: $scope.subpastas
                })
                .then(function (response) {
                    alert("Salvo com sucesso! \r\n" + response.data);
                    resetNovos();
                })
                .catch(function (response) {
                    alert("Erro ao salvar! \r\n" + response);
                });
        }

        function resetNovos() {
            $scope.nova_pasta = "";
            $scope.nova_subpasta = "";
            $scope.subpastas = [];
        }

        $scope.adicionar_subpasta = adicionar_subpasta;
        $scope.criar_nova_pasta = criar_nova_pasta;

    }

})();
