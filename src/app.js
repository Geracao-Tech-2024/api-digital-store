// importando objeto de conexao ao banco de dados
const express = require('express');
const app = express();

// classe de middleware do JWT
const jwt_alth = require('./middleware/jwt_alth');

const Database = require('./config/database');
const cors = require("cors");


// Liberando o uso da API a todos os IP's (para fins de exemplo)
app.use(cors({ origin: "*" }));



// Middleware de Body Parsing
app.use(express.json());

// arquivos referente a rotas
const routeUsuarios = require('./routes/routeUser');
app.use('/v1/user', jwt_alth.verifyJWT , routeUsuarios);


app.use('/*', (_, resp)=> resp.send('Error404'))

// verificando conexão com banco de dados
const db = new Database();
db.sincronizarDatabase().then(()=>{
    app.emit('db_ok');
}).catch((err)=>{
    console.log(err);
});


module.exports = app;