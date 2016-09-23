(function() {
    'use strict';

    angular
        .module('myApp',['ngRoute'])
        .controller('AjaxController', AjaxController);

    /* dependency injection to ensure valid minified code */
    AjaxController.$inject = ['$window', '$scope', '$http'];

    function AjaxController($window,$scope, $http){

        console.log('hello');
        $scope.types = ['new','hot'];
        $scope.subredit="";
        $scope.subredits = "";
        $scope.sublist = [];
        $scope.type="new";
        
        
        function loadData(url) {
            $http.jsonp(url).success(function(data) {
                $scope.elements = [];
                var dataset = data.data.children;
                for (var i=0;i<dataset.length;i++){
                    $scope.elements.push(dataset[i].data); // response data
                }   
        });
                
        }
        
        
        $scope.display = function(){
            if($scope.subredits == "") var url="http://api.reddit.com/"+$scope.type+"?jsonp=JSON_CALLBACK"; 
            else var url="http://api.reddit.com/r/"+$scope.subredits+"/"+$scope.type+"?jsonp=JSON_CALLBACK";
            loadData(url);    
         }  
        $scope.display();
        
        
        $scope.getit = function() {
            if($scope.sublist.indexOf($scope.subredit) == -1) $scope.sublist.push($scope.subredit);
            $scope.subredits += $scope.subredits.length == 0? $scope.subredit : $scope.subredits.indexOf($scope.subredit) == -1?"+" +                   $scope.subredit:"";
            //console.log($scope.subredits);
           $scope.display(); 
        };
        
        
        $scope.deleteit = function(d) {
            //console.log(d);
            var pos = $scope.sublist.indexOf(d);
            //console.log($scope.sublist[pos]);
            var sub = $scope.sublist[pos];
            $scope.sublist.splice(pos,1);
            var index1= $scope.subredits.indexOf(sub);
            if(index1!= 0) index1 = $scope.subredits.indexOf("+"+sub);
            console.log(sub);
            var index2 = index1+sub.length +1;
            $scope.subredits = $scope.subredits.slice(0,index1) + $scope.subredits.slice(index2);
            //console.log($scope.subredits);
            $scope.display();
            console.log("delete:"+$scope.subredits);
            
        }
         
        $scope.clear = function(){
            $scope.subredits = "";
            $scope.sublist = [];
            scope.display();
        }
         
        
    }

})();