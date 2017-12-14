var projectsApp = angular.module("projectsApp", ["ngSanitize"]);

projectsApp.service("understood", function() {
	var item = "understood";
	return {
		"read": function(item){
			data = localStorage.getItem(item);
			return data;
		},
		"save": function(item, value){
			localStorage.setItem(item, value);
			return value;
		},
	};
});

projectsApp.controller("HeaderController", function($window, $rootScope, $scope, understood){
	/**
	 * Did the visitor understand the project limitations?
	 */
	$scope.u = understood.read("understood") == true || understood.read("understood") == "true"; // @todo Read from persisting data
	$scope.understood = function(d){
		$scope.u = understood.save("understood", d==true);
		$window.scrollTo(0, 0);
	}

	$rootScope.$broadcast("ConstraintsUnderstood", $scope.u);
	$scope.$emit("ConstraintsUnderstood", $scope.u);
});

/**
 * @todo: Read HTML descriptions from file
 */
projectsApp.controller("ProjectsController", function($scope, $http) {
	$scope.$on("ConstraintsUnderstood", function(event, data) {
		$scope.u = data;
	});
	
	/**
	 * @todo If small devices detected: restrict the menus
	 */
	$scope.show = {
		"source": true,
		"demo": true,
		"download": true,
		"buy": true,
		"donate": true,
		"learn": true
	};
	
	/**
	 * List of useful projects
	 */
    $scope.projects = [];
    $http({
        method : "GET",
        url : "projects.json"
    }).then(function(response) {
        var projects = response.data;
        /**
         * Description could be a very complex HTML to handwrite within json.
         * Fetches descriptions externally
         */
        angular.forEach(projects, function(project, key){
            $http({
                method : "GET",
                url : project.links.desc
            }).then(function(response) {
                project.description = response.data;
            }, function(response) {
                // error
                project.description = "Description not found.";
            });
		}, null);
		$scope.projects = projects;
    }, function(response) {
        // error
    });
});

/**
 * Scroll the page to the top right after a link is clicked on
 */
projectsApp.run(function($rootScope, $anchorScroll){
    $rootScope.$on("$locationChangeSuccess", function(){
		//$anchorScroll();
		window.scrollTo(0, 0);
    });
});

/**
 * <div scroll-directive="">...</div>
 */
/*
projectsApp.directive("scrollDirective", function($window) {
	return {
		link: function (scope, element, attrs) {
		  $window = angular.element($window);
		  $window.on("scroll", function() {
			  console.log("scrolling to: "+$window[0].scrollY);

			  if($window[0].scrollY > 200)
			  {
				  console.log("Stay on top, apply css.")
			  }

			  //console.log($window[0].scrollY);
			});
		},
	  };
});
*/