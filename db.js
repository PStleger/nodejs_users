const {pool}=require("pg");
const pool=newPool({
    user:"",
    password:"",
    database:"",
    host:"",
    port:PORT
});

module.exports=pool;