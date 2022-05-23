function add(a,b){
    return a+b;
}
function subst(a,b){
    return a-b;
}

module.exports = {
    add:add,
    subst:subst
};

const pkg = require('../package.json')

app.set('pkg',pkg);

app.get('pkg').version;



///Obtener informacion json en rutas


const jsonParser = bodyParser.json()

app.use('/api',jsonParser,authRoutes);


//busboy para imagen
//multer