(function () {
    "use strict";

    function productListCtrl($scope, $location, productResource) {
        var vm = this;
        vm.searchCriteria = '';
        vm.filteredResult = false;
        vm.editing = false;

        productResource.query(function (data) {
            vm.products = data;
        });

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
