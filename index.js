const express = require("express")
const api = express()
const port  = process.env.PORT || 3000
const path = require('path')
const UserModel = require('./models/user')

const mongodb = process.env.MONGODB || 'mongodb://localhost/noticia'
const mongoose = require('mongoose')
mongoose.Promise =  global.Promise

api.get('/', (req, res) => res.render(''))
api.set('views', path.join(__dirname, 'views'))
api.set('view engine','ejs')
api.use(express.static(path.join( __dirname ,'views')))

const createInicialUser = async() => {
    const total = await UserModel.count({username:"felipemartins"})
    if(total ===0){
      const user = new UserModel({
            username:"felipemartins",
            password:'felipe18'
        })
       await user.save()
       console.log('user created')
     }else{
         console.log('user created skipped')
     }    
  }
  
mongoose.connect(mongodb, {useNewUrlParser:true,
    useUnifiedTopology: true
})
.then(() => {
    createInicialUser()
    api.listen(port, () => console.log('listing of port: '+ port))
})
.catch(e => console.log(e))
