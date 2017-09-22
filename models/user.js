const mongoose   = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let myStrLenChecker = (str)=>{
   if(!str){
       return false;
   }else{
       if(str.length < 5 || str.length > 30){
           return false;
       }
   }
};

const emailValidators = [
    {
        validator : myStrLenChecker, 
        message   : 'E-mail must be at between 5 and 30 char'
    }
]

const usernameValidators = [
    {
        validator : myStrLenChecker, 
        message   : 'Username must be at between 5 and 30 char'
    }
]

const userSchema = new Schema({
  email    : {type: String, required:true, unique:true, lowercase:true, validate : emailValidators   },
  username : {type: String, required:true, unique:true, lowercase:true, validate : usernameValidators},
  password : {type: String, required:true}
});

//middleware
userSchema.pre('save', function(next) {
  if(!this.isModified('password'))
   return next;

   //encrypt pwd
   bcrypt.hash(this.password, null, null , (err, hash)=>{
       if(err) return next(err);
       this.password = hash;
       next();
   })
});

userSchema.methods.comparePassword = (password) =>{
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);