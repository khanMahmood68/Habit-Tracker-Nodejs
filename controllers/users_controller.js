const User = require('../models/user');


// Render the signup page
module.exports.signUp = (req, res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    return res.render(
        'user_sign_up',{
            title:'Sign Up | Habit Tracker'
        })
}


// Get the sign up data or Create User
module.exports.create = async (req, res)=>{
    try {
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back')
        }
        const user = await User.findOne({email:req.body.email})
        if(!user){
            await User.create(req.body);
            return res.redirect('/users/sign-in')
        }else{
            return res.redirect('back')
        }
        
    } catch (error) {
        console.log(`Error:${error}`);
    }
   

}

// Sign in and create session for user

module.exports.createSession = (req, res)=>{
    return res.redirect('/');
}




// Render the sign in  page
module.exports.signIn = (req, res)=>{

    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    return res.render('user_sign_in',{
        title:'Sign In | Habit Tracker'
    })
}

module.exports.destroySession = (req, res)=>{
    req.logout((err) => {
        if (err) {
            return done(err);
        }
    });
    res.redirect('/users/sign-in')
}