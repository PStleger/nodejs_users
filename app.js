require("dotenv/config");
const express=require("express");
const app=express();
const {PORT}=process.env;
const pool=require("./db");

app.use(express.json());

app.listen(PORT,()=>{
    console.log('server is now running on ${PORT}');
})