"use strict";

const app = angular.module("music-practice-manager", ["ui.router", "ngLodash"]);

//configure app with ui-router
app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
	//configure routes, controllers are bound within html partials
	$stateProvider
		.state('main', {
			url: '/',
			templateUrl: 'html/partials/main.html'
		})
		.state('indivorg', {
			url: '/org/:orgId/:abrev',
			templateUrl: 'html/partials/singleOrganization.html'
		})
		.state('singlepractice', {
			url: '/singlepractice',
			templateUrl: 'html/partials/singlepractice.html'
		})
		.state('nonUserPractcie', {
			url: '/organization/:orgAbbrev',
			templateUrl: 'html/partials/nonUserPractice.html'
		})
		.state('addPractice', {
			url: '/:orgId/addpractice',
			templateUrl: 'html/partials/addPractice.html'
		})
		.state('editPractice', {
			url: '/:orgId/addpractice/:eventId',
			templateUrl: 'html/partials/addPractice.html'
		});
	//if we load in erroneous route, go  back to base/catch-all route
	$urlRouterProvider.otherwise('/');
});
