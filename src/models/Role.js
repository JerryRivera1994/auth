const {Schema, model} = require('mongoose')

module.exports.ROLES = ["cliente","administrador"];

const roleShema = new Schema({
    name:String
},{
    versionKey: false
})

module.exports = model("Role",roleShema)
