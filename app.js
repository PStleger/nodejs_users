require("dotenv/config");
const express=require("express");
const app=express();
const {PORT}=process.env;
const pool=require("./db");
// const usersIdRouter=require("./routes/users/id");
const usersRouter=require("./routes/users");
// const ordersRouter=require("./routes/orders");

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the application!');
});

// app.use('/users/:id',usersIdRouter);
app.use('/users',usersRouter);
// app.use('/orders',ordersRouter);

app.listen(PORT,()=>{
    console.log(`server is now running on ${PORT}`);
})