const express = require("express")

const app=express()

app.get("/",(req,res)=>{
    res.send("hello there this is aarush ")
})
app.get("/test",(req,res)=>{
    res.send("hello there this is testing ")
})
app.listen(4000,()=>{
    console.log("server created on port 4000")
})
