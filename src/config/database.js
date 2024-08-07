const sequelize = require('./conect');


class Database {
    constructor() {
        this.sequelize = sequelize;
    }

    async sincronizarDatabase() {
        try {
            // Sincronizar todos os modelos com o banco de dados
            await this.sequelize.sync({ alter: true });
            console.log('Database & tables created or updated!');
        } catch (error) {
            console.error('Error creating or updating tables:', error);
        }

        await this.#testeConexao();
    }

    async #testeConexao() {
        try {
            console.log('Testando conexão...');
            await this.sequelize.authenticate(); // Verificar se authenticate é um método válido
            console.log('Banco de dados conectado.');
        } catch (error) {
            console.error('Erro com a conexão ao banco de dados:', error);
        }
    }
}

module.exports = Database;