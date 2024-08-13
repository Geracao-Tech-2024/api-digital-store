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

    async setUsuario(req, res) {
        try {
          const result = await usuarioServices.postUsuario(req, res);
          
        } catch (error) {
          console.error('Erro ao criar usuário:', error);
          res.status(500).send('Erro ao criar usuário');
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
    async gerarToken(requisicao, resposta){
        try {
            let resp = await usuarioServices.gerarToken(requisicao);
            resposta.status(resp.status).send(resp.messege)
        } catch (erro) {
            resposta.status(500).send(erro.message)
        }
    }
}
module.exports = new userController();

