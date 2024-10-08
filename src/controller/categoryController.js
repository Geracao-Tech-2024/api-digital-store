const categoryServices = require("./../services/categoryServices");

class categoriesController {
    async getAllCategorys(requisicao, resposta) {
        try {
            let resp = await categoryServices.getCategorys(requisicao);
            console.log(resp)
            resposta.status(resp.status).send(resp.message)
        } catch (erro) {
            resposta.status(500).json(erro.message)
        }
    }

    async getCategoryById(req, res) {
        try {
            const categoriaId = req.params.id;

            const result = await categoryServices.getCategoryById(categoriaId);
            res.status(result.status).json(result.message);
        } catch (error) {
            res.status(500).send("Erro interno do servidor");
        }
    }

    async updateCategory(requisicao, resposta) {
        try {
            const result = await categoryServices.updateCategory(requisicao);
            resposta.status(result.status).json(result.message);
        } catch (error) {
            resposta.status(500).send("Erro interno do servidor")
        }
    }
    
    async postCategory(requisicao, resposta) {

        try {
            let retorno = await categoryServices.postCategory(requisicao);
            resposta.status(retorno.status).json(retorno.message);
        } catch (erro) {
            resposta.status(500).send(erro.message);
        }
    }

    async deleteCategory(requisicao, resposta) {
        try {
            let resp = await categoryServices.deleteCategory(requisicao);
            resposta.status(resp.status).json(resp.message);
        } catch (error) {
            resposta.status(500).send(erro.message);
        }
    }
}
module.exports = new categoriesController();
