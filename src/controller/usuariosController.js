const usuarioServices =  require('./../services/usuariosServices');

class userController {
    async getUsuario(requisicao, resposta) {
        try {
            let busca = await usuarioServices.getUsuario(requisicao)
            resposta.status(busca.status).json(busca.message)

        } catch (erro) {
            resposta.status(500).send(erro)
        }
    }

    async setUsuario(req, res) {
        try {
          const result = await usuarioServices.postUsuario(req, res);
          
        } catch (error) {
          
          res.status(500).send('Erro ao criar usuário');
        }
      }
      
    async deleteUsuario(req, resposta) { //amo viver 
        try {
            let resp = await usuarioServices.deleteUsuario(req)
        
            resposta.status(resp.status).json(resp.message)
        } catch (erro) {
            resposta.status(500).send(erro.message)
        }
    }
    async updateUsuario(requisicao, resposta) {
        try {
            let variavel = await usuarioServices.putUsuario(requisicao)
            resposta.status(variavel.status).json(variavel.message)
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

