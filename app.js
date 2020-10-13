const express=require('express');
const expresslayouts=require('express-ejs-layouts');
const mongoose=require('mongoose');
const flash = require('connect-flash');
const session=require('express-session');

const app=express();

//db config
const db=require('./config/keys').MongoURI;
// connect to mongo
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));




//EJS
app.use(expresslayouts);
app.set('view engine','ejs');

//Bodyparser
app.use(express.urlencoded({extended:false}));

//express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    
  }));

  //connect flash
  app.use(flash());
  
  //global variables
  app.use((req,res,next)=>{
      res.locals.success_msg=req.flash('success_msg');
      res.locals.error_msg=req.flash('error_msg');
      next();
  });

//Routes
app.use('/',require('./routes/index'));

//login and register
app.use('/users',require('./routes/users.js'));

const PORT=process.env.PORT||5000;

app.listen(PORT,console.log(`server is starting ${PORT}`));