var fs = require('fs');
var arr = [];
var brr = [[]];

fs.readFile('customerdata.txt','utf8',function(error,data){
  if(error){
       console.log("we encountered some error");
  }
  else{
            //Spliting the data through newline
            var arr = data.toString().split('\n');

            var crr = arr[0].split(',');
            for(var a =0; a < crr.length ; a++){
              crr[a] = crr[a].trim();
            }

            brr[0] = crr
            //Creating a two dimensional array
            for(var i=1; i < arr.length ; i++){
              arr[i] = arr[i].trim()
              brr[i] = arr[i].split(',');
            }

            //converting the 2-D array to array of objects
            var cols = brr.shift();
            newArr = brr.map(function(element,index){
                 var newObj = {};
                 element.forEach(function(data,index){
                    newObj[cols[index]]=data;
                 });
                 return newObj;
              });

            //Number of Orders The Site Received
            console.log("**************************************************************************************");
            console.log("Total orders received",newArr.length);

           //Total amount of Orders
             var sum=0;
             for(var i=0; i <newArr.length ;i++){
               if(!isNaN(Number(newArr[i].Amount))){
                 sum = sum + Number(newArr[i].Amount)
               }
             }
            console.log("**************************************************************************************");
            console.log("Total amount of orders", sum)

           //names of the customers who ordered once and did not order again
             console.log("**************************************************************************************");
             console.log("Name of the customers who ordered once and did not order again")
             var tmp =[];
             for(var i=0;i < newArr.length ;i++){
               tmp[i] = newArr[i].Name
             }
             for(var j=0; j < tmp.length;j++){
               if(tmp.indexOf(tmp[j]) == tmp.lastIndexOf(tmp[j])){
                 console.log(tmp[j]);
               }
             }

            //distribution of customers who ordered exactly once, exactly twice and
           //so on up to 4 orders and group the rest as 5 orders and above.
           console.log("**************************************************************************************");
           console.log("distribution of customers who ordered exactly once exactly twice and so on up to four orders and group the rest five orders and above")
            var res = {}
            for(var i=0;i < tmp.length;i++){
              if(!res[tmp[i]]){
                res[tmp[i]]=0
              }
              ++res[tmp[i]]
            }

          //Iterate throught object res
           for(var key in res){
             if(res.hasOwnProperty(key)){
               if(res[key] >= 5){
                 console.log(key + "---> 5 and above")
               }
               else{
                console.log(key + "--->" + res[key])
               }
             }
           }


  }

});
