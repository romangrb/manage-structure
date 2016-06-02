(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .directive('tree', function (){
    
   return {
        restrict: "E",
        scope: {family: '='},
        template: [
         "<table class='container cont-small text-center table table-bordered'>",
           "<thead>",
             "<tr>",
               "<th class='text-center'><h5><small>name</small></h5></th>",
               "<th class='text-center'><h5><small>estimated earning (K)</h5></small></th>",
               "<th class='text-center'><h5><small>total estimated earning (K)</h5></small></th>",
             "</tr>",
           "</thead>",
            "<tbody>",
              "<tr>",
                "<td class='text-center'><h6><small>{{family.name}}</small></h6></td>",
                "<td class='text-center'><h6><small>{{family.income}}</small></h6></td>",
                "<td class='text-center'><h6><small>{{family.total}}</small></h6></td>",
              "</tr>",
            "</tbody>",
          "</table>",
            '<ul>',
                '<li ng-repeat="child in family.children">',
                    '<tree family="child"></tree>',
                '</li>',
            '</ul>'].join('')
    };
    
  });
  
})();
