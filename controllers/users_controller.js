const User = require('../models/user')

module.exports.profile = function(req, res){
    if (req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if (user){
                return res.render('users', {
                    title: "home",
                    user: user
                })
            }else{
                return res.redirect('/users/signin');
            }
        });
    }else{
        return res.redirect('/users/signin');
    }
    
}

// rendering sign-up ejs file
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: 'Sign Up',
    })
};

// rendering the sign-in ejs file
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: 'Sign In',
    })
};

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('/users/signup')
    }
    User.findOne({email: req.body.email}, function(err, user){
        if (err){
            console.log('error in finding the signing up', err);
            return
        }
        if (!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('error in finding the signing up', err);
                    return;
                }
                return res.redirect('/users/signin')
            })
        }
        else{
            return res.redirect('/users/signup')
        }
    })
}

// sign in and create a session for the user
module.exports.createSession = function(req, res) {
    // steps to authenticate
    // 1. find the user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('error in finding the signing up', err);
            return
        }
        // handle user found
        if(user){
            // handle password doesnt match
            if (user.password === req.body.password){
                return res.redirect('/users/signin');
            }
            // handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }
        else{
            // handle user not found
            return res.redirect('/users/signin');
        }
    })
}

// render signout ejs
module.exports.signOut = function(req, res){
    return res.render('user_sign_out', {
        title: signout
    })
}

