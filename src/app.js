// importando objeto de conexao ao banco de dados
const express = require('express');
const app = express();


const Database = require('./config/database');
const cors = require("cors");


// Transformando o corpo da requisição em JSON
// Liberando o uso da API a todos os IP's (para fins de exemplo)
app.use(express.json());
app.use(cors({ origin: "*" }));



// arquivos referente a rotas
const routeUsuarios = require('./routes/routeUsuarios');
const routeCategory = require('./routes/routeCategory');
app.use('/usuarios', routeUsuarios);
app.use('/v1/category', routeCategory);

app.use('/*', (_, resp)=> resp.send('Error404'))

// verificando conexão com banco de dados
const db = new Database();
db.sincronizarDatabase().then(()=>{
    app.emit('db_ok');
}).catch((err)=>{
    console.log(err);
});


module.exports = app;