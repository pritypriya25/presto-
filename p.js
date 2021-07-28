const { text } = require("body-parser");

var array = [];
// var numbers = [[45, 4],[9, 16], [25,8]];
var numbers = [45,6]
var k = ['a','b']
numbers.forEach(myFunction);
function myFunction(value, index, array) {
   var json = {...value}
    json = Object.assign({}, value)
    json.reduce((acc,it,key) =>{
        acc[key]=it
    },{})
    json = value.reduce((json,value)=>{
        json[key]=value;
          return json;
          },{}
      )
    }
    
    
    
    
      