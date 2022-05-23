const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../config');
const Role  = require('../models/Role');

module.exports.signUp = async (req,res) =>{
    const {email,password,roles} = req.body;

    const newUser = new User({
        email,
        password: await User.encryptPassword(password)
    })

    if(roles){
        const foundRoles = await Role.find({name:{$in:roles}})
        newUser.roles = foundRoles.map(role => role._id)
    }    
    else{
        const role = await Role.findOne({name:'cliente'})
        newUser.roles = [role._id];
    }   

    const savedUser = await newUser.save();

    const token = jwt.sign({id:savedUser._id ,rol:roles?roles[0]:"cliente"},config.SECRET,{
        expiresIn:86400//24hrs
    })

    res.status(200).json({token});  
}

module.exports.signIn = async (req,res) =>{

    const userFound = await User.findOne({email: req.body.email}).populate("roles");

    if (!userFound) return res.status(400).json({message:"User not found"})

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if (!matchPassword) return res.status(401).json({token: null, message: "Invalid Password"})

    const token = jwt.sign({id:userFound._id,rol:userFound["roles"][0]["name"]},config.SECRET,{
        expiresIn:86400//24hrs
    })

    res.json({token})

}

