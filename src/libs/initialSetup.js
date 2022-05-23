const Role = require('../models/Role')

module.exports.createRoles = async () =>{
    try{
        const count = await Role.estimatedDocumentCount()

        if(count > 0) return;
    
        const values = await Promise.all([
            new Role({name:'cliente'}).save(),
            new Role({name:'administrador'}).save(),
            new Role({name:'vendedor'}).save(),
            new Role({name:'proveedor'}).save()
        ]);
        console.log(values);
    }
    catch(error){
        console.log(error);
    }
}