import express from "express";


const app = express()

app.use(express.json())

app.get("/hello",(req,res)=>{
    res.status(200).json("Hello api")
})

app.listen(3000,()=>{
    console.log("Server listening on port 3000")
})