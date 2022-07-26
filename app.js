const express=require("express");
const app=express();
const m1=require("./modulearr");

const bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:false}));

//define routers
app.get("/",function(req,resp){
    resp.sendFile("empdata.html",{root:__dirname});
})

app.post("/submit_data",function(req,resp){
    if(req.body.btn1=="add"){
        var empid=parseInt(req.body.empid);
        var ename=req.body.ename;
        var sal=parseInt(req.body.sal);
        //e={empid:empid,ename:ename,sal:sal}
        e={empid,ename,sal};
        msg=m1.adddata(e);
        resp.send(`<h3>${msg}</h3>`)

    }
    else{
        var empid=parseInt(req.body.empid);
        ob=m1.searchdata(empid);
        if(ob!==undefined){
           console.log(ob);
           resp.send(JSON.stringify(ob));
        }else{
            console.log("not found"+ob);
            resp.send("not found")
        }

    }

})

//start server
app.listen(3000);
console.log("listening port 3000");

