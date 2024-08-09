const usuarioServices =  require('./../services/categoriasServices');

class categoriesController {
    getAllUsuarios(requisicao, resposta) {
        try {
            resposta.status(200).send(usuarioServices.getUsuarios())
        } catch (erro) {
            resposta.status(500).send(erro.message)
        }
    }
    getCategories(requisicao, resposta) {
        try {
            resposta.status(200).send(CategoriesServices.getCategories())
            return resposta.send()
        } catch (erro) {
            resposta.status(404).send(erro.message)
        }
    }
    setCategories(requisicao, resposta) {
        try {
            resposta.status(201).send(CategoriesServices.postCategories())
        } catch (erro) {
            resposta.status(500).send(erro.message)
        }
    }
    deleteCategories(requisicao, resposta) {
        try {
            resposta.status(200).send(CategoriesServices.deleteCategories())
        } catch (erro) {
            resposta.status(500).send(erro.message)
        }
    }
    updateCategories(requisicao, resposta) {
        try {
            resposta.status(200).send(CategoriesServices.putCategories())
        } catch (erro) {
            resposta.status(500).send(erro.message)
        }
    }
}
module.exports = new categoriesController();