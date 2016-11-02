(function(){

	'use strict';

	angular.module('eliteApp').factory('eliteApi', ['$http', '$q', '$ionicLoading', 'DSCacheFactory', eliteApi]);

	function eliteApi($http, $q, $ionicLoading, DSCacheFactory)
	{
		//var currentLeagueId;

		self.leaguesCache = DSCacheFactory.get("leaguesCache");
		self.leagueDataCache = DSCacheFactory.get("leagueDataCache");

		self.leaguesCache.setOptions({
			onExpire:function(key,value){
				getLeagues()
				.then(function(){
					console.log("Leagues Cache was automatically refreshed.");
				},
				function(){
					console.log("Error retriving data, putting item back in Cache.");
					self.leaguesCache.put(key,value);
				});
			}
		});

		self.leagueDataCache.setOptions({
			onExpire:function(key,value){
				getLeagueData()
				.then(function(){
					console.log("League Data Cache was automatically refreshed.");
				},
				function(){
					console.log("Error retriving data, putting item back in Cache.");
					self.leagueDataCache.put(key,value);
				});
			}
		});

		self.staticCache = DSCacheFactory.get("staticCache");

		function setLeagueId(leagueId){
			self.staticCache.put("currentLeagueId", leagueId);
		}

		function getLeagueId(){
			return self.staticCache.get("currentLeagueId");
		}

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

		function getLeagueData(forceRefresh){
			if(typeof forceRefresh == "undefined" )
				forceRefresh = false;

			var deferred = $q.defer();
			var cacheKey = "leaguesData" + getLeagueId();
			var leagueData = null;

			if(!forceRefresh)
				leagueData = self.leagueDataCache.get(cacheKey);

			// check if data is in cache and if not use Http call.
			if(leagueData){
				console.log("Data retrived from Cache");
				deferred.resolve(leagueData);
			}
			else{
					$http.get("http://elite-schedule.net/api/leaguedata/" + getLeagueId())
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

		//function setLeagueId(leagueId){
		//	currentLeagueId = leagueId;
		//}

		return {
			getLeagues : getLeagues,
			getLeagueData : getLeagueData,
			setLeagueId : setLeagueId
		};
	};

})();