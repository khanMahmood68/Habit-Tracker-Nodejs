const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField:'email'
},
   async (email, password, done)=>{

    try {
         // Find a user and stablish the identity

         const user = await User.findOne({email:email});

         if(!user || user.password != password){
            console.log('Invlid username/password');
            return done(null, false);
         }
         return done(null, user);
    } catch (error) {
        console.log(`Error ${error}`);
    } 
    }
))


// Serializing the user to decide whick key is kept in the cookies 

passport.serializeUser((user, done)=>{
    done(null,user.id);
})

// Deserializing the user from the key into the cookies

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        
        if (!user) {
            console.log('User not found');
            return done(null, false);
        }
        
        return done(null, user);
    } catch (err) {
        console.log('Error in finding user --> passport');
        return done(err);
    }
});


//check if user is authenticated
passport.checkAuthentication = (req, res, next) => {
    // if the user is sign-in , then pass on the request to the next function(controller action )
    if (req.isAuthenticated()) {
        return next();
    }
    // if the user is not sign-in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        // requesr.use contains the current signin user from the session cookie 
        // and we are sending this to the locals for views
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;