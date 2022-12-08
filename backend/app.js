const express = require("express");
const app=express();
const bodyParser=require('body-parser');
const cors= require('cors');


const loginRoutes=require('./routes/register');
const sequelize=require('./util/database');

const Users=require('./models/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors({
    origin:"*"
}));
app.use(loginRoutes);


//{force:true}

sequelize
    .sync()
    .then(()=>{
        app.listen(3000);
    })
    .catch(error=>console.log(error));

