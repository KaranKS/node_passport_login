const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');


//User Model
const User =require('../models/User'); 

//login
router.get('/login',(req,res)=>res.render('login'));

//register
router.get('/register',(req,res)=>res.render('register'));

//Register handle
router.post('/register',(req,res)=>{
    const {name,email,password,password2}=req.body;
    let errors=[];
    
    if(!name||!email||!password||!password2){
        errors.push({msg:'please fill all the fields'});
    }
    if(password!=password2){
        errors.push({msg:'password do not match'})
    }
    if(password.length<6){
        errors.push({msg:'password should be at least  6 character'});
    }
    if(errors.length>0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        });
    }else{
        //Validation passed
        User.findOne({email:email})
        .then(user=>{
            if(user){
                errors.push({msg:'Email is already registered'});
                //User exists
                res.render(register,{
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }else{
                const newUser=new User({
                    name,
                    email,
                    password
                });
              //Hash Password
              bcrypt.genSalt(10,(err,salt)=>
              bcrypt.hash(newUser.password,salt,(err,hash)=>{
                  if(err) throw err;
                  //set password to hash
                  newUser.password=hash;
                  //save user
                  newUser.save()
                  .then(user=>{
                      req.flash('success_msg','You are now registered and can login');
                      res.redirect('/users/login');
                  })
                  .catch(err=>console.log(err));
              })
              )
            }
        });
    }
});

module.exports=router;