starterCtrls
  .controller('ClassifyController', function ($scope,$state) {
    $(".c_choice").on("click", function() {
    	console.log(1)
			if($(this).hasClass("active")) {
				$(this).removeClass("active");
			} else {
				$(this).addClass("active");
			}

		})
    $scope.closeClassify = function(){
    	$state.go("tabs.home");
    }
  })
  .controller('kandahui',function($scope) {
  	$(".c_choice a").on("click", function() {
    	
			if($(this).hasClass("active")) {
				$(this).removeClass("active");
			} else {
				$(this).addClass("active");
			}

		})
  })
