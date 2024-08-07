const app = require('./app');

// impedindo a inicialização do servidor caso o banco de dados nao esteja conectado
app.on('db_ok', ()=>{
    console.log('iniciando o servidor...');
    app.listen(3500, 'localhost', ()=>{
        console.log('rodando na porta: http://localhost:3500');
    });
});