"use strict";

const app = angular.module("music-practice-manager", ["ui.router"]);

//configure app with ui-router
app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
	//configure routes, controllers are bound within html partials
	$stateProvider
		.state('main', {
			url: '/',
			templateUrl: 'html/partials/main.html'
		})
	//if we load in erroneous route, go  back to base/catch-all route
	$urlRouterProvider.otherwise('/');
});
