module.exports.profile = function(req, res){
    return res.render('users', {
        title: "home"
    })
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