const usuarioServices =  require('./../services/usuariosServices');

class userController {
    getAllUsuarios(requisicao, resposta) {
        try {
            resposta.status(200).send(usuarioServices.getUsuarios())
        } catch (erro) {
            resposta.status(500).send(erro.message)
        }
    }
    getUsuario(requisicao, resposta) {
        try {
            resposta.status(200).send(usuarioServices.getUsuario())
        } catch (erro) {
            resposta.status(500).send(erro.message)
        }
    }
    setUsuario(requisicao, resposta) {
        try {
            resposta.status(201).send(usuarioServices.postUsuario())
        } catch (erro) {
            resposta.status(500).send(erro.message)
        }
    }
    deleteUsuario(requisicao, resposta) {
        try {
            resposta.status(200).send(usuarioServices.deleteUsuario())
        } catch (erro) {
            resposta.status(500).send(erro.message)
        }
    }
    updateUsuario(requisicao, resposta) {
        try {
            resposta.status(200).send(usuarioServices.putUsuario())
        } catch (erro) {
            resposta.status(500).send(erro.message)
        }
    }
}
module.exports = new userController();