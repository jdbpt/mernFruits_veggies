//initializers
const express = require('express');
const app = express();
const fruits = require('./models/fruits');
const veggies = require('./models/veggies');

//MVC
//models are to components, views are to pages,
// server.js is to controllers

//objects, arrays, variables
const port = 3000;

//app.set  (jsx seems not to work as a view engine/template, so app does not run)
//debugging resource: https://stackoverflow.com/questions/29635162/calling-react-view-from-express
app.set('view engine', 'jsx');
app.engine('jsx', require('jsx-view-engine').createEngine());

//middleware app.use
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});

//view body of a post request
app.use(express.urlencoded({extended:false}));

//routes
app.get('/fruits/', (req, res) => {
    res.render('Index', {
        fruits: fruits
    });
});

app.post('/fruits', (req, res)=>{
    if (req.body.readyToEat === 'on') {//if checked the body is on
        req.body.readyToEat = true;
        
    } else {//if not checked the body is undefined
        req.body.readyToEat = false;   
    }
    fruits.push(req.body);
    res.redirect('/fruits');
});

app.get('/veggies/', (req, res) => {
    res.send(veggies);
});

//adding a new fruit
app.get('/fruits/new', (req, res) => {
    res.render('New');
});

//show route (show routes use a get request)
app.get('/fruits/:indexOfFruitsArray', (req, res) => {
    res.render('Show', {//second param must be an object
        fruit: fruits[req.params.indexOfFruitsArray]//corresponds to variable in Show file 
})
});

app.get('/veggies/:indexOfVeggiesArray', (req, res) => {
    res.send(veggies[req.params.indexOfVeggiesArray]);
});

//app listen
app.listen(port, () => {
    console.log("Listening to port ", port);
});