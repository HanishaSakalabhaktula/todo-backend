const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const todoRoutes = require('./Routes/todoRoutes');
const userRoutes = require('./Routes/userRoutes');
require('dotenv').config();


//middlewares
app.use(express.json());//get access to the requests
app.use((req, res, next) =>{
    console.log(req.path, req.method);
    next();
})
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials:true
}));

//routes
const port = process.env.PORT || 5000;

app.get('/', (req, res) =>{
    res.send("TODOOOO")
})
app.use('/', userRoutes);
app.use('/todos', todoRoutes);


app.listen(port, () => {
    console.log(`Server Listening on Port: ${port}`);

    //connecting to database
    mongoose.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>{
        console.log("Database Connection Successful");
    })
    .catch((e) => {
        console.log("Connection Failed");
        console.log(e);
    })
})