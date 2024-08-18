const request = require('supertest');
const app = require('../../src/app'); // Ajuste o caminho conforme necessário

let server;
let token;

const getAuthToken = async () => {
    const response = await request(app)
        .post('/v1/user/token')
        .send({ email: 'john.doe@example.com', password: 'password123' });
    return response.body.token;
};

beforeAll(async () => {
    await new Promise((resolve) => {
        app.on('db_ok', resolve);
    });
    server = app.listen(4001, 'localhost', () => {
        console.log('Servidor rodando na porta http://localhost:4000');
    });
    token = await getAuthToken();
});

afterAll(async () => {
    if (server) {
        server.close();
    }
});

describe('Product API Integration Tests', () => {

    describe('POST /v1/product', () => {
        it('Deve criar um novo produto com sucesso', async () => {
            const res = await request(app)
                .post('/v1/product')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'Novo Produto',
                    slug: 'novo-produto',
                    price: 100,
                    price_with_discount: 90,
                    category_ids: [55,56,57], // AQUI TEM QUE TER UMA CATEGORIA EXISTENTE NO BANCO *****
                    images: [{ type: "image/jpg", content: 'imagem1.jpg' }],
                    options: [{
                        title: "Cor",
                        shape: "square",
                        radius: "4px",
                        type: "text",
                        value: [
                            "PP",
                            "GG",
                            "M"
                        ]
                    }]
                });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toEqual('Produto criado');
        });

        it('Deve retornar erro se campos obrigatórios estiverem faltando', async () => {
            const res = await request(app)
                .post('/v1/product')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'Produto Incompleto'
                });

            expect(res.statusCode).toEqual(400);
            expect(res.body).toEqual('Missing required fields: name, slug, price, or price_with_discount');
        });
    });

    describe('GET /v1/product/:id', () => {
        it('Deve retornar um produto específico', async () => {
            const productId = 1; // TEM QUE COLOCAR UM ID EXISTENTE NO BANCO *****
            const res = await request(app)
                .get(`/v1/product/${productId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('id', productId);
        });

        it('Deve retornar erro se o produto não for encontrado', async () => {
            const res = await request(app)
                .get('/v1/product/99999')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual('Product not found');
        });
    });

    describe('PUT /v1/product/:id', () => {
        it('Deve atualizar um produto existente', async () => {
            const productId = 2; // TEM QUE TROCAR O ID PRA UM EXISTENTE NO BANCO *****
            const res = await request(app)
                .put(`/v1/product/${productId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'Produto Atualizado',
                    price: 120,
                    price_with_discount: 100,
                    category_ids: [55], // ESSA CATEGORIA TEM QUE EXISTIR NO BANCO *****
                });

            expect(res.statusCode).toEqual(204);
        });

        it('Deve retornar erro se o produto não for encontrado', async () => {
            const res = await request(app)
                .put('/v1/product/99999')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'Produto Inexistente',
                    price: 200,
                });

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual('Product not found');
        });
    });

    describe('DELETE /v1/product/:id', () => {
        it('Deve deletar um produto existente', async () => {
            const productId = 24; // TEM QUE TROCAR PRA UM ID DE PRODUTO EXISTENTE NO BANCO ********
            const res = await request(app)
                .delete(`/v1/product/${productId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(204);
        });

        it('Deve retornar erro se o produto não for encontrado', async () => {
            const res = await request(app)
                .delete('/v1/product/99999')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual('Product not found');
        });
    });
});
