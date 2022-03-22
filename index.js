const express = require("express")
const api = express()
const port  = process.env.PORT || 3000
const path = require('path')
const session = require('express-session')
const bodyParser = require('body-parser')
const UserModel = require('./models/user')

const noticias = require('./routes/noticias')
const restrito = require('./routes/restrito')

const mongodb = process.env.MONGODB || 'mongodb://localhost/noticia'
const mongoose = require('mongoose')
mongoose.Promise =  global.Promise

api.get('/', (req, res) => res.render(''))
api.set('views', path.join(__dirname, 'views'))
api.set('view engine','ejs')
api.use(express.static(path.join( __dirname ,'views')))
api.use(session ({
         secret:'teste',
         resave: true,
         saveUninitialized: true}
         ))
api.use(bodyParser.urlencoded({extended:true}))



api.use('/noticias', noticias)
api.use('/restrito', (req,res, next) => {
    if('user' in req.session){
       return next()
    }  
    res.redirect('/login')   
})

api.use('/restrito', restrito )
api.get('/login', (req,res)=>{
    res.render('login')
})


api.post('/login', async(req,res) =>{
  const user = await UserModel.findOne({username:req.body.username})
  const isValid = await user?.checkPassword(req.body.password)    
  if(isValid){
   req.session.user = user
   res.redirect('/restrito/noticias')
  }else{
      res.redirect('/login')
  }
 // res.send({
   //   user, isValid
  //})
})






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
