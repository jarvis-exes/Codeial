const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//Tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: '345546703663-b98a63u34ps0f9itlmv25rkil8i2oh31.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:8000/users/auth/google/callback'
    },

    function(accessToken, refreshToken, profile, done){
        //Find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){console.log('error in google strategy-passport', err); return;}

            // console.log(profile);

            if(user){
                //If found, Set this user as req.user
                return done(null, user);
            }
            else{
                //If not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){console.log('error in creating user google strategy-passport', err); return;}
                    return done(null, user);
                }
                );
            }
        });
    }
));

module.exports = passport;