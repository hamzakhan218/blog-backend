import express from "express";


const app = express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).json("Hello from home page.")
})

app.get("/hello",(req,res)=>{
    res.status(200).json("Hello from /hello")
})

app.listen(9001,()=>{
    console.log("Server listening on port 9001")
})