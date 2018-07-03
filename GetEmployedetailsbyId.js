var MongoClient =require('mongodb').MongoClient;
const http=require("http");
const qs=require("querystring");


http.createServer(function(req,res)
{
    if(req.method=="GET")
    {
        res.end(
           ` <html>
            <body>
            <h1>Employee Details</h1>
            <form action="/" method="POST">
             <label>Employee ID</label>
            <input type="text" id="empID" name="empID" required/><br>
            
            <button>SUBMIT</button>
            </form></body></html>`
             );
    }
    else if(req.method=="POST")
    {
        var body="";
        req.on("data",function(p){
        
            body+=p;
        console.log(body);
        }
     );
    
    req.on("end",function()
    {
    var obj=qs.parse(body);
    console.log(obj);
empID=parseInt(obj.empID);
console.log("hi");
console.log(empID);
    

MongoClient.connect("mongodb://127.0.0.1:27017/sample2",function(err,db){
    if(err);
        console.log(err);

        
   
        db.collection("Employees").findOne({"EId":empID}
            ,function(err,result)
            {
                if(err)
                {
                       throw err;
                } 
                else{

               
                res.end(`
        <html>
        <body>
        <h1>Employee Details</h1>
        <form action="/" method="POST">
         <label>Employee ID</label>
        <input type="text" id="empID" name="empID" value=${result.EId} required/><br>
        <label>Employee Name</label>
        <input type="text" id="empName" name="empName" value=${result.ename} required/><br>
        <label>Basic Pay</label>
        <input type="text" id="basicPay" name="basicPay" value=${result.sal} required/><br>
        
        
        <label>Net Pay</label>
        <input type="text" id="basicPay" name="basicPay" value=${result.netpay} required/><br>
        </form></body></html>` );
            }
            
    db.close();
});

});
    });
}



}).listen(3001);
console.log("form server listening on port 3001");