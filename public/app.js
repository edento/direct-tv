var directTV = angular.module('direct-tv', ['ui.router', 'ngResource']);

directTV.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('about', {
                url: '/',
                templateUrl: 'pages/aboutus.html',
            })
            .state('pricing', {
                url: '/pricing',
                templateUrl: 'pages/pricing.html',

            })
            .state('spec', {
                url: '/spec',
                templateUrl: 'pages/spec.html',

            })
            .state('support', {
                url: '/support',
                templateUrl: 'pages/support.html',

            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'pages/contact.html',

            });

        $urlRouterProvider.otherwise('/');

    }
]);