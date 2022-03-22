const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//create new user to connect and adding informtion with mongoose
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
    }
})


//in moment i here making function that when save he passes about middlware!!!
UserSchema.pre('save',  function(next){
   const user = this
   if(!user.isModified('password')){
       return next()
   }
   bcrypt.genSalt((err,salt) =>{
    bcrypt.hash(user.password, salt, (err, hash) => {
       user.password = hash
       next()
      })
    })
})

//crete userschema to verify password when autenticate and check out password.
UserSchema.methods.checkPassword = function(password){
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password, (err,isMatch) => {
         if(err){
             reject(err)
         }else{
             resolve(isMatch)
         }
      })
  })    
  }






//remember need register this mongoose
const User = mongoose.model('User',UserSchema)
module.exports= User