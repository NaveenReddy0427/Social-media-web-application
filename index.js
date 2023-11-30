const express = require('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
// setup layouts 
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts)
// mongoose setup
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');



app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix:'/css'
}));

app.use(express.urlencoded());

// setup the static files
app.use(express.static('./assets'))

// extracting the stylesheets and scripts from subpages to layout 
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// to setup the cookie parser
app.use(cookieParser());

// set up view engine ejs
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes/index'))

app.listen(port, (err)=>{
    if(err){
        console.log(`error: $(err)`);
    }
    console.log(`server listening on ${port}`);
})