const express = require("express")
const api = express()
const port  = process.env.PORT || 3000
const path = require('path')


const mongodb = process.env.MONGODB || 'mongodb://localhost/noticia'
const mongoose = require('mongoose')
mongoose.Promise =  global.Promise

api.get('/', (req, res) => res.render(''))
api.set('views', path.join(__dirname, 'views'))
api.set('view engine','ejs')
api.use(express.static(path.join( __dirname ,'views')))



mongoose.connect(mongodb, {useNewUrlParser:true,
    useUnifiedTopology: true
})
.then(() => {
  
    api.listen(port, () => console.log('listing of port: '+ port))
})
.catch(e => console.log(e))


//testing create new user to addin salt and hash of password
const UserModel = require('./models/user')

const user = new UserModel({
    username:"felipemartins",
    password:'felipe18'
})
user.save(()=> console.log('opa'))
