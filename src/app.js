const { response } = require('express');
const express = require('express');
const morgan = require('morgan');

const {createRoles} = require('./libs/initialSetup')

const {authRoutes} = require('./routes/auth.routes')

const bodyParser = require('body-parser')



const app = express();

createRoles();

app.use(morgan('dev'));

app.use(express.json())

app.get('/',(req,res)=>{
    res.json({'username':'Jerry Rivera',
              'birthDay':'27/05/1994',
              'sexo':"M"
            }) 
});


const jsonParser = bodyParser.json()

app.use('/api',jsonParser,authRoutes);

module.exports.app = app;
