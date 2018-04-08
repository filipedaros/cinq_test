﻿(function () {
    "use strict";

    function MainCtrl(userAccount, $location) {
        var vm = this;
        vm.isLoggedIn = false;
        vm.message = '';
        vm.userData = {
            userName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        vm.registerUser = function () {
            vm.userData.confirmPassword = vm.userData.password;

            userAccount.registration.registerUser(vm.userData,
                function (data) {
                    vm.confirmPassword = "";
                    vm.message = "...Registration successful";
                    vm.login();
                },
                function (response) {
                    vm.isLoggedIn = false;
                    vm.message = response.statusText + "\r\n";
                    if (response.data.exceptionMessage) {
                        vm.message += response.data.exceptionMessage;
                    }

                    if (response.data.modelState) {
                        for (var key in response.data.modelState) {
                            vm.message += response.data.modelState[key] + "\r\n";
                        }
                    }
                });
        }

        vm.login = function () {
            vm.userData.grant_type = "password";
            vm.userData.userName = vm.userData.email;

            userAccount.login.loginUser(vm.userData,
                function (data) {
                    //Use local storage or cookies
                    vm.isLoggedIn = true;
                    vm.message = "";
                    vm.password = "";
                    vm.token = data.access_token;
                    $location.url('/listProducts');
                },
                function (response) {
                    vm.password = "";
                    vm.isLoggedIn = false;
                    vm.message = response.statusText + "\r\n";
                    if (response.data.exceptionMessage) {
                        vm.message += response.data.exceptionMessage;
                    }

                    if (response.data.error) {
                        vm.message += response.data.error;
                    }
                })
        }
    }

    angular
        .module("productManagement")
        .controller("MainCtrl",
        ["userAccount", '$location',
            MainCtrl]);
})();