const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// feltching data from
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    // user.id is the short cut of id generated by the database
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});


passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
        // checking db if data already exist or not and create new one 
        User.findOne({ googleId: profile.id }).then(existingUser => {
            if (existingUser) {
                //user already exist
                done(null, existingUser)
            } else {
                new User({ googleId: profile.id }).save().then(user => {
                    done(null, user)
                })
            }
        })
    })
);