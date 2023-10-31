const bcrypt=require('bcrypt')
const uuid = require('uuid');
const nodemailer=require('../middleware/nodemailer.config')
const {sendNotification}=require('../middleware/notifications')
const AuthRegister=require('../models/user-register')

//register the game player
exports.registerController = async (req, res) => {
    try {
        //check the email existence
        const emailExist = await AuthRegister.findOne({
            email: req.body.email
        })
        console.log(emailExist)
        if (emailExist) {
            return res.status(400).json({
                'error': 'Email already Exist!'
            })
        }
        //hash the password before saving it into the database.
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const userId = uuid.v4(); // Generate a version 4 (random) UUID

        //generate confirmation code
        const confirmationCode = Math.floor(100000 + Math.random() * 900000)
        //get all the data from the sp who is registering.
        const playerDetails = new AuthRegister({
            userId: userId,
            email: req.body.email,
            password: hashedPassword,
            confirmationCode: confirmationCode
        })
        
        console.log(playerDetails)
        //create a new sp to the database.
        // const newPlayer = await playerDetails.save((err, data) => { 
        //     if (err) {
        //         return res.status(400).json({
        //             'message':'failure',
        //             'error': err
        //         })
        //     }
        //     nodemailer.sendConfirmationEmailClient(
        //         data.email,
        //         data.confirmationCode)
            
        // })
        const newPlayer = await playerDetails.save();
        nodemailer.sendConfirmationEmailClient(newPlayer.email, newPlayer.confirmationCode);
        //send the confirmation code to the email using nodemailer
                
        //save the new client to the database
        // const newClient = await CRegister.create(req.body)

        //send the response to the client
        // return res.status(200).json({
        //     'message': 'registered successfully! Check your email for activation link',
        //     newPlayer
        // })

        return res.send("registered successfully")
    } catch (e) {
        return res.status(400).json({
            status: 'failure',
            message: e.message
        })
    }

}
//activate the account
exports.activateAccountController = async (req, res) => {
    try {
        //get the confirmation code from the request body
        const { confirmationCode } = req.body
        //check if the confirmation code is correct
        const user = await AuthRegister.findOneAndUpdate({
            confirmationCode: confirmationCode
        },
            {
                $set: {
                    accountStatus: 'active'
                }
            }
        )
        if (!user) {
            res.status(400).json({
                'error': 'Invalid confirmation code'
            })
        }
        var notificationTitle = 'Welcome to Alex-game'
        var notificationMessage='Start quiz game and advance your knowledge'
        var channel='all'
        var mode='ingame'
        //send a notification to the user.
        const messageSent=await sendNotification(user.userId,channel,notificationMessage, notificationTitle,mode)
        console.log(messageSent)
        res.status(200).json({
            'message': 'Account activated successfully',
            user
        })
    } catch (e) {
        res.status(400).json({
            status: 'failure',
            message: e.message
        })
    }
}

//login with email/password
exports.loginController = async (req, res) => {
    //check if the email exists
    const emailExist = await AuthRegister.findOne({
            email: req.body.email
        })
    if (!emailExist) {
            res.status(404).json({
                'error': 'Email does not Exist!..create an account'
            })
            return 
    }
    //check if the account status is activated
    // const accountStatus = await AuthRegister.findOne({
    //     email: req.body.email
    // })
    if (emailExist.accountStatus == 'inactive') {
        return res.status(400).json({
            status:'failure',
            message: 'Account not activated! Check your email for activation code'
        })
    }
    //check wheather the user has an active profile.
    // const profileCreated = await Profile.findOne({
    //     userId:emailExist._id
    // })
    // if (!profileCreated) {
    //     return res.status(404).json({
    //         userid: emailExist._id,
    //         profile:null
    //     })  
    // }
    //check if the password is correct
    const validPassword = await bcrypt.compare(req.body.password, emailExist.password)
    if (!validPassword) {
        return res.status(400).json({
            'error': 'Invalid credentials!'
        })
    }
    //allow the user to login
    const userid = emailExist._id
    if (!res.headersSent) {
        return res.header('userid', userid).json({
            'message': 'logged in successfully',
            'userid': userid
            // profile: profileCreated
        })
    }
}
