//initializers
const dotenv = require('dotenv').config();
const { configDotenv, config } = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

const Fruit = require('./models/Fruit.js');
const Veggie = require('./models/Veggie.js');


const fruits = require('./models/fruits');
const veggies = require('./models/veggies');
//Fruit.insertMany(fruits); //inserted alot of these multiple times, so this worked
//Veggie.insertMany(veggies);
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
    res.render("Home");
});

//fruits routes**************************************
app.get('/fruits', async (req, res) => {
    // res.render('Index', {
    //     fruits: fruits
    // });
    // res.render('fruits/Index');
    // console.log(Fruit);

    await Fruit.find({}).then((allFruits)=>{
        res.render('display_fruits/Index', {
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

app.post('/fruits/:id', async (req, res) => {
  
    await Fruit.findByIdAndDelete(req.params.id).then(()=>{
        console.log("deleted");//error checking
        res.redirect('/fruits');
    }).catch((err)=>{
        console.log(err);
    })
    // res.send("Deleted request recieved")
    //console.log(fruits);//error checking
});

//adding a new fruit
app.get('/fruits/new', async (req, res) => {
    res.render('display_fruits/New');
});

//show route (show routes use a get request)
app.get('/fruits/:id', async (req, res) => {//added async
//     res.render('Show', {//second param must be an object
//         fruit: fruits[req.params.indexOfFruitsArray]//corresponds to variable in Show file 
// })
await Fruit.findById(req.params.id).then((foundFruit)=>{//deleted err
    res.render('display_fruits/Show', {
        fruit: foundFruit
    });
});
});

//veggies routes**************************************
app.get('/veggies', async (req, res) => {
    // res.render('Index', {
    //     veggies: veggies
    // });
    // res.render('veggies/Index');
    // console.log(veggie);

    await Veggie.find({}).then((allVeggies)=>{
        res.render('display_veggies/Index', {
            veggies: allVeggies
        });
        // console.log(allVeggies);
    }).catch (function (err) {
        console.log(err);
        res.render("ErrorPage", {error: err})
    });  
});

app.post('/veggies', async (req, res)=>{
    if (req.body.readyToEat === 'on') {//if checked the body is on
        req.body.readyToEat = true;
        
    } else {//if not checked the body is undefined
        req.body.readyToEat = false;   
    }
    // veggies.push(req.body);
    // res.redirect('/veggies');

    await Veggie.create(req.body).then( (error, createdveggie)=>{
        res.redirect('/veggies');
    });
    console.log(veggies);//error checking
});


//adding a new veggie
app.get('/veggies/new', async (req, res) => {
    res.render('display_veggies/New');
});

//show route (show routes use a get request)
app.get('/veggies/:id', async (req, res) => {//added async
//     res.render('Show', {//second param must be an object
//         veggie: veggies[req.params.indexOfveggiesArray]//corresponds to variable in Show file 
// })
await Veggie.findById(req.params.id).then((foundVeggie)=>{//deleted err
    res.render('display_veggies/Show', {
        veggie: foundVeggie
    });
});
});


    //pair similar routes near each other
// app.get('/veggies/', (req, res) => {
//     res.send(veggies);
// });

// app.get('/veggies/:indexOfVeggiesArray', (req, res) => {
//     res.send(veggies[req.params.indexOfVeggiesArray]);
// });

//app listen
app.listen(port, () => {
    console.log("Listening to port ", port);
});