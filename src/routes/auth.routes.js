const {Router} = require('express')
const router = Router()

const authCtrl = require('../controllers/auth.controller')

const verifySignup = require('../middlewares')

router.post('/signup',verifySignup.checkDuplicateUsernameOrEmail,authCtrl.signUp)
router.post('/signin',authCtrl.signIn)

module.exports.authRoutes = router;

