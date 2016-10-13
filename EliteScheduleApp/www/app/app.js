angular.module("eliteApp",["ionic"])

.run(function($ionicPlatform){

	$ionicPlatform.ready(function(){

		if(window.cordova && window.cordova.plugins.Keyboard){

			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}

		if(window.StatusBar){

			StatusBar.styleDefault();
		}
	});
})

.config(function($stateProvider,$urlRouterProvider){

	$stateProvider
	.state('home',{
		url: "/home",
		abstract: true,
		templateUrl: "app/home/home.html"
		})
	.state('home.leagues',{
		url:'/leagues',
		views:{
			"tab-leagues":{
			templateUrl:"app/home/leagues.html"
			}
		}
	})
	.state('home.myteams',{
		url:'/myteams',
		views:{
			"tab-myteams":{
			templateUrl:"app/home/myteams.html"
			}
		}
	})
	.state('app',{
		url:"/app",
		templateUrl:"app/layout/menu-layout.html"
	});

	$urlRouterProvider.otherwise("/home/leagues");

	})
