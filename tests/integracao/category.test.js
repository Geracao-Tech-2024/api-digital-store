const request = require('supertest');
const app = require('./../../src/app');
require('dotenv').config();

let server;

beforeAll(async () => {
    // Simulação de conexão com o banco de dados
    await new Promise((resolve, reject) => {
        app.on('db_ok', resolve);
    });

    // Inicie o servidor após garantir que o banco de dados está conectado
    server = app.listen(4002, 'localhost', () => {
        console.log('Servidor rodando na porta http://localhost:4000');
    });
});

afterAll(async () => {
    // Feche o servidor após todos os testes
    if (server) {
        server.close();
    }
});

describe('Category API Integration Tests', () => {

    let token;

    beforeAll(async () => {
        // Obtém um token válido para autenticação
        const tokenRes = await request(app)
            .post('/v1/user/token')
            .send({ email: process.env.email_user , password: process.env.password_user });
        token = tokenRes.body.token;
    });

    describe('POST /v1/category', () => {
        it('Deve criar uma nova categoria com sucesso', async () => {
            const res = await request(app)
                .post('/v1/category')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'Nova Categoria',
                    slug: 'nova-categoria',
                    use_in_menu: true,
                });
    
            expect(res.statusCode).toEqual(201);
            expect(res.body).toEqual('categoria criada');
        });
    
        it('Deve retornar erro se dados obrigatórios estiverem faltando', async () => {
            const res = await request(app)
                .post('/v1/category')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'Categoria Incompleta',
                    // slug e use_in_menu estão faltando
                });
    
            expect(res.statusCode).toEqual(400);
            expect(res.body).toEqual('Todos os campos são obrigatórios');
        });
    });

    describe('GET /v1/category/:id', () => {
        it('Deve retornar uma categoria específica', async () => {
            // Trocar o ID conforme necessário
            const categoryId = 42; // Substitua pelo ID válido

            const res = await request(app).get(`/v1/category/${categoryId}`).set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('id', categoryId);
            expect(res.body).toHaveProperty('name', 'Shoes');
            expect(res.body).toHaveProperty('slug', 'shoes');
            expect(res.body).toHaveProperty('use_in_menu', true);
        });

        it('Deve retornar erro se a categoria não for encontrada', async () => {
            const res = await request(app).get('/v1/category/99999').set('Authorization', `Bearer ${token}`); // ID que não existe

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual('Categoria não encontrada');
        });
    });

    describe('PUT /v1/category/:id', () => {
        it('Deve atualizar uma categoria existente', async () => {
            const categoryId = 30; // Substitua pelo ID válido

            const updateRes = await request(app)
                .put(`/v1/category/${categoryId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'Categoria Atualizada',
                    slug: 'categoria-atualizada',
                    use_in_menu: false,
                });

            expect(updateRes.statusCode).toEqual(204);
        });

        it('Deve retornar erro se a categoria não for encontrada', async () => {
            const res = await request(app)
                .put('/v1/category/99999')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'Categoria Inexistente',
                    slug: 'categoria-inexistente',
                });

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual('Categoria não encontrada.');
        });
    });

    describe('DELETE /v1/category/:id', () => {
        it('Deve deletar uma categoria existente', async () => {
            // tem que mudar o id para uma categoria existente no banco de dados
            const categoryId = 3; 

            const deleteRes = await request(app)
                .delete(`/v1/category/${categoryId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(deleteRes.statusCode).toEqual(204);
        });

        it('Deve retornar erro se a categoria não for encontrada', async () => {
            const res = await request(app)
                .delete('/v1/category/99999')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual('categoria não encontrada');
        });
    });
});