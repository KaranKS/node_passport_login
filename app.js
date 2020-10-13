const express=require('express');
const expresslayouts=require('express-ejs-layouts');
const mongoose=require('mongoose');

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

//Routes
app.use('/',require('./routes/index'));

//login and register
app.use('/users',require('./routes/users.js'));

const PORT=process.env.PORT||5000;

app.listen(PORT,console.log(`server is starting ${PORT}`));