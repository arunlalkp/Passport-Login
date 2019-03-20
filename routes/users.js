const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport')

// User Model
const User = require('../models/User');

// Get Login
router.get('/login', (req, res) => {
    res.render("login")
})

// Get Register
router.get('/register', (req, res) => {
    res.render("register")
})

// Handle Register
router.post('/register', (req, res)=> {
    const { name, email, password, password2} = req.body;
    let errors = [];

    // check required feilds
    if (!name || !email || !password || !password2) {
        errors.push( {msg: 'Please fill in all feilds'} )
    }

    // check passwoeds are correct
    if (password !== password2) {
        errors.push( {msg: 'Passwords do not match'} )
    }
   
    // check passwords length is not less than 6 charecters
    if (password.length < 6) {
        errors.push( {msg: 'Password should be atleast 6 charecters'} )
    }
    
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    }
    else {
      // validation Pass
      User.findOne({ email: email})
        .then(user => {
            if (user) {
                 // if user exists
                errors.push({msg: 'Email is already in use'})
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } 
            else {
                const newUser = new User({
                    name,
                    email,
                    password
                });
                
                // hash password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        // set password to hash
                        newUser.password = hash;
                        //save user
                        newUser.save()
                            .then((user) => {
                                req.flash('success_msg', 'Successfully registered, Can Login Here!,')
                                res.redirect('/users/login')})

                            .catch((err) => console.log(err));
                    })
                })
                
            }
        });

    }
})

// Handle Login 
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {        
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true,
    })(req, res, next);    


})

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', 'You are Logged Out')
    res.redirect('/users/login')
})

module.exports = router;