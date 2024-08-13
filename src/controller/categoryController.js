const categoryServices =  require('./../services/categoryServices');

class categoriesController {
    async getAllCategorys(requisicao, resposta) {
        try {
            let retorno = await categoryServices.getCategorys();
            resposta.status(retorno.status).send(retorno.message)
        } catch (erro) {
            resposta.status(500).send(erro.message)
        }
    }
    async deleteCategory(requisicao, resposta){
        try {
            let resp = await categoriesController.deleteCategory();
            resposta.status(resp.status).send(resp.message)
        } catch (error) {
            resposta.status(500).send(erro.message);
        }
    }

}
module.exports = new categoriesController();