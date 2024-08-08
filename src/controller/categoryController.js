const categoryServices =  require('./../services/categoryServices');

class userController {
    getAllCategorys(requisicao, resposta) {
        try {
            resposta.status(200).send(categoryServices.getcategorys())
        } catch (erro) {
            resposta.status(500).send(erro.message)
        }
    }
    getCategory(requisicao, resposta) {
        try {
            resposta.status(200).send(categoryServices.getCategory())
        } catch (erro) {
            resposta.status(500).send(erro.message)
        }
    }
    setCategory(requisicao, resposta) {
        try {
            resposta.status(201).send(categoryServices.postCategory())
        } catch (erro) {
            resposta.status(500).send(erro.message)
        }
    }



    deleteCategory(requisicao, resposta) {
        try {
            const data = categoryServices.deleteCategory(requisicao);
            // resposta.send('No content');
            resposta.json({message:'', statusCode: 204})
            resposta.status(204);
            
        } catch (erro) {
            resposta.status(500).send(erro.message)
        }
    }



    updateCategory(requisicao, resposta) {
        try {
            resposta.status(200).send(categoryServices.putCategory())
        } catch (erro) {
            resposta.status(500).send(erro.message)
        }
    }
}
module.exports = new userController();