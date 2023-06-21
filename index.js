const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
//Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);


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

//Using session & Monogo store is used to store the session cookies
app.use(session({
    name: 'codeial',
    //Change it before production
    secret: 'blahsomething', 
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (100*60*100)
    },
    store : new MongoStore(
        {
            mongooseConnection : db,
            autoRemove : 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup OK');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// Using express router
app.use('/', require('./routes'));

//Running the Server
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is Running on port : ${port}`);    
});