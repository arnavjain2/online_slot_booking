const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const alert = require('alert')
const port = 800;



mongoose.set('strictQuery', false);
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactdance');
}

const ContactSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email : String,
    add : String,
    desc: String
  });

  const FeedbackSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email : String,
    desc: String
  });

  const ServiceSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email : String,
    car_num : Number,
    myselect : {
      type: String,
      unique: true
    }
  });

  const contact = mongoose.model('contact', ContactSchema);
  const service = mongoose.model('services', ServiceSchema)
  const feedback = mongoose.model('feedback', FeedbackSchema);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname,'static')))
app.use(express.urlencoded({extended: true})); 
app.use(express.json());


app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'views'))


app.get('/' , (req,res)=>{
    params = { }
    res.status(200).render('try.pug',params)
})

app.get('/contact' , (req,res)=>{
    params = { }
    res.status(200).render('contact.pug',params)
})


app.get('/services' , (req,res)=>{
    params = { }
    res.status(200).render('services.pug',params)
})

app.get('/feedback' , (req,res)=>{
  params = { }
  res.status(200).render('home.pug',params)
})

app.get('/payment' , (req,res)=>{
  params = { }
  res.status(200).render('payment.pug',params)
})

app.post("/contact", (req, res) => {
    var myData = new contact(req.body);
    myData.save() 
    .then(item => {
    res.status(400).render('contact.pug',params);
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
   });


   app.post("/feedback", (req, res) => {
    var myData = new feedback(req.body);
    myData.save()
    .then(item => {
    res.status(400).render('home.pug',params);
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
   });

   app.post("/services", (req, res) => {
    var myData = new service(req.body);
    myData.save()
    .then(item => {
    res.status(400).render('payment.pug',params);
    })
    .catch(err => {
      res.status(400).render('services.pug',params);
    alert('SLOT NOT AVAILABLE')
    });
   });

   


// start server 
app.listen(port ,()=>{
    console.log(`the application is running on port http://localhost:${port}`)
})
