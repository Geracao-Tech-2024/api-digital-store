const app = require('./app');
const porta = process.env.PORT || 3500;
// impedindo a inicialização do servidor caso o banco de dados nao esteja conectado
app.on('db_ok', ()=>{
    console.log('iniciando o servidor...');
    app.listen(porta, 'localhost', ()=>{
        console.log('rodando na porta: http://localhost:', porta);
    });
});