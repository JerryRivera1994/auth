const User = require('../models/User')

module.exports.checkDuplicateUsernameOrEmail = async (req,res,next) =>{

    const email = await User.findOne({email: req.body.email})
    if(email) return res.status(400).json({message:'The email already exists'})

    next();
} 