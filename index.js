// Import express module
const express = require('express');
const db = require('./config/mongoose')
// const port = 9000;
const port = process.env.port || 8000

const app = express();
const cookieParser = require('cookie-parser');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');



// store user authentication because when seever restart no need to login again
const MongoStore = require('connect-mongo');


app.use(express.urlencoded())
app.use(express.static('./assets'))
app.use(cookieParser())

// mongo store is used to store the session cookie in the db 
app.use(session({
    name: "habbit tracker",
    // change secret during before deployment in production 
    secret: 'testpurpose',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/habit-tracker',
        autoRemove : 'disabled'
    },
        (err) => {
            console.log(err || 'connect-mongo setup ok');
      }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


// Setting view engine as ejs
app.set('view engine' , 'ejs');
app.set('views','./views');

app.use('/',require('./routes'))
app.listen(port,(err)=>{
    if(err){
        console.log(`Error: ${err}`);
        return;
    }
    console.log(`The server is up on port: ${port}`);
})