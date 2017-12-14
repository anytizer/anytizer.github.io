var projectsApp = angular.module("projectsApp", ["ngSanitize"]);

projectsApp.service("understood", function() {
    /**
     * Save a boolean value only.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
	 * @see http://dev-test.nemikor.com/web-storage/support-test/
	 * @see https://www.w3schools.com/html/html5_webstorage.asp
     */
    var item = "understood";
    return {
        "read": function(){
            var data = localStorage.getItem(item);
            data = (data === true || data === "true");
            return data;
        },
        "save": function(value){
            var data = (value === true);
            if(data)
            {
                localStorage.setItem(item, data);
            }
            else
            {
                /**
                 * Do not leave a trace
                 */
                localStorage.removeItem(item);
            }

            return data;
        }
    };
});

projectsApp.controller("HeaderController", function($window, $rootScope, $scope, understood){
    /**
     * Did the visitor understand the project limitations?
     * Reads the data from persisting provider
     */
    $rootScope.u = understood.read(); // 
    $rootScope.understood = function(status){
        $rootScope.u = understood.save(status);
        
        /**
         * Jumpt to the top
         */
        $window.scrollTo(0, 0);
    };
});

projectsApp.controller("FooterController", function($window, $rootScope, $scope){
});

/**
 * @todo: Read HTML descriptions from file
 */
projectsApp.controller("ProjectsController", function($rootScope, $scope, $http) {
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
         * Description could be a very complex HTML to hand-write within json.
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