const express = require('express');
const app = express();
const port = 8000;

// setup layouts 
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts)

// setup the static files
app.use(express.static('./assets'))

// extracting the stylesheets and scripts from subpages to layout 
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// use express router
app.use('/', require('./routes/index'))

// set up view engine ejs
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, (err)=>{
    if(err){
        console.log(`error: $(err)`);
    }
    console.log(`server listening on ${port}`);
})