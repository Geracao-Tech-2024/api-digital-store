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

}
module.exports = new categoriesController();