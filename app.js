const express=require('express')
const mongoose = require('mongoose')
const app=express()
const cors=require('cors')
const logger=require('morgan')
require('dotenv/config')
const fs=require('fs')
//get all routes
const register=require('./routes/register')
app.set('view engine', 'pug')
app.set('views','./views')

//use the imported packages
app.use(cors({ origin: '*' }))
app.use(express.json())
//log all the activities that take place in system.
app.use(logger('common', {
  stream: fs.createWriteStream("./logs/access.log",
  {flags:'a'})

}))
app.use(logger('dev'))


//
// app.use('/Auth',register)


const games = [
    { name: 'Game 1', image: 'game1.jpeg', description: 'Description for Game 1' },
    { name: 'Game 2', image: 'game2.jpeg', description: 'Description for Game 2' },
    { name: 'Game 3', image: 'game3.jpeg', description: 'Description for Game 3' },
    { name: 'Game 4', image: 'game4.jpeg', description: 'Description for Game 4' },
    { name: 'Game 5', image: 'game5.png', description: 'Description for Game 5' },
    { name: 'Game 6', image: 'game6.png', description: 'Description for Game 6' },
    { name: 'Game 7', image: 'game7.jpeg', description: 'Description for Game 7' },
    { name: 'Game 8', image: 'https://i.pravatar.cc/150', description: 'Description for Game 8' },
    { name: 'Game 9', image: 'https://i.pravatar.cc/150', description: 'Description for Game 9' },
    // Add more game objects as needed
];
// Define the dummyPlayers array (an example)
const dummyPlayers = [
    { name: 'Player 1' },
    { name: 'Player 2' },
    // Add more players as needed
  ];

app.get('/', (req,res)=>{
    res.render('home')
})
app.get('/register', (req,res)=>{

    res.render('register')
})
app.post('/create-new-player',)
app.get('/initial-profile', (req,res)=>{
    res.render('initial-profile')
})
app.get('/game-dashboard', (req,res)=>{
    res.render('dashboard',{ games, dummyPlayers})
})
app.get('/game-dashboard/profile', (req, res) => {
    // Assuming you have a user object defined here
    const user = {
      fullname: 'John Doe',
      username: 'johndoe123',
      email: 'johndoe@example.com'
    };
    
    // Render the Pug template with the user object
    res.render('profile', { user });
});
app.get('/game-dashboard/game-quiz', (req,res)=>{
    res.render('game-quiz')
})
app.get('/forgot-password', (req,res)=>{
    res.render('forgot-password')
})
app.get('/game-dashboard/game-scores', (req,res)=>{
    res.render('game-scores')
})
app.get('/game-dashboard/game-logs', (req,res)=>{
    res.render('game-logs')
})
app.get('/game-dashboard/notifications', (req,res)=>{
    res.render('notifications')
})
app.get('/login-with-face', (req,res)=>{
    res.render('login-with-face')
})
//connect to mongodb

  app.listen(process.env.PORT)