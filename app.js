const express=require('express')
const app=express()
const port=3000

app.set('view engine', 'pug')
app.set('views','./views')

app.get('/', (req,res)=>{
    res.render('home')
})
app.get('/register', (req,res)=>{
    res.render('register')
})
app.get('/initial-profile', (req,res)=>{
    res.render('initial-profile')
})
app.get('/game-dashboard', (req,res)=>{
    res.render('game-board')
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
app.get('/game-dashboard/quizes', (req,res)=>{
    res.render('game-quiz')
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
// Start the server
app.listen (port, ()=>{
    console.log(`Server is running on port ${port}`)
})