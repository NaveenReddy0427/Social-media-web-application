const Post = require('../models/post')

module.exports.home = function(req, res){
    // res.cookie('user_id', 25);

    Post.find({})
    .populate('user')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        return res.render('home', {
            title: 'codeial | Home',
            posts: posts
        });
    });
    
}

