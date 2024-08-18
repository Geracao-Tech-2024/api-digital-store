const request = require('supertest');
const app = require('./../../src/app');

let server;

beforeAll(async () => {

    // Simulação de conexão com o banco de dados
    await new Promise((resolve, reject) => {
        app.on('db_ok', resolve);
    }).finally(() => {
        server = app.listen(4003, () => {
            console.log('Servidor rodando na porta 3000');
        });
    });


});

afterAll(async () => {
    // Feche o servidor após todos os testes
    if (server) {
        server.close();
    }
});

describe('User API Integration Tests', () => {

    describe('POST /v1/user', () => {
        it('Deve criar um novo usuário com sucesso', async () => {
            const res = await request(app)
                .post('/v1/user')
                .send({
                    firstname: 'John',
                    surname: 'Doe',

                    // tem que mudar para um email nao existente
                    email: 'joh999@example.com',

                    password: 'password123',
                    confirmPassword: 'password123',
                });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('message', 'Usuário criado com sucesso');
        });

        it('Deve retornar erro se as senhas não coincidirem', async () => {
            const res = await request(app)
                .post('/v1/user')
                .send({
                    firstname: 'John',
                    surname: 'Doe',
                    email: 'john.doe12344@example.com',
                    password: 'password123',
                    confirmPassword: 'wrongpassword',
                });

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message', 'As senhas não coincidem');
        });

        it('Deve retornar erro se o email já estiver em uso', async () => {

            const res = await request(app)
                .post('/v1/user')
                .send({
                    firstname: 'John',
                    surname: 'Doe',
                    email: 'jane.doe111@example.com',
                    password: 'password123',
                    confirmPassword: 'password123',
                });

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message', 'Email já está em uso');
        });
    });


    describe('GET /v1/user/:id', () => {
        it('Deve retornar um usuário específico', async () => {

            // Trocar o ID conforme necessário
            // ID do usuário existente no banco de dados
            const userId = 34;

            const res = await request(app).get(`/v1/user/${userId}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('id', userId);
            expect(res.body).toHaveProperty('firstname', 'Jane');
            expect(res.body).toHaveProperty('surname', 'Doe');
            expect(res.body).toHaveProperty('email', 'jane.doe@example.com');
        });

        it('Deve retornar erro se o usuário não for encontrado', async () => {
            const res = await request(app).get('/v1/user/99999'); // ID que não existe

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual('Usuário não encontrado');
        });
    });

    // AINDA NAO TESTEI ESTE TESTE, EXEMPLO DE COMO DEVE SER
    describe('PUT /v1/user/:id', () => {
        it('Deve atualizar um usuário existente', async () => {
            // Trocar o ID conforme necessário
            // ID do usuário existente no banco de dados
            const userId = 21;

            const tokenRes = await request(app)
                .post('/v1/user/token')
                .send({ email: 'john.doe@example.com', password: 'password123' });

            const token = tokenRes.body.token;

            const updateRes = await request(app)
                .put(`/v1/user/${userId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    firstname: "user firstname",
                    surname: "user surname",
                    email: "user123@mail.com"
                });

            expect(updateRes.statusCode).toEqual(204);
        });

        it('Deve retornar erro se o usuário não for encontrado', async () => {
            const tokenRes = await request(app)
                .post('/v1/user/token')
                .send({ email: 'john.doe@example.com', password: 'password123' });

            const token = tokenRes.body.token;

            const res = await request(app)
                .put('/v1/user/99999')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    firstname: 'Johnny',
                    surname: 'Doe'
                });

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual('User not found');
        });
    });
    // FIM DO PUT QUE NAO FOI TESTADO

    describe('DELETE /v1/user/:id', () => {
        it('Deve deletar um usuário existente', async () => {

            // Trocar o ID conforme necessário
            // ID do usuário existente no banco de dados
            const userId = 54;

            const tokenRes = await request(app)
                .post('/v1/user/token')
                .send({ email: 'john.doe@example.com', password: 'password123' });

            const token = tokenRes.body.token;

            const deleteRes = await request(app)
                .delete(`/v1/user/${userId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(deleteRes.statusCode).toEqual(204); // 204 significa que foi deletado com sucesso e sem conteúdo na resposta
        });

        it('Deve retornar erro se o usuário não for encontrado', async () => {
            const tokenRes = await request(app)
                .post('/v1/user/token')
                .send({ email: 'john.doe@example.com', password: 'password123' });

            const token = tokenRes.body.token;

            const res = await request(app)
                .delete('/v1/user/99999')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual('Usuário não encontrado');
        });
    });
});