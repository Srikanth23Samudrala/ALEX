const router=require('express').Router()

const {
    registerController,
    loginController,
    activateAccountController
}=require('../controllers/register')

router.post('/register-new-player',registerController)

router.post('/login',loginController)

router.patch('/register-new-player/activate-account',activateAccountController)


