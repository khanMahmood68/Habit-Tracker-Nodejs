const User = require('../models/user');
const Habit = require('../models/habit')


// Finding today's date
const getTodayDate = ()=>{
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth()+1;
    let dd = today.getDate();
    if(dd<10){dd = '0'+dd};
    if(mm<10){mm = '0'+mm};

    const formattedToday = dd+ '/' +mm+ '/' +yyyy;
    return formattedToday;

};

// Get next seven date of week
function getOneWeekDate (){
    let arr = [];
    for(let i=0 ;i<7; i++){
        const d = new Date();
        d.setDate(d.getDate()+i);
        let mm = d.getMonth()+1;
        if(mm<10){mm='0'+mm};
        let dd = d.getDate();
        if(dd<10){dd = '0'+dd};
        const yyyy = d.getFullYear();
        arr.push(dd + '/' + mm + '/' + yyyy)   
    }
    return arr;
}

// Home Controller
module.exports.home = async (req, res)=>{
    try {
        // If user is logged in
        if(req.user){
            // Find habits assosiated to user
            let habits = await Habit.find({userRef:req.user._id})
            
            // Render home page with logged in user and assosiated habits
            return res.render('home',{
                title:'Habit Tracker App',
                habits:habits,
                weeklyDate: await getOneWeekDate ()
            })
        }else{
            // If user is not logged in
            return res.redirect('/users/sign-in')
        }
    } catch (error) {
        console.log(error);
    }
}

