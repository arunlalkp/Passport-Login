const localStartegy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../models/User')

module.exports = (passport)=> {
    passport.use(
        new localStartegy({ usernameField: 'email'}, (email, password,  done) => {
            //match user
            User.findOne({ email: email})
                .then((user) => {                    
                    if (!user) {
                        return done(null, false, { message: 'Invalid Email'})
                    }
                    // Match Password
                    bcrypt.compare(password, user.password, (err, isMatch)=> {
                        if (err) {
                            throw err
                        }
                        if (isMatch) {
                            return done(null, user)
                        }
                        else {
                            return done(null, false, { message: 'Password Incorrect'})
                        }
                    })
                })
                .catch((err) => console.log(err));
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
      });
}