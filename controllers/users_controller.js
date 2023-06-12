//Importing data schema
const User = require('../models/user');

module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                return res.render('user_profile',{
                    title : 'User Profile',
                    user : user
                })
            }
        });
    }
    else{
        return res.redirect('/user/signin');
    }
}

//Render the sign up page
module.exports.signup = function(req,res){
    return res.render('user_sign_up',{
        title : 'Sign Up'
    });
}

//Render the sign in page
module.exports.signin = function(req,res){
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
    //Find the user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing in'); return}
    
        //Handle user found
        if(user){
            //Handle password which dosen't match
            if(user.password != req.body.password){
                return res.redirect('back');
            }

            //Handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');

        }
        //Handle user not found
        else{
            return res.redirect('back');
        }
    });
}