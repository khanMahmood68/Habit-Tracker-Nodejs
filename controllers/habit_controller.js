const Habit = require('../models/habit');
const User = require('../models/user');

// Finding today's date
function getTodayDate(){
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth()+1;
    let dd = today.getDate();
    if(dd<10){dd = '0'+dd};
    if(mm<10){mm = '0'+mm};

    const formattedToday = dd+ '/' +mm+ '/' +yyyy;
    return formattedToday;

};


// Creating Habit Controller
module.exports.createHabit = async (req, res)=>{

    try {
        let habit;
        let user;
        try {
            // Find logged in user
            user = await User.findById(req.user._id).populate();

            // If Habit exists find it 
            habit = await Habit.findOne({content:req.body.habit,userRef:req.user._id}).populate(); 
        } catch (error) {
            console.log(`Error: ${error}`);
        };

        // If Habit exists
        if(habit){
            console.log('Habit Already Exists');
        }else{
            // If Habit is not exists then create Habit
            let habits = await Habit.create({
                content:req.body.habit,
                userRef:req.user._id,
                dates:{date:await getTodayDate(),complete:'none'}
            })
            // Add new habit to user in habits array
            habits.save();
        }
        // Redirect to home

        return res.redirect('/');

    } catch (error) {
        console.log('Error:',error);
    }
}


// Dashboard Add/Remove Habit to/from favorites
module.exports.favoriteHabit = async (req, res) => {
    try {
        
        let id = req.query.id;
        let userId = req.user._id;
        
        const habit = await Habit.findOne({
            _id: id,
            userRef: userId
        });

        if (habit) {
            habit.favorite = !habit.favorite;
            await habit.save();
            return res.redirect('back');
        } else {
            console.log("Habit not found or user mismatch");
            return;
        }
    } catch (err) {
        console.log("Error adding to favorites:", err);
        return;
    }
};

// Deleting Habits
module.exports.destroyHabit = async (req, res)=>{
    try {
        let id = req.query.id;
        let userId = req.user._id;

        const result = await Habit.deleteMany({
            _id:id,
            userRef:userId,
        })
        if(result.deletedCount>0){
            return res.redirect('back');
        }else{
            console.log("Habit not found or user mismatch");
            return;
        }
    } catch (error) {
       console.log('Error in deleting record(s):',error); 
    }
}

// Update Status of Habit completion
module.exports.statusUpdate = async (req, res) => {
    try {
        
        var d = req.query.date;
        var id = req.query.id;

        const habit = await Habit.findById(id);

        if (!habit) {
            console.log("Habit not found");
            return;
        }

        let dates = habit.dates;
        let found = false;

        dates.find((item, index) => {
            if (item.date === d) {
                if (item.complete === 'yes') {
                    item.complete = 'no';
                } else if (item.complete === 'no') {
                    item.complete = 'none';
                } else if (item.complete === 'none') {
                    item.complete = 'yes';
                }
                found = true;
            }
        });

        if (!found) {
            dates.push({ date: d, complete: 'yes' });
        }

        habit.dates = dates;
        await habit.save();
        res.redirect('back');
    } catch (err) {
        console.log("Error updating status:", err);
        return;
    }
};

