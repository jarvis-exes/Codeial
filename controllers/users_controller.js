//Importing data schema
const User = require('../models/user');

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
module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    }else{
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
    return res.redirect('/');
}

//Sign Out and Remove session
module.exports.destroySession = function(req, res){ 
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}