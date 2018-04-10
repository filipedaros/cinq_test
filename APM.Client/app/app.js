(function () {
    "use strict";

    var app = angular.module("productManagement",
        ["common.services", "ngRoute"]);


    app.filter('customCurrency', function () {
        return function (inputDollar, rate, currencyTo) {

            //Here we could make a request to an API to get the symbol and rate of currencyTo
            console.info('Converting ' + inputDollar + ' to ' + currencyTo + ' with rate ' + rate);

            return currencyTo + ' ' + (inputDollar * rate).toFixed(2);
        }
    })

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