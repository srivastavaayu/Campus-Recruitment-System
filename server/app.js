const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser')

dotenv.config({path : './config.env'});

require("./db/conn");

app.use(express.json());
app.use(cookieParser())

const PORT = process.env.PORT;

app.use(require('./router/auth'));
app.use(require('./api/jobOpening'));
app.use(require("./api/updateData"));
app.use(require("./api/notification"));
app.use(require("./api/password"));
app.use(require("./api/jobArchive"));
app.use(require("./api/company"));
app.use(require("./api/application"));
app.use(require("./api/verification"));
app.get("",(req,res)=>{
    res.send("hello user");
});

app.listen(PORT,()=>{
    console.log(`server at ${PORT}`);
});