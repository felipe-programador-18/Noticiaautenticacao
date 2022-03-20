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

//remember need register this mongoose
const User = mongoose.model('User',UserSchema)
module.exports= User