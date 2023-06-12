const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');

//Using middleware
app.use(express.urlencoded());

//Using cookie parser
app.use(cookieParser());

// Accessing the static files
app.use(express.static('./assets'));

//Setting the EJS view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Using express layouts
app.use(expressLayouts);

// Extract styles and script from sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Using express router
app.use('/', require('./routes'));

//Running the Server
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is Running on port : ${port}`);    
});