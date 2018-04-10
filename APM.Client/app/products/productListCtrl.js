(function () {
    "use strict";

    function productListCtrl($scope, $location, productResource) {
        var vm = this;
        vm.searchCriteria = '';
        vm.filteredResult = false;
        vm.editing = false;
        //In real world this would come from webapi
        vm.availableCurrencies = [
            { symbol: '\u20AC', name: 'Euro', rate: 0.9 }, //1 dollar -> 0.9 euros
            { symbol: 'R$', name: 'Real', rate: 1 * 3.4 }, //1 dollar -> ~ 3.4 reais
            { symbol: 'U$', name: 'Dollar', rate: 1 }
        ]
        vm.selectedCurrency = vm.availableCurrencies[0];

        productResource.query(function (data) {
            vm.products = data;
        });

        $scope.updatePrices = function () {

        }

        $scope.filterProduct = function () {

            var filter = 'contains(ProductName, \'' + vm.searchCriteria + '\')';
            vm.filteredResult = vm.searchCriteria != '';

            productResource.query({ '$filter': filter }, function (data) {
                vm.products = data;
            });
        }

        $scope.deleteProduct = function (product) {
            //Here we can change for a bootstrap modal
            if (confirm('Product "' + product.productName + '" will be DELETED. Are you sure?')) {
                productResource.delete({ 'id': product.productId }, function (data) {
                    $location.path('listProducts')
                });
            }
        }
    }

    angular
        .module("productManagement")
        .controller("ProductListCtrl",
        productListCtrl,
        ["productResource", "$location",
            productListCtrl]);
}());
