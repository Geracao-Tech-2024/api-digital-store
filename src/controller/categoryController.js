const categoryServices =  require('./../services/categoryServices');

class categoriesController {
    async getAllCategorys(requisicao, resposta) {
        try {
            let retorno = await categoryServices.getAllCategorys(requisicao);
            resposta.status(retorno.status).send(retorno.message)
        } catch (erro) {
            resposta.status(500).send(erro.message)
        }
    }

    async getCategoryById(req, res) {
        try {
            const categoriaId = req.params.id;
         
            const result = await categoryServices.getCategoryById(categoriaId);
            res.status(result.status).send(result.message);
        } catch (error) {
            
            res.status(500).send('Erro interno do servidor');
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