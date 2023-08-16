//initializers
const dotenv = require('dotenv').config();
const { configDotenv, config } = require('dotenv');

const mongoose = require('mongoose');
const Fruit = require('./models/Fruit.js');
const express = require('express');
const fruits = require('./models/fruits');
const veggies = require('./models/veggies');

const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

//MVC
//models are to components, views are to pages,
// server.js is to controllers

//objects, arrays, variables
const port = 3000;

//app.set
const jsxViewEngine = require('jsx-view-engine');
// Set up view engine
app.engine('jsx', jsxViewEngine());
app.set('view engine', 'jsx');

//middleware app.use
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});

    //view body of a post request
app.use(express.urlencoded({extended:false}));

//routes
app.get('/', (req, res)=>{
    res.send("<h1>Explore Veggies and See/Add fruits</h1>")
})
app.get('/fruits/', (req, res) => {
    // res.render('Index', {
    //     fruits: fruits
    // });
    // res.render('fruits/Index');
    Fruit.find({}, (error, allFruits)=>{
        res.render('fruits/Index', {
            fruits: allFruits
        });
    });
});

app.post('/fruits', (req, res)=>{
    if (req.body.readyToEat === 'on') {//if checked the body is on
        req.body.readyToEat = true;
        
    } else {//if not checked the body is undefined
        req.body.readyToEat = false;   
    }
    // fruits.push(req.body);
    // res.redirect('/fruits');
    Fruit.create(req.body, (error, createdFruit)=>{
        res.redirect('/fruits');
    });
});


//adding a new fruit
app.get('/fruits/new', (req, res) => {
    res.render('New');
});

//show route (show routes use a get request)
app.get('/fruits/:id', (req, res) => {
//     res.render('Show', {//second param must be an object
//         fruit: fruits[req.params.indexOfFruitsArray]//corresponds to variable in Show file 
// })
Fruit.findById(req.params.id, (err, foundFruit)=>{
    res.render('fruits/Show', {
        fruit: foundFruit
    });
});
});

    //pair similar routes near each other
app.get('/veggies/', (req, res) => {
    res.send(veggies);
});

app.get('/veggies/:indexOfVeggiesArray', (req, res) => {
    res.send(veggies[req.params.indexOfVeggiesArray]);
});

//app listen
app.listen(port, () => {
    console.log("Listening to port ", port);
});