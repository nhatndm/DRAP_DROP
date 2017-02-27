angular.module('drapApp', ['dndLists'])
      .controller('drapCtrl',function($scope){
          $scope.DBsave = [];
          $scope.pages = [{
            name: ""
          }]
          $scope.addInputPage = function(){
            $scope.pages.push({
              name: ""
            })
            if($scope.models){
              $scope.DBData = {
                pageName : $scope.models.pageName,
                dropzones : $scope.models.dropzones,
              }
              $scope.DBsave.push($scope.DBData)
              window.localStorage.setItem("abc",angular.toJson($scope.DBsave))
            } 
          }

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
                  let template = $scope.models.templates;
                  let data = angular.fromJson(window.localStorage.getItem("abc"))
                  for(var item in data){
                    if(data[item].pageName.name == page.name){
                      $scope.models = data[item]; 
                      $scope.models.templates = template;
                    }
                  }
              }
          }

          $scope.removePage = function(key){
            $scope.pages.splice(key,1);
          }
          
          $scope.models = {
              pageName: {
                name : ''
              },
              selected: null,
              templates: [
                  {type: "item", id: 2},
                  {type: "container", id: 1, children: [[]]}
              ],
              dropzones: {
                  "A": [],
              }
          };

          $scope.$watch('models', function(model) {
              $scope.modelAsJson = angular.fromJson(model, true); 
              var data = angular.fromJson(window.localStorage.getItem("abc"))
              if(data != null){
                for(i in data){
                  if(data[i].pageName != ' '){
                      if(data[i].pageName.name == $scope.modelAsJson.pageName.name){
                        data[i].dropzones = $scope.modelAsJson.dropzones;
                        window.localStorage.setItem("abc",angular.toJson(data))
                      }
                  }
                }
              }
          }, true);        
      });