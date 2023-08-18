//initializers
const dotenv = require('dotenv').config();
const { configDotenv, config } = require('dotenv');

const mongoose = require('mongoose');
const Fruit = require('./models/Fruit.js');
const express = require('express');
const fruits = require('./models/fruits');
const veggies = require('./models/veggies');
//Fruit.insertMany(fruits); //inserted alot of these multiple times, so this worked
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
    res.send("<h1>Explore Veggies and See/Add fruits</h1><nav><a href='/fruits'>Main Fruits Page</a></nav>")
});
app.get('/fruits', async (req, res) => {
    // res.render('Index', {
    //     fruits: fruits
    // });
    // res.render('fruits/Index');
    // console.log(Fruit);

    await Fruit.find({}).then((allFruits)=>{
        res.render('Index', {
            fruits: allFruits
        });
        // console.log(allFruits);
    }).catch (function (err) {
        console.log(err);
        res.render("ErrorPage", {error: err})
    });
    
    
});

app.post('/fruits', async (req, res)=>{
    if (req.body.readyToEat === 'on') {//if checked the body is on
        req.body.readyToEat = true;
        
    } else {//if not checked the body is undefined
        req.body.readyToEat = false;   
    }
    // fruits.push(req.body);
    // res.redirect('/fruits');

    await Fruit.create(req.body).then( (error, createdFruit)=>{
        res.redirect('/fruits');
    });
    console.log(fruits);//error checking
});


//adding a new fruit
app.get('/fruits/new', async (req, res) => {
    res.render('New');
});

//show route (show routes use a get request)
app.get('/fruits/:id', async (req, res) => {//added async
//     res.render('Show', {//second param must be an object
//         fruit: fruits[req.params.indexOfFruitsArray]//corresponds to variable in Show file 
// })
await Fruit.findById(req.params.id).then((foundFruit)=>{//deleted err
    res.render('Show', {
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