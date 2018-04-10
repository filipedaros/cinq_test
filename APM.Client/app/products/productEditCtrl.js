(function () {
    "use strict";

    angular
        .module("productManagement")
        .controller("ProductEditCtrl",
        ProductEditCtrl);

    function ProductEditCtrl($scope, $routeParams, productResource) {
        var vm = this;
        vm.product = {};
        vm.message = '';
        //In real world this would come from webapi
        vm.availableCurrencies = [
            { symbol : '\u20AC', name : 'Euro', rate : 1 / 0.9 }, //1 dollar -> 0.9 euros
            { symbol : 'R$', name : 'Real', rate : 1 / 3.4}, //1 dollar -> ~ 3.4 reais
            { symbol : 'U$', name : 'Dollar', rate : 1 }
        ]
        vm.selectedCurrency = vm.availableCurrencies[0];
        
        productResource.get({ id: $routeParams.id },
            function (data) {
                vm.product = data;
                vm.priceCustomCurrency = parseFloat((vm.product.price / vm.selectedCurrency.rate).toFixed(2));

                vm.originalProduct = angular.copy(data);

                if (vm.product && vm.product.productId) {
                    vm.title = "Edit: " + vm.product.productName;
                }
                else {
                    vm.title = "New Product";
                }
            },
            function (response) {
                vm.message = response.statusText + "\r\n";
                if (response.data.exceptionMessage) {
                    vm.message += response.data.exceptionMessage;
                }
            });

        $scope.updatePrices = function () {
            vm.product.price = parseFloat(vm.priceCustomCurrency * vm.selectedCurrency.rate);
        }

        vm.submit = function () {
            vm.message = '';
            if (vm.product.productId) {
                vm.product.$update({ id: vm.product.productId },
                    function (data) {
                        vm.message = "... Save Complete";
                    },
                    function (response) {
                        vm.message = response.statusText + "\r\n";

                        if (response.data.modelState) {
                            for (var key in response.data.modelState) {
                                vm.message += response.data.modelState[key] + "\r\n";
                            }
                        }

                        if (response.data.exceptionMessage) {
                            vm.message += response.data.exceptionMessage;
                        }
                    })
            } else {
                vm.product.$save(
                    function (data) {
                        vm.originalProduct = angular.copy(data);
                        vm.message = "... Save Complete";
                    },
                    function (response) {
                        vm.message = response.statusText + "\r\n";

                        if (response.data.modelState) {
                            for (var key in response.data.modelState) {
                                vm.message += response.data.modelState[key] + "\r\n";
                            }
                        }

                        if (response.data.exceptionMessage) {
                            vm.message += response.data.exceptionMessage;
                        }
                    })
            }
        };

        vm.cancel = function (editForm) {
            editForm.$setPristine();
            vm.product = angular.copy(vm.originalProduct);
            vm.message = "";
        };

    }

    angular
        .module("productManagement")
        .directive('productCode', function () {
            return {
                require: 'ngModel',
                link: function (scope, element, attr, ctrl) {
                    function validateProductCode(value) {
                        var regex = new RegExp('[A-Z]{3}-[0-9]{4}$'); //AAA-9999
                        ctrl.$setValidity('codeValidator', regex.test(value));
                        return value;
                    }

                    ctrl.$parsers.push(validateProductCode);
                }
            }
        })
}());
