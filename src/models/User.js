const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs') 

const userSchema = new Schema(
    {
        email:{
            type:String,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        estado:{
            type:Boolean,
            default:true
        },
        roles:[{
            ref:"Role",
            type: Schema.Types.ObjectID
        }]
    },
    {
        timestamps: true,
        versionKey:false
    }
);

userSchema.statics.encryptPassword = async(password) =>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt)
}

userSchema.statics.comparePassword = async(password,receivePassword) => {
    return await bcrypt.compare(password, receivePassword)
}

module.exports = model("User",userSchema)
