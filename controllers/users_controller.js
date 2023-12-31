const User = require('../models/user')

module.exports.profile = function(req, res){
    return res.render('users', {
        title: "home"
    })
}

// rendering sign-up ejs file
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_up', {
        title: 'Sign Up',
    })
};

// rendering the sign-in ejs file
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
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
module.exports.createSession = function(req, res){
    return res.redirect('/');
}


// sign out controller
module.exports.destroySession = function(req, res){

    req.logout(function(err){
        if (err){
            return console.log('err', err);
        }
    });

    return res.redirect('/');
}