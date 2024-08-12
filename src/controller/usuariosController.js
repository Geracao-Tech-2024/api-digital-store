const usuarioServices =  require('./../services/usuariosServices');

class userController {
    getAllUsuarios(requisicao, resposta) {
        try {
            resposta.status(200).send(usuarioServices.getUsuarios())
        } catch (erro) {
            resposta.status(500).send(erro.message)
        }
    }
    async getUsuario(requisicao, resposta) {
        try {
            let busca = await usuarioServices.getUsuario(requisicao)
            resposta.status(busca.status).send(busca.message)
        } catch (erro) {
            resposta.status(500).send(erro)
        }
    }

    setUsuario(req, res) {
        // Passar req e res para o serviço
        usuarioServices.postUsuario(req, res)
          .catch(error => {
            // Tratar erros não esperados
            res.status(500).send(error.message);
          });
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