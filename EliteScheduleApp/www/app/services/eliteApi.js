(function(){

	'use strict';

	angular.module('eliteApp').factory('eliteApi', ['$http', '$q', '$ionicLoading', 'DSCacheFactory', eliteApi]);

	function eliteApi($http, $q, $ionicLoading, DSCacheFactory)
	{
		var currentLeagueId;

		self.leaguesCache = DSCacheFactory.get("leaguesCache");
		self.leagueDataCache = DSCacheFactory.get("leagueDataCache");

		function getLeagues(){

			$ionicLoading.show({template: 'Loading...'});

			var deferred = $q.defer();
			var cacheKey = "leagues";
			var leaguesData = self.leaguesCache.get(cacheKey);

			// check if data is in cache and if not use Http call.
			if(leaguesData){
				console.log("Data retrived from Cache");
				deferred.resolve(leaguesData);
				$ionicLoading.hide();

			}
			else {
					$http.get("http://elite-schedule.net/api/leaguedata")
					.success(function(data){
						$ionicLoading.hide();
						self.leaguesCache.put(cacheKey, data);
						deferred.resolve(data);
					})
					.error(function(status){
						console.log("http error "+status);
						$ionicLoading.hide();
						deferred.reject();
					});
				 }	

			return deferred.promise;
		}

		function getLeagueData(){

			var deferred = $q.defer();
			var cacheKey = "leaguesData"+ currentLeagueId;
			var leagueData = self.leagueDataCache.get(cacheKey);

			// check if data is in cache and if not use Http call.
			if(leagueData){
				console.log("Data retrived from Cache");
				deferred.resolve(leaguesData);
			}
			else{
					$http.get("http://elite-schedule.net/api/leaguedata/"+currentLeagueId)
					.success(function(data, status){
					
					self.leagueDataCache.put(cacheKey,data);
					console.log("success" + status);
					deferred.resolve(data);

					})
					.error(function(){
						console.log("http error");
						deferred.reject();
					});
				}

			return deferred.promise;
		}

		function setLeagueId(leagueId){
			currentLeagueId = leagueId;
		}

		return {
			getLeagues : getLeagues,
			getLeagueData : getLeagueData,
			setLeagueId : setLeagueId
		};
	};

})();