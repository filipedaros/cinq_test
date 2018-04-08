(function () {
    "use strict";

    var app = angular.module("productManagement",
                            ["common.services", "ngRoute"]);


    app.config(function ($routeProvider) {
        $routeProvider
            .when('/listProducts', {
                templateUrl: 'app/products/productListView.html',
                controller: 'ProductListCtrl'
            })
            .when('/editProduct/:id', {
                templateUrl: 'app/products/productEditView.html',
                controller: 'ProductEditCtrl'
            });

    });
}());