angular.module("eliteApp",["ionic", "angular-data.DSCacheFactory","google-maps"])

.run(function($ionicPlatform, DSCacheFactory){

	$ionicPlatform.ready(function(){

		if(window.cordova && window.cordova.plugins.Keyboard){

			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}

		if(window.StatusBar){

			StatusBar.styleDefault();
		}

		DSCacheFactory("leagueDataCache", {storageMode:"localStorage", maxAge :10000, delteOnExpire: "aggressive"});
		DSCacheFactory("leaguesCache", {storageMode:"localStorage", maxAge :10000, delteOnExpire: "aggressive"});
		DSCacheFactory("myTeamsCache", {storageMode:"localStorage"});
		DSCacheFactory("staticCache", {storageMode:"localStorage"});
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
		abstract:true,
		templateUrl:"app/layout/menu-layout.html"
	})
	.state('app.game',{
		url:'/game/:id',
		views:{
			"mainContent":{
			templateUrl:"app/game/game.html"
			}
		}
	})
	.state('app.teams',{
		url:'/teams',
		views:{
			"mainContent":{
			templateUrl:"app/teams/teams.html"
			}
		}
	})
	.state('app.team-detail',{
		url:'/teams/:id',
		views:{
			"mainContent":{
			templateUrl:"app/teams/team-detail.html"
			}
		}
	})
	.state('app.standings',{
		url:'/standings',
		views:{
			"mainContent":{
			templateUrl:"app/standings/standings.html"
			}
		}
	}).state('app.locations',{
		url:'/locations',
		views:{
			"mainContent":{
			templateUrl:"app/locations/locations.html"
			}
		}
	})
	.state('app.rules',{
		url:'/rules',
		views:{
			"mainContent":{
			templateUrl:"app/rules/rules.html"
			}
		}
	});

	$urlRouterProvider.otherwise("/home/leagues");

	})
