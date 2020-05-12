const express = require("express");
const path = require("path");
const fs = require("fs");

var mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactfoodielover', {useNewUrlParser: true});

const app = express();
const port = 80;

// **********************************************************************


// Schema bna rhe hum 
var contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    email: String,
    more: String
});
var Contact = mongoose.model('Contact', contactSchema);


// **********************************************************************


// Express file hai
app.use('/static' , express.static('static'))// for serb=ving static file
app.use(express.urlencoded())

// Pug file hai
app.set('view engine' , 'pug')// set the template pug
app.set('views' , path.join(__dirname , 'views'))// set views directiory


// **********************************************************************


app.get('/' , (req , res) => {
    const ankit = {'title' : 'FoodieLover.com'}
    res.status(200).render('in.pug' , ankit)
})

// **********************************************************************

app.get('/about' , (req , res) => {
    const ankit = {'title' : 'FoodieLover.com'}
    res.status(200).render('about.pug' , ankit)
})


// **********************************************************************


app.get('/suggestion' , (req , res) => {
    const ankit = {'title' : 'FoodieLover.com'}
    res.status(200).render('suge.pug' , ankit)
})

app.post('/suggestion' , (req , res) => {
    name = req.body.name
    email = req.body.email
    opss = req.body.opss
    more = req.body.more
    var ramayan = `The name of client is ${name}

and his/she's mail id is ${email} or 

he/she select the area ${opss}

and suggestion was ${more}`

    fs.writeFileSync('message.txt' , ramayan)
    const ankit = {'title' : 'FoodieLover.com'}
    res.status(200).render('suge.pug' , ankit)
})



// **********************************************************************



app.get('/contact' , (req , res) => {
    const ankit = {'title' : 'FoodieLover.com'}
    res.status(200).render('contact.pug' , ankit)
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This have saved into the database")
    }).catch(() => {
        res.status(404).send("Item not found")
    });
    // res.status(200).render('contact.pug');
})


// **********************************************************************



// Server start
app.listen(port , () => {
    console.log(`Ye Chla Humra server port ${port} pe`);
})