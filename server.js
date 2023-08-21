//initializers
const dotenv = require('dotenv').config();
const { configDotenv, config } = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

//Fruit and Veggie schema
const Fruit = require('./models/Fruit.js');
const Veggie = require('./models/Veggie.js');

//frits and veggies arrays
const fruits = require('./models/fruits');
const veggies = require('./models/veggies');
//initial calls to insert fruits/veggies arrrays in the code
//Fruit.insertMany(fruits); 
//Veggie.insertMany(veggies);
const app = express();

//connect to mongoose********************
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

//MVC
//models are to components, views are to pages,
// server.js is to controllers

//objects, arrays, variables
const port = 3000;

//app.set**********************
const jsxViewEngine = require('jsx-view-engine');
// Set up view engine
app.engine('jsx', jsxViewEngine());
app.set('view engine', 'jsx');

//middleware app.use*********************
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});

//view body of a post request
app.use(express.urlencoded({ extended: false }));

//routes
app.get('/', (req, res) => {
    res.render("Home");
});

//fruits routes**************************************
app.get('/fruits', async (req, res) => {

    await Fruit.find({}).then((allFruits) => {
        res.render('display_fruits/Index', {
            fruits: allFruits
        });
        // console.log(allFruits);
    }).catch(function (err) {
        console.log(err);
        res.render("ErrorPage", { error: err })
    });


});

//works with the new route to create a new fruitschema entry to database
app.post('/fruits', async (req, res) => {
    if (req.body.readyToEat === 'on') {//if checked the body is on
        req.body.readyToEat = true;

    } else {//if not checked the body is undefined
        req.body.readyToEat = false;
    }

    await Fruit.create(req.body).then((error, createdFruit) => {
        res.redirect('/fruits');
    }).catch(function (err) {
        console.log(err);
        res.render("ErrorPage", { error: err })
    });
    
});


//place to add a new fruit
app.get('/fruits/new', async (req, res) => {
    res.render('display_fruits/New');
});

//show route (show routes use a get request)
app.get('/fruits/:id', async (req, res) => {//added async
   
    await Fruit.findById(req.params.id).then((foundFruit) => {//deleted err
        res.render('display_fruits/Show', {
            fruit: foundFruit
        });
    }).catch(function (err) {
        console.log(err);
        res.render("ErrorPage", { error: err })
    });
});

//delete a fruit in show route
//note without added method-override dependency, delete fxn would need to be post route
app.post('/fruits/:id', async (req, res) => {

    await Fruit.findByIdAndDelete(req.params.id).then(() => {
        console.log("deleted");//error checking
        res.redirect('/fruits');
    }).catch(function (err) {
        console.log(err);
        res.render("ErrorPage", { error: err })
    });

});

//delete fruit in main fruits page (with method-override dependency)



//veggies routes**************************************
app.get('/veggies', async (req, res) => {

    await Veggie.find({}).then((allVeggies) => {
        res.render('display_veggies/Index', {
            veggies: allVeggies
        });
        // console.log(allVeggies);
    }).catch(function (err) {
        console.log(err);
        res.render("ErrorPage", { error: err })
    });
});

//create a new veggie based on the new route
app.post('/veggies', async (req, res) => {
    if (req.body.readyToEat === 'on') {//if checked the body is on
        req.body.readyToEat = true;

    } else {//if not checked the body is undefined
        req.body.readyToEat = false;
    }

    await Veggie.create(req.body).then((error, createdveggie) => {
        res.redirect('/veggies');
    }).catch(function (err) {
        console.log(err);
        res.render("ErrorPage", { error: err })
    });
    console.log(veggies);//error checking
});


//place to add a new veggie
app.get('/veggies/new', async (req, res) => {
    res.render('display_veggies/New');
});

//show route (show routes use a get request)
app.get('/veggies/:id', async (req, res) => {//added async
    await Veggie.findById(req.params.id).then((foundVeggie) => {//deleted err
        res.render('display_veggies/Show', {
            veggie: foundVeggie
        });
    }).catch(function (err) {
        console.log(err);
        res.render("ErrorPage", { error: err })
    });
});

//delete veggie
app.post('/veggies/:id', async (req, res) => {

    await Veggie.findByIdAndDelete(req.params.id).then(() => {
        console.log("deleted");//error checking
        res.redirect('/veggies');
    }).catch(function (err) {
        console.log(err);
        res.render("ErrorPage", { error: err })
    });

});

//pair similar routes near each other

//app listen*****************
app.listen(port, () => {
    console.log("Listening to port ", port);
});