const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

//Setting the EJS view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Accessing the static files
app.use(express.static('./assets'));

// Using express layouts
app.use(expressLayouts);

// Extract styles and script from sub pages into layout
app.use('layout extractStyles', true);
app.use('layout extractScripts', true);

// Using express router
app.use('/', require('./routes'));

//Running the Server
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is Running on port : ${port}`);    
});