const Post = require("../models/post");

module.exports.home = function(req,res){
    
    // Populating the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        return res.render('home',{
            title : 'Home',
            posts : posts
        });
    }); 

    // Post.find({})
    // .populate('user')
    // .exec(function(err, posts){
    //     return res.render('home',{
    //         title : 'Home',
    //         posts : posts
    //     });
    // }); 
}