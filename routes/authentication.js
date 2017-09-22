const User = require('../models/user');

module.exports = (router) => {
    // url: http://localhost:8080/authentication/register
    router.post('/register', (req,res) => {
        //res.send('Hello Register Route');
        console.log('Hello Register Route');
        console.log(req.body);
        if(!req.body.email || !req.body.username || !req.body.password ||
            !req.body.email.trim() || !req.body.username.trim() || !req.body.password.trim()){
          res.json({success: false, message: 'You must provide an e-mail, username, pwd'});
        }else{         
          let user = new User({
            email   : req.body.email.trim().toLowerCase(),
            username: req.body.username.trim().toLowerCase(),
            password: req.body.password.trim()             
          });
          user.save((err) => {
              if(err){
                console.log(err);  
                if(err.code === 11000){
                   res.json({ success:false, message:'Email or Username are already exists'});
                }else{
                  res.json({ success:false, message:'Could not save user. Error:'+err});
                }                
              }else{
                res.json({ success:true, message:'Saved new user:'});
              }
          });
        }
    });


    /* ============================================================
     Route to check if user's email is available for registration
  ============================================================ */
  router.get('/checkEmail/:email', (req, res) => {
    // Check if email was provided in paramaters
    if (!req.params.email) {
      res.json({ success: false, message: 'E-mail was not provided' }); // Return error
    } else {
      // Search for user's e-mail in database;
      User.findOne({ email: req.params.email }, (err, user) => {
        if (err) {
          res.json({ success: false, message: err }); // Return connection error
        } else {
          // Check if user's e-mail is taken
          if (user) {
            res.json({ success: false, message: 'E-mail is already taken' }); // Return as taken e-mail
          } else {
            res.json({ success: true, message: 'E-mail is available' }); // Return as available e-mail
          }
        }
      });
    }
});


/* ===============================================================
     Route to check if user's username is available for registration
  =============================================================== */
  router.get('/checkUsername/:username', (req, res) => {
    // Check if username was provided in paramaters
    if (!req.params.username) {
      res.json({ success: false, message: 'Username was not provided' }); // Return error
    } else {
      // Look for username in database
      User.findOne({ username: req.params.username }, (err, user) => { // Check if connection error was found
        if (err) {
          res.json({ success: false, message: err }); // Return connection error
        } else {
          // Check if user's username was found
          if (user) {
            res.json({ success: false, message: 'Username is already taken' }); // Return as taken username
          } else {
            res.json({ success: true, message: 'Username is available' }); // Return as vailable username
          }
        }
      });
    }
  });


    return router;
}