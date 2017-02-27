angular.module('drapApp', ['dndLists'])
      .controller('drapCtrl',function($scope){
          $scope.DBsave = [];
          $scope.pages = [{
            name: " "
          }]
          $scope.addInputPage = function(){
            $scope.pages.push({
              name: " "
            })
            if($scope.models){
              $scope.DBData = {
                pageName : $scope.models.pageName,
                dropzones : $scope.models.dropzones
              }
              $scope.DBsave.push($scope.DBData)
              window.localStorage.setItem("abc",angular.toJson($scope.DBsave))
              console.log(angular.fromJson(window.localStorage.getItem("abc")))
            } 
          }

          setInterval(function(){
              console.log($scope.models);
          }, 5000);

          $scope.createForm = function(page){
                $scope.models = {
                  pageName : page,
                  selected: null,
                  templates: [
                      {type: "item", id: 2},
                      {type: "container", id: 1, columns: [[], []]}
                  ],
                  dropzones: {
                      "A": [],
                  }
              };
              if(angular.fromJson(window.localStorage.getItem("abc"))){
                  let data = angular.fromJson(window.localStorage.getItem("abc"))
                  for(var item in data){
                    if(data[item].pageName.name == page.name){
                      $scope.models = data[item]; 
                    }
                  }
              }
          }

          $scope.removePage = function(key){
            $scope.pages.splice(key,1);
          }
          
          $scope.models = {
              selected: null,
              templates: [
                  {type: "item", id: 2},
                  {type: "container", id: 1, children: [[]]}
              ],
              dropzones: {
                  "A": [],
              }
          };

          $scope.$watch('models.dropzones', function(model) {
              $scope.modelAsJson = angular.toJson(model, true);
          }, true);        
      });