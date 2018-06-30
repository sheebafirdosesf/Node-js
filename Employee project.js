var MongoClient=require('mongodb').MongoClient;
var http=require("http");
var qs=require("querystring");
var n=require("./sal.js");


http.createServer(function(req,res){
    if(req.method=="GET"){
        res.end(` <!DOCTYPE html>
 <html>
<head>
        <title>Employee details Entry</title>
</head>
<body>
<form action="/" method="post">

         <label> Employee ID</label>
         <input type ="text " id="fahren" name ="fah"  placeholder ="empid"  required/>
         
         <label>EmpName</label>
         <input type ="text " id="fahre" name ="celsi"  placeholder ="empname"  required />
         
         <label>salary </label>
         <input type ="text " id="fahre" name ="sali"  placeholder ="sal"  required />
         
         <label>Netpay</label>
        <input type ="text " id="fahre" name ="netamt"  placeholder ="netamt"  required readonly/>
              

         <button>send </button>

         </form>

</body>
    </html>
    `);

    }
    else if(req.method=="POST"){
        var body="";
        req.on("data",function(chunk){
            body+=chunk;
            console.log("data");
});
        req.on("end",function(){
        var obj=qs.parse(body);
        var EmpId=parseInt(obj.fah);
        var EmpName=(obj.celsi);
        
        console.log(obj.fah);
        console.log(obj.celsi);
      

        var r=parseFloat(obj.sali);

     
        var net=n.netpay(r);
        
       
    
         res.end(`<!DOCTYPE html>
         <html>
         <head>
         <title>Employee Details</title>
          </head>
          <body>
          <form action ="/" method="post">
           <label>EmpID</label>
           <input type="text" id="fahren" name="fah" value=${EmpId}  required/>
          
           <label>EmpName</label>
           <input type="text" id="fahre" name="celsi" value=${EmpName}   required />
           

           <label>salary </label>
         <input type ="text " id="fahre" name ="sali"   value=${r} required />
         
         <label>Netpay</label>
         <input type ="text " id="fahre" name ="netamt" value=${net}   required readonly/>
              
           
           <button>send</button>
             </form>
             </body>
             </html>`);
             MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
                 if (err) throw err;
                 var dbo = db.db("sample2");
     
                 var Doc=[{EId:EmpId,ename:EmpName,sal:r,netpay:net}];
                  
                 
                   
                 dbo.collection("Employees").insert( Doc,function(err) {
                   if (err) throw err;
                   console.log("1 document inserted");
                   db.close();
                 });
               });
     
         });
     }
     })




         function netpay(salary)
         {
         var Grosspay;
         var Netpay;
         var HRA;
         
         
          
         
          if(salary>50000){
         
              HRA= (4/100*salary);
              Grosspay=salary+HRA;
              Netpay=Grosspay-1000;
          }
         else
          {
           
             HRA=(3/100*salary);
             Grosspay=salary+HRA;
             Netpay=Grosspay-1000;
             
          } 
          return Netpay;
         }
         module.exports.netpay=netpay;
         .listen(3000)
         console.log("sever listen on port 3000");
