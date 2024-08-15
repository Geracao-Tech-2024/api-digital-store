const app = require('../../src/app');
const request = require('supertest'); // para simular requisições HTTP

let server;

beforeAll(async () => {
    // Conecte ao banco de dados ou faça qualquer outra configuração necessária
    // Aqui, você deve garantir que o banco de dados esteja conectado antes de iniciar o servidor.

    // Simulação de conexão com o banco de dados (substitua por sua lógica real)
    await new Promise((resolve, reject) => {
        app.on('db_ok', resolve);
    });

    // Inicie o servidor após garantir que o banco de dados está conectado
    server = app.listen(4000, 'localhost', () => {
        console.log('Servidor rodando na porta http://localhost:4000');
    });
});

afterAll(async () => {
    // Feche o servidor após todos os testes
    if (server) {
        server.close();
    }
});

describe('Testes para a rota /v1/user', () => {
    test('GET: /v1/user/:id: Deve retornar um usuário específico', async () => {
        let idUsuario = 20;
        let status_esperado = 200;
        
        let resposta_esperada= {
            id: 20,
            firstname: "pablo",
            surname: "vitar",
            email: "auuuuug@mail.com"
        }; 
        const response = await request(app).get(`/v1/user/${idUsuario}`);
    
    
        expect(response.status).toBe(status_esperado); // Verifica o status da resposta
        expect(response.body).toEqual(resposta_esperada); // Verifica o corpo da resposta
    });
    test('GET: /v1/user/:id: Forçando erro 404', async () => {
        let idUsuario = 4004;
        let status_esperado = 404;
        
        let resposta_esperada= "Usuário não encontrado"; 
        const response = await request(app).get(`/v1/user/${idUsuario}`);
    
    
        expect(response.status).toBe(status_esperado); // Verifica o status da resposta
        expect(response.body).toEqual(resposta_esperada); // Verifica o corpo da resposta
    });
    test('POST: /v1/user: Deve criar um novo usuario', async () => {
        let status_esperado = 201;
        let retorno_esperado= {"message": "Usuário criado com sucesso"};
        
        let body_enviado= {
            "firstname": "user firstname",
            "surname": "user surname",
            "email": "user177@mail.com",
            "password": "123@123",
            "confirmPassword": "123@123"
        }; 

        const response = await request(app)
        .post(`/v1/user/`)
        .send(body_enviado);
    
        expect(response.status).toBe(status_esperado); // Verifica o status da resposta
        expect(response.body).toEqual(retorno_esperado); // Verifica o corpo da resposta
    });
});