const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
})

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, 
    (accessToken, refreshToken, profile, done) => {
        console.log('Google email: ', profile.emails);
        console.log('Name: ', profile.name.givenName + ' ' + profile.name.familyName);

        User.findOne({ googleID: profile.id }).then((existingUser)=> {
            if(existingUser){
                //already have record with given ID
                done(null, existingUser);    
            } else {
                new User({ 
                    googleID: profile.id,
                    name: profile.name.givenName + ' ' + profile.name.familyName,
                    gmail: profile.emails.value  
                }).save().then(user => done(null, user));
            }
        })

        
    })
);
