//Importing data schema
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

//Render the profile page
module.exports.profile = function(req,res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile',{
            title : 'Profile',
            profile_user : user
        });
    });
}

//Update the profile
module.exports.update = async function(req, res){
    
    if(req.user.id == req.params.id){
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log("***********Multer Error*******", err);
                }

                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    //This is saving the file path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        } catch (err) {
            req.flash('error', err);
            return res.redirect('back');
        }
        
    }else{
        req.flash('error', 'Unauthorized');
        return res.status(401).send('Unauthorized');
    }
}

//Render the sign up page
module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title : 'Sign Up'
    });
}

//Render the sign in page
module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title : 'Sign In'
    });
}

//Get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/signin');
            })
        }else{
            return res.redirect('back');
        }
    });
}

//Sign in and create session
module.exports.createSession = function(req, res){
    req.flash('success', 'You have logged in sucessfully');
    return res.redirect('/');
}

//Sign Out and Remove session
module.exports.destroySession = function(req, res){ 
    
    req.logout(function(err) {
        req.flash('success', 'You have logged out');
        if (err) { return next(err); }
        res.redirect('/');
      });    
}