angular.module('starter.directives', [])
    .directive('rjHoldActive', ['$ionicGesture', '$timeout', '$ionicBackdrop',
        function($ionicGesture, $timeout, $ionicBackdrop) {
            return {
                scope: false,
                restrict: 'A',
                replace: false,
                link: function(scope, iElm, iAttrs, controller) {
                    $ionicGesture.on("hold", function() {
                        iElm.addClass('active');
                        $timeout(function() {
                            iElm.removeClass('active');
                        }, 300);
                    }, iElm);
                }
            };
        }
    ])
    .directive('rjCloseBackDrop', [function() {
        return {
            scope: false,
            restrict: 'A',
            replace: false,
            link: function(scope, iElm, iAttrs, controller) {
                var htmlEl = angular.element(document.querySelector('html'));
                htmlEl.on("click", function(event) {
                    if (event.target.nodeName === "HTML" &&
                        scope.popup.optionsPopup &&
                        scope.popup.isPopup) {
                        scope.popup.optionsPopup.close();
                        scope.popup.isPopup = false;
                    }
                });
            }
        };
    }])
    .directive('resizeFootBar', ['$ionicScrollDelegate', function($ionicScrollDelegate){
        // Runs during compile
        return {
            replace: false,
            link: function(scope, iElm, iAttrs, controller) {
                scope.$on("taResize", function(e, ta) {
                    if (!ta) return;
                    var scroll = document.body.querySelector("#message-detail-content");
                    var scrollBar = $ionicScrollDelegate.$getByHandle('messageDetailsScroll');
                    // console.log(scroll);
                    var taHeight = ta[0].offsetHeight;
                    var newFooterHeight = taHeight + 10;
                    newFooterHeight = (newFooterHeight > 44) ? newFooterHeight : 44;

                    iElm[0].style.height = newFooterHeight + 'px';
                    scroll.style.bottom = newFooterHeight + 'px';
                    scrollBar.scrollBottom();
                });
            }
        };
    }])
    .directive('rjPositionMiddle', ['$window', function($window){
        return{
            replace: false,
            link: function(scope, iElm, iAttrs, controller){
                var height = $window.innerHeight - 44 - 49 - iElm[0].offsetHeight;
                if (height >= 0) {
                    iElm[0].style.top = (height / 2 + 44) + 'px';
                }else{
                    iElm[0].style.top = 44 + 'px';
                }
            }
        }
    }])
    .directive('scrollHeight',function($window){
		  return{
		    restrict:'AE',
		    link:function(scope,element,attr){
		      element[0].style.height=($window.innerHeight-50)+'px';
		    }
		  }
		})
		.directive('scrollHeight1',function($window){
		  return{
		    restrict:'AE',
		    link:function(scope,element,attr){
		      element[0].style.height=($window.innerHeight-50-210)+'px';
		    }
		  }
		})
		.directive('scrollHeight2',function($window){
		  return{
		    restrict:'AE',
		    link:function(scope,element,attr){
		      element[0].style.height=($window.innerHeight-50-210-44)+'px';
		    }
		  }
		})
		.directive('onFinish', function ($timeout) {
	    return {
        restrict: 'A',
        link: function (scope, element, attr) {
          if (scope.$last === true) {
            $timeout(function () {
              scope.$emit('ngRepeatFinished');
            });
          }
        }
	    }
    })
		.directive('homeFinish', function ($timeout) {
	    return {
        restrict: 'A',
        link: function (scope, element, attr) {
          if (scope.$last === true) {
            $timeout(function () {
              scope.$emit('ngRepeatOk');
            });
          }
        }
	    }
    })
		.directive('vidFinish', function ($timeout) {
	    return {
        restrict: 'A',
        link: function (scope, element, attr) {
          if (scope.$last === true) {
            $timeout(function () {
              scope.$emit('ngRepeatFinished');
            });
          }
        }
	    }
    })
		.directive("format", ["$timeout", function(timer) {
    return {
      link: function($scope, elem, attr) {
        timer(function() {
          var val = elem.text();
          var val = parseFloat(val);
          if (val !== val) {
            return
          }
          elem.text(val.toFixed(3));
        }, 0);
      },
      restrict: "A",
    }
  }])
	.filter('to_trusted', ['$sce', function ($sce) {
		return function (text) {
		    return $sce.trustAsHtml(text);
		};
	}]);
